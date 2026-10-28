import type { Ref } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { dropdowns, type DropdownKey } from '@/components/layout/nav-data';

export const MEGA_MENU_ID = 'mega-menu-panel';

interface MegaMenuProps {
  activeKey: DropdownKey | null;
  /** Horizontal center of the open trigger, relative to the header bar. */
  caretLeft: number;
  /** True when the caret sits above the navy featured column. */
  caretOnDark: boolean;
  pathname: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  panelRef?: Ref<HTMLDivElement>;
}

/** Share of the panel width taken by the featured column (matches `col-span-3` of `grid-cols-10`). */
export const MEGA_MENU_FEATURED_RATIO = 0.3;

export function MegaMenu({
  activeKey,
  caretLeft,
  caretOnDark,
  pathname,
  onMouseEnter,
  onMouseLeave,
  panelRef,
}: MegaMenuProps) {
  if (!activeKey) return null;

  return (
    <div
      className="absolute inset-x-0 top-full z-50 hidden pt-3 xl:block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative motion-safe:animate-menu-in">
        <span
          className="absolute -top-1.5 z-10 block h-3 w-3 transition-[left] duration-200 ease-out"
          style={{ left: caretLeft - 6 }}
          aria-hidden
        >
          <span
            className={cn(
              'block h-3 w-3 rotate-45 rounded-[2px] border-l border-t',
              caretOnDark ? 'border-white/10 bg-navy' : 'border-border bg-background-card'
            )}
          />
        </span>

        <div
          id={MEGA_MENU_ID}
          ref={panelRef}
          role="region"
          aria-label={`${dropdowns[activeKey].eyebrow} menu`}
          className="overflow-hidden rounded-3xl border border-border bg-background-card shadow-[0_32px_64px_-24px_rgba(11,31,58,0.45),0_8px_20px_-12px_rgba(11,31,58,0.2)]"
        >
          <MegaMenuContent key={activeKey} dropdownKey={activeKey} pathname={pathname} />
        </div>
      </div>
    </div>
  );
}

function MegaMenuContent({ dropdownKey, pathname }: { dropdownKey: DropdownKey; pathname: string | null }) {
  const menu = dropdowns[dropdownKey];

  return (
    <div className="motion-safe:animate-fade-in-fast">
      <div className="grid grid-cols-10">
        <div className="navy-band relative col-span-3 flex flex-col overflow-hidden p-7 text-white">
          <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.35),transparent_70%)]"
            aria-hidden
          />

          <div className="relative flex flex-1 flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              {menu.eyebrow}
            </span>
            <p className="mt-4 text-xl font-bold leading-snug">{menu.heading}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{menu.description}</p>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-white/80">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              {menu.highlight}
              <span className="text-white/40" aria-hidden>|</span>
              <span>
                {menu.items.length} {menu.eyebrow.toLowerCase()}
              </span>
            </div>

            <div className="mt-auto pt-6">
              <Link
                href={menu.viewAllHref}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-lg transition-colors hover:bg-sky-50"
              >
                {menu.viewAllLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <ul className={cn('col-span-7 grid content-start gap-1 p-4', menu.columns === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
          {menu.items.map((entry) => {
            const isActive = pathname?.startsWith(entry.href);
            return (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex h-full items-start gap-3 rounded-2xl p-3 transition-colors',
                    isActive ? 'bg-accent-primary/[0.06] ring-1 ring-accent-primary/20' : 'hover:bg-background-elevated'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors duration-200',
                      isActive
                        ? 'bg-accent-primary text-white ring-accent-primary'
                        : 'bg-accent-primary/10 text-accent-primary ring-accent-primary/15 group-hover:bg-accent-primary group-hover:text-white'
                    )}
                  >
                    <entry.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'flex items-center gap-1 text-sm font-semibold transition-colors',
                        isActive ? 'text-accent-primary' : 'text-text-primary group-hover:text-accent-primary'
                      )}
                    >
                      {entry.title}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">{entry.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border bg-background-elevated/60 px-7 py-3.5 text-sm">
        <p className="text-text-secondary">
          Not sure where to start?{' '}
          <Link href="/contact" className="group inline-flex items-center gap-1 font-semibold text-accent-primary">
            Talk to an architect
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent-primary"
        >
          <Mail className="h-4 w-4" />
          {siteConfig.contact.email}
        </a>
      </div>
    </div>
  );
}
