import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    try {
      const text = `📡 *Official Telegram Channel*\n\n${config.channels.telegram}`;
      try {
        await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
      } catch {
        await ctx.reply(text, { reply_markup: brandKeyboard() });
      }
    } catch (err) {
      await ctx.reply("❌ Error: Unable to send repo info.", { reply_markup: brandKeyboard() });
      console.error("Repo plugin error:", err);
    }
  };
  
  bot.command("repo", run);
  bot.hears(/^[.。]repo\b/i, run);
}