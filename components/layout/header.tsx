'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Logo } from '@/components/layout/logo';
import { MegaMenu, MEGA_MENU_ID, MEGA_MENU_FEATURED_RATIO } from '@/components/layout/mega-menu';
import { mainNav, type DropdownKey } from '@/components/layout/nav-data';

export const MOBILE_NAV_ID = 'mobile-navigation';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ isMobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<DropdownKey | null>(null);
  const [caret, setCaret] = React.useState({ left: 0, onDark: false });
  const barRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Partial<Record<DropdownKey, HTMLDivElement | null>>>({});
  const toggleRefs = React.useRef<Partial<Record<DropdownKey, HTMLButtonElement | null>>>({});
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const canHoverRef = React.useRef(false);
  const focusPanelOnOpenRef = React.useRef(false);

  React.useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cancelClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const closeNow = React.useCallback(() => {
    cancelClose();
    setOpenDropdown(null);
  }, [cancelClose]);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, [cancelClose]);

  const open = React.useCallback(
    (key: DropdownKey) => {
      cancelClose();
      const item = itemRefs.current[key];
      const bar = barRef.current;
      if (item && bar) {
        const t = item.getBoundingClientRect();
        const b = bar.getBoundingClientRect();
        const left = t.left + t.width / 2 - b.left;
        setCaret({ left, onDark: left < b.width * MEGA_MENU_FEATURED_RATIO });
      }
      setOpenDropdown(key);
    },
    [cancelClose]
  );

  React.useEffect(() => {
    closeNow();
  }, [pathname, closeNow]);

  React.useEffect(() => {
    if (!openDropdown) return;
    if (focusPanelOnOpenRef.current) {
      focusPanelOnOpenRef.current = false;
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleRefs.current[openDropdown]?.focus();
        closeNow();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openDropdown, closeNow]);

  React.useEffect(() => cancelClose, [cancelClose]);

  const handleBarBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      closeNow();
    }
  };

  const handleToggle = (key: DropdownKey) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (openDropdown === key) {
      closeNow();
      return;
    }
    // detail === 0 means the click came from the keyboard (Enter/Space).
    focusPanelOnOpenRef.current = e.detail === 0;
    open(key);
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4">
      <div
        ref={barRef}
        onBlur={handleBarBlur}
        className={cn(
          'relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 rounded-full border px-2 transition-[background-color,box-shadow,border-color] duration-300 sm:h-[72px] sm:px-4 md:max-w-[min(1200px,92vw)] lg:max-w-[min(1200px,86vw)]',
          isScrolled
            ? 'border-border bg-background-primary/95 shadow-[0_12px_40px_-16px_rgba(11,31,58,0.35)] md:backdrop-blur-xl'
            : 'border-white/40 bg-white/90 shadow-[0_8px_30px_-12px_rgba(11,31,58,0.25)] md:bg-white/75 md:backdrop-blur-lg dark:border-white/10 dark:bg-navy/90 md:dark:bg-navy/70'
        )}
      >
        <Logo showTagline={false} className="min-w-0" />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const key = item.dropdownKey;
            const isOpen = Boolean(key) && openDropdown === key;
            const linkClass = cn(
              'flex items-center rounded-full py-2 text-sm font-semibold transition-colors',
              isActive(item.href) || isOpen
                ? 'bg-accent-primary/10 text-accent-primary'
                : 'text-text-secondary hover:bg-accent-primary/5 hover:text-text-primary'
            );

            if (!key) {
              return (
                <div key={item.label} onMouseEnter={() => canHoverRef.current && closeNow()}>
                  <Link
                    href={item.href}
                    className={cn(linkClass, 'px-4')}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }

            return (
              <div
                key={item.label}
                ref={(el) => {
                  itemRefs.current[key] = el;
                }}
                className={cn('flex items-center rounded-full', (isActive(item.href) || isOpen) && 'bg-accent-primary/10')}
                onMouseEnter={() => canHoverRef.current && open(key)}
                onMouseLeave={() => canHoverRef.current && scheduleClose()}
              >
                <Link
                  href={item.href}
                  className={cn(linkClass, 'bg-transparent pl-4 pr-1 hover:bg-transparent')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  ref={(el) => {
                    toggleRefs.current[key] = el;
                  }}
                  onClick={handleToggle(key)}
                  className={cn(
                    'mr-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                    isOpen ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
                  )}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? MEGA_MENU_ID : undefined}
                  aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} menu`}
                >
                  <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
              </div>
            );
          })}

          <MegaMenu
            activeKey={openDropdown}
            caretLeft={caret.left}
            caretOnDark={caret.onDark}
            pathname={pathname}
            onMouseEnter={cancelClose}
            onMouseLeave={() => canHoverRef.current && scheduleClose()}
            panelRef={panelRef}
          />
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle className="shrink-0" />
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'hidden rounded-full px-5 md:inline-flex')}
          >
            Get in Touch
          </Link>
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-card text-text-primary shadow-sm transition-colors hover:border-accent-primary/50 hover:text-accent-primary xl:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? MOBILE_NAV_ID : undefined}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
