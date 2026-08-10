import type { Team } from '@/types';
import { formatFormCompact } from '@/data/teams';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { usePanelTilt } from '@/hooks/usePanelTilt';

interface TeamCardProps {
  team: Team;
  favorited: boolean;
  onToggleFavorite: (name: string) => void;
  delay?: 0 | 1 | 2 | 3;
}

function formClass(form: Team['form']): string {
  const s = form.join('');
  if (s.startsWith('WW')) return 'text-lime';
  if (s.includes('L') && form[0] === 'W') return 'text-gold';
  if (form[0] === 'D') return 'text-cyan';
  return '';
}

export function TeamCard({
  team,
  favorited,
  onToggleFavorite,
  delay = 0,
}: TeamCardProps) {
  const tilt = usePanelTilt();
  const gdClass = team.goalDiff >= 0 ? 'text-cyan' : 'text-gold';

  return (
    <Reveal
      as="article"
      className="team-card glass-panel panel-3d"
      delay={delay}
      data-team={team.name}
      {...tilt}
    >
      <div className={cn('team-card-bg', team.bgClass)} />
      <div className="team-card-top">
        <div className={cn('team-crest large', team.crestClass)}>{team.crest}</div>
        <div className="rank-badge">#{team.rank}</div>
      </div>
      <h3 className="team-card-name font-display">{team.name}</h3>
      <p className="team-card-arena">
        {team.arena} · {team.capacityLabel}
      </p>
      <div className="team-card-stats">
        <div>
          <span>Form</span>
          <strong className={formClass(team.form)}>
            {formatFormCompact(team.form)}
          </strong>
        </div>
        <div>
          <span>Pts</span>
          <strong>{team.points}</strong>
        </div>
        <div>
          <span>GD</span>
          <strong className={gdClass}>
            {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
          </strong>
        </div>
      </div>
      <div className="power-meter">
        <span>Power Index</span>
        <div className="power-track">
          <div
            className="power-fill"
            style={{ ['--p' as string]: `${team.powerIndex}%` }}
          />
        </div>
        <span className="power-num">{team.powerIndex}</span>
      </div>
      <p className="team-card-blurb">{team.blurb}</p>
      <button
        type="button"
        className={cn('btn-favorite', favorited && 'active')}
        data-team={team.name}
        onClick={() => onToggleFavorite(team.name)}
      >
        <span className="favorite-icon">{favorited ? '★' : '☆'}</span>
        <span className="favorite-text">
          {favorited ? 'Favorited' : 'Set Favorite'}
        </span>
      </button>
    </Reveal>
  );
}
