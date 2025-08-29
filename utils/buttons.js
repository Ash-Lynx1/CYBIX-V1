// utils/buttons.js
import config from "../config.js";
export const BANNER_URL = config.banner;

export function brandKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "Official Channel", url: config.channels.telegram },
        { text: "Buy Bot", url: "https://t.me/cybixdev" }
      ]
    ]
  };
}