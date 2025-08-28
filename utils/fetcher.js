import axios from "axios";

/**
 * Fetch JSON safely from an API
 * Always returns a valid object so bot never crashes.
 */
export async function fetchJson(url) {
  try {
    const res = await axios.get(url, { timeout: 20000 });
    if (res && res.data) {
      return res.data;
    } else {
      return { error: true, message: "Empty response from API." };
    }
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return { error: true, message: "API request failed. Try again later." };
  }
}

/**
 * Fetch file buffer safely (for downloads)
 */
export async function fetchBuffer(url) {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer", timeout: 30000 });
    return res.data;
  } catch (err) {
    console.error("❌ Buffer fetch error:", err.message);
    return null; // Always return null instead of crashing
  }
}
