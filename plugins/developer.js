import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    const text = `👨‍💻 *Developer*\n\n${config.owner}`;
    try {
      await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(text, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("developer", run);
  bot.hears(/^[.。]developer\b/i, run);
}