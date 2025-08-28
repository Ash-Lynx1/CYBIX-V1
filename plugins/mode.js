import config from "../config.js";

export default function modeCommand(bot) {
  bot.hears(/^\.mode\s+(public|private)$/i, async (ctx) => {
    try {
      if (ctx.from.id.toString() !== config.ownerId) {
        return ctx.reply("⛔ You are not authorized to use this command.");
      }
      
      const mode = ctx.match[1].toLowerCase();
      global.botMode = mode;
      
      ctx.reply(`⚡ Bot mode switched to *${mode.toUpperCase()}*`, {
        parse_mode: "Markdown",
      });
    } catch (err) {
      console.error("❌ Mode command error:", err.message);
      ctx.reply("⚠️ Failed to change mode.");
    }
  });
}