import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function playCommand(bot) {
  bot.hears(/^\.play\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/song?query=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.result && res.result.url) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `🎵 *Music Downloader*\n\n*Title:* ${res.result.title}\n*Artist:* ${res.result.artist || "Unknown"}\n\n⬇️ Downloading...`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );

        await ctx.replyWithAudio({ url: res.result.url, filename: `${res.result.title}.mp3` });
      } else {
        ctx.reply("⚠️ Music not found or failed to fetch.");
      }
    } catch (err) {
      console.error("❌ Play command error:", err.message);
      ctx.reply("⚠️ Failed to download music.");
    }
  });
}