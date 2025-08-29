// plugins/statics.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Markup } from "telegraf";
import config from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const dbPath = path.join(rootDir, "database", "stats.json");

function safeReadJSON(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function stackedBrandKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.url("📢 WhatsApp Channel", config.channels.whatsapp)],
    [Markup.button.url("🚀 Telegram Channel", config.channels.telegram)]
  ]);
}

function fmtUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  seconds -= d * 86400;
  const h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds - m * 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

export default function (bot, { OWNER_ID }) {
  const sendStats = async (ctx) => {
    try {
      // owner-only
      if (ctx.from?.id?.toString() !== (OWNER_ID || "")) {
        return ctx.reply("🚫 Unauthorized.");
      }

      const stats = safeReadJSON(dbPath, { users: [], totalMessages: 0, startedAt: Date.now() });
      const usersCount = Array.isArray(stats.users) ? stats.users.length : 0;
      const totalMessages = Number(stats.totalMessages || 0);
      const uptime = fmtUptime(process.uptime());

      const caption =
`📊 *Usage Statistics*
- Users: ${usersCount}
- Messages: ${totalMessages}
- Uptime: ${uptime}`;

      try {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption,
            parse_mode: "Markdown",
            ...stackedBrandKeyboard()
          }
        );
      } catch {
        await ctx.reply(caption, { parse_mode: "Markdown", ...stackedBrandKeyboard() });
      }
    } catch (err) {
      console.error("⚠️ statics error:", err.message);
      await ctx.reply("❌ Failed to fetch statistics.");
    }
  };

  // slash + dot styles
  bot.command("statics", sendStats);
  bot.hears(/^[.。]statics\b/i, sendStats);
}