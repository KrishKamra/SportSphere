import { useEffect, useState } from 'react';
import { getLenis } from './useLenis';

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const onScroll = (scroll: number) => {
      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scroll >= el.offsetTop - 160) current = id;
      }
      setActive(current);
    };

    const handler = ({ scroll }: { scroll: number }) => onScroll(scroll);
    const lenis = getLenis();
    if (lenis) {
      const off = lenis.on('scroll', handler);
      onScroll(lenis.scroll);
      return off;
    }

    // Lenis may mount a tick later — poll briefly, keep native fallback
    let offLenis: (() => void) | undefined;
    const retry = window.setInterval(() => {
      const late = getLenis();
      if (!late || offLenis) return;
      offLenis = late.on('scroll', handler);
      window.clearInterval(retry);
    }, 50);
    window.setTimeout(() => window.clearInterval(retry), 1500);

    const native = () => onScroll(window.scrollY);
    window.addEventListener('scroll', native, { passive: true });
    native();
    return () => {
      window.clearInterval(retry);
      offLenis?.();
      window.removeEventListener('scroll', native);
    };
  }, [sectionIds]);

  return active;
}

export function useNavScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (scroll: number) => setScrolled(scroll > threshold);

    const handler = ({ scroll }: { scroll: number }) => onScroll(scroll);
    const lenis = getLenis();
    if (lenis) {
      const off = lenis.on('scroll', handler);
      onScroll(lenis.scroll);
      return off;
    }

    let offLenis: (() => void) | undefined;
    const retry = window.setInterval(() => {
      const late = getLenis();
      if (!late || offLenis) return;
      offLenis = late.on('scroll', handler);
      window.clearInterval(retry);
    }, 50);
    window.setTimeout(() => window.clearInterval(retry), 1500);

    const native = () => onScroll(window.scrollY);
    window.addEventListener('scroll', native, { passive: true });
    native();
    return () => {
      window.clearInterval(retry);
      offLenis?.();
      window.removeEventListener('scroll', native);
    };
  }, [threshold]);

  return scrolled;
}
