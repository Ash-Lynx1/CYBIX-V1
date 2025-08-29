import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    const text = `🤖 *Buy This Bot*\n\nContact: ${config.owner}`;
    try {
      await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(text, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("buybot", run);
  bot.hears(/^[.。]buybot\b/i, run);
}