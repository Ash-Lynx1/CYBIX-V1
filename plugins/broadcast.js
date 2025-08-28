import config from "../config.js";

export default function broadcastCommand(bot) {
  bot.hears(/^\.broadcast\s+([\s\S]+)/i, async (ctx) => {
    try {
      if (ctx.from.id.toString() !== config.ownerId) {
        return ctx.reply("⛔ You are not authorized to use this command.");
      }
      
      const message = ctx.match[1];
      const chatIds = global.registeredUsers || [];
      
      if (!chatIds.length) {
        return ctx.reply("⚠️ No registered users found.");
      }
      
      let success = 0;
      for (const id of chatIds) {
        try {
          await bot.telegram.sendMessage(id, `📢 *Broadcast Message:*\n\n${message}`, {
            parse_mode: "Markdown",
          });
          success++;
        } catch (e) {
          console.error("❌ Failed to send broadcast to:", id);
        }
      }
      
      ctx.reply(`✅ Broadcast sent to *${success}* users.`);
    } catch (err) {
      console.error("❌ Broadcast command error:", err.message);
      ctx.reply("⚠️ Failed to send broadcast.");
    }
  });
}