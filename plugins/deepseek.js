import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function deepseekCommand(bot) {
  bot.hears(/^\.deepseek\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.data) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `🧠 *DeepSeek Result*\n\n${res.data}`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );
      } else {
        ctx.reply("⚠️ No response from DeepSeek AI.");
      }
    } catch (err) {
      console.error("❌ DeepSeek command error:", err.message);
      ctx.reply("⚠️ Failed to fetch DeepSeek response.");
    }
  });
}