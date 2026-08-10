import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'live' | 'gold';
}

export function Chip({ children, className, variant = 'default' }: ChipProps) {
  return (
    <span
      className={cn(
        'chip',
        variant === 'live' && 'live-chip',
        variant === 'gold' && 'gold-chip',
        className,
      )}
    >
      {children}
    </span>
  );
}
