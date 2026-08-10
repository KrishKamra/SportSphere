import { Fragment } from 'react';
import { heroKpis } from '@/data/insight';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';

function KpiValue({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix?: string;
  active: boolean;
}) {
  const value = useCountUp(target, active);
  return (
    <span className="kpi-value">
      {value}
      {suffix ?? ''}
    </span>
  );
}

export function KpiStrip() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div className="kpi-strip" ref={ref}>
      {heroKpis.map((kpi, i) => (
        <Fragment key={kpi.label}>
          {i > 0 && <div className="kpi-divider" />}
          <div className="kpi">
            <KpiValue target={kpi.value} suffix={kpi.suffix} active={inView} />
            <span className="kpi-label">{kpi.label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
