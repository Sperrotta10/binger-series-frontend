import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { type TrendingSeries as TrendingSeriesItem } from '@binger/shared';
import { SeriesCard } from './SeriesCard';
import { DashboardCarousel } from './DashboardCarousel';
import { fetchCommunityHighlyRated } from '../utils/dashboardCatalog';

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop';

export const CommunityHighlyRated = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<TrendingSeriesItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        setItems(await fetchCommunityHighlyRated());
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <section className="mb-lg">
        <div className="flex items-center gap-2 mb-md">
          <Star size={18} className="text-streak-amber animate-pulse" />
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Community Highly Rated</h2>
        </div>
        <div className="flex gap-sm overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-surface-container-high rounded-md aspect-[2/3] shrink-0 w-[140px] sm:w-[160px]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <DashboardCarousel
      title="Community Highly Rated"
      icon={Star}
      iconClassName="text-streak-amber"
      viewAllLink="/catalog/highly-rated"
    >
      {items.map((series) => (
        <div
          key={`rated-${series.id}`}
          onClick={() => navigate(`/shows/${series.id}`)}
          className="cursor-pointer shrink-0 snap-start w-[140px] sm:w-[160px]"
        >
          <SeriesCard
            title={series.title}
            subtitle={`★ ${series.rating_average.toFixed(1)} community avg`}
            imageUrl={series.poster_url || FALLBACK_POSTER}
            badge="Top Rated"
          />
        </div>
      ))}
    </DashboardCarousel>
  );
};
