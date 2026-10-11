// Static site checks, no dependencies. Run: node scripts/check-site.mjs
// Verifies local links/anchors/assets exist, paths are subpath-safe, ids are unique,
// ARIA references resolve and each page has its SEO/social metadata.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
const html = Object.fromEntries(pages.map((p) => [p, readFileSync(join(root, p), 'utf8')]));
const idList = (src) => [...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const ids = Object.fromEntries(pages.map((p) => [p, new Set(idList(html[p]))]));
const errors = [];

for (const page of pages) {
  const src = html[page];
  const required = ['<title>', 'name="description"', 'name="viewport"', 'rel="icon"', 'property="og:title"', 'property="og:image"', 'rel="canonical"', '<main id="main"', 'lang="en"'];
  for (const r of required) if (!src.includes(r)) errors.push(`${page}: missing ${r}`);

  for (const [, url] of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(url)) continue;
    if (url.startsWith('/')) { errors.push(`${page}: root-absolute path breaks on a GitHub Pages subpath: ${url}`); continue; }
    const [file, hash] = url.split('#');
    const target = file || page;
    if (file && !existsSync(join(root, file))) errors.push(`${page}: missing file ${file}`);
    else if (hash && target.endsWith('.html') && !ids[target]?.has(hash)) errors.push(`${page}: missing anchor ${url}`);
  }

  for (const [, ref] of src.matchAll(/\s(?:aria-controls|aria-labelledby|for)="([^"]+)"/g)) {
    for (const id of ref.split(' ')) if (!ids[page].has(id)) errors.push(`${page}: reference to missing id "${id}"`);
  }

  const dupes = idList(src).filter((v, i, a) => a.indexOf(v) !== i);
  if (dupes.length) errors.push(`${page}: duplicate ids ${dupes.join(', ')}`);
  if (src.includes('<!--@')) errors.push(`${page}: un-injected chart marker`);
}

const ogImage = 'assets/og-image.png';
if (!existsSync(join(root, ogImage))) errors.push(`missing ${ogImage}`);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages: links, anchors, assets, ids and metadata OK`);

const left = Object.values(html).join('').match(/your-username|your-profile|your\.email@example\.com|class="ph"/g) || [];
if (left.length) console.log(`• ${left.length} placeholders still to personalise (see README → Customization)`);
