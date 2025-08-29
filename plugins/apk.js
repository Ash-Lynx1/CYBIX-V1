import { fetchJson, fetchBuffer } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, query) => {
    const url = `https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(query)}`;
    const data = await fetchJson(url);
    
    const title = data?.result?.title || data?.title || query;
    const dl = data?.result?.download || data?.download || data?.url;
    if (!dl) {
      return ctx.reply("⚠️ Could not fetch APK. Try another query.", { reply_markup: brandKeyboard() });
    }
    
    // try direct file
    const buf = await fetchBuffer(dl);
    if (buf) {
      try {
        return await ctx.replyWithDocument({ source: buf, filename: `${title}.apk` }, { reply_markup: brandKeyboard() });
      } catch {
        // fall-through to link
      }
    }
    return ctx.replyWithPhoto(BANNER_URL, {
      caption: `📦 *APK Downloader*\n\n*Title:* ${title}\n*Download:* ${dl}`,
      parse_mode: "Markdown",
      reply_markup: brandKeyboard()
    });
  };
  
  bot.command("apk", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /apk app name", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  
  bot.hears(/^[.。]apk\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}