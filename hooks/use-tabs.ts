'use client';

import * as React from 'react';

/**
 * Roving-tabindex keyboard support for a WAI-ARIA tablist: Arrow keys, Home and End
 * move between tabs and activate them.
 */
export function useTabs(count: number, initial = 0) {
  const [active, setActive] = React.useState(initial);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = React.useCallback(
    (index: number, focus = false) => {
      const next = (index + count) % count;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();
    },
    [count]
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const keys: Record<string, number> = {
        ArrowRight: active + 1,
        ArrowDown: active + 1,
        ArrowLeft: active - 1,
        ArrowUp: active - 1,
        Home: 0,
        End: count - 1,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      select(keys[e.key], true);
    },
    [active, count, select]
  );

  const getTabProps = (index: number, idPrefix: string) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabRefs.current[index] = el;
    },
    id: `${idPrefix}-tab-${index}`,
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': active === index,
    'aria-controls': `${idPrefix}-panel`,
    tabIndex: active === index ? 0 : -1,
    onKeyDown,
  });

  const getPanelProps = (idPrefix: string) => ({
    id: `${idPrefix}-panel`,
    role: 'tabpanel' as const,
    'aria-labelledby': `${idPrefix}-tab-${active}`,
    tabIndex: 0,
  });

  return { active, select, getTabProps, getPanelProps };
}
