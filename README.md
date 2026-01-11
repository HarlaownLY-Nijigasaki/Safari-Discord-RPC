# Safari Discord RPC

A macOS tool that shows your current Safari browsing or video activity as Discord Rich Presence.

It detects the website you are viewing, classifies it as **Watching** (video platforms) or **Browsing** (forums, docs, etc.), and updates your Discord status automatically.

---

🧩 Description

Safari Discord RPC connects Safari with Discord Rich Presence.

It reads the active Safari tab using AppleScript, extracts the page URL and title, and then:
	•	Classifies the site (video platforms → Watching, forums/docs → Browsing).
	•	Displays the page title in your Discord status.
	•	Shows a matching site icon (configurable per domain).
	•	Updates automatically every few seconds.

This project is focused on functionality and transparency — everything runs locally and can be customized via sites.json.

---

## ⚙️ Technologies / 📦 Requirements
	•	Node.js (18+)
	•	TypeScript
	•	AppleScript (via osascript)
	•	Discord Rich Presence (@xhayper/discord-rpc)
	•	dotenv (for environment configuration)

---

## ✨ Features

- Detect the currently active Safari tab (URL + title).
- Classifies sites into:
  - **Watching** → YouTube, 動畫瘋, etc.
  - **Browsing** → Reddit, StackOverflow, StackExchange, etc.
- Displays:
  - Activity type (Watching / Browsing)
  - Page title
  - Matching site icon

- Fully configurable via `sites.json`
  - Add/remove platforms
	- Assign custom icons per domain

- Debug logging mode for development and troubleshooting.
- Works entirely locally on macOS ( no cloud services, no tracking.)

---

## 📦 Requirements

- macOS
- Node.js 18+
- Safari
- Discord desktop app

---