import axios from "axios";

/**
 * Fetch JSON data from API
 * @param {string} url - API endpoint
 * @returns {Promise<object>} response data
 */
export async function fetchJson(url) {
  try {
    const { data } = await axios.get(url, { timeout: 30000 });
    return data;
  } catch (err) {
    console.error("❌ API Fetch Error:", err.message);
    return { error: "Failed to fetch data, try again later." };
  }
}