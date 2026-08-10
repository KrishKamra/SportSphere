import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { usePanelTilt } from '@/hooks/usePanelTilt';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tilt?: boolean;
}

/** Shared glass surface primitive for ad-hoc panels. */
export function GlassPanel({
  children,
  className,
  tilt = false,
  ...rest
}: GlassPanelProps) {
  const tiltHandlers = usePanelTilt();

  return (
    <div
      className={cn('glass-panel', tilt && 'panel-3d', className)}
      {...(tilt ? tiltHandlers : {})}
      {...rest}
    >
      {children}
    </div>
  );
}
