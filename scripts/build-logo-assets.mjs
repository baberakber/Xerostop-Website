/**
 * Builds every brand asset the site serves from the master logo in assets/brand.
 * Run after changing the logo: npm run images:logo
 */
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const root = process.cwd();
const src = path.join(root, 'assets/brand/xerostop-logo-full.png');
const out = (p) => path.join(root, 'public', p);

const NAVY = { r: 11, g: 31, b: 58, alpha: 1 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Source logo is drawn on solid black; map brightness to alpha so it works on light and dark backgrounds.
async function toTransparent(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const m = Math.max(r, g, b);
    const a = m <= 10 ? 0 : m >= 45 ? 1 : (m - 10) / 35;
    rgba[j] = r;
    rgba[j + 1] = g;
    rgba[j + 2] = b;
    rgba[j + 3] = Math.round(a * 255);
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function crop(region) {
  return toTransparent(await sharp(src).extract(region).toBuffer());
}

/** Icon centered on a square canvas, occupying `scale` of the side (leaves a maskable safe zone). */
function squareIcon(icon, size, background, scale) {
  const inner = Math.round(size * scale);
  return sharp(icon)
    .resize(inner, inner, { fit: 'contain', background: CLEAR })
    .toBuffer()
    .then((buf) =>
      sharp({ create: { width: size, height: size, channels: 4, background } })
        .composite([{ input: buf, gravity: 'center' }])
        .png({ compressionLevel: 9 })
    );
}

/** Minimal ICO writer: stores PNG-encoded images, supported by every modern browser. */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
}

const iconRegion = { left: 300, top: 232, width: 430, height: 392 };
const fullRegion = { left: 212, top: 232, width: 576, height: 486 };

fs.mkdirSync(out('images/brand'), { recursive: true });

const icon = await crop(iconRegion);
await sharp(icon).toFile(path.join(root, 'assets/brand/xerostop-icon.png'));

// On-page logo images (2x the displayed size)
await sharp(icon).resize({ width: 68 }).webp({ quality: 90, alphaQuality: 100 }).toFile(out('images/brand/xerostop-icon-68.webp'));
await sharp(icon).resize({ width: 248 }).webp({ quality: 88, alphaQuality: 100 }).toFile(out('images/brand/xerostop-icon-248.webp'));

// Structured-data logo (square, opaque)
await (await squareIcon(icon, 512, WHITE, 0.8)).toFile(out('images/brand/xerostop-icon-512.png'));

// Favicons
const fav = async (size) => (await squareIcon(icon, size, CLEAR, 1)).toBuffer();
const fav16 = await fav(16);
const fav32 = await fav(32);
const fav48 = await fav(48);
fs.writeFileSync(out('favicon-16x16.png'), fav16);
fs.writeFileSync(out('favicon-32x32.png'), fav32);
fs.writeFileSync(out('favicon.png'), fav48);
fs.writeFileSync(out('favicon.ico'), buildIco([
  { size: 16, data: fav16 },
  { size: 32, data: fav32 },
  { size: 48, data: fav48 },
]));

// Home screen / PWA icons on the brand navy, with a maskable safe zone
await (await squareIcon(icon, 180, NAVY, 0.78)).toFile(out('apple-touch-icon.png'));
await (await squareIcon(icon, 192, NAVY, 0.7)).toFile(out('icon-192.png'));
await (await squareIcon(icon, 512, NAVY, 0.7)).toFile(out('icon-512.png'));

// Social share image
const logo = await crop(fullRegion);
const ogLogo = await sharp(logo).resize({ height: 420 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: NAVY } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .flatten({ background: NAVY })
  .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
  .toFile(out('og-image.png'));

for (const f of ['og-image.png', 'favicon.ico', 'icon-512.png', 'images/brand/xerostop-icon-68.webp', 'images/brand/xerostop-icon-248.webp']) {
  console.log(f, `${(fs.statSync(out(f)).size / 1024).toFixed(1)}KB`);
}
