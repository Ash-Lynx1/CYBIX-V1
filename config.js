// config.js
export default {
  botName: "𝐂𝐘𝐁𝐈𝐗 𝐕1",
  prefix: ".",
  owner: "t.me/cybixdev",
  
  // Numeric ID of the owner (for commands like broadcast, mode, listusers)
  OWNER_ID: process.env.OWNER_ID || "6524840104",
  
  channels: {
    whatsapp: "https://whatsapp.com/channel/0029VbB8svo65yD8WDtzwd0X",
    telegram: "https://t.me/cybixtech"
  },
  
  // Banner image for menu
  banner: "https://i.postimg.cc/L4NwW5WY/boykaxd.jpg",
  
  // Bot token is pulled from Render env variables
  botToken: process.env.BOT_TOKEN
};