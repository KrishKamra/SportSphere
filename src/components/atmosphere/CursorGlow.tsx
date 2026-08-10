import { useEffect, useRef } from 'react';
import { useIsCoarsePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const coarse = useIsCoarsePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || coarse || reduced) {
      if (glow) glow.style.display = 'none';
      return;
    }

    glow.style.display = '';
    let x = 0;
    let y = 0;
    let gx = 0;
    let gy = 0;
    let raf = 0;
    let alive = true;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      if (!alive) return;
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [coarse, reduced]);

  if (coarse || reduced) return null;

  return <div className="cursor-glow" id="cursorGlow" ref={glowRef} aria-hidden="true" />;
}
