import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Star, Calendar, Tv, Loader2, Plus,
} from 'lucide-react';
import {
  CatalogService,
  type Series,
  type Season,
  type Episode,
} from '@binger/shared';
import { useQuickLog } from '../components/modals/QuickLogContext';

function formatRuntime(minutes: number): string {
  if (!minutes) return '—';
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatAirdate(date: string): string {
  if (!date) return 'TBA';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ShowDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useQuickLog();

  const [series, setSeries] = useState<Series | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [activeSeasonId, setActiveSeasonId] = useState<string | null>(null);
  const [episodeCache, setEpisodeCache] = useState<Record<string, Episode[]>>({});
  const [loadingSeasonId, setLoadingSeasonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchGenRef = useRef(0);

  const activeSeason = seasons.find((s) => s.id === activeSeasonId);
  const episodes = activeSeasonId ? (episodeCache[activeSeasonId] ?? []) : [];
  const isSeasonLoading = activeSeasonId !== null && loadingSeasonId === activeSeasonId && !episodeCache[activeSeasonId];

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [detailResp, seasonsResp] = await Promise.all([
          CatalogService.getSeriesDetail(id),
          CatalogService.getSeasons(id),
        ]);
        setSeries(detailResp.data);
        const seasonList = seasonsResp.data ?? [];
        setSeasons(seasonList);
        if (seasonList.length > 0) {
          setActiveSeasonId(seasonList[0].id);
        }
      } catch {
        setError('Could not load show details.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    if (!activeSeasonId || episodeCache[activeSeasonId]) return;

    const gen = ++fetchGenRef.current;
    const seasonId = activeSeasonId;

    const loadEpisodes = async () => {
      setLoadingSeasonId(seasonId);
      try {
        const resp = await CatalogService.getEpisodes(seasonId);
        if (fetchGenRef.current !== gen) return;
        setEpisodeCache((prev) => ({ ...prev, [seasonId]: resp.data ?? [] }));
      } catch {
        if (fetchGenRef.current !== gen) return;
        setEpisodeCache((prev) => ({ ...prev, [seasonId]: [] }));
      } finally {
        if (fetchGenRef.current === gen) {
          setLoadingSeasonId((current) => (current === seasonId ? null : current));
        }
      }
    };

    loadEpisodes();
  }, [activeSeasonId, episodeCache]);

  const handleOpenQuickLog = useCallback((episode: Episode) => {
    if (!series || !activeSeason) return;

    openModal({
      type: 'episode',
      seriesId: series.id,
      seasonId: activeSeasonId ?? undefined,
      seasonNumber: activeSeason.number,
      episodeId: episode.id,
      episodeNumber: episode.number,
      title: series.title,
      subtitle: `S${String(activeSeason.number).padStart(2, '0')}E${String(episode.number).padStart(2, '0')} — ${episode.title}`,
      posterUrl: series.poster_url,
      mode: 'create',
    });
  }, [series, activeSeason, activeSeasonId, openModal]);

  if (isLoading) {
    return (
      <div className="col-span-12 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={40} className="text-primary animate-spin" />
        <p className="text-on-surface-variant text-sm">Loading show universe…</p>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="col-span-12 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-on-surface-variant">{error ?? 'Show not found.'}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-primary hover:underline text-sm"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const backdrop = series.backdrop_url || series.poster_url;
  const fallbackImg = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="col-span-12 flex flex-col gap-lg -mt-md">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors w-fit text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <section className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden border border-white/10">
        <img
          src={backdrop || fallbackImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121317] via-[#121317]/85 to-[#121317]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col sm:flex-row items-end gap-md p-md sm:p-lg">
          <div className="hidden sm:block shrink-0 w-32 md:w-40 aspect-[2/3] rounded-lg overflow-hidden border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)] -mb-2">
            <img
              src={series.poster_url || fallbackImg}
              alt={series.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {series.genres?.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-[10px] font-bold text-[#00FBFB] bg-[#00FBFB]/10 border border-[#00FBFB]/25 px-2 py-0.5 rounded-full uppercase tracking-wider"
                >
                  {g}
                </span>
              ))}
              <span className="text-[10px] font-bold text-on-surface-variant bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                {series.status}
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-white mb-2 line-clamp-2">{series.title}</h1>
            <div className="flex flex-wrap items-center gap-md text-sm text-on-surface-variant">
              {series.rating_average > 0 && (
                <span className="flex items-center gap-1 text-streak-amber font-bold">
                  <Star size={14} fill="currentColor" />
                  {series.rating_average.toFixed(1)}
                </span>
              )}
              {series.premiered && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {series.premiered.substring(0, 4)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Tv size={14} />
                {series.total_seasons} season{series.total_seasons !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {series.summary && (
        <section className="bg-[#1F1F24]/70 backdrop-blur-md border border-white/10 rounded-xl p-md sm:p-lg">
          <h2 className="font-headline-md text-headline-md text-white mb-sm">Overview</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">
            {series.summary.replace(/<[^>]+>/g, '')}
          </p>
        </section>
      )}

      <section className="bg-[#1F1F24]/70 backdrop-blur-md border border-white/10 rounded-xl p-md sm:p-lg">
        <h2 className="font-headline-md text-headline-md text-white mb-md">Episodes</h2>

        {seasons.length > 0 ? (
          <>
            <div className="flex gap-2 overflow-x-auto pb-md scrollbar-hide -mx-1 px-1">
              {seasons.map((season) => {
                const isActive = season.id === activeSeasonId;
                return (
                  <button
                    key={season.id}
                    onClick={() => setActiveSeasonId(season.id)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/15 border-primary/40 text-primary shadow-[0_0_12px_rgba(220,184,255,0.2)]'
                        : 'bg-white/5 border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-white'
                    }`}
                  >
                    Season {season.number}
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[120px]">
              {isSeasonLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-[#1F1F24]/60 backdrop-blur-[2px]">
                  <Loader2 size={22} className="text-primary animate-spin" />
                </div>
              )}

              {episodes.length > 0 ? (
                <div className={`grid grid-cols-1 gap-sm transition-opacity duration-200 ${isSeasonLoading ? 'opacity-40' : 'opacity-100'}`}>
                  {episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className="group flex items-center gap-md p-sm sm:p-md rounded-lg border border-white/5 bg-surface-container/40 hover:bg-surface-container/70 hover:border-primary/20 transition-all duration-200"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary tabular-nums">
                          {String(ep.number).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-label-md text-label-md truncate">{ep.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[10px] font-medium text-[#00FBFB] bg-[#00FBFB]/10 border border-[#00FBFB]/20 px-2 py-0.5 rounded-full">
                            {formatRuntime(ep.runtime)}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">
                            {formatAirdate(ep.airdate)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenQuickLog(ep)}
                        aria-label="Log episode"
                        className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 bg-white/5 border-white/15 text-on-surface-variant hover:border-primary/40 hover:text-primary hover:bg-primary/10"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : !isSeasonLoading ? (
                <p className="text-on-surface-variant text-sm text-center py-12">
                  No episodes listed for this season yet.
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <p className="text-on-surface-variant text-sm text-center py-12">
            Season data is still syncing. Check back shortly.
          </p>
        )}
      </section>
    </div>
  );
}
