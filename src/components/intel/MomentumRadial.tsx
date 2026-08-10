import { useEffect, useState } from 'react';
import { momentumIndex } from '@/data/intel';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { usePanelTilt } from '@/hooks/usePanelTilt';

const R = 52;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function MomentumRadial() {
  const tilt = usePanelTilt();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const display = useCountUp(momentumIndex, inView, 1400);
  const [offset, setOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (!inView) return;
    const targetOffset = CIRCUMFERENCE - (momentumIndex / 100) * CIRCUMFERENCE;
    requestAnimationFrame(() => setOffset(targetOffset));
  }, [inView]);

  return (
    <Reveal as="article" className="bento-card glass-panel panel-3d" delay={1} {...tilt}>
      <div ref={ref}>
        <div className="bento-head">
          <h3>League Momentum</h3>
          <Chip variant="live">Realtime</Chip>
        </div>
        <div className="radial-wrap">
          <svg className="radial-meter" viewBox="0 0 120 120">
            <circle className="radial-track" cx="60" cy="60" r={R} />
            <circle
              className="radial-progress"
              cx="60"
              cy="60"
              r={R}
              id="radialProgress"
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div className="radial-center">
            <span className="radial-value" id="radialValue">
              {display}
            </span>
            <span className="radial-unit">IDX</span>
          </div>
        </div>
        <p className="bento-note">
          Composite intensity across active fixtures. Spike detected in Eastern
          conference.
        </p>
      </div>
    </Reveal>
  );
}
