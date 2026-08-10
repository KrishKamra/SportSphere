import { insightOfDay } from '@/data/insight';
import { getTeamById } from '@/data/teams';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/cn';
import { usePanelTilt } from '@/hooks/usePanelTilt';

interface InsightPanelProps {
  open: boolean;
}

export function InsightPanel({ open }: InsightPanelProps) {
  const tilt = usePanelTilt();
  const home = getTeamById(insightOfDay.homeTeamId);
  const away = getTeamById(insightOfDay.awayTeamId);
  if (!home || !away) return null;

  return (
    <div className="hero-panel">
      <div className="glass-panel panel-3d" id="insightPanel" {...tilt}>
        <div className="panel-header">
          <div>
            <p className="panel-eyebrow">Insight of the Day</p>
            <h2 className="panel-title">{insightOfDay.title}</h2>
          </div>
          <StatusBadge status="live" label="LIVE" />
        </div>

        <div
          id="highlightContent"
          className={cn('insight-body', !open && 'collapsed')}
        >
          <div className="matchup-arena">
            <div className="team-side home">
              <div className={cn('team-crest', home.crestClass)}>{home.crest}</div>
              <div className="team-meta">
                <span className="team-name">{home.name}</span>
                <span className="team-form">{insightOfDay.homeFormLabel}</span>
              </div>
              <div className="team-score gold-text">{insightOfDay.homeScore}</div>
            </div>

            <div className="vs-orb">
              <span>VS</span>
              <div className="vs-ring" />
            </div>

            <div className="team-side away">
              <div className={cn('team-crest', away.crestClass)}>{away.crest}</div>
              <div className="team-meta">
                <span className="team-name">{away.name}</span>
                <span className="team-form">{insightOfDay.awayFormLabel}</span>
              </div>
              <div className="team-score">{insightOfDay.awayScore}</div>
            </div>
          </div>

          <div className="stat-bars">
            {insightOfDay.stats.map((stat) => (
              <div className="stat-row" key={stat.label}>
                <span>{stat.label}</span>
                <div className="dual-bar">
                  <div
                    className="bar-fill left"
                    style={{ ['--w' as string]: `${stat.leftWidth}%` }}
                  />
                  <div
                    className="bar-fill right"
                    style={{ ['--w' as string]: `${stat.rightWidth}%` }}
                  />
                </div>
                <div className="stat-nums">
                  <span>{stat.left}</span>
                  <span>{stat.right}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="insight-note">{insightOfDay.note}</p>
        </div>

        <div className="panel-footer">
          <div className="mini-metric">
            <span className="mini-label">Win prob.</span>
            <span className="mini-value text-cyan">{insightOfDay.winProb}</span>
          </div>
          <div className="mini-metric">
            <span className="mini-label">Momentum</span>
            <span className="mini-value text-gold">{insightOfDay.momentum}</span>
          </div>
          <div className="mini-metric">
            <span className="mini-label">Intensity</span>
            <span className="mini-value text-magenta">{insightOfDay.intensity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
