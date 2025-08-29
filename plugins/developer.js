import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    try {
      const text = `👨‍💻 *Developer*\n\n${config.owner}`;
      try {
        await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
      } catch {
        await ctx.reply(text, { reply_markup: brandKeyboard() });
      }
    } catch (err) {
      await ctx.reply("❌ Error: Unable to send developer info.", { reply_markup: brandKeyboard() });
      console.error("Developer plugin error:", err);
    }
  };
  
  bot.command("developer", run);
  bot.hears(/^[.。]developer\b/i, run);
}