import { Star } from 'lucide-react';
import type { FavoriteShow } from '../../types/profile';

interface ProfileFavoritesGridProps {
  favorites: FavoriteShow[];
  loading: boolean;
}

export function ProfileFavoritesGrid({ favorites, loading }: ProfileFavoritesGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-sm animate-pulse">
        <div className="h-8 w-48 bg-surface-container rounded mb-sm" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-surface-container rounded-xl border border-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-xs">
        <Star className="w-5 h-5 text-[#DCB8FF]" />
        <h2 className="text-[20px] font-bold tracking-tight text-on-surface">Curated Favorites</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {favorites.map((show) => (
          <div key={show.id} className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent opacity-80 z-10" />
            <img 
              src={show.imageUrl} 
              alt={show.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-md z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-on-surface font-semibold leading-tight text-[14px] md:text-[16px]">{show.title}</h3>
            </div>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
