export function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  seconds -= d * 86400;
  const h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds - m * 60);
  const seg = [];
  if (d) seg.push(`${d}d`);
  if (h) seg.push(`${h}h`);
  if (m) seg.push(`${m}m`);
  seg.push(`${s}s`);
  return seg.join(" ");
}