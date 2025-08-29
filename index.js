// index.js
import { Telegraf } from "telegraf";
import config, { BOT_TOKEN, OWNER_ID } from "./config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing! Set it in environment variables.");
  process.exit(1);
}

// --- Init bot ---
const bot = new Telegraf(BOT_TOKEN);

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pluginsDir = path.join(__dirname, "plugins");
const dbDir = path.join(__dirname, "database");
const statsPath = path.join(dbDir, "stats.json");

// --- Ensure database file exists ---
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
if (!fs.existsSync(statsPath)) {
  fs.writeFileSync(statsPath, JSON.stringify({ users: [], totalMessages: 0, startedAt: Date.now() }, null, 2));
}

// --- Safe read/write helpers ---
const readStats = () => {
  try {
    return JSON.parse(fs.readFileSync(statsPath, "utf8"));
  } catch {
    return { users: [], totalMessages: 0, startedAt: Date.now() };
  }
};

const writeStats = (data) => {
  try {
    fs.writeFileSync(statsPath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("❌ Failed writing stats.json:", e.message);
  }
};

// --- Global middleware: track users & guard non-text updates ---
bot.use(async (ctx, next) => {
  try {
    const s = readStats();
    s.totalMessages += 1;
    
    const uid = ctx.from?.id;
    if (uid && !s.users.includes(uid)) {
      s.users.push(uid);
    }
    
    writeStats(s);
  } catch (e) {
    console.error("⚠️ Stats middleware error:", e.message);
  }
  
  // Only pass text messages to command handlers; everything else is ignored gracefully
  if (ctx.message?.text) return next();
});

// --- Auto-load plugins (each plugin registers handlers via bot.* APIs) ---
fs.readdirSync(pluginsDir).forEach((file) => {
  if (file.endsWith(".js")) {
    import(path.join(pluginsDir, file))
      .then((plugin) => {
        if (typeof plugin.default === "function") {
          plugin.default(bot, { config, OWNER_ID });
          console.log(`✅ Plugin loaded: ${file}`);
        } else {
          console.warn(`⚠️ Plugin ${file} has no default export function.`);
        }
      })
      .catch((err) => console.error(`❌ Failed to load plugin ${file}:`, err.message));
  }
});

// --- Health check for Render ---
const app = express();
app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`
    <h2>🤖 ${config.botName} is alive!</h2>
    <p><b>Owner:</b> ${config.owner}</p>
    <p><b>Telegram:</b> <a href="${config.channels.telegram}" target="_blank">${config.channels.telegram}</a></p>
    <p><b>WhatsApp:</b> <a href="${config.channels.whatsapp}" target="_blank">${config.channels.whatsapp}</a></p>
    <img src="${config.banner}" alt="Banner" width="320" />
  `);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Health check on :${PORT}`));

// --- Launch bot ---
bot.launch()
  .then(() => console.log(`🤖 ${config.botName} is running...`))
  .catch((err) => console.error("❌ Failed to launch bot:", err));

// --- Graceful shutdown ---
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));