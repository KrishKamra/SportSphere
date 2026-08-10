import type { FixtureFilter } from '@/types';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';

const FILTERS: { value: FixtureFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
];

interface FilterBarProps {
  value: FixtureFilter;
  onChange: (value: FixtureFilter) => void;
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <Reveal className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          className={cn('schedule-filter', value === f.value && 'active')}
          data-filter={f.value}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </Reveal>
  );
}
