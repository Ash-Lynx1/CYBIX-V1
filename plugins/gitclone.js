import { fetchJson, fetchBuffer } from "../utils/fetcher.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

export default function(bot) {
  const run = async (ctx, repoUrl) => {
    try {
      const api = `https://api.princetechn.com/api/download/gitclone?apikey=prince&url=${encodeURIComponent(repoUrl)}`;
      const data = await fetchJson(api);
      const zip = data?.result?.url || data?.url;
      const name = data?.result?.name || "repository";
      if (!zip) {
        return ctx.reply("⚠️ Could not fetch ZIP. Check the repo URL.", { reply_markup: brandKeyboard() });
      }
      const buf = await fetchBuffer(zip);
      if (buf) {
        try {
          return await ctx.replyWithDocument({ source: buf, filename: `${name}.zip` }, { reply_markup: brandKeyboard() });
        } catch {
          // fall back to link
        }
      }
      return ctx.replyWithPhoto(BANNER_URL, {
        caption: `📦 *Git Clone*\n\n*Name:* ${name}\n*Download:* ${zip}`,
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch (err) {
      await ctx.reply("❌ Error: Unable to fetch GitHub repo ZIP.", { reply_markup: brandKeyboard() });
      console.error("Gitclone plugin error:", err);
    }
  };
  
  bot.command("gitclone", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!q) return ctx.reply("❗ Usage: /gitclone https://github.com/user/repo", { reply_markup: brandKeyboard() });
    run(ctx, q);
  });
  bot.hears(/^[.。]gitclone\s+(.+)/i, async (ctx) => run(ctx, ctx.match[1].trim()));
}