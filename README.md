<p align="center">
  <img src="https://i.postimg.cc/L4NwW5WY/boykaxd.jpg" alt="CYBIX V1 Banner" width="600"/>
</p>

<h1 align="center"><span style="font-family: 'Fira Code', monospace;">CYBIX V1</span></h1>
<p align="center">
  <b>🚀 The Ultimate Telegram Bot Experience – Powerful, Professional, Error-Free. 🚀</b>
</p>
<p align="center">
  <img src="https://img.shields.io/github/license/Ash-Lynx1/CYBIX-V1?color=brightgreen&style=flat-square"/>
  <img src="https://img.shields.io/github/languages/top/Ash-Lynx1/CYBIX-V1?style=flat-square"/>
  <img src="https://img.shields.io/github/repo-size/Ash-Lynx1/CYBIX-V1?color=blueviolet&style=flat-square"/>
  <img src="https://img.shields.io/badge/Node.js-%3E=18.0-blue?logo=node.js&style=flat-square"/>
</p>

---

## 🔧 Installation

```sh
git clone https://github.com/Ash-Lynx1/CYBIX-V1.git
```

```sh
cd CYBIX-V1
```

```sh
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
BOT_TOKEN=your_bot_token_here   # Telegram Bot Token (from @BotFather)
OWNER_ID=your_telegram_user_id  # Your Telegram User ID
```

---

## 🚀 Running the Bot

**Start locally:**
```sh
npm start
```

**Development mode (auto-restart on changes):**
```sh
npm run dev
```

---

## ☁️ Deployment

### Termux

```sh
pkg update && pkg upgrade -y
```
```sh
pkg install nodejs git -y
```
```sh
git clone https://github.com/Ash-Lynx1/CYBIX-V1.git
```
```sh
cd CYBIX-V1
```
```sh
npm install
```
```sh
npm start
```

---

## 💡 How to Keep CYBIX V1 Running in the Background on Termux

**Option A: Using `nohup`**
```sh
nohup npm start > cybix.log 2>&1 &
```
*View logs:*
```sh
tail -f cybix.log
```

**Option B: Using `tmux`**
```sh
tmux new-session -s cybix
npm start
```
*Detach with:* `Ctrl+B` then `D`  
*Re-attach:*
```sh
tmux attach-session -t cybix
```

**Option C: Using `pm2` (Node.js Process Manager)**
```sh
npm install -g pm2
```
```sh
pm2 start index.js --name cybix
```
*View logs:*
```sh
pm2 logs cybix
```
*Restart if needed:*
```sh
pm2 restart cybix
```
*Stop bot:*
```sh
pm2 stop cybix
```

---

## 🛡️ Security

Only `BOT_TOKEN` and `OWNER_ID` are stored in `.env`.

No other API keys or sensitive data required.

All public APIs pre-integrated and safe to use.

---

## 🧩 Design Philosophy

CYBIX V1 is built to be:

- Stable → No crashes, no half-working commands.
- Scalable → Clean plugin system for easy expansion.
- Attractive → Stylish responses with banners and inline buttons.
- Professional → Proper error handling and crash protection.

---

## 📝 Example Commands

```sh
.menu
.chatgpt <your question>
.deepseek <your prompt>
.blackbox <your prompt>
.apk <app name>
.play <song name>
.video <youtube url>
.gitclone <github repo url>
.runtime
.ping
.developer
.buybot
.repo

# Owner/Dev only:
.broadcast <message>
.statics
.mode public|private
.listusers
```

---

## 👀 Live Typing Animation

> <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=25&duration=1800&pause=800&color=14FFEC&center=true&vCenter=true&width=500&lines=CYBIX+V1+-+Telegram's+Ultimate+Bot;Professional+%7C+Stable+%7C+Dope+UI;Zero+Crashes+%7C+100%25+Ready+For+Production;Feel+The+Power+Of+CYBIX+Now!"/>

---

## 📜 License

CYBIX V1 is licensed under the MIT License –  
Free to use, modify, and distribute.  
See [LICENSE](LICENSE) for details.

---

<p align="center">
  <b>Made with 💙 by <a href="https://github.com/Ash-Lynx1">Ash-Lynx1</a></b>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer"/>
</p>
