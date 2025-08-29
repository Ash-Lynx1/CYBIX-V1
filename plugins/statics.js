// plugins/statics.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, "..", "database");
const DB_FILE = path.join(DB_DIR, "stats.json");
const OWNER_ID = process.env.OWNER_ID ? String(process.env.OWNER_ID) : null;

// --- Safe FS helpers ---------------------------------------------------------
function ensureDb() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
      const seed = {
        messages: 0,
        users: [], // array of { id, username, first_name, last_name, first_seen, last_seen, count }
        chats: [], // array of { id, type, title, first_seen, last_seen, count }
        lastUpdated: new Date().toISOString(),
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
    }
  } catch (e) {
    console.error("⚠️ Failed to initialize stats DB:", e.message);
  }
}

function safeLoad() {
  try {
    ensureDb();
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    if (typeof data !== "object" || data === null) throw new Error("invalid db");
    // Normalize shape in case an older schema exists
    if (!Array.isArray(data.users)) data.users = [];
    if (!Array.isArray(data.chats)) data.chats = [];
    if (typeof data.messages !== "number") data.messages = 0;
    if (!data.lastUpdated) data.lastUpdated = new Date().toISOString();
    return data;
  } catch (e) {
    console.error("⚠️ Corrupt or missing stats DB, resetting:", e.message);
    const reset = {
      messages: 0,
      users: [],
      chats: [],
      lastUpdated: new Date().toISOString(),
    };
    try { fs.writeFileSync(DB_FILE, JSON.stringify(reset, null, 2)); } catch {}
    return reset;
  }
}

function safeSave(data) {
  try {
    // Write atomically to avoid partial writes on crashes
    const tmp = DB_FILE + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.renameSync(tmp, DB_FILE);
  } catch (e) {
    console.error("⚠️ Failed to save stats DB:", e.message);
  }
}

// --- Update helpers ----------------------------------------------------------
function upsertById(arr, id, create) {
  const idx = arr.findIndex((x) => String(x.id) === String(id));
  if (idx === -1) {
    const obj = create();
    arr.push(obj);
    return obj;
  }
  return arr[idx];
}

function updateUser(stats, from) {
  if (!from) return;
  const user = upsertById(stats.users, from.id, () => ({
    id: from.id,
    username: from.username ?? null,
    first_name: from.first_name ?? null,
    last_name: from.last_name ?? null,
    first_seen: new Date().toISOString(),
    last_seen: new Date().toISOString(),
    count: 0,
  }));
  user.username = from.username ?? user.username;
  user.first_name = from.first_name ?? user.first_name;
  user.last_name = from.last_name ?? user.last_name;
  user.last_seen = new Date().toISOString();
  user.count = (user.count || 0) + 1;
}

function updateChat(stats, chat) {
  if (!chat) return;
  const title = chat.title || chat.username || String(chat.id);
  const chatRec = upsertById(stats.chats, chat.id, () => ({
    id: chat.id,
    type: chat.type || null,
    title,
    first_seen: new Date().toISOString(),
    last_seen: new Date().toISOString(),
    count: 0,
  }));
  chatRec.type = chat.type || chatRec.type;
  chatRec.title = title || chatRec.title;
  chatRec.last_seen = new Date().toISOString();
  chatRec.count = (chatRec.count || 0) + 1;
}

// --- Plugin ------------------------------------------------------------------
export default function(bot) {
  ensureDb();
  
  // Global middleware to record every update safely (no .includes anywhere)
  bot.use(async (ctx, next) => {
    try {
      const stats = safeLoad();
      
      // Increment global message/update counter ONCE per update
      stats.messages = (stats.messages || 0) + 1;
      
      // Record user & chat presence if available
      if (ctx.from) updateUser(stats, ctx.from);
      if (ctx.chat) updateChat(stats, ctx.chat);
      
      stats.lastUpdated = new Date().toISOString();
      safeSave(stats);
    } catch (err) {
      console.error("⚠️ Stats middleware error:", err.message);
      // Never throw – we always continue to keep the bot alive
    }
    return next();
  });
  
  // Owner-only stats command (both slash and dot styles)
  const showStats = async (ctx) => {
    try {
      const senderId = ctx.from?.id ? String(ctx.from.id) : null;
      if (!OWNER_ID || !senderId || senderId !== OWNER_ID) {
        return ctx.reply("⛔ Owner only.");
      }
      
      const stats = safeLoad();
      const usersCount = Array.isArray(stats.users) ? stats.users.length : 0;
      const chatsCount = Array.isArray(stats.chats) ? stats.chats.length : 0;
      
      // Use plain text to avoid any parse issues
      const lines = [
        "📊 CYBIX V1 • Live Statistics",
        "──────────────────────────",
        `💬 Total updates: ${stats.messages}`,
        `👤 Unique users: ${usersCount}`,
        `👥 Active chats: ${chatsCount}`,
        `🕒 Last updated: ${stats.lastUpdated}`,
      ];
      
      await ctx.reply(lines.join("\n"));
    } catch (err) {
      console.error("❌ Error in statics command:", err.message);
      await ctx.reply("⚠️ Failed to load statistics.");
    }
  };
  
  bot.command("statics", showStats);
  bot.hears(/^[.。]statics\b/i, showStats);
}