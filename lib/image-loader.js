import { VARIANT_WIDTHS, OPTIMIZED_DIR } from './image-variants.mjs';

const RASTER = /\.(png|jpe?g|webp)$/i;

/**
 * Custom next/image loader for the static export. Local raster images map to the prebuilt
 * WebP variant closest to (and not smaller than) the requested width; everything else
 * (SVGs, remote URLs) is served unchanged.
 *
 * @param {{ src: string, width: number, quality?: number }} params
 */
export default function imageLoader({ src, width }) {
  if (!src.startsWith('/images/') || !RASTER.test(src)) return src;
  const variant = VARIANT_WIDTHS.find((w) => w >= width) ?? VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
  return `/${OPTIMIZED_DIR}${src.replace(RASTER, '')}-${variant}.webp`;
}
