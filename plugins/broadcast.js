import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statsPath = path.join(__dirname, "..", "database", "stats.json");

function readUsers() {
  try {
    const data = JSON.parse(fs.readFileSync(statsPath, "utf8"));
    return Array.isArray(data.users) ? data.users : [];
  } catch {
    return [];
  }
}

export default function(bot, { OWNER_ID }) {
  const run = async (ctx) => {
    if (ctx.from.id.toString() !== (OWNER_ID || "")) {
      return ctx.reply("🚫 You are not authorized to use this command.");
    }
    const text = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!text) return ctx.reply("❗ Usage: /broadcast your message");
    
    const users = readUsers();
    let ok = 0;
    for (const uid of users) {
      try {
        await ctx.telegram.sendMessage(uid, `📢 Broadcast:\n\n${text}`, { reply_markup: brandKeyboard() });
        ok++;
      } catch {}
    }
    
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: `✅ Broadcast sent to ${ok}/${users.length} users.`,
        reply_markup: brandKeyboard()
      });
    } catch {
      await ctx.reply(`✅ Broadcast sent to ${ok}/${users.length} users.`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("broadcast", run);
  bot.hears(/^[.。]broadcast\s+(.+)/i, run);
}