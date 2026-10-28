/**
 * Runs Lighthouse against a locally served build (npx serve out -l 4173) and prints scores.
 *   node scripts/lighthouse-batch.mjs [mobile|desktop] [/path/ ...]
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [formFactor = 'mobile', ...paths] = process.argv.slice(2);
const pages = paths.length
  ? paths
  : ['/', '/about/', '/services/', '/services/unified-communications/', '/solutions/ai-uc-monitoring/', '/products/xero-meet/', '/insights/', '/insights/best-practices-uc-security-2026/', '/contact/', '/industries/'];
const base = process.env.LH_BASE ?? 'http://localhost:4173';
const outDir = path.join(os.tmpdir(), 'lh');
fs.mkdirSync(outDir, { recursive: true });

for (const page of pages) {
  const file = path.join(outDir, `${formFactor}-${page.replace(/\W+/g, '_') || 'home'}.json`);
  const args = [
    '--yes', 'lighthouse@12', `${base}${page}`, '--quiet',
    '--chrome-flags=--headless=new --no-sandbox',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json', `--output-path=${file}`,
  ];
  if (formFactor === 'desktop') args.push('--preset=desktop');
  try {
    execFileSync('npx', args, { stdio: 'ignore', shell: true });
  } catch {
    console.log(`${page}: lighthouse failed`);
    continue;
  }
  const r = JSON.parse(fs.readFileSync(file, 'utf8'));
  const s = Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
  const a = r.audits;
  const failing = Object.values(a)
    .filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === 'binary')
    .map((x) => x.id);
  console.log(
    `${formFactor.padEnd(7)} ${page.padEnd(48)} perf ${s.performance} a11y ${s.accessibility} bp ${s['best-practices']} seo ${s.seo} | ` +
      `FCP ${a['first-contentful-paint'].displayValue} LCP ${a['largest-contentful-paint'].displayValue} TBT ${a['total-blocking-time'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue}` +
      (failing.length ? ` | failing: ${failing.join(', ')}` : '')
  );
}
