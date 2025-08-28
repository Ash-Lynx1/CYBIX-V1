import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function pingCommand(bot) {
  bot.hears(/^\.ping$/i, async (ctx) => {
    try {
      const start = Date.now();
      await ctx.reply("🏓 Pinging...");
      const end = Date.now();
      const ms = end - start;

      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: `🏓 *Pong!*\n\nResponse time: *${ms}ms*`,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ Ping command error:", err.message);
      ctx.reply("⚠️ Failed to fetch ping.");
    }
  });
}