// plugins/menu.js
import { Markup } from "telegraf";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const dbPath = path.join(rootDir, "database", "stats.json");
const pluginsDir = path.join(rootDir, "plugins");

// Safely read JSON
function safeReadJSON(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

// Count .js plugins
function countPlugins() {
  try {
    return fs.readdirSync(pluginsDir).filter(f => f.endsWith(".js")).length;
  } catch {
    return 0;
  }
}

// Build menu caption
function menuCaption(username = "user") {
  const stats = safeReadJSON(dbPath, { users: [] });
  const usersCount = Array.isArray(stats.users) ? stats.users.length : 0;
  const pluginsCount = countPlugins();

  return (
`╭━━━━━【${config.botName}】━━━━━━
┃ hi @${username}, welcome to (${config.botName}), enjoy..!
┣━[ users: ${usersCount}
┣━[ prefix: ${config.prefix}
┣━[ plugins: ${pluginsCount}
┣━[ owner: ${config.owner}
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━【MENU 】━━━━━━━
┣━[ AI MENU
┃ .chatgpt
┃ .deepseek
┃ .blackbox
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ DOWNLOAD
┃ .apk
┃ .play
┃ .video
┃ .gitclone
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ OTHER MENU
┃ .runtime
┃ .ping
┃ .developer
┃ .buybot
┃ .repo
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ DEVELOPER
┃ .broadcast
┃ .statics
┃ .mode
┃ .listusers
╰━━━━━━━━━━━━━━━━━━━━━

▣ powered by **CYBIX TECH** 👹💀`).trim();
}

// Stacked buttons under banner
function stackedBrandKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.url("📢 WhatsApp Channel", config.channels.whatsapp)],
    [Markup.button.url("🚀 Telegram Channel", config.channels.telegram)]
  ]);
}

export default function (bot) {
  const sendMenu = async (ctx) => {
    const username = ctx.from?.username || "user";
    const caption = menuCaption(username);

    try {
      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption,
          parse_mode: "Markdown",
          reply_markup: stackedBrandKeyboard().reply_markup
        }
      );
    } catch (err) {
      console.error("❌ Error sending menu:", err.message);
      await ctx.reply(caption, {
        parse_mode: "Markdown",
        reply_markup: stackedBrandKeyboard().reply_markup
      });
    }
  };

  // Commands
  bot.start(sendMenu);
  bot.command("menu", sendMenu);
  bot.hears(/^[.。]menu\b/i, sendMenu);
}