import { fetchJson } from "../utils/fetcher.js";
import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function gitcloneCommand(bot) {
  bot.hears(/^\.gitclone\s+(.+)/i, async (ctx) => {
    try {
      const repoUrl = ctx.match[1];
      const url = `https://api.princetechn.com/api/download/gitclone?apikey=prince&url=${encodeURIComponent(repoUrl)}`;
      const res = await fetchJson(url);

      if (res && res.result && res.result.download_url) {
        await ctx.replyWithPhoto(
          { url: config.banner },
          {
            caption: `📂 *GitHub Repo Cloner*\n\n*Repo:* ${res.result.repo_name || "Unknown"}\n\n⬇️ Downloading...`,
            parse_mode: "Markdown",
            ...defaultButtons()
          }
        );

        await ctx.replyWithDocument({
          url: res.result.download_url,
          filename: `${res.result.repo_name || "repo"}.zip`,
        });
      } else {
        ctx.reply("⚠️ Repository not found or failed to fetch.");
      }
    } catch (err) {
      console.error("❌ GitClone command error:", err.message);
      ctx.reply("⚠️ Failed to clone repository.");
    }
  });
}