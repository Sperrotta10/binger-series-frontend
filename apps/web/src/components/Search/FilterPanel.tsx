import React from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

export interface FilterState {
  status: string;
  genre: string;
  platform: string;
  score: string;
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const GENRES = ['All', 'Sci-Fi', 'Drama', 'Thriller', 'Action', 'Comedy', 'Documentary'];
const STATUSES = ['All', 'Airing', 'Completed', 'Upcoming'];
const PLATFORMS = ['All', 'Netflix', 'HBO Max', 'Apple TV+', 'Prime Video'];
const SCORES = ['Any', '9+', '8+', '7+', 'Under 7'];

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-xl p-md mt-md">
      <div className="flex items-center gap-2 mb-sm text-on-surface">
        <SlidersHorizontal size={18} className="text-primary" />
        <h3 className="font-headline-md text-[16px] font-semibold">Refine Search</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
        {/* Genre Filter */}
        <div className="space-y-1">
          <label className="text-[12px] font-label-sm text-on-surface-variant uppercase tracking-wider">Genre</label>
          <div className="relative group">
            <select
              value={filters.genre}
              onChange={(e) => updateFilter('genre', e.target.value)}
              className="w-full appearance-none bg-surface-container-highest/50 border border-white/5 rounded-md py-2 pl-3 pr-8 text-[14px] text-on-surface outline-none transition-all focus:border-primary/50 focus:bg-surface-container-highest group-hover:border-white/20"
            >
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[12px] font-label-sm text-on-surface-variant uppercase tracking-wider">Status</label>
          <div className="relative group">
            <select
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
              className="w-full appearance-none bg-surface-container-highest/50 border border-white/5 rounded-md py-2 pl-3 pr-8 text-[14px] text-on-surface outline-none transition-all focus:border-primary/50 focus:bg-surface-container-highest group-hover:border-white/20"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Platform Filter */}
        <div className="space-y-1">
          <label className="text-[12px] font-label-sm text-on-surface-variant uppercase tracking-wider">Platform</label>
          <div className="relative group">
            <select
              value={filters.platform}
              onChange={(e) => updateFilter('platform', e.target.value)}
              className="w-full appearance-none bg-surface-container-highest/50 border border-white/5 rounded-md py-2 pl-3 pr-8 text-[14px] text-on-surface outline-none transition-all focus:border-primary/50 focus:bg-surface-container-highest group-hover:border-white/20"
            >
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Score Filter */}
        <div className="space-y-1">
          <label className="text-[12px] font-label-sm text-on-surface-variant uppercase tracking-wider">Min Score</label>
          <div className="relative group">
            <select
              value={filters.score}
              onChange={(e) => updateFilter('score', e.target.value)}
              className="w-full appearance-none bg-surface-container-highest/50 border border-white/5 rounded-md py-2 pl-3 pr-8 text-[14px] text-on-surface outline-none transition-all focus:border-primary/50 focus:bg-surface-container-highest group-hover:border-white/20"
            >
              {SCORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
      
      {/* Active filters summary */}
      <div className="mt-sm pt-sm border-t border-white/5 flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value === 'All' || value === 'Any') return null;
          return (
            <div key={key} className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-[4px] text-[12px]">
              <span className="capitalize opacity-70">{key}:</span> <span className="font-medium">{value}</span>
              <button 
                onClick={() => updateFilter(key as keyof FilterState, key === 'score' ? 'Any' : 'All')}
                className="ml-1 hover:text-white transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
