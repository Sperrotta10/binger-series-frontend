import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Flame, PlayCircle, Loader2 } from 'lucide-react';
import { CatalogService, type TrendingSeries } from '@binger/shared';
import { SeriesCard } from '../components/SeriesCard';
import { CONTINUE_WATCHING } from '../data/continueWatching.mock';

const GRID_META: Record<string, { title: string; icon: typeof Flame; subtitle: string }> = {
  trending: {
    title: 'Trending This Week',
    icon: Flame,
    subtitle: 'Most logged series across Binger this week',
  },
  'continue-watching': {
    title: 'Continue Watching',
    icon: PlayCircle,
    subtitle: 'Pick up where you left off',
  },
};

export function CatalogGrid() {
  const { type = 'trending' } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const meta = GRID_META[type] ?? GRID_META.trending;
  const Icon = meta.icon;

  const [trending, setTrending] = useState<TrendingSeries[]>([]);
  const [isLoading, setIsLoading] = useState(type === 'trending');

  useEffect(() => {
    if (type !== 'trending') return;

    const load = async () => {
      setIsLoading(true);
      try {
        const resp = await CatalogService.getTrending();
        setTrending(resp?.data ?? []);
      } catch {
        setTrending([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [type]);

  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </div>

      <header>
        <div className="flex items-center gap-2 mb-1">
          <Icon size={22} className="text-primary" />
          <h1 className="font-display-lg text-display-lg text-white">{meta.title}</h1>
        </div>
        <p className="text-on-surface-variant text-sm">{meta.subtitle}</p>
      </header>

      {type === 'trending' && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-surface-container-high rounded-md aspect-[2/3]" />
              ))}
            </div>
          ) : trending.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
              {trending.map((series) => (
                <div
                  key={series.id}
                  onClick={() => navigate(`/shows/${series.id}`)}
                  className="cursor-pointer"
                >
                  <SeriesCard
                    title={series.title}
                    subtitle={
                      series.weekly_views_count > 0
                        ? `${series.weekly_views_count.toLocaleString()} views`
                        : 'Trending'
                    }
                    imageUrl={series.poster_url ?? ''}
                    badge={series.weekly_views_count > 0 ? 'Trending' : undefined}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-surface-container-low/30 rounded-xl border border-white/5 border-dashed">
              <Loader2 size={32} className="text-primary animate-spin mb-3" />
              <p className="text-on-surface-variant text-sm">Catalog still syncing…</p>
            </div>
          )}
        </>
      )}

      {type === 'continue-watching' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          {CONTINUE_WATCHING.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/shows/${item.seriesId}`)}
              className="group bg-[#1F1F24]/70 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-200"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] to-transparent" />
                {item.isLive && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 bg-[#00FBFB]/10 border border-[#00FBFB]/30 text-[#00FBFB] text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FBFB] animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <div className="p-md">
                <h3 className="text-white font-label-md text-label-md truncate">{item.title}</h3>
                <p className="text-on-surface-variant text-xs truncate mt-1">{item.episode}</p>
                <div className="flex items-center gap-sm mt-md">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-on-surface-variant tabular-nums">{item.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
