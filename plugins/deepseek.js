import { fetchJson } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, q) => {
    const url = `https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(q)}`;
    const data = await fetchJson(url);
    const text = data?.result || data?.answer || data?.message || "No response.";
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: `🧠 *Deepseek*\n\n${text}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch {
      await ctx.reply(`🧠 Deepseek\n\n${text}`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("deepseek", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /deepseek your prompt", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  
  bot.hears(/^[.。]deepseek\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}