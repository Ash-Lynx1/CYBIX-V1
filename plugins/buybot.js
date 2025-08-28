import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function buybotCommand(bot) {
  bot.hears(/^\.buybot$/i, async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: `🤖 *Buy CYBIX V1 Bot*\n\nWant to own this bot?\n\n💰 *Price:* Contact developer for details.\n📩 *Contact:* [@cybixdev](https://t.me/cybixdev)\n\n🔥 Get your own customized version today!`,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ BuyBot command error:", err.message);
      ctx.reply("⚠️ Failed to fetch buy info.");
    }
  });
}