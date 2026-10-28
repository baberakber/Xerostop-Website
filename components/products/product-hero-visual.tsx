import Image from 'next/image';
import { Lock } from 'lucide-react';
import type { Product } from '@/types/products';
import { getIcon } from '@/lib/icons';

interface ProductHeroVisualProps {
  product: Product;
}

const chartBars = [38, 62, 48, 74, 56, 88, 66, 92, 70, 80];

function PlaceholderDashboard({ product }: ProductHeroVisualProps) {
  const Icon = getIcon(product.icon);

  return (
    <div className="relative aspect-[16/10] bg-slate-50 dark:bg-navy-900/40" aria-hidden>
      <div className="flex h-full">
        <div className="flex w-1/5 flex-col gap-3 border-r border-border bg-white p-4 dark:border-white/10 dark:bg-navy-900/60">
          <span className="h-3 w-3/4 rounded bg-accent-primary/30" />
          <span className="mt-2 h-2 w-full rounded bg-accent-primary/15" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-2 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <span className="h-3 w-1/3 rounded bg-slate-300 dark:bg-white/20" />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border border-l-2 border-l-accent-primary bg-white p-3 dark:border-white/10 dark:border-l-accent-primary dark:bg-navy-800"
              >
                <span className="block h-1.5 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
                <span className="mt-2 block h-3 w-1/3 rounded bg-slate-300 dark:bg-white/20" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-2 rounded-lg border border-border bg-white p-4 dark:border-white/10 dark:bg-navy-800">
            {chartBars.map((height, i) => (
              <span
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-accent-primary/70 to-accent-secondary/40"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-[2px] dark:from-navy-900/50 dark:to-navy-900/20">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background-card/95 px-6 py-4 shadow-xl dark:border-white/10">
          <span className="icon-tile h-12 w-12">
            <Icon className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-lg font-bold text-text-primary">{product.name}</span>
            <span className="block text-xs font-medium text-text-muted">by XeroStop</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductHeroVisual({ product }: ProductHeroVisualProps) {
  const Icon = getIcon(product.icon);
  const integrations = product.integrations.slice(0, 2).join(', ');

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(30,136,229,0.2),transparent_70%)]" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_32px_64px_-32px_rgba(11,31,58,0.45),0_12px_24px_-16px_rgba(11,31,58,0.25)] ring-1 ring-navy/5 dark:border-white/10 dark:bg-navy-800 dark:ring-white/5">
        <div className="flex items-center gap-3 border-b border-border bg-slate-50/90 px-4 py-2.5 dark:border-white/10 dark:bg-navy-900/60" aria-hidden>
          <div className="flex w-12 shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[65%] items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1 text-[11px] text-text-muted dark:border-white/10 dark:bg-navy-800">
            <Lock className="h-3 w-3 shrink-0 text-green-500" />
            <span className="truncate">app.xerostop.com/{product.slug}</span>
          </div>
          <div className="w-12 shrink-0" />
        </div>

        {product.heroImage ? (
          <Image
            src={product.heroImage.src}
            alt={`${product.name} dashboard`}
            width={product.heroImage.width}
            height={product.heroImage.height}
            priority
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
        ) : (
          <PlaceholderDashboard product={product} />
        )}
      </div>

      {integrations && (
        <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-border bg-background-card p-4 shadow-xl dark:border-white/10 md:flex">
          <span className="icon-tile h-11 w-11">
            <Icon className="h-5 w-5" />
          </span>
          <span className="pr-2">
            <span className="block text-xs font-medium text-text-muted">Integrates with</span>
            <span className="block text-sm font-bold text-text-primary">{integrations}</span>
          </span>
        </div>
      )}
    </div>
  );
}
