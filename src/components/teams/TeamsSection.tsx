import { teams } from '@/data/teams';
import { SectionHead } from '@/components/layout/SectionHead';
import { useFavorites } from '@/hooks/useFavorites';
import { TeamCard } from './TeamCard';
import { FavoritesDock } from './FavoritesDock';

const delays = [0, 1, 2, 3] as const;

export function TeamsSection() {
  const { favorites, toggleFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <section id="teams" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Team Intelligence Grid"
          title={
            <>
              Featured <span className="text-gradient">Squads</span>
            </>
          }
          description="Pin favorites to persist across sessions. Cards mirror the fields the scraper will hydrate: rank, form, stadium, and meta."
        />

        <div className="team-grid" id="teamGrid">
          {teams.map((team, i) => (
            <TeamCard
              key={team.id}
              team={team}
              favorited={isFavorite(team.name)}
              onToggleFavorite={toggleFavorite}
              delay={delays[i % delays.length]}
            />
          ))}
        </div>

        <FavoritesDock favorites={favorites} onRemove={removeFavorite} />
      </div>
    </section>
  );
}
