import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function videoCommand(bot) {
  bot.hears(/^\.video\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.result && res.result.url) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `🎬 *YouTube Video Downloader*\n\n*Title:* ${res.result.title}\n*Quality:* ${res.result.quality || "Unknown"}\n\n⬇️ Downloading...`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );

        await ctx.replyWithVideo({ url: res.result.url, filename: `${res.result.title}.mp4` });
      } else {
        ctx.reply("⚠️ Video not found or failed to fetch.");
      }
    } catch (err) {
      console.error("❌ Video command error:", err.message);
      ctx.reply("⚠️ Failed to download video.");
    }
  });
}