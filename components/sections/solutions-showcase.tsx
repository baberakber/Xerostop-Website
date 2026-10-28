import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { FilterGrid } from '@/components/shared/filter-grid';
import { SolutionTile, solutionCategoryLabels } from '@/components/solutions/solution-tile';
import { solutions } from '@/lib/data/solutions';

export function SolutionsShowcase() {
  const categories = Array.from(new Set(solutions.map((s) => s.category)));

  return (
    <section className="section-padding cv-auto bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Solutions & Frameworks"
          title={
            <>
              Featured <span className="text-gradient">Solutions</span>
            </>
          }
          subtitle="Proven, ready-to-deploy architectures that turn our consulting expertise into measurable outcomes."
        />

        <FilterGrid
          label="Filter solutions by category"
          filters={[
            { id: 'all', label: 'All Solutions' },
            ...categories.map((c) => ({ id: c, label: solutionCategoryLabels[c] })),
          ]}
          items={solutions.map((solution) => ({
            id: solution.slug,
            category: solution.category,
            content: <SolutionTile solution={solution} compact />,
          }))}
          gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        />

        <div className="mt-10 text-center">
          <Link
            href="/solutions/"
            className="inline-flex items-center gap-2 rounded-full border border-accent-primary/40 px-6 py-3 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-white"
          >
            View All Solutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
