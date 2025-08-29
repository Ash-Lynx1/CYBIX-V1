// utils/fetcher.js
import axios from "axios";
export async function fetchJson(url) {
  try {
    const res = await axios.get(url, { timeout: 15000 });
    return res.data;
  } catch (err) {
    console.error("❌ fetchJson error:", err.message || err);
    return null;
  }
}

export async function fetchBuffer(url) {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer", timeout: 30000 });
    return Buffer.from(res.data);
  } catch (err) {
    console.error("❌ fetchBuffer error:", err.message || err);
    return null;
  }
}