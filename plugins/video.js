import { fetchJson, fetchBuffer } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, url) => {
    try {
      const api = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(url)}`;
      const data = await fetchJson(api);
      const title = data?.title || data?.result?.title || "video";
      const link = data?.result?.url || data?.url;
      if (!link) {
        return ctx.reply("⚠️ Could not fetch MP4. Check the URL.", { reply_markup: brandKeyboard() });
      }
      const buf = await fetchBuffer(link);
      if (buf) {
        try {
          return await ctx.replyWithVideo({ source: buf, filename: `${title}.mp4` }, { reply_markup: brandKeyboard() });
        } catch {
          // fallback to link
        }
      }
      return ctx.replyWithPhoto(BANNER_URL, {
        caption: `🎬 *Video*\n\n*Title:* ${title}\n*Download:* ${link}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch (err) {
      await ctx.reply("❌ Error: Unable to fetch video.", { reply_markup: brandKeyboard() });
      console.error("Video plugin error:", err);
    }
  };
  
  bot.command("video", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /video <youtube url>", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  bot.hears(/^[.。]video\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}