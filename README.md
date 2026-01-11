# Safari Discord RPC

A macOS tool that shows your current Safari browsing or video activity as Discord Rich Presence.

It detects the website you are viewing, classifies it as **Watching** (video platforms) or **Browsing** (forums, docs, etc.), and updates your Discord status automatically.

---

## 🧩 Description

Safari Discord RPC connects Safari with Discord Rich Presence.

It reads the active Safari tab using AppleScript, extracts the page URL and title, and then:
- Classifies the site (video platforms → Watching, forums/docs → Browsing).
- Displays the page title in your Discord status.
- Shows a matching site icon (configurable per domain).
- Updates automatically every few seconds.

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
  - **Watching** → YouTube, 動畫瘋.
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

## 🚀 Running the Project

To run Safari Discord RPC locally:
1. Clone the repository

   ```bash
   git clone https://github.com/HarlaownLY-Nijigasaki/Safari-Discord-RPC.git
   cd safari-discord-rpc
   ```

2. Install dependencies
  
   ```bash
   npm install
   ```

3. Create a .env file
  
   ```bash
   touch .env
   ```
   inside the .env file, type
    ```bash
   DISCORD_CLIENT_ID=your_discord_application_client_id
   ```

4. Run the script

   ```bash
   npx ts-node updateDiscord.ts
   ```

5.	Open Safari and browse or watch something — your Discord status should update automatically.
---

## 📈 What I Learned
- How to integrate AppleScript with Node.js to control macOS apps.
- How to use Discord Rich Presence without a bot or gateway connection.
- How to safely classify and match domains using wildcard patterns.
- How to build a configurable system that avoids hardcoding logic.

---

## 🔮 How can it be improved?

Possible future improvements:
- Support for other browsers (Chrome, Arc, Edge).
- Track video playback time on more platforms (not just YouTube).
- GUI for managing sites.json.
- Pause updates when Discord is not running.
- Smarter favicon extraction from the page itself.

---

## 📌 Notes
- Only works on macOS (uses AppleScript).
- Requires the Discord desktop app to be running.
- Uses public icon URLs — some hosts may rate-limit or block hotlinking.

---

## 🎬 Demo

Will be updated!!