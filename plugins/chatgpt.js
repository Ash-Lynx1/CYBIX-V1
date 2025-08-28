import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function chatgptCommand(bot) {
  bot.hears(/^\.chatgpt\s+(.+)/i, async (ctx) => {
    try {
      const query = ctx.match[1];
      const url = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(query)}`;
      const res = await fetchJson(url);

      if (res && res.data) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `🤖 *ChatGPT Result*\n\n${res.data}`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );
      } else {
        ctx.reply("⚠️ No response from ChatGPT API.");
      }
    } catch (err) {
      console.error("❌ ChatGPT command error:", err.message);
      ctx.reply("⚠️ Failed to fetch ChatGPT response.");
    }
  });
}