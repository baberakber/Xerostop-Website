'use client';

import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Link2, Check } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const path = url.endsWith('/') ? url : `${url}/`;
  const shareUrl = `${siteConfig.url}${path}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

  const buttonClass =
    'flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground';

  return (
    <div>
      <div className="rounded-lg border border-border bg-card/80 p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Share</h3>
        <div className="flex gap-2">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className={cn(buttonClass)}
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X (Twitter)"
            className={cn(buttonClass)}
          >
            <Twitter className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? 'Link copied' : 'Copy link'}
            className={cn(buttonClass)}
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Link2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
