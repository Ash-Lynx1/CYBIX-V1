import config from "../config.js";
import { getStats } from "../utils/database.js";

export default function staticsCommand(bot) {
  bot.hears(/^\.statics$/i, async (ctx) => {
    try {
      if (ctx.from.id.toString() !== config.ownerId) {
        return ctx.reply("⛔ You are not authorized to use this command.");
      }

      const db = getStats();
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      ctx.reply(
        `📊 *CYBIX V1 Statistics*\n\n👥 *Users:* ${db.registeredUsers.length}\n📌 *Total Commands:* ${db.totalCommands}\n⏳ *Uptime:* ${hours}h ${minutes}m ${seconds}s\n⚡ *Mode:* ${global.botMode || "public"}`,
        { parse_mode: "Markdown" }
      );
    } catch (err) {
      console.error("❌ Statics command error:", err.message);
      ctx.reply("⚠️ Failed to fetch statistics.");
    }
  });
}