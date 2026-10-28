'use client';

import * as React from 'react';

const RELOAD_KEY = 'chunk-load-reload-at';
const RELOAD_COOLDOWN_MS = 60_000;

function isChunkLoadError(message: string): boolean {
  return (
    message.includes('ChunkLoadError') ||
    message.includes('Loading chunk') ||
    message.includes('Loading CSS chunk')
  );
}

/** Reloads once per cooldown window so a stale deploy can recover without looping. */
function reloadOnce() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Without storage there is no way to guard against a loop, so don't reload.
    return;
  }
  window.location.reload();
}

export function ChunkLoadErrorHandler() {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.message ?? '')) reloadOnce();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message =
        typeof event.reason?.message === 'string'
          ? event.reason.message
          : String(event.reason ?? '');
      if (isChunkLoadError(message)) {
        event.preventDefault?.();
        reloadOnce();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
