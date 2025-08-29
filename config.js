// config.js
import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN || "";
export const OWNER_ID = process.env.OWNER_ID || "";

const config = {
  botName: "𝐂𝐘𝐁𝐈𝐗 𝐕1",
  prefix: ".",
  owner: "t.me/cybixdev",
  channels: {
    whatsapp: "https://whatsapp.com/channel/0029VbB8svo65yD8WDtzwd0X",
    telegram: "https://t.me/cybixtech"
  },
  banner: "https://i.postimg.cc/L4NwW5WY/boykaxd.jpg",
  botToken: BOT_TOKEN
};

export default config;