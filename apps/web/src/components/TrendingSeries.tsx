import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Loader2 } from 'lucide-react';
import { SeriesCard } from './SeriesCard';
import { CatalogService, type TrendingSeries as TrendingSeriesItem } from '@binger/shared';
import { DashboardCarousel } from './DashboardCarousel';
import { fetchGlobalTrendingFeed } from '../utils/dashboardCatalog';

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop';

export const TrendingSeries = () => {
  const navigate = useNavigate();
  const [trendingData, setTrendingData] = useState<TrendingSeriesItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        let items = await fetchGlobalTrendingFeed();

        if (items.length === 0 && !bootstrapped) {
          setBootstrapped(true);
          CatalogService.bootstrapDashboard().catch(() => {});
          await new Promise((r) => setTimeout(r, 4000));
          items = await fetchGlobalTrendingFeed();
        }

        setTrendingData(items);
      } catch {
        setTrendingData([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <section className="mb-lg">
        <div className="flex items-center gap-2 mb-md">
          <Flame size={18} className="text-streak-amber animate-pulse" />
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Trending This Week</h2>
        </div>
        <div className="flex gap-sm overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-surface-container-high rounded-md aspect-[2/3] shrink-0 w-[140px] sm:w-[160px]"
            />
          ))}
        </div>
        {bootstrapped && (
          <div className="flex items-center gap-2 mt-sm text-on-surface-variant/60 text-xs">
            <Loader2 size={12} className="animate-spin" />
            <span>Syncing global catalog — fetching 2026 hits…</span>
          </div>
        )}
      </section>
    );
  }

  if (trendingData.length === 0) {
    return (
      <section className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">Trending This Week</h2>
        <div className="flex flex-col items-center justify-center h-40 bg-surface-container-low/30 rounded-xl border border-white/5 border-dashed">
          <Loader2 size={28} className="text-primary animate-spin mb-3" />
          <p className="text-on-surface-variant text-sm text-center max-w-xs">
            Syncing global television trends for 2026. Refresh in a few moments.
          </p>
        </div>
      </section>
    );
  }

  return (
    <DashboardCarousel
      title="Trending This Week"
      icon={Flame}
      iconClassName="text-streak-amber"
      viewAllLink="/catalog/trending"
    >
      {trendingData.map((series) => (
        <div
          key={series.id}
          onClick={() => navigate(`/shows/${series.id}`)}
          className="cursor-pointer shrink-0 snap-start w-[140px] sm:w-[160px]"
        >
          <SeriesCard
            title={series.title}
            subtitle={
              series.weekly_views_count > 0
                ? `${series.weekly_views_count.toLocaleString()} views`
                : series.rating_average > 0
                  ? `★ ${series.rating_average.toFixed(1)}`
                  : 'Global hit · 2026'
            }
            imageUrl={series.poster_url || FALLBACK_POSTER}
            badge={series.weekly_views_count > 0 ? 'Trending' : '2026'}
          />
        </div>
      ))}
    </DashboardCarousel>
  );
};
