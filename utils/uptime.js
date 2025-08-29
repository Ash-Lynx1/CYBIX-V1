// utils/uptime.js
export function formatUptime(sec) {
  sec = Math.floor(sec);
  const days = Math.floor(sec / (3600 * 24));
  sec -= days * 3600 * 24;
  const hrs = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  const mins = Math.floor(sec / 60);
  sec -= mins * 60;
  return `${days}d ${hrs}h ${mins}m ${sec}s`;
}