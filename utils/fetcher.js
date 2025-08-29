import axios from "axios";

export async function fetchJson(url, cfg = {}) {
  try {
    const res = await axios.get(url, { timeout: 20000, ...cfg });
    return res?.data ?? { error: true, message: "Empty response" };
  } catch (err) {
    console.error("❌ fetchJson error:", err.message);
    return { error: true, message: "API request failed" };
  }
}

export async function fetchBuffer(url, cfg = {}) {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer", timeout: 30000, ...cfg });
    return res.data;
  } catch (err) {
    console.error("❌ fetchBuffer error:", err.message);
    return null;
  }
}