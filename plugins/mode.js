import { brandKeyboard, BANNER_URL } from "../utils/buttons.js";

let currentMode = "public"; // simple in-memory toggle

export default function(bot, { OWNER_ID }) {
  const run = async (ctx) => {
    if (ctx.from.id.toString() !== (OWNER_ID || "")) {
      return ctx.reply("🚫 Unauthorized.");
    }
    const arg = ctx.message.text.split(" ")[1]?.toLowerCase();
    if (arg === "public" || arg === "private") currentMode = arg;
    
    const text = `⚙️ *Mode:* ${currentMode.toUpperCase()}`;
    try {
      await ctx.replyWithPhoto(BANNER_URL, { caption: text, parse_mode: "Markdown", reply_markup: brandKeyboard() });
    } catch {
      await ctx.reply(text, { reply_markup: brandKeyboard() });
    }
  };
  
  bot.command("mode", run);
  bot.hears(/^[.。]mode(\s+(public|private))?$/i, run);
}