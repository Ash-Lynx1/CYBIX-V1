import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing! Set it in Render Environment Variables.");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Auto-load plugins from ./plugins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pluginsDir = path.join(__dirname, "plugins");

fs.readdirSync(pluginsDir).forEach(file => {
  if (file.endsWith(".js")) {
    import(path.join(pluginsDir, file)).then(plugin => {
      if (typeof plugin.default === "function") {
        bot.on("message", async (ctx, next) => {
          try {
            if (ctx.message?.text) {
              await plugin.default(ctx, next);
            } else {
              return next();
            }
          } catch (err) {
            console.error(`❌ Error in plugin ${file}:`, err.message);
          }
        });
      }
    });
  }
});

// Health check server for Render
const app = express();
app.get("/", (req, res) => res.send("🤖 CYBIX V1 Bot is alive"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Health check running on port ${PORT}`));

bot.launch()
  .then(() => console.log("🤖 CYBIX V1 Bot is running..."))
  .catch(err => console.error("❌ Failed to launch bot:", err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
