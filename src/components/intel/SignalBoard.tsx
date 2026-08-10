import { signals } from '@/data/intel';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { usePanelTilt } from '@/hooks/usePanelTilt';

export function SignalBoard() {
  const tilt = usePanelTilt();
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <Reveal as="article" className="bento-card glass-panel panel-3d" delay={2} {...tilt}>
      <div className="bento-head">
        <h3>Signal Board</h3>
      </div>
      <ul className={cn('signal-list', inView && 'in-view')} ref={ref}>
        {signals.map((s) => (
          <li key={s.label} className={inView ? 'in-view' : undefined}>
            <span className="signal-label">{s.label}</span>
            <div
              className={cn(
                'signal-bar',
                s.tone === 'warn' && 'warn',
                s.tone === 'danger' && 'danger',
              )}
            >
              <div style={{ ['--p' as string]: `${s.value}%` }} />
            </div>
            <span className="signal-val">{s.value}%</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
