import type { MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  /** When provided, links update client state instead of performing a full navigation. */
  onNavigate?: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 3) {
    pages.push(1, 2, 3, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages);
  }
  return pages;
}

const stepClass =
  'flex h-11 items-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-text-secondary transition-colors';

export function Pagination({ currentPage, totalPages, buildHref, onNavigate }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <a href={buildHref(currentPage - 1)} onClick={handleClick(currentPage - 1)} className={cn(stepClass, 'hover:bg-card-hover hover:text-foreground')}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </a>
      ) : (
        <span className={cn(stepClass, 'cursor-not-allowed opacity-50')} aria-disabled="true">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </span>
      )}

      <div className="hidden items-center gap-2 md:flex">
        {getPageNumbers(currentPage, totalPages).map((page, i) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-text-secondary" aria-hidden>
              …
            </span>
          ) : (
            <a
              key={page}
              href={buildHref(page)}
              onClick={handleClick(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-text-secondary hover:bg-card-hover hover:text-foreground'
              )}
            >
              {page}
            </a>
          )
        )}
      </div>

      <span className="flex text-sm text-text-secondary md:hidden">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <a href={buildHref(currentPage + 1)} onClick={handleClick(currentPage + 1)} className={cn(stepClass, 'hover:bg-card-hover hover:text-foreground')}>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      ) : (
        <span className={cn(stepClass, 'cursor-not-allowed opacity-50')} aria-disabled="true">
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
