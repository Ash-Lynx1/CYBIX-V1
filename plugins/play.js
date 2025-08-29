import { fetchJson, fetchBuffer } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, query) => {
    const url = `https://apis.davidcyriltech.my.id/song?query=${encodeURIComponent(query)}`;
    const data = await fetchJson(url);
    const title = data?.title || data?.result?.title || query;
    const audio = data?.result?.url || data?.url;
    
    if (!audio) {
      return ctx.reply("⚠️ Could not fetch song. Try another query.", { reply_markup: brandKeyboard() });
    }
    
    const buf = await fetchBuffer(audio);
    if (buf) {
      try {
        return await ctx.replyWithAudio({ source: buf, filename: `${title}.mp3` }, { reply_markup: brandKeyboard() });
      } catch {
        // fallback to link
      }
    }
    return ctx.replyWithPhoto(BANNER_URL, {
      caption: `🎵 *Play*\n\n*Title:* ${title}\n*Download:* ${audio}`,
      parse_mode: "Markdown",
      reply_markup: brandKeyboard()
    });
  };
  
  bot.command("play", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /play song name", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  
  bot.hears(/^[.。]play\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}