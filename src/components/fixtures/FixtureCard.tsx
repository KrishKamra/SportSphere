import type { Fixture } from '@/types';
import { getTeamById } from '@/data/teams';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { usePanelTilt } from '@/hooks/usePanelTilt';

interface FixtureCardProps {
  fixture: Fixture;
  delay?: 0 | 1 | 2 | 3;
  hidden?: boolean;
}

export function FixtureCard({ fixture, delay = 0, hidden }: FixtureCardProps) {
  const tilt = usePanelTilt();
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  if (!home || !away) return null;

  const vsLabel =
    fixture.status === 'live' ? '●' : fixture.status === 'completed' ? '—' : 'VS';

  return (
    <Reveal
      as="article"
      className={cn(
        'fixture-card glass-panel panel-3d',
        fixture.status === 'live' && 'is-live',
        hidden && 'is-hidden',
      )}
      delay={delay}
      data-status={fixture.status}
      {...tilt}
    >
      <div className="fixture-time">
        <span
          className={cn('fixture-day', fixture.status === 'live' && 'live-min')}
        >
          {fixture.dayLabel}
        </span>
        <span className="fixture-hour">{fixture.hourLabel}</span>
        <span className="fixture-zone">{fixture.zoneLabel}</span>
      </div>
      <div className="fixture-matchup">
        <div className="fixture-team">
          <span className={cn('team-crest sm', home.crestClass)}>{home.crest}</span>
          <span>{home.name}</span>
        </div>
        <div className={cn('fixture-vs', fixture.status === 'live' && 'pulse')}>
          {vsLabel}
        </div>
        <div className="fixture-team">
          <span className={cn('team-crest sm', away.crestClass)}>{away.crest}</span>
          <span>{away.name}</span>
        </div>
      </div>
      <div className="fixture-meta">
        <span className="venue">{fixture.venue}</span>
        <StatusBadge
          status={fixture.status}
          label={
            fixture.status === 'live'
              ? 'Live'
              : fixture.status === 'upcoming'
                ? 'Upcoming'
                : 'Completed'
          }
        />
      </div>
    </Reveal>
  );
}
