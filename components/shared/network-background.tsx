import * as React from 'react';
import { cn } from '@/lib/utils';
import pulses from '@/lib/data/network-pulses.json';

interface NetworkBackgroundProps {
  className?: string;
  density?: 'full' | 'subtle';
}

/** Decorative navy network backdrop. The graph is a prebuilt image (see scripts/build-network-bg.mjs). */
export function NetworkBackground({ className, density = 'full' }: NetworkBackgroundProps) {
  const subtle = density === 'subtle';
  const base = subtle ? '/images/bg/network-bg-subtle' : '/images/bg/network-bg';

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="navy-band absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_33%,rgba(30,136,229,0.28),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_95%,rgba(56,189,248,0.10),transparent_35%)]" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}-1600.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
        sizes="100vw"
        alt=""
        width={1600}
        height={900}
        decoding="async"
        fetchPriority={subtle ? 'low' : 'auto'}
        loading={subtle ? 'lazy' : 'eager'}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!subtle && (
        // Mirrors the SVG's `slice` scaling with container units so pulses sit on graph nodes;
        // HTML elements animating opacity stay on the compositor, unlike animated SVG circles.
        <div className="absolute inset-0 [container-type:size]">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 'max(100cqw, 177.78cqh)', height: 'max(100cqh, 56.25cqw)' }}
          >
            {pulses.map((p) => (
              <span
                key={`${p.x}-${p.y}`}
                className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 animate-twinkle rounded-full bg-[radial-gradient(circle,#bfe3ff_0%,rgba(66,165,245,0)_70%)] will-change-[opacity]"
                style={{
                  left: `${(p.x / 1600) * 100}%`,
                  top: `${(p.y / 900) * 100}%`,
                  width: `${((p.r * 2) / 1600) * 100}%`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-grid-light opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900/70" />
    </div>
  );
}
