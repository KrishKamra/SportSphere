import { useCallback, type MouseEvent } from 'react';
import { useIsCoarsePointer, usePrefersReducedMotion } from './useMediaQuery';

export function usePanelTilt() {
  const coarse = useIsCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = !coarse && !reduced;

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const panel = e.currentTarget;
      const rect = panel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -10;
      const ry = (px - 0.5) * 12;
      panel.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [enabled],
  );

  const onLeave = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      e.currentTarget.style.transform =
        'perspective(900px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    },
    [enabled],
  );

  return enabled
    ? { onMouseMove: onMove, onMouseLeave: onLeave }
    : {};
}
