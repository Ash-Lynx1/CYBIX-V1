import config from "../config.js";
import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

const menuCaption = (username = "user") => `
╭━━━━━【${config.botName}】━━━━━━
┃ hi @${username} welcome to ${config.botName}, enjoy..!
┣━[ users: 
┣━[ prefix: ${config.prefix}
┣━[ plugins:
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

▣ powered by *CYBIX TECH* 👹💀
`.trim();

export default function(bot) {
  const sendMenu = async (ctx) => {
    try {
      await ctx.replyWithPhoto(BANNER_URL, {
        caption: menuCaption(ctx.from?.username || "user"),
        parse_mode: "Markdown",
        reply_markup: brandKeyboard()
      });
    } catch (e) {
      await ctx.reply(menuCaption(ctx.from?.username || "user"), {
        reply_markup: brandKeyboard()
      });
    }
  };
  
  bot.start(sendMenu);
  bot.command("menu", sendMenu);
  bot.hears(/^[.。]menu\b/i, sendMenu);
}