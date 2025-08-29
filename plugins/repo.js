import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    const text = `📡 *Official Telegram Channel*\n\n${config.channels.telegram}`;
    try {
      await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(text, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("repo", run);
  bot.hears(/^[.。]repo\b/i, run);
}