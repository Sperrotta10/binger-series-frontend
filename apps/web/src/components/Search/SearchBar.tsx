import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full transition-all duration-300 rounded-lg border bg-surface-container-low/80 backdrop-blur-md overflow-hidden ${
        isFocused 
          ? 'border-primary shadow-[0_0_20px_rgba(220,184,255,0.15)] ring-1 ring-primary/50' 
          : 'border-white/10 shadow-lg'
      }`}
    >
      <div className="pl-4 pr-3 flex items-center justify-center text-on-surface-variant">
        <SearchIcon 
          size={22} 
          className={`transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`} 
        />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for series, movies, or genres..."
        className="w-full py-4 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant/50 font-body-lg text-[18px]"
      />
      
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="pr-4 pl-2 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      )}

      {isLoading && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full overflow-hidden">
          <div className="h-full bg-primary animate-[indeterminate_1.5s_infinite_linear] w-1/2 origin-left" />
        </div>
      )}
    </form>
  );
}
