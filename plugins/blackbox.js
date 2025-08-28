import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function blackboxCommand(bot) {
  bot.hears(/^\.blackbox\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/blackbox?q=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.data) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `💻 *Blackbox Result*\n\n${res.data}`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );
      } else {
        ctx.reply("⚠️ No response from Blackbox API.");
      }
    } catch (err) {
      console.error("❌ Blackbox command error:", err.message);
      ctx.reply("⚠️ Failed to fetch Blackbox response.");
    }
  });
}