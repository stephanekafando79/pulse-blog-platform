# ⚡ Pulse — Modern Publishing & Community Platform

A fast, lightweight, and responsive blog and content community platform built entirely with **modern native web standards** (HTML5, CSS Custom Properties, and Vanilla JavaScript).

**Zero build tools, zero dependencies, zero configuration required.**

---

## ✨ Features Included

1. **📰 Curated Story Feed & Featured Hero**
   - Responsive magazine-style grid with hero spotlight for top stories.
   - Filter by categories: *Technology*, *Design*, *AI & Engineering*, *Productivity*.
   - Filter by clickable tag pills (`#WebDev`, `#UIUX`, `#FutureOfWork`, etc.).
   - Sort stories by **Latest**, **Most Popular** (views + claps), or **Quick Reads**.

2. **🤖 Daily Story Auto-Writer & Publisher**
   - Autonomous daily story generator that creates date-stamped, publication-grade articles every morning.
   - Distinct themes, high-res Unsplash covers, rotating author personas, code examples, callouts, and initial comments.
   - Automatic integration with Windows Task Scheduler or background Python daemon.

3. **🔍 Instant Real-Time Search**
   - Instant search across story titles, excerpts, tags, and authors with debounced filtering.

4. **🌓 Dark / Light Theme Toggle**
   - One-click toggle in navigation with smooth color transitions.
   - Automatically detects OS preference (`prefers-color-scheme`) and persists choice in `localStorage`.

5. **✍️ Writing Studio & Markdown Editor**
   - Live side-by-side preview updating as you type.
   - Rich toolbar for headings, bold/italic, blockquotes, code blocks with copy button, callouts, lists, and links.
   - Cover image picker with instant preset themes (Code, Design, AI Art, Workspace).
   - Local autosave draft system with timestamp indicator.
   - One-click publishing that immediately inserts your story into the live feed.

6. **💬 Interactive Reader & Discussion Community**
   - Distraction-free typography and reading experience.
   - **Like / Applause Button** with animated counter.
   - **Bookmark / Save for Later** list.
   - **Web Speech Synthesis ("Listen")**: Built-in text-to-speech audio reader that reads articles aloud!
   - **Threaded Comments**: Post comments as the active user, upvote existing comments, and author badges.
   - Web Share API and one-click link copying.

7. **👤 User Profile & Account Switcher**
   - Pre-loaded with demo creators (*Alex Rivera*, *Elena Rostova*, *Marcus Chen*).
   - "Create New Profile" to write and comment under your own custom name and bio.
   - Persisted across sessions in browser storage.

---

## ⚡ Daily Automation & Auto-Publishing

### Option A: Windows Task Scheduler (Active & Set Up!)
The task `PulseDailyPublisher` is registered in Windows Task Scheduler to publish every morning at **08:00 AM**.

- **Run immediately on-demand:**
  ```powershell
  schtasks.exe /run /tn PulseDailyPublisher
  ```
- **Check schedule status:**
  ```powershell
  schtasks.exe /query /tn PulseDailyPublisher
  ```
- **One-click double-click:** Double-click `run_daily.bat`

### Option B: Background Automation Daemon
To run the web server and the internal timer together in a console window:
```powershell
python daily_runner.py
```
*(Or double-click `start_daemon.bat`)*

### Option C: Manual Publish Script
Generate and publish today's story directly at any time:
```powershell
python daily_writer.py --force
```

---

## 🚀 How to Run the Web App

### Option 1: Direct File Launch (No server required!)
Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- In PowerShell/CMD:
  ```powershell
  start index.html
  ```

### Option 2: Local Web Server
Run the local server script:
```powershell
python server.py
```
This automatically verifies today's daily story, starts the server at `http://localhost:8000`, and opens your default browser.

---

## 📁 Project Structure

```
pulse-blog-platform/
├── index.html            # Main application shell, semantic layout & dialog modals
├── daily_writer.py       # Autonomous daily article generator & publisher script
├── daily_runner.py       # Background daemon coordinating server + daily timer
├── setup_schedule.ps1    # PowerShell setup script for Windows Task Scheduler
├── run_daily.bat         # 1-click batch shortcut to trigger today's story
├── start_daemon.bat      # 1-click batch shortcut to start server + daemon
├── server.py             # Local web server script
├── data/
│   ├── articles.js       # Universal JS data feed (supports file:// and http://)
│   └── articles.json     # Standard JSON format feed
├── css/
│   └── styles.css        # CSS custom properties, responsive grid, reader typography
├── js/
│   ├── store.js          # LocalStorage state management, syncs daily articles
│   ├── editor.js         # Client-side Markdown parser, live preview & autosave
│   ├── ui.js             # Feed rendering, reader view, comments, theme & toasts
│   └── app.js            # SPA hash routing, search debounce & event listeners
└── README.md             # Documentation and guide
```

---

## 🛠️ Customization & Next Steps

- **Add More Daily Topics**: Expand the `TOPICS` list in [daily_writer.py](file:///C:/Users/Office/.gemini/antigravity/scratch/pulse-blog-platform/daily_writer.py) with your favorite subject areas.
- **Change Publish Time**: Re-run [setup_schedule.ps1](file:///C:/Users/Office/.gemini/antigravity/scratch/pulse-blog-platform/setup_schedule.ps1) with your preferred hour (e.g. `09:00 AM`).
- **AI Enhancement**: If you have a Google Gemini API key, you can set `GEMINI_API_KEY` in your environment, and `daily_writer.py` can produce AI-generated daily essays.
