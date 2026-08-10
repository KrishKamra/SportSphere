import { scoutNote } from '@/data/intel';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { usePanelTilt } from '@/hooks/usePanelTilt';

export function ScoutSpotlight() {
  const tilt = usePanelTilt();

  return (
    <Reveal as="article" className="bento-card bento-wide glass-panel panel-3d" {...tilt}>
      <div className="spotlight">
        <div className="spotlight-glow" />
        <div className="spotlight-content">
          <Chip variant="gold">{scoutNote.chip}</Chip>
          <h3 className="font-display">{scoutNote.title}</h3>
          <p>{scoutNote.body}</p>
        </div>
        <div className="spotlight-stats">
          {scoutNote.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
