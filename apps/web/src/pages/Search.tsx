import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/Search/SearchBar';
import { FilterPanel, type FilterState } from '../components/Search/FilterPanel';
import { SearchResultCard, type SearchResultCardProps } from '../components/Search/SearchResultCard';
import { Sparkles, Loader2, Compass, ChevronRight, Search as SearchIcon, Flame, Trophy } from 'lucide-react';

// Mock Data for the demonstration based on Stitch designs
const MOCK_MOODS = [
  { id: 1, title: 'Heart-pounding suspense & tech-noirs' },
  { id: 2, title: 'Introspective dramas & poetic visuals' },
  { id: 3, title: 'High-octane action & neon aesthetics' },
  { id: 4, title: 'Mind-bending sci-fi & philosophy' },
];

const MOCK_RESULTS = [
  { id: '1', title: 'The Obelisk', year: '2024', genre: 'Sci-Fi', score: '9.2', inList: false, imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Neon Pulse', year: '2023', genre: 'Drama / Noir', score: '8.8', inList: true, imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'Projector X', year: '2025', genre: 'Documentary', score: '7.5', inList: false, imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop' },
  { id: '4', title: 'The Server', year: '2024', genre: 'Thriller', score: '8.1', inList: false, imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' },
  { id: '5', title: 'Echoes', year: '2022', genre: 'Biography', score: '8.9', inList: true, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop' },
  { id: '6', title: 'Floating Realms', year: '2026', genre: 'Fantasy', score: '9.5', inList: false, imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' },
  { id: '7', title: 'Red Velvet', year: '2025', genre: 'Art-House', score: '8.4', inList: false, imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop' },
  { id: '8', title: 'Scripted', year: '2024', genre: 'Mystery', score: '7.9', inList: false, imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop' },
  { id: '9', title: 'Utopia 2049', year: '2026', genre: 'Sci-Fi', score: '9.1', inList: true, imageUrl: 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=600&auto=format&fit=crop' },
];

import { CatalogService } from '@binger/shared';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    genre: 'All',
    platform: 'All',
    score: 'Any',
  });
  
  const [results, setResults] = useState<SearchResultCardProps[]>([]);
  const [aiRecs, setAiRecs] = useState<SearchResultCardProps[]>(MOCK_RESULTS);

  // Derived state to avoid cascading renders inside useEffect
  const hasSearched = !!query || Object.values(filters).some(v => v !== 'All' && v !== 'Any');

  useEffect(() => {
    // Load initial trending/recommendations
    const loadInitial = async () => {
      try {
        const trending = await CatalogService.getTrending();
        if (trending && trending.data) {
          setAiRecs(trending.data.map(item => ({
            id: item.id,
            title: item.title,
            year: '',
            genre: 'Trending',
            score: item.rating_average.toString(),
            imageUrl: item.poster_url,
            inList: false
          })));
        }
      } catch {
        console.log('Using mock AI recs fallback');
      }
    };
    loadInitial();
  }, []);

  // Simulate API call and connect to shared service
  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      
      try {
        const response = await CatalogService.search({ q: query || 'all' });
        
        if (response && response.data) {
          // Map shared SearchResult to component props
          const mapped = response.data.map(item => ({
            id: item.id,
            title: item.title,
            year: item.premiered ? item.premiered.substring(0, 4) : 'Unknown',
            genre: 'Result', // backend doesn't return genre in search result
            score: item.rating_average ? item.rating_average.toString() : 'N/A',
            imageUrl: item.poster_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop',
            inList: false
          }));
          setResults(mapped);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.warn('Backend search failed, using mock data for demo', error);
        // Fallback to mock filtering logic for demo
        const filtered = MOCK_RESULTS.filter(r => {
          if (query && !r.title.toLowerCase().includes(query.toLowerCase())) return false;
          if (filters.genre !== 'All' && !r.genre.includes(filters.genre)) return false;
          return true;
        });
        setResults(filtered);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  // Featured card is the first AI rec
  const featuredRec = aiRecs[0];
  const gridRecs = aiRecs.slice(1);

  return (
    <>
      {/* ── MAIN CONTENT (8 Columns) ── */}
      <div className="col-span-8 flex flex-col gap-lg">
        {/* Search Header Section */}
        <section className="relative">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-md">
            <div>
              <h1 className="font-display-lg text-display-lg text-white mb-2">Explore the Narrative</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                Dive into curated universes, track your cinematic journey, and discover your next obsession through mood-mapped recommendations.
              </p>
            </div>

            <div className="w-full">
              <SearchBar onSearch={handleSearch} isLoading={isSearching} />
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="relative z-10 min-h-[400px]">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 size={40} className="text-primary animate-spin" />
              <p className="text-on-surface-variant font-label-md animate-pulse">Scanning the multiverse...</p>
            </div>
          ) : hasSearched ? (
            <div className="space-y-sm">
              <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2">
                <Compass className="text-primary" size={24} /> 
                Search Results
              </h2>
              <p className="text-on-surface-variant mb-md text-sm">{results.length} narratives found</p>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
                  {results.map(item => (
                    <SearchResultCard key={item.id} {...item} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-surface-container-low/30 rounded-xl border border-white/5 border-dashed">
                  <SearchIcon size={48} className="text-on-surface-variant/30 mb-4" />
                  <h3 className="text-white font-headline-md mb-2">No signals detected</h3>
                  <p className="text-on-surface-variant max-w-md text-center">We couldn't find any narratives matching your exact criteria. Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => { setQuery(''); setFilters({ status: 'All', genre: 'All', platform: 'All', score: 'Any' }); }}
                    className="mt-6 text-primary hover:text-white transition-colors underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-xl">
              {/* Discover by Mood (Default State) */}
              <div>
                <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2 mb-md">
                  <Sparkles className="text-primary" size={24} /> 
                  Discover by Mood
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {MOCK_MOODS.map(mood => (
                    <button 
                      key={mood.id}
                      className="flex items-center justify-between p-md bg-surface-container-low/50 hover:bg-surface-container border border-white/5 hover:border-primary/30 rounded-xl group transition-all duration-300 text-left"
                      onClick={() => handleSearch(mood.title.split(' ')[0])}
                    >
                      <span className="font-body-md text-on-surface group-hover:text-white transition-colors">{mood.title}</span>
                      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <ChevronRight size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Recs — Featured + Grid */}
              <div>
                <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2 mb-md">
                  <Sparkles className="text-primary" size={24} /> 
                  AI Recs for You
                </h2>
                
                <div className="flex flex-col gap-md">
                  {/* Featured Recommendation (large card) */}
                  {featuredRec && (
                    <div className="group relative w-full h-64 rounded-xl overflow-hidden bg-surface-container-lowest border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(220,184,255,0.2)]">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={featuredRec.imageUrl} 
                        alt={featuredRec.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div>
                      
                      {/* Score Badge */}
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-[4px] border border-white/10 flex items-center gap-1">
                        <span className="text-xs font-bold text-streak-amber">{featuredRec.score}</span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-lg w-full max-w-md">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{featuredRec.genre}</p>
                        <h3 className="font-headline-lg text-headline-lg text-white mb-2">{featuredRec.title}</h3>
                        <p className="text-body-md text-on-surface-variant line-clamp-2">
                          A masterclass in atmospheric sci-fi following an architect's discovery of a hidden civilization.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Grid of smaller cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
                    {gridRecs.map(item => (
                      <SearchResultCard key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── RIGHT PANEL (4 Columns) — Watch Streak Sidebar ── */}
      <aside className="col-span-4 flex flex-col gap-md sticky top-[calc(64px+80px)] self-start">
        {/* Watch Streak Card */}
        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-xl p-md">
          <div className="flex items-center gap-2 mb-md">
            <Flame size={20} className="text-streak-amber" />
            <h3 className="font-headline-md text-[16px] font-semibold text-white">Your Watch Streak</h3>
          </div>
          
          <div className="flex items-center gap-md mb-md">
            <div className="relative w-20 h-20">
              {/* Streak ring */}
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

        {/* Community Stats */}
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
