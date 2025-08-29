import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx) => {
    const t0 = Date.now();
    const sent = await ctx.reply("🏓 Pinging...");
    const ms = Date.now() - t0;
    try {
      await ctx.telegram.editMessageText(ctx.chat.id, sent.message_id, null, `🏓 Pong: ${ms}ms`);
      await ctx.replyWithPhoto(BANNER_URL, { caption: `Latency: ${ms}ms`, reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(`🏓 Pong: ${ms}ms`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("ping", run);
  bot.hears(/^[.。]ping\b/i, run);
}