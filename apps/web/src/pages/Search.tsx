import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '../components/Search/SearchBar';
import { FilterPanel, type FilterState } from '../components/Search/FilterPanel';
import { IngestionModal } from '../components/modals/IngestionModal';
import { useJitImport } from '../hooks/useJitImport';
import {
  Sparkles, Loader2, Compass, ChevronRight, Search as SearchIcon,
  Flame, Trophy, Download,
} from 'lucide-react';
import { CatalogService, type HybridSearchResult } from '@binger/shared';

// ─── Mock Moods ──────────────────────────────────────────────────────────────
const MOCK_MOODS = [
  { id: 1, title: 'Heart-pounding suspense & tech-noirs' },
  { id: 2, title: 'Introspective dramas & poetic visuals' },
  { id: 3, title: 'High-octane action & neon aesthetics' },
  { id: 4, title: 'Mind-bending sci-fi & philosophy' },
];

// ─── Hybrid Result Card ───────────────────────────────────────────────────────
interface HybridCardProps {
  item: HybridSearchResult;
  onImport: (item: HybridSearchResult) => void;
}

const HybridResultCard: React.FC<HybridCardProps> = ({ item, onImport }) => {
  const fallbackImg = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop';
  const year = item.premiered ? item.premiered.substring(0, 4) : '';
  const genre = item.genres?.[0] ?? 'Series';

  return (
    <div
      className="group relative aspect-[2/3] rounded-md overflow-hidden bg-surface-container-lowest
                 border border-white/5 transition-all duration-300 cursor-pointer
                 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(220,184,255,0.25)]"
      onClick={() => onImport(item)}
    >
      {/* Poster */}
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={item.poster_url ?? fallbackImg}
        alt={item.title}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Score badge */}
      {item.rating_average > 0 && (
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded-[4px] border border-white/10">
          <span className="text-[10px] font-bold text-streak-amber">{item.rating_average.toFixed(1)}</span>
        </div>
      )}

      {/* Not-imported badge */}
      {!item.isImported && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/20 backdrop-blur-md border border-primary/30 px-1.5 py-0.5 rounded-[4px]">
          <Download size={9} className="text-primary" />
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider">TVmaze</span>
        </div>
      )}

      {/* Hover actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/40 backdrop-blur-[2px] translate-y-4 group-hover:translate-y-0">
        <button
          className="flex items-center justify-center gap-2 bg-primary text-on-primary w-3/4 py-2 rounded-md font-label-md hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(220,184,255,0.4)]"
          onClick={(e) => { e.stopPropagation(); onImport(item); }}
        >
          {item.isImported ? 'View Details' : (
            <><Download size={14} /> Import & View</>
          )}
        </button>
      </div>

      {/* Metadata */}
      <div className="absolute bottom-0 left-0 p-sm w-full transform transition-transform duration-300 group-hover:translate-y-2 group-hover:opacity-0">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">{genre}</p>
        <h3 className="font-label-md text-label-md text-white line-clamp-1 leading-tight">{item.title}</h3>
        <p className="text-[12px] text-on-surface-variant mt-0.5">{year}</p>
      </div>
    </div>
  );
};

// ─── Main Search Page ─────────────────────────────────────────────────────────
export default function Search() {
  const { syncTarget, syncPhase, handleShowClick } = useJitImport();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ status: 'All', genre: 'All', platform: 'All', score: 'Any' });
  const [results, setResults] = useState<HybridSearchResult[]>([]);
  const [aiRecs, setAiRecs] = useState<HybridSearchResult[]>([]);

  const hasSearched = !!query || Object.values(filters).some(v => v !== 'All' && v !== 'Any');

  // Load initial trending as AI recs
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const trending = await CatalogService.getTrending();
        if (trending?.data) {
          setAiRecs(trending.data.map(item => ({
            id: item.id,
            api_id: null,
            title: item.title,
            premiered: null,
            genres: ['Trending'],
            poster_url: item.poster_url,
            rating_average: item.rating_average,
            isImported: true,
          })));
        }
      } catch {
        // silently fall through to empty state
      }
    };
    loadInitial();
  }, []);

  // Debounced hybrid search
  const fetchResults = useCallback(async () => {
    if (!query.trim()) { setResults([]); return; }
    setIsSearching(true);
    try {
      const resp = await CatalogService.hybridSearch({ q: query });
      setResults(resp?.data ?? []);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  useEffect(() => {
    if (!hasSearched) return;
    const timer = setTimeout(fetchResults, 450);
    return () => clearTimeout(timer);
  }, [query, filters, hasSearched, fetchResults]);

  const featuredRec = aiRecs[0];
  const gridRecs = aiRecs.slice(1);

  return (
    <>
      {/* JIT Sync Overlay */}
      {syncTarget && <IngestionModal title={syncTarget.title} phase={syncPhase} />}

      {/* ── MAIN CONTENT (8 Columns) ── */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
        {/* Search Header */}
        <section className="relative">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-md">
            <div>
              <h1 className="font-display-lg text-display-lg text-white mb-2">Explore the Narrative</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                Dive into curated universes, track your cinematic journey, and discover your next obsession through mood-mapped recommendations.
              </p>
            </div>
            <div className="w-full">
              <SearchBar onSearch={setQuery} isLoading={isSearching} />
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </section>

        {/* Results / Default State */}
        <section className="relative z-10 min-h-[400px]">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 size={40} className="text-primary animate-spin" />
              <p className="text-on-surface-variant font-label-md animate-pulse">Scanning the multiverse…</p>
            </div>
          ) : hasSearched ? (
            <div className="space-y-sm">
              <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2">
                <Compass className="text-primary" size={24} />
                Search Results
              </h2>
              <div className="flex items-center gap-3 mb-md">
                <p className="text-on-surface-variant text-sm">{results.length} narratives found</p>
                {results.some(r => !r.isImported) && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-primary/70 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Download size={9} /> includes TVmaze results — click to import
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
                  {results.map(item => (
                    <HybridResultCard key={`${item.isImported ? 'local' : 'tvmaze'}-${item.id}`} item={item} onImport={handleShowClick} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-surface-container-low/30 rounded-xl border border-white/5 border-dashed">
                  <SearchIcon size={48} className="text-on-surface-variant/30 mb-4" />
                  <h3 className="text-white font-headline-md mb-2">No signals detected</h3>
                  <p className="text-on-surface-variant max-w-md text-center">We couldn't find any narratives matching your criteria. Try adjusting your search terms.</p>
                  <button
                    onClick={() => { setQuery(''); setFilters({ status: 'All', genre: 'All', platform: 'All', score: 'Any' }); setResults([]); }}
                    className="mt-6 text-primary hover:text-white transition-colors underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-xl">
              {/* Discover by Mood */}
              <div>
                <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2 mb-md">
                  <Sparkles className="text-primary" size={24} /> Discover by Mood
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {MOCK_MOODS.map(mood => (
                    <button
                      key={mood.id}
                      className="flex items-center justify-between p-md bg-surface-container-low/50 hover:bg-surface-container border border-white/5 hover:border-primary/30 rounded-xl group transition-all duration-300 text-left"
                      onClick={() => setQuery(mood.title.split(' ')[0])}
                    >
                      <span className="font-body-md text-on-surface group-hover:text-white transition-colors">{mood.title}</span>
                      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <ChevronRight size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Recs */}
              <div>
                <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2 mb-md">
                  <Sparkles className="text-primary" size={24} /> AI Recs for You
                </h2>
                <div className="flex flex-col gap-md">
                  {featuredRec && (
                    <div
                      className="group relative w-full h-64 rounded-xl overflow-hidden bg-surface-container-lowest border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(220,184,255,0.2)] cursor-pointer"
                      onClick={() => handleShowClick(featuredRec)}
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={featuredRec.poster_url ?? ''}
                        alt={featuredRec.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
                      {featuredRec.rating_average > 0 && (
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-[4px] border border-white/10 flex items-center gap-1">
                          <span className="text-xs font-bold text-streak-amber">{featuredRec.rating_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 p-lg w-full max-w-md">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{featuredRec.genres?.[0] ?? 'Trending'}</p>
                        <h3 className="font-headline-lg text-headline-lg text-white mb-2">{featuredRec.title}</h3>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
                    {gridRecs.map(item => (
                      <HybridResultCard key={`rec-${item.id}`} item={item} onImport={handleShowClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── RIGHT PANEL (4 Columns) ── */}
      <aside className="col-span-12 lg:col-span-4 flex flex-col gap-md lg:sticky lg:top-[calc(64px+80px)] lg:self-start">
        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-xl p-md">
          <div className="flex items-center gap-2 mb-md">
            <Flame size={20} className="text-streak-amber" />
            <h3 className="font-headline-md text-[16px] font-semibold text-white">Your Watch Streak</h3>
          </div>
          <div className="flex items-center gap-md mb-md">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="4" className="text-surface-container-highest" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary" strokeDasharray="213.6" strokeDashoffset="42.7" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">12</span>
              </div>
            </div>
            <div>
              <p className="text-white font-label-md text-label-md">12 days in a row!</p>
              <p className="text-on-surface-variant text-sm">Keep the narrative alive.</p>
            </div>
          </div>
          <div className="bg-surface-container-low/50 border border-white/5 rounded-lg p-sm">
            <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Last Watched</p>
            <p className="text-white font-label-md">The Last Frame</p>
          </div>
        </div>

        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-xl p-md">
          <div className="flex items-center gap-2 mb-sm">
            <Trophy size={18} className="text-primary" />
            <h3 className="font-label-md text-label-md text-white">Trending Now</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant text-sm">Global logs today</span>
            <span className="text-primary font-bold text-lg">24.5k</span>
          </div>
        </div>
      </aside>
    </>
  );
}
