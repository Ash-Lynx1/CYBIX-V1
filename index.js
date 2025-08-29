// index.js
import { Telegraf } from "telegraf";
import config from "./config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// Global error handlers
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

// Ensure bot token is set
if (!config.botToken) {
  console.error("❌ BOT_TOKEN is missing! Set it in Render Environment Variables.");
  process.exit(1);
}

const bot = new Telegraf(config.botToken);

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pluginsDir = path.join(__dirname, "plugins");

// Auto-load all plugins in /plugins
fs.readdirSync(pluginsDir).forEach(file => {
  if (file.endsWith(".js")) {
    import(path.join(pluginsDir, file)).then(plugin => {
      if (typeof plugin.default === "function") {
        try {
          plugin.default(bot, config);
          console.log(`✅ Plugin loaded: ${file}`);
        } catch (err) {
          console.error(`❌ Failed to load plugin ${file}:`, err);
        }
      }
    }).catch(err => {
      console.error(`❌ Error importing ${file}:`, err);
    });
  }
});

// Health check server for Render
const app = express();
app.get("/", (req, res) => res.send("🤖 CYBIX V1 Bot is alive"));
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🌐 Health check on :${PORT}`));

// Launch bot
bot.launch()
  .then(() => console.log("🤖 CYBIX V1 Bot is running..."))
  .catch(err => console.error("❌ Failed to launch bot:", err));

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));