import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statsPath = path.join(__dirname, "..", "database", "stats.json");

export default function(bot, { OWNER_ID }) {
  const run = async (ctx) => {
    if (ctx.from.id.toString() !== (OWNER_ID || "")) {
      return ctx.reply("🚫 Unauthorized.");
    }
    try {
      const data = JSON.parse(fs.readFileSync(statsPath, "utf8"));
      await ctx.reply(`👥 Users (${data.users.length}):\n${data.users.join(", ") || "No users yet."}`);
    } catch {
      await ctx.reply("❌ Could not read user database.");
    }
  };
  
  bot.command("listusers", run);
  bot.hears(/^[.。]listusers\b/i, run);
}