'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Header, MOBILE_NAV_ID } from './header';
import { MobileNav } from './mobile-nav';

export function HeaderShell() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);
  const handleClose = React.useCallback(() => setIsMobileMenuOpen(false), []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Header isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={handleToggle} />
      <MobileNav id={MOBILE_NAV_ID} isOpen={isMobileMenuOpen} onClose={handleClose} />
    </>
  );
}
