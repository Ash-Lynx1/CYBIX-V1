import { fetchJson } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, q) => {
    const url = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(q)}`;
    const data = await fetchJson(url);
    const text = data?.result || data?.answer || data?.message || "No response.";
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: `💬 *ChatGPT*\n\n${text}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch {
      await ctx.reply(`💬 ChatGPT\n\n${text}`, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("chatgpt", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /chatgpt your question", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  
  bot.hears(/^[.。]chatgpt\s+(.+)/i, async (ctx) => {
    const q = ctx.match[1].trim();
    run(ctx, q);
  });
}