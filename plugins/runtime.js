import { getUptime } from "../utils/uptime.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function runtimeCommand(bot) {
  bot.hears(/^\.runtime$/i, async (ctx) => {
    try {
      const uptime = getUptime();

      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: `⏳ *Bot Uptime*\n\n${uptime}`,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ Runtime command error:", err.message);
      ctx.reply("⚠️ Failed to fetch uptime.");
    }
  });
}