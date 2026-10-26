// Zero-dep link checker: verifies every internal href/src in *.html resolves.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let bad = 0, total = 0;

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+?)(?:#[^"]*)?"/g)].map(m => m[1]);
  const seen = new Set();
  for (const ref of refs) {
    if (seen.has(ref)) continue;
    seen.add(ref);
    total++;
    if (/^(https?:)?\/\//i.test(ref) || ref.startsWith('mailto:') || ref.startsWith('data:')) continue;
    const clean = ref.split('?')[0];
    const target = path.resolve(root, clean);
    if (!target.startsWith(root) || !fs.existsSync(target)) {
      bad++;
      console.log(`BROKEN in ${page}: ${ref}`);
    }
  }
}
console.log(`${total - bad}/${total} internal refs OK across ${pages.length} pages`);
process.exit(bad ? 1 : 0);
