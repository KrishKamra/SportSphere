import { useCallback, useEffect, useState } from 'react';
import { readFavorites, writeFavorites } from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const toggleFavorite = useCallback((teamName: string) => {
    setFavorites((prev) => {
      const next = prev.includes(teamName)
        ? prev.filter((t) => t !== teamName)
        : [...prev, teamName];
      writeFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((teamName: string) => {
    setFavorites((prev) => {
      const next = prev.filter((t) => t !== teamName);
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (teamName: string) => favorites.includes(teamName),
    [favorites],
  );

  return { favorites, toggleFavorite, removeFavorite, isFavorite };
}
