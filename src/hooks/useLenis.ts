import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

export type LenisInstance = Lenis | null;

let sharedLenis: Lenis | null = null;

export function getLenis(): LenisInstance {
  return sharedLenis;
}

export function scrollToHash(href: string, offset = -80): void {
  if (!href || href === '#') return;
  const id = href.startsWith('#') ? href.slice(1) : href;
  const target = document.getElementById(id);
  if (!target) return;

  if (sharedLenis) {
    sharedLenis.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function useLenis(): void {
  const reduced = usePrefersReducedMotion();
  const rafCleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    sharedLenis = lenis;
    const offScroll = lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    rafCleanup.current = () => {
      offScroll();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      if (sharedLenis === lenis) sharedLenis = null;
    };

    return () => {
      rafCleanup.current?.();
      rafCleanup.current = null;
    };
  }, [reduced]);
}
