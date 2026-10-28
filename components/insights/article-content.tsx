import fs from 'node:fs';
import path from 'node:path';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import type { Article } from '@/types/insights';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getHeadingText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getHeadingText).join('');
  if (children && typeof children === 'object' && 'props' in children)
    return getHeadingText((children as ReactElement).props.children);
  return String(children ?? '');
}

/** Reads intrinsic dimensions of local images at build time so the browser can reserve space. */
function getLocalImageSize(src: string | undefined): { width: number; height: number } | null {
  if (!src || !src.startsWith('/') || !src.endsWith('.svg')) return null;
  try {
    const svg = fs.readFileSync(path.join(process.cwd(), 'public', src), 'utf8').slice(0, 2000);
    const viewBox = svg.match(/viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
    if (viewBox) return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
    const w = svg.match(/<svg[^>]*\swidth=["']([\d.]+)/);
    const h = svg.match(/<svg[^>]*\sheight=["']([\d.]+)/);
    if (w && h) return { width: Math.round(Number(w[1])), height: Math.round(Number(h[1])) };
  } catch {
    // fall through
  }
  return null;
}

const H2_CLASSES =
  'relative mt-14 mb-6 scroll-mt-28 rounded-r-xl border-l-4 border-accent-secondary ' +
  'bg-gradient-to-r from-accent-secondary/15 via-accent-secondary/5 to-transparent ' +
  'py-3 pl-5 pr-4 text-2xl font-bold tracking-tight text-foreground ' +
  'shadow-sm shadow-accent-primary/5 md:text-[1.7rem]';

const H3_CLASSES =
  'mt-10 mb-4 flex scroll-mt-28 items-start gap-3 text-xl font-semibold tracking-tight ' +
  'text-accent-primary-hover dark:text-accent-secondary md:text-[1.35rem]';

const components: Components = {
  h2: ({ node: _node, children, ...props }) => (
    <h2 {...props} id={slugify(getHeadingText(children))} className={H2_CLASSES}>
      {children}
    </h2>
  ),
  h3: ({ node: _node, children, ...props }) => (
    <h3 {...props} id={slugify(getHeadingText(children))} className={H3_CLASSES}>
      <span
        aria-hidden="true"
        className="mt-[0.5em] h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px] bg-gradient-to-br from-accent-secondary to-accent-primary shadow-[0_0_8px_rgba(66,165,245,0.6)]"
      />
      <span>{children}</span>
    </h3>
  ),
  h4: ({ node: _node, children, ...props }) => (
    <h4 {...props} id={slugify(getHeadingText(children))}>
      {children}
    </h4>
  ),
  img: ({ node: _node, src, alt, ...props }: ComponentPropsWithoutRef<'img'> & { node?: unknown }) => {
    const size = getLocalImageSize(typeof src === 'string' ? src : undefined);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        width={size?.width}
        height={size?.height}
      />
    );
  },
  table: ({ node: _node, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table {...props} className="w-full min-w-[480px] border-collapse text-left text-sm" />
    </div>
  ),
  a: ({ node: _node, href, ...props }) => {
    const external = typeof href === 'string' && /^https?:\/\//.test(href);
    return <a {...props} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
  },
};

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="min-w-0 max-w-none [overflow-wrap:anywhere]">
      <div
        className="
          [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-foreground
          [&_p]:mb-6 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-text-secondary
          [&_a]:text-accent-primary [&_a]:underline [&_a]:decoration-accent-primary/40 [&_a]:underline-offset-2 [&_a]:hover:decoration-accent-primary
          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-text-secondary
          [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-text-secondary
          [&_li]:leading-relaxed [&_li]:marker:text-primary
          [&_strong]:font-semibold [&_strong]:text-foreground
          [&_hr]:my-10 [&_hr]:border-border
          [&_img]:mb-3 [&_img]:mt-2 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-border [&_img]:bg-white [&_img]:shadow-lg [&_img]:shadow-black/10
          [&_p:has(img)]:my-10 [&_p:has(img)]:text-center [&_p:has(img)]:text-sm [&_p:has(img)_em]:text-text-secondary
          [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-lg [&_blockquote]:text-text-secondary
          [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-[#0d0d0d] [&_pre]:p-4 [&_pre]:[overflow-wrap:normal]
          [&_code]:rounded [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary
          [&_pre_code]:bg-transparent [&_pre_code]:p-0
          [&_th]:border-b [&_th]:border-border [&_th]:bg-background-elevated [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-foreground
          [&_td]:border-b [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-text-secondary
        "
      >
        <ReactMarkdown components={components}>{article.content.trim()}</ReactMarkdown>
      </div>
    </article>
  );
}
