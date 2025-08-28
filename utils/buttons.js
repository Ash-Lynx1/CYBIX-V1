import { Markup } from "telegraf";
import config from "../config.js";

/**
 * Generate default inline buttons
 * @returns {Markup}
 */
export function defaultButtons() {
  return Markup.inlineKeyboard([
    [Markup.button.url("📢 WhatsApp Channel", config.channels.whatsapp)],
    [Markup.button.url("🚀 Telegram Channel", config.channels.telegram)]
  ]);
}