import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statsPath = path.join(__dirname, "..", "database", "stats.json");

const readStats = () => {
  try {
    return JSON.parse(fs.readFileSync(statsPath, "utf8"));
  } catch {
    return { users: [], totalMessages: 0, startedAt: Date.now() };
  }
};

export default function(bot, { OWNER_ID }) {
  const run = async (ctx) => {
    if (ctx.from.id.toString() !== (OWNER_ID || "")) {
      return ctx.reply("🚫 Unauthorized.");
    }
    const s = readStats();
    const text = `📊 *Usage Statistics*\n\nUsers: ${s.users.length}\nMessages: ${s.totalMessages}`;
    try {
      await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(text, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("statics", run);
  bot.hears(/^[.。]statics\b/i, run);
}