/**
 * Audits the static export in out/ for on-page SEO basics. Run after `npm run build`:
 *   node scripts/audit-seo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const SITE = 'https://xerostop.com';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return e.name.startsWith('_') ? [] : walk(full);
    return e.name === 'index.html' ? [full] : [];
  });
}

const attr = (html, re) => html.match(re)?.[1];
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

let problems = 0;
const report = (page, msg) => {
  problems++;
  console.log(`  ✗ ${page}: ${msg}`);
};

const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

for (const file of walk(OUT)) {
  const rel = '/' + path.relative(OUT, path.dirname(file)).replace(/\\/g, '/');
  const page = rel === '/' ? '/' : `${rel}/`;
  const html = fs.readFileSync(file, 'utf8');
  const is404 = page.startsWith('/404');

  const title = decode(attr(html, /<title>([^<]*)<\/title>/));
  const desc = decode(attr(html, /<meta name="description" content="([^"]*)"/));
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  const twImage = attr(html, /<meta name="twitter:image" content="([^"]*)"/);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const mains = (html.match(/<main[\s>]/g) || []).length;
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const block of jsonLd) {
    try {
      const data = JSON.parse(block);
      const collect = (d) => (Array.isArray(d) ? d.forEach(collect) : d['@graph'] ? d['@graph'].forEach(collect) : types.push([d['@type']].flat().join('+')));
      collect(data);
    } catch {
      report(page, 'invalid JSON-LD');
    }
  }

  console.log(`${page}  [${title?.length ?? 0}/${desc?.length ?? 0}] h1=${h1s} ld=${types.join(',') || '-'}`);
  if (is404) continue;
  if (!title || title.length > 65 || title.length < 20) report(page, `title length ${title?.length}: "${title}"`);
  if (!desc || desc.length > 165 || desc.length < 110) report(page, `description length ${desc?.length}`);
  if (canonical !== `${SITE}${page}`) report(page, `canonical ${canonical}`);
  if (ogUrl !== `${SITE}${page}`) report(page, `og:url ${ogUrl}`);
  if (!ogImage?.startsWith(SITE)) report(page, `og:image ${ogImage}`);
  if (!twImage?.startsWith(SITE)) report(page, `twitter:image ${twImage}`);
  if (h1s !== 1) report(page, `${h1s} h1 elements`);
  if (mains !== 1) report(page, `${mains} main elements`);
  if (imgsNoAlt) report(page, `${imgsNoAlt} <img> without alt`);
  if (/\bXerostop\b/.test(html)) report(page, 'brand spelled "Xerostop"');
  if (/localhost/.test(html)) report(page, 'contains localhost URL');
  if (!sitemapUrls.has(`${SITE}${page}`)) report(page, 'missing from sitemap.xml');
}

console.log(problems ? `\n${problems} problem(s) found` : '\nNo problems found');
process.exitCode = problems ? 1 : 0;
