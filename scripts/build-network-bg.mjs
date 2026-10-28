/**
 * Generates the decorative network background used by hero and CTA bands as prebuilt WebP images,
 * so pages no longer inline or paint thousands of SVG nodes. Output:
 *   public/images/bg/network-bg-{800,1600}.webp         (full density)
 *   public/images/bg/network-bg-subtle-{800,1600}.webp  (dimmer variant)
 *   lib/data/network-pulses.json                        (a few node positions animated on the page)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTH = 1600;
const HEIGHT = 900;
const ROOT = process.cwd();

// Seeded PRNG keeps output stable between builds.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph(count, seed) {
  const rand = mulberry32(seed);
  const nodes = Array.from({ length: count }, () => ({
    x: Math.round(rand() * WIDTH),
    y: Math.round(rand() * HEIGHT),
    r: Math.round((1.2 + rand() * 2.4) * 10) / 10,
    delay: Math.round(rand() * 40) / 10,
  }));

  const links = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j, d }) => j > i && d < 190)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j, d }) => links.push([i, j, d]));
  });

  return { nodes, links };
}

function buildDots() {
  const rand = mulberry32(42);
  const dots = [];
  for (let y = 40; y < HEIGHT; y += 22) {
    for (let x = 20; x < WIDTH; x += 22) {
      // Elliptical globe mask so the dot field reads as a planet surface.
      const nx = (x - WIDTH / 2) / (WIDTH * 0.48);
      const ny = (y - HEIGHT * 0.62) / (HEIGHT * 0.62);
      if (nx * nx + ny * ny < 1 && rand() > 0.35) dots.push({ x, y, o: 0.15 + rand() * 0.35 });
    }
  }
  return dots;
}

/** Groups items into opacity buckets so each bucket becomes a single <path>. */
function bucketize(items, getOpacity, buckets) {
  const groups = new Map();
  for (const item of items) {
    const o = getOpacity(item);
    const key = Math.round(o * buckets) / buckets;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return [...groups.entries()].sort((a, b) => a[0] - b[0]);
}

const fmt = (n) => Number(n.toFixed(3)).toString();

function render({ subtle }) {
  const graph = buildGraph(90, 1977);
  const dots = buildDots();
  const parts = [];

  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice">`,
    '<defs><radialGradient id="g"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#42a5f5" stop-opacity="0"/></radialGradient>',
    '<linearGradient id="a" x1="0" x2="1"><stop offset="0" stop-color="#42a5f5" stop-opacity="0"/><stop offset=".5" stop-color="#42a5f5" stop-opacity=".8"/><stop offset="1" stop-color="#42a5f5" stop-opacity="0"/></linearGradient>',
    // Same colors as the `.navy-band` CSS class, baked in so the raster is opaque (smaller WebP).
    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1f3a"/><stop offset=".55" stop-color="#132b4f"/><stop offset="1" stop-color="#1b3a66"/></linearGradient></defs>',
    `<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>`
  );

  // Dot field: zero-length round-capped segments render as dots.
  parts.push('<g stroke="#5fb4ff" stroke-width="2.6" stroke-linecap="round" fill="none">');
  for (const [o, group] of bucketize(dots, (d) => (subtle ? d.o * 0.5 : d.o), 8)) {
    parts.push(`<path opacity="${fmt(o)}" d="${group.map((d) => `M${d.x} ${d.y}h0`).join('')}"/>`);
  }
  parts.push('</g>');

  // Links
  parts.push('<g stroke="#42a5f5" stroke-width=".8" fill="none">');
  const linkOpacity = ([, , d]) => (1 - d / 190) * (subtle ? 0.25 : 0.45);
  for (const [o, group] of bucketize(graph.links, linkOpacity, 10)) {
    if (o <= 0) continue;
    const d = group
      .map(([a, b]) => `M${graph.nodes[a].x} ${graph.nodes[a].y}L${graph.nodes[b].x} ${graph.nodes[b].y}`)
      .join('');
    parts.push(`<path opacity="${fmt(o)}" d="${d}"/>`);
  }
  parts.push('</g>');

  // Node glows and cores
  parts.push(`<g fill="url(#g)" opacity="${subtle ? 0.2 : 0.3}">`);
  for (const n of graph.nodes) parts.push(`<circle cx="${n.x}" cy="${n.y}" r="${fmt(n.r * 4)}"/>`);
  parts.push('</g><g fill="#d6ecff" opacity=".85">');
  for (const n of graph.nodes) parts.push(`<circle cx="${n.x}" cy="${n.y}" r="${fmt(n.r)}"/>`);
  parts.push('</g>');

  if (!subtle) {
    parts.push(
      '<g fill="none" stroke="url(#a)" stroke-width="1.5">',
      '<path d="M120 720Q520 380 900 560" stroke-dasharray="6 10"/>',
      '<path d="M760 640Q1100 300 1480 520" stroke-dasharray="6 10"/>',
      '<path d="M300 300Q800 120 1300 260" stroke-dasharray="4 12"/>',
      '</g>'
    );
  }

  parts.push('</svg>');
  return { svg: parts.join(''), graph };
}

const outDir = path.join(ROOT, 'public', 'images', 'bg');
fs.mkdirSync(outDir, { recursive: true });

const full = render({ subtle: false });
const subtle = render({ subtle: true });

// Rasterize once at build time: painting thousands of SVG shapes on load blocks the main thread.
for (const [name, svg] of [['network-bg', full.svg], ['network-bg-subtle', subtle.svg]]) {
  for (const width of [800, 1600]) {
    await sharp(Buffer.from(svg), { density: (72 * width) / WIDTH })
      .resize({ width })
      .webp({ quality: Number(process.env.BG_QUALITY ?? 65), effort: 6 })
      .toFile(path.join(outDir, `${name}-${width}.webp`));
  }
}

// Pick a spread of larger nodes to pulse on the page.
const pulses = [...full.graph.nodes]
  .sort((a, b) => b.r - a.r)
  .slice(0, 14)
  .map(({ x, y, r, delay }) => ({ x, y, r: Math.round(r * 4), delay }));
fs.writeFileSync(path.join(ROOT, 'lib', 'data', 'network-pulses.json'), JSON.stringify(pulses, null, 2) + '\n');

console.log(
  'network-bg: ' +
    fs
      .readdirSync(outDir)
      .map((f) => `${f} ${(fs.statSync(path.join(outDir, f)).size / 1024).toFixed(1)}KB`)
      .join(', ')
);
