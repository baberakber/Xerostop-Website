'use client';

import * as React from 'react';
import Link from 'next/link';
import { X, ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { mainNav, dropdowns } from '@/components/layout/nav-data';
import { siteConfig } from '@/lib/config';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface MobileNavProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const DESKTOP_NAV_QUERY = '(min-width: 1280px)';

export function MobileNav({ id, isOpen, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);
  // The drawer is only added to the DOM on first open, keeping initial hydration light.
  const [hasOpened, setHasOpened] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setShown(false);
      return;
    }
    setHasOpened(true);
    // Wait a frame so the closed state paints first and the slide-in transition runs.
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useFocusTrap(shown, dialogRef, closeButtonRef);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const desktop = window.matchMedia(DESKTOP_NAV_QUERY);
    const handleResize = () => {
      if (desktop.matches) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    desktop.addEventListener('change', handleResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      desktop.removeEventListener('change', handleResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!hasOpened) return null;

  const items = [...mainNav, { label: 'Contact', href: '/contact' }];

  return (
    <div className="xl:hidden">
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-navy-900/60 transition-[opacity,visibility] duration-200',
          shown ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id={id}
        ref={dialogRef}
        className={cn(
          'navy-band fixed right-0 top-0 z-[70] h-full w-[88%] max-w-[380px] overflow-hidden text-white shadow-2xl transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none',
          shown ? 'visible translate-x-0' : 'invisible translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!shown}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <Logo tone="onDark" onClick={onClose} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            <ul className="space-y-1 px-3">
              {items.map((item) => {
                const dropdown = 'dropdownKey' in item && item.dropdownKey ? dropdowns[item.dropdownKey] : null;
                const isExpanded = expandedItem === item.label;
                const submenuId = `mobile-submenu-${item.label.toLowerCase()}`;

                return (
                  <li key={item.label}>
                    {dropdown ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                            isExpanded ? 'bg-white/10 text-sky-300' : 'text-white hover:bg-white/5'
                          )}
                          aria-expanded={isExpanded}
                          aria-controls={submenuId}
                        >
                          {item.label}
                          <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', isExpanded && 'rotate-180')} />
                        </button>

                        <div
                          id={submenuId}
                          className={cn(
                            'grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-out',
                            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
                          )}
                        >
                          <ul className="space-y-1 overflow-hidden pl-3">
                            {dropdown.items.map((entry, i) => (
                              <li key={entry.title} className={cn(i === 0 && 'pt-2')}>
                                <Link
                                  href={entry.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                                >
                                  <entry.icon className="h-4 w-4 text-sky-300" />
                                  {entry.title}
                                </Link>
                              </li>
                            ))}
                            <li className="pb-2">
                              <Link
                                href={dropdown.viewAllHref}
                                onClick={onClose}
                                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-sky-300 hover:bg-white/5"
                              >
                                {dropdown.viewAllLabel}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/5"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-4 border-t border-white/10 p-5">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex min-h-[44px] items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-sky-300" />
              {siteConfig.contact.email}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full rounded-full')}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
