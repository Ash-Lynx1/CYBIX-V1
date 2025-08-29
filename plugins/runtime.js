import { formatUptime } from "../utils/uptime.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const send = async (ctx) => {
    const up = formatUptime(process.uptime());
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: `⏳ *Uptime:* ${up}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch {
      await ctx.reply(`⏳ Uptime: ${up}`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("runtime", send);
  bot.hears(/^[.。]runtime\b/i, send);
}