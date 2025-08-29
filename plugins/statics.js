// plugins/statics.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "database", "stats.json");

// Safe read + write helpers
function safeReadJSON(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function saveJSON(p, data) {
  try {
    fs.writeFileSync(p, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Failed to save JSON:", err.message);
  }
}

// Middleware: track users
export default function (bot) {
  bot.use(async (ctx, next) => {
    try {
      if (!ctx.from) return next();

      const stats = safeReadJSON(dbPath, { users: [] });
      const users = Array.isArray(stats.users) ? stats.users : [];

      if (!users.some(u => u.id === ctx.from.id)) {
        users.push({
          id: ctx.from.id,
          username: ctx.from.username || null,
          first_name: ctx.from.first_name || null,
          joined: new Date().toISOString()
        });
        saveJSON(dbPath, { users });
        console.log(`📊 New user added: ${ctx.from.id} (${ctx.from.username || "no username"})`);
      }
    } catch (err) {
      console.error("⚠️ Stats middleware error:", err.message);
    }

    return next();
  });

  // Command: show stats
  bot.command("statics", async (ctx) => {
    try {
      const stats = safeReadJSON(dbPath, { users: [] });
      const usersCount = Array.isArray(stats.users) ? stats.users.length : 0;

      await ctx.reply(
        `📊 *Bot Statistics*\n\n` +
        `👥 Users: ${usersCount}\n` +
        `🗂 Database: stats.json\n` +
        `⏰ Updated: ${new Date().toLocaleString()}`,
        { parse_mode: "Markdown" }
      );
    } catch (err) {
      console.error("❌ Error in statics command:", err.message);
      await ctx.reply("⚠️ Failed to load statistics.");
    }
  });
}