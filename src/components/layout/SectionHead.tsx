import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
  descriptionClassName?: string;
}

export function SectionHead({
  eyebrow,
  title,
  description,
  center = false,
  descriptionClassName,
}: SectionHeadProps) {
  return (
    <Reveal className={cn('section-head', center && 'center')}>
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title font-display">{title}</h2>
      </div>
      {description && (
        <p className={cn('section-desc', descriptionClassName)}>{description}</p>
      )}
    </Reveal>
  );
}
