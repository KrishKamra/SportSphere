import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        'reveal',
        delay === 1 && 'reveal-delay-1',
        delay === 2 && 'reveal-delay-2',
        delay === 3 && 'reveal-delay-3',
        inView && 'is-visible in-view',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
