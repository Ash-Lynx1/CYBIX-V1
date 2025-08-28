import config from "../config.js";
import { listUsers } from "../utils/database.js";

export default function listUsersCommand(bot) {
  bot.hears(/^\.listusers$/i, async (ctx) => {
    try {
      if (ctx.from.id.toString() !== config.ownerId) {
        return ctx.reply("⛔ You are not authorized to use this command.");
      }
      
      const users = listUsers();
      
      if (!users.length) {
        return ctx.reply("⚠️ No users registered yet.");
      }
      
      let list = users.map((id, index) => `${index + 1}. \`${id}\``).join("\n");
      
      ctx.replyWithMarkdown(`👥 *Registered Users:*\n\n${list}`);
    } catch (err) {
      console.error("❌ ListUsers command error:", err.message);
      ctx.reply("⚠️ Failed to fetch user list.");
    }
  });
}