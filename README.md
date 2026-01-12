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

## 📸 Preview

![Preview](https://private-user-images.githubusercontent.com/110438989/534549716-ed4b5b3b-7de3-46f6-ad5b-39792823ecdf.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjgyMTc3NTEsIm5iZiI6MTc2ODIxNzQ1MSwicGF0aCI6Ii8xMTA0Mzg5ODkvNTM0NTQ5NzE2LWVkNGI1YjNiLTdkZTMtNDZmNi1hZDViLTM5NzkyODIzZWNkZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDExMlQxMTMwNTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ZjdmNjAwMjlhNzRlYzNjNDQ1YjQwMGM2OTA3NmY5NzZhMzE2MjViMDRjNjU0ZmRhZTRlY2YyOWIzZThiZTk1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.AD01uwZtGtA1QDAFYkz5X0uY-AyzSSdtRZM-PiK6SkM)
![Preview](https://private-user-images.githubusercontent.com/110438989/534549722-97bf798d-c83b-4399-97c3-61686ca54225.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjgyMTc4NDEsIm5iZiI6MTc2ODIxNzU0MSwicGF0aCI6Ii8xMTA0Mzg5ODkvNTM0NTQ5NzIyLTk3YmY3OThkLWM4M2ItNDM5OS05N2MzLTYxNjg2Y2E1NDIyNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDExMlQxMTMyMjFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04ZmJmNWU1MGE3YWE0YWJjNmY5MGM5MTQxZmI1Njg0YmVhNzQ1MmQ4YjYwNGIzOGU5YmJhOGYxODI2NDc1YTkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.48jwkgiyYMNokIA5JZu7cdVVQbjahIOLAYWQCvL_SAc)

> Example of Safari Discord RPC showing "Watching" and "Browsing" states.

---

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

   then 
   ```bash
   nano .env
   ```
   inside the .env file, type
    ```bash
    DISCORD_CLIENT_ID=your_discord_application_client_id
    ```

   then
   ```bash
   Ctrl + 0
   Ctrl + X
   Press Y 
   Press Tab
   ```

4. Run the script

   ```bash
   npx ts-node updateDiscord.ts
   ```

5.	Open Safari and browse or watch something — your Discord status should update automatically.
---

## 🔒 macOS Permission

- This app uses AppleScript to read the active Safari tab and (on some sites) execute JavaScript to extract page details.

Please ensure:

   ```bash
   - Safari → Settings → Advanced → Show features for web Developers
   ```

   ```bash
   - Safari → Settings → Developer → Allow JavaScript from Apple Events (must be ON)
   ```
   
   

If JavaScript is disabled in Safari, the app will not be able to read page information correctly.

- On first run, macOS will ask for permission to allow Terminal (or Node.js) to control Safari via AppleScript.  
Please click **Allow**, otherwise the app cannot read the active Safari tab.

If you accidentally deny it, you can re-enable it at:
   
   ```bash
   System Settings → Privacy & Security → Automation → enable Terminal → Safari
   ```


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
- Only works on macOS (Tested machine: MacOS 26).
- Requires the Discord desktop app to be running.
- Uses public icon URLs — some hosts may rate-limit or block hotlinking.

---

## 🎬 Demo

Will be updated!!!