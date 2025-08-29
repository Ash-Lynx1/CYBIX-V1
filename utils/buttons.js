import config from "../config.js";

export function brandKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "📢 WhatsApp Channel", url: config.channels.whatsapp },
        { text: "🚀 Telegram Channel", url: config.channels.telegram }
      ]
    ]
  };
}

export const BANNER_URL = config.banner;