import { useState } from 'react';
import { fixtures } from '@/data/fixtures';
import type { FixtureFilter } from '@/types';
import { SectionHead } from '@/components/layout/SectionHead';
import { FilterBar } from './FilterBar';
import { FixtureCard } from './FixtureCard';

const delays = [0, 1, 2, 3, 0] as const;

export function ScheduleSection() {
  const [filter, setFilter] = useState<FixtureFilter>('all');

  return (
    <section id="schedule" className="section-pad schedule-section">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Smart Schedule"
          title={
            <>
              Match <span className="text-gradient">Fixtures</span>
            </>
          }
          description="Filter by status. Live badges pulse in real time. Structure ready for dynamic match injection."
        />

        <FilterBar value={filter} onChange={setFilter} />

        <div className="fixture-list" id="fixtureList">
          {fixtures.map((fx, i) => (
            <FixtureCard
              key={fx.id}
              fixture={fx}
              delay={delays[i % delays.length]}
              hidden={filter !== 'all' && fx.status !== filter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
