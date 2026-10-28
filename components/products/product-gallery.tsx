'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ProductScreenshot } from '@/types/products';
import { SectionHeader } from '@/components/shared/section-header';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface ProductGalleryProps {
  productName: string;
  screenshots: ProductScreenshot[];
}

export function ProductGallery(props: ProductGalleryProps) {
  if (props.screenshots.length === 0) return null;
  return <Gallery {...props} />;
}

function Gallery({ productName, screenshots }: ProductGalleryProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const count = screenshots.length;

  const close = React.useCallback(() => setOpenIndex(null), []);
  const step = React.useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useFocusTrap(openIndex !== null, dialogRef, closeButtonRef);

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const current = openIndex !== null ? screenshots[openIndex] : null;

  return (
    <section id="gallery" className="section-padding scroll-mt-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Screenshots"
          title={
            <>
              See <span className="text-gradient">{productName}</span> in Action
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              data-reveal
              onClick={() => setOpenIndex(index)}
              aria-label={`Enlarge screenshot: ${shot.caption}`}
              className="group overflow-hidden rounded-2xl border border-border bg-background-card text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-primary/40 hover:shadow-[0_16px_36px_-20px_rgba(30,136,229,0.45)]"
            >
              <div className="flex items-center gap-1.5 border-b border-border bg-background-elevated px-4 py-2.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-background-elevated">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(min-width: 1200px) 600px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </div>
              <p className="px-5 py-4 text-sm font-medium text-text-primary">{shot.caption}</p>
            </button>
          ))}
        </div>
      </div>
        {current && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} screenshot: ${current.caption}`}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-900/95 p-4 motion-safe:animate-fade-in-fast"
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[75vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image src={current.src} alt={current.caption} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="mt-4 text-center text-sm text-white/85" aria-live="polite">
              {current.caption}
              <span className="ml-3 text-white/70">
                {(openIndex ?? 0) + 1} / {count}
              </span>
            </p>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        )}
    </section>
  );
}
