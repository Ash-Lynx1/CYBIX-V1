import { fetchJson } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, q) => {
    const url = `https://apis.davidcyriltech.my.id/blackbox?q=${encodeURIComponent(q)}`;
    const data = await fetchJson(url);
    const text = data?.result || data?.answer || data?.message || "No response.";
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: `🧩 *Blackbox*\n\n${text}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch {
      await ctx.reply(`🧩 Blackbox\n\n${text}`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("blackbox", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /blackbox your prompt", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  
  bot.hears(/^[.。]blackbox\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}