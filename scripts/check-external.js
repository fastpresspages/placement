// Warn-only outbound link checker. Usage: node scripts/check-external.js
// 403s are bot-blocks (leetcode/codeforces/weworkremotely) — fine in browsers.
const fs = await import('node:fs/promises');
const html = await fs.readFile(new URL('../index.html', import.meta.url), 'utf8');
const urls = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(m => m[1]);
const seen = new Set();

async function check(url) {
  try {
    const r = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (link check, respectful)' },
      signal: AbortSignal.timeout(9000)
    });
    if (r.status >= 200 && r.status < 300) return `OK   ${r.status} ${url}`;
    if (r.status === 403 || r.status === 429 || r.status === 999) return `BOT  ${r.status} ${url}`;
    return `BAD  ${r.status} ${url}`;
  } catch (e) {
    return `ERR  ---  ${url} :: ${e.name || e.message}`;
  }
}

const list = urls.filter(u => !seen.has(u) && seen.add(u));
const results = await Promise.all(list.map(check));
console.log(results.sort().join('\n'));
console.log(`Checked ${list.length} outbound links (BOT rows are bot-blocks, not dead links)`);
