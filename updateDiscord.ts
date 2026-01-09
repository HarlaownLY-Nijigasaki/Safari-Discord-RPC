import "dotenv/config";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { Client } from "@xhayper/discord-rpc";

/**
 * =========================
 *  Boot + Config
 * =========================
 */

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) 
{
  throw new Error("Missing DISCORD_CLIENT_ID in .env file");
}
  
const rpc = new Client({ clientId });

const DEBUG_LOG = true;        // ✅ show details every tick
const LOG_EVERY_TICK = true;   // ✅ if false, only log when presence changes

type SitesConfig = {
  videoHosts: string[];
  browseHosts: string[];
  icons: Record<string, string>;
};

function loadSitesConfig(): SitesConfig {
  const filePath = path.join(process.cwd(), "sites.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<SitesConfig>;

  const videoHosts = Array.isArray(parsed.videoHosts) ? parsed.videoHosts : [];
  const browseHosts = Array.isArray(parsed.browseHosts) ? parsed.browseHosts : [];
  const icons = typeof parsed.icons === "object" && parsed.icons ? parsed.icons : {};

  if (!icons.default) {
    throw new Error("sites.json must define icons.default");
  }

  return { videoHosts, browseHosts, icons };
}

const sitesConfig = loadSitesConfig();

/**
 * =========================
 *  URL Matching Helpers
 * =========================
 */

function hostMatchesPattern(host: string, pattern: string): boolean {
  const h = host.toLowerCase();
  const p = pattern.toLowerCase();

  if (p.startsWith("*.")) {
    const base = p.slice(2);
    return h === base || h.endsWith("." + base);
  }
  return h === p;
}

function getHost(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isVideoSite(url: string): boolean {
  const host = getHost(url);
  if (!host) return false;
  return sitesConfig.videoHosts.some((pattern) => hostMatchesPattern(host, pattern));
}

function isBrowseSite(url: string): boolean {
  const host = getHost(url);
  if (!host) return false;
  return sitesConfig.browseHosts.some((pattern) => hostMatchesPattern(host, pattern));
}

function getIconForUrl(url: string): string {
  const host = getHost(url);
  if (!host) return sitesConfig.icons.default;

  for (const [pattern, icon] of Object.entries(sitesConfig.icons)) {
    if (pattern === "default") continue;
    if (hostMatchesPattern(host, pattern)) return icon;
  }

  return sitesConfig.icons.default;
}

/**
 * =========================
 *  AppleScript (Safari)
 * =========================
 */

function runOSA(lines: string[]): Promise<{ code: number; out: string; err: string }> {
  return new Promise((resolve) => {
    const args: string[] = [];
    for (const l of lines) args.push("-e", l);

    const p = spawn("osascript", args);
    let out = "";
    let err = "";

    p.stdout.on("data", (d) => (out += d.toString()));
    p.stderr.on("data", (d) => (err += d.toString()));
    p.on("close", (code) => resolve({ code: code ?? -1, out: out.trim(), err: err.trim() }));
  });
}

type SafariBase = { url: string | null; title: string | null };

async function getSafariURL(): Promise<string | null> {
  const r = await runOSA([
    'tell application "Safari"',
    'if not (exists document 1) then return ""',
    "return URL of document 1",
    "end tell",
  ]);
  return r.code === 0 && r.out ? r.out : null;
}

async function getSafariTitle(): Promise<string | null> {
  const r = await runOSA([
    'tell application "Safari"',
    'if not (exists document 1) then return ""',
    "return name of document 1",
    "end tell",
  ]);
  return r.code === 0 && r.out ? r.out : null;
}

async function getSafariBase(): Promise<SafariBase> {
  const [url, title] = await Promise.all([getSafariURL(), getSafariTitle()]);
  return { url, title };
}

/**
 * =========================
 *  Presence Update
 * =========================
 */

let lastKey = "";

type ClassifyResult = {
  verb: "Watching" | "Browsing";
  type: 0 | 3;
  category: "video" | "browse" | "fallback";
};

function classify(url: string): ClassifyResult {
  if (isVideoSite(url)) return { verb: "Watching", type: 3, category: "video" };
  if (isBrowseSite(url)) return { verb: "Browsing", type: 0, category: "browse" };
  return { verb: "Browsing", type: 0, category: "fallback" };
}

function logTick(payload: Record<string, any>) {
  if (!DEBUG_LOG) return;
  // Pretty print as one object per tick
  console.log("[Tick]", payload);
}

async function updatePresence() {
  const base = await getSafariBase();
  if (!rpc.user) return;

  if (!base.url) {
    if (lastKey !== "CLEAR") {
      await rpc.user.clearActivity();
      lastKey = "CLEAR";
      if (DEBUG_LOG) console.log("[RPC] cleared (no Safari tab)");
    } else if (LOG_EVERY_TICK) {
      if (DEBUG_LOG) console.log("[Skip] no Safari tab");
    }
    return;
  }

  const url = base.url;
  const host = getHost(url);
  const title = (base.title ?? "Untitled").slice(0, 128);
  const icon = getIconForUrl(url);
  const { verb, type, category } = classify(url);

  const activity = {
    type,
    details: verb,
    state: title,
    largeImageKey: icon,
    largeImageText: host ?? verb,
    buttons: [{ label: "Open page", url }],
    instance: false,
  } as any;

  const k = `${verb}|${type}|${title}|${url}|${icon}`;

  // ✅ log EVERY tick (even if skipped) if you want
  if (LOG_EVERY_TICK) {
    logTick({ url, host, title, category, verb, type, icon, changed: k !== lastKey });
  }

  if (k === lastKey) {
    if (!LOG_EVERY_TICK && DEBUG_LOG) {
      console.log("[Skip] unchanged", { verb, title });
    }
    return;
  }

  lastKey = k;
  await rpc.user.setActivity(activity);

  if (DEBUG_LOG) console.log("[RPC] updated", { verb, category, title });
}

/**
 * =========================
 *  Main
 * =========================
 */

async function main() {
  rpc.on("ready", () => {
    console.log("Discord RPC ready.");
    updatePresence().catch((e) => console.error("[updatePresence error]", e));
    setInterval(() => {
      updatePresence().catch((e) => console.error("[updatePresence error]", e));
    }, 2000);
  });

  console.log("Logging in RPC...");
  await rpc.login();
}

main().catch((e) => console.error("[main error]", e));

/**
 * =========================
 *  Debug Helpers (optional)
 * =========================
 */

function sniffImageType(buf: Buffer): string {
  if (buf.length >= 8 && buf.slice(0, 8).toString("hex") === "89504e470d0a1a0a") return "png";
  if (buf.length >= 3 && buf.slice(0, 3).toString("hex") === "ffd8ff") return "jpg";
  if (buf.length >= 4 && buf.slice(0, 4).toString("ascii") === "GIF8") return "gif";
  if (buf.length >= 12 && buf.slice(0, 4).toString("ascii") === "RIFF") return "webp";
  return "unknown";
}

async function debugFetchImage(url: string) {
  if (!url.startsWith("http")) return;

  try {
    const head = await fetch(url, { method: "HEAD" });
    console.log("[IconHEAD]", head.status, head.headers.get("content-type"));

    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    console.log("[IconGET]", sniffImageType(buf), buf.length, url);
  } catch (e) {
    console.log("[IconDebug] failed:", e);
  }
}