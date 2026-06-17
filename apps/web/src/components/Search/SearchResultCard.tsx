import { Plus, Check, PlayCircle } from 'lucide-react';

export interface SearchResultCardProps {
  id: string;
  title: string;
  year: string;
  imageUrl: string;
  genre: string;
  score: string;
  inList?: boolean;
}

export function SearchResultCard({ title, year, imageUrl, genre, score, inList }: SearchResultCardProps) {
  return (
    <div className="group relative aspect-[2/3] rounded-md overflow-hidden bg-surface-container-lowest border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(220,184,255,0.25)]">
      {/* Poster Image */}
      <img 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        src={imageUrl} 
        alt={title}
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      {/* Score Badge */}
      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded-[4px] border border-white/10 flex items-center gap-1">
        <span className="text-[10px] font-bold text-streak-amber">{score}</span>
      </div>

      {/* Hover Overlay Actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/40 backdrop-blur-[2px] translate-y-4 group-hover:translate-y-0">
        <button className="flex items-center justify-center gap-2 bg-primary text-on-primary w-3/4 py-2 rounded-md font-label-md hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(220,184,255,0.4)]">
          <PlayCircle size={16} /> Quick Log
        </button>
        <button className={`flex items-center justify-center gap-2 w-3/4 py-2 rounded-md font-label-md transition-colors border ${inList ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-container-high/80 border-white/10 text-on-surface-variant hover:text-white hover:border-white/30'}`}>
          {inList ? <Check size={16} className="text-primary" /> : <Plus size={16} />} 
          {inList ? 'Added' : 'Add to List'}
        </button>
      </div>

      {/* Metadata */}
      <div className="absolute bottom-0 left-0 p-sm w-full transform transition-transform duration-300 group-hover:translate-y-2 group-hover:opacity-0">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">{genre}</p>
        <h3 className="font-label-md text-label-md text-white line-clamp-1 leading-tight">{title}</h3>
        <p className="text-[12px] text-on-surface-variant mt-0.5">{year}</p>
      </div>
    </div>
  );
}
