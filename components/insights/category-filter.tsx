import { cn } from '@/lib/utils';
import type { ArticleCategory } from '@/types/insights';

interface CategoryFilterProps {
  categories: ArticleCategory[];
  activeCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
}

const baseClass = 'min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200';
const activeClass = 'border-accent-primary bg-accent-primary text-white';
const idleClass =
  'border-border bg-background-card text-text-secondary hover:border-accent-primary/50 hover:bg-background-elevated hover:text-text-primary';

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide md:justify-center md:overflow-visible md:pb-0">
      <div
        className="flex min-w-max gap-3 md:inline-flex md:min-w-0 md:flex-wrap md:justify-center"
        role="group"
        aria-label="Filter articles by category"
      >
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          aria-pressed={activeCategory === null}
          className={cn(baseClass, activeCategory === null ? activeClass : idleClass)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => onCategoryChange(activeCategory === category.slug ? null : category.slug)}
            aria-pressed={activeCategory === category.slug}
            className={cn(baseClass, activeCategory === category.slug ? activeClass : idleClass)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
