import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

interface FavoritesDockProps {
  favorites: string[];
  onRemove: (name: string) => void;
}

export function FavoritesDock({ favorites, onRemove }: FavoritesDockProps) {
  if (favorites.length === 0) return null;

  return (
    <Reveal id="favoritesDisplay" className="favorites-dock glass-panel">
      <div className="favorites-head">
        <h3>⭐ Pinned Favorites</h3>
        <Chip>localStorage</Chip>
      </div>
      <div id="favoritesList" className="favorites-list">
        {favorites.map((team) => (
          <span className="fav-chip" key={team}>
            ⭐ {team}
            <button
              type="button"
              className="remove-favorite"
              data-team={team}
              aria-label={`Remove ${team}`}
              onClick={() => onRemove(team)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </Reveal>
  );
}
