import { cn } from '@/lib/cn';

interface BrandMarkProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function BrandMark({ size = 'md', className }: BrandMarkProps) {
  return (
    <span className={cn('brand-mark', size === 'sm' && 'sm', className)}>
      <span className="brand-orb" />
      <span className="brand-letter">S</span>
    </span>
  );
}
