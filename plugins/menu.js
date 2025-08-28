import config from "../config.js";
import { defaultButtons } from "../utils/buttons.js";

export default function menuCommand(bot) {
  bot.command("menu", async (ctx) => {
    try {
      const user = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;

      const menuText = `
╭━━━━━【${config.botName}】━━━━━━
┃ hi ${user}, welcome to ${config.botName}, enjoy..!
┣━[ users: dynamic
┣━[ prefix: ${config.prefix}
┣━[ plugins: ${bot ? "active" : "none"}
┣━[ owner: ${config.owner}
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━【MENU 】━━━━━━━
┣━[ AI MENU
┃ .chatgpt
┃ .deepseek
┃ .blackbox
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ DOWNLOAD
┃ .apk
┃ .play
┃ .video
┃ .gitclone
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ OTHER MENU
┃ .runtime
┃ .ping
┃ .developer
┃ .buybot
┃ .repo
┃ .developer
╰━━━━━━━━━━━━━━━━━━━━━
┣━[ DEVELOPER
┃ .broadcast
┃ .statics
┃ .mode
┃ .listusers
╰━━━━━━━━━━━━━━━━━━━━━

▣ powered by **CYBIX TECH** 👹💀
`;

      await ctx.replyWithPhoto(
        { url: config.banner },
        {
          caption: menuText,
          parse_mode: "Markdown",
          ...defaultButtons()
        }
      );
    } catch (err) {
      console.error("❌ Menu command error:", err.message);
      ctx.reply("⚠️ Failed to load menu. Try again.");
    }
  });
}