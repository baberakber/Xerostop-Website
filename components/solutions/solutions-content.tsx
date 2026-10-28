import { SectionHeader } from '@/components/shared/section-header';
import { FilterGrid } from '@/components/shared/filter-grid';
import { SolutionTile, solutionCategoryLabels } from './solution-tile';
import { solutions } from '@/lib/data/solutions';
import type { SolutionCategory } from '@/types/solutions';

const categoryIds: SolutionCategory[] = ['uc', 'infrastructure', 'security', 'automation'];

export function SolutionsContent() {
  const filters = [
    { id: 'all', label: 'All', count: solutions.length },
    ...categoryIds.map((id) => ({
      id,
      label: solutionCategoryLabels[id],
      count: solutions.filter((s) => s.category === id).length,
    })),
  ];

  return (
    <section id="solutions" className="section-padding scroll-mt-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Packaged Offerings"
          title={
            <>
              Solutions That <span className="text-gradient">Deliver Results</span>
            </>
          }
          subtitle="Proven solutions that combine consulting, design, and delivery into measurable outcomes."
        />
        <FilterGrid
          label="Filter solutions by category"
          filters={filters}
          items={solutions.map((solution) => ({
            id: solution.slug,
            category: solution.category,
            content: <SolutionTile solution={solution} />,
          }))}
          gridClassName="grid gap-6 md:grid-cols-2"
        />
      </div>
    </section>
  );
}
