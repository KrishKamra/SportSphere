import { cn } from '@/lib/cn';
import type { FixtureStatus } from '@/types';

interface StatusBadgeProps {
  status: FixtureStatus | 'live';
  label?: string;
  className?: string;
}

const labels: Record<string, string> = {
  live: 'Live',
  upcoming: 'Upcoming',
  completed: 'Completed',
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const text = label ?? labels[status] ?? status;
  return (
    <span className={cn('status-badge', status, className)}>
      {status === 'live' && <span className="pulse-ring" />}
      {status === 'live' && !label ? 'LIVE' : text}
    </span>
  );
}
