'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#0b1f3a',
          color: '#ffffff',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <main>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
            XeroStop couldn&apos;t load this page. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: '#1e88e5',
              color: '#ffffff',
              border: 0,
              borderRadius: '9999px',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '0.75rem',
            }}
          >
            Try again
          </button>
          <a href="/" style={{ color: '#90caf9' }}>
            Back to Home
          </a>
        </main>
      </body>
    </html>
  );
}
