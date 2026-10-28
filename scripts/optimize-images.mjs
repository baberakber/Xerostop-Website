/**
 * Generates responsive WebP variants for every raster image in public/images so the custom
 * next/image loader (lib/image-loader.js) can serve a right-sized file for each srcset entry.
 *
 * Output: public/_optimized/<original path without extension>-<width>.webp
 * Runs automatically before `next dev` and `next build`; unchanged images are skipped.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { VARIANT_WIDTHS, OPTIMIZED_DIR } from '../lib/image-variants.mjs';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const SOURCE_DIR = path.join(PUBLIC, 'images');
const OUT_DIR = path.join(PUBLIC, OPTIMIZED_DIR);
const RASTER = /\.(png|jpe?g|webp)$/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function isFresh(output, sourceMtime) {
  return fs.existsSync(output) && fs.statSync(output).mtimeMs >= sourceMtime;
}

let written = 0;
let skipped = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const file of walk(SOURCE_DIR).filter((f) => RASTER.test(f))) {
  const rel = path.relative(PUBLIC, file).replace(/\\/g, '/').replace(RASTER, '');
  const { mtimeMs, size } = fs.statSync(file);
  const meta = await sharp(file).metadata();
  const isWebp = meta.format === 'webp';

  for (const width of VARIANT_WIDTHS) {
    const output = path.join(OUT_DIR, `${rel}-${width}.webp`);
    if (isFresh(output, mtimeMs)) {
      skipped++;
      continue;
    }
    fs.mkdirSync(path.dirname(output), { recursive: true });

    if (isWebp && (meta.width ?? 0) <= width) {
      // Already WebP and no larger than this slot: reuse the original bytes instead of re-encoding.
      fs.copyFileSync(file, output);
    } else {
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width >= 1080 ? 84 : 80, alphaQuality: 90, effort: 5, smartSubsample: true })
        .toFile(output);
    }
    bytesIn += size;
    bytesOut += fs.statSync(output).size;
    written++;
  }
}

console.log(
  `optimize-images: ${written} variants written, ${skipped} up to date` +
    (written ? ` (${(bytesOut / 1024).toFixed(0)}KB generated)` : '')
);
