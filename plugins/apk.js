import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function apkCommand(bot) {
  bot.hears(/^\.apk\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.result && res.result.download) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `📦 *APK Downloader*\n\n*Name:* ${res.result.name}\n*Version:* ${res.result.version}\n\n⬇️ Downloading...`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );

        await ctx.replyWithDocument({ url: res.result.download, filename: `${res.result.name}.apk` });
      } else {
        ctx.reply("⚠️ APK not found or failed to fetch.");
      }
    } catch (err) {
      console.error("❌ APK command error:", err.message);
      ctx.reply("⚠️ Failed to download APK.");
    }
  });
}