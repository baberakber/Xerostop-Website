import * as React from 'react';
import { HeaderShell } from './header-shell';
import { Footer } from './footer';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <HeaderShell />
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
