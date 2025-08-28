import fs from "fs";
import path from "path";

const dbPath = path.resolve("./database/stats.json");

function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ registeredUsers: [], totalCommands: 0 }, null, 2));
  }
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function addUser(userId) {
  const db = loadDB();
  if (!db.registeredUsers.includes(userId)) {
    db.registeredUsers.push(userId);
    saveDB(db);
  }
}

export function listUsers() {
  const db = loadDB();
  return db.registeredUsers || [];
}

export function incrementCommands() {
  const db = loadDB();
  db.totalCommands = (db.totalCommands || 0) + 1;
  saveDB(db);
}

export function getStats() {
  return loadDB();
}