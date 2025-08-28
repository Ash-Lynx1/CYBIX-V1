import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function developerCommand(bot) {
  bot.hears(/^\.developer$/i, async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: `👨‍💻 *Developer Info*\n\n▫️ *Name:* CYBIX Developer\n▫️ *Telegram:* [@cybixdev](https://t.me/cybixdev)\n\n⚡ Powered by *CYBIX TECH*`,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ Developer command error:", err.message);
      ctx.reply("⚠️ Failed to fetch developer info.");
    }
  });
}