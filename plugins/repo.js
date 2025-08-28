import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function repoCommand(bot) {
  bot.hears(/^\.repo$/i, async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: `📢 *CYBIX V1 Official Channel*\n\n🚀 Stay updated with the latest news, features, and releases.\n\n🔗 [Join Telegram Channel](https://t.me/cybixtech)`,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ Repo command error:", err.message);
      ctx.reply("⚠️ Failed to fetch channel link.");
    }
  });
}