'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const THEME_KEY = 'xerostop-theme';

const baseClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm dark:border-zinc-600 dark:bg-white dark:text-zinc-800';

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = React.useCallback(() => {
    const html = document.documentElement;
    const willBeDark = !html.classList.contains('dark');
    html.classList.toggle('dark', willBeDark);
    try {
      localStorage.setItem(THEME_KEY, willBeDark ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page view.
    }
    setIsDark(willBeDark);
  }, []);

  if (!mounted) {
    return <div className={cn(baseClass, className)} aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cn(
        baseClass,
        'transition-all duration-200 hover:bg-zinc-100 hover:shadow active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        className
      )}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}
