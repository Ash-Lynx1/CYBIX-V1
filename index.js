import { Telegraf } from "telegraf";
import config from "./config.js";
import { addUser, incrementCommands } from "./utils/database.js";

// Plugins
import menuCommand from "./plugins/menu.js";
import chatgptCommand from "./plugins/chatgpt.js";
import deepseekCommand from "./plugins/deepseek.js";
import blackboxCommand from "./plugins/blackbox.js";
import apkCommand from "./plugins/apk.js";
import playCommand from "./plugins/play.js";
import videoCommand from "./plugins/video.js";
import gitcloneCommand from "./plugins/gitclone.js";
import runtimeCommand from "./plugins/runtime.js";
import pingCommand from "./plugins/ping.js";
import developerCommand from "./plugins/developer.js";
import buybotCommand from "./plugins/buybot.js";
import repoCommand from "./plugins/repo.js";
import broadcastCommand from "./plugins/broadcast.js";
import staticsCommand from "./plugins/statics.js";
import modeCommand from "./plugins/mode.js";
import listUsersCommand from "./plugins/listusers.js";

if (!config.botToken) {
  throw new Error("BOT_TOKEN is missing. Please set it in your Render environment variables!");
}

const bot = new Telegraf(config.botToken);

bot.use(async (ctx, next) => {
  try {
    if (ctx.from && ctx.from.id) {
      addUser(ctx.from.id.toString());
    }
    if (ctx.message && ctx.message.text) {
      if (ctx.message.text.startsWith(".") || ctx.message.text.startsWith("/")) {
        incrementCommands();
      }
    }
  } catch (err) {
    console.error("Middleware error:", err.message);
  }
  return next();
});

// Load plugins
menuCommand(bot);
chatgptCommand(bot);
deepseekCommand(bot);
blackboxCommand(bot);
apkCommand(bot);
playCommand(bot);
videoCommand(bot);
gitcloneCommand(bot);
runtimeCommand(bot);
pingCommand(bot);
developerCommand(bot);
buybotCommand(bot);
repoCommand(bot);
broadcastCommand(bot);
staticsCommand(bot);
modeCommand(bot);
listUsersCommand(bot);

// Global error handling (no crashes)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});

bot.launch();
console.log("🤖 CYBIX V1 Bot is running...");

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));