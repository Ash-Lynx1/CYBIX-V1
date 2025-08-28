const startTime = Date.now();

/**
 * Get bot uptime in human-readable format
 * @returns {string} uptime
 */
export function getUptime() {
  let totalSeconds = Math.floor((Date.now() - startTime) / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}