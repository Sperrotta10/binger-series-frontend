import { Link } from 'react-router-dom';
import { Star, RefreshCw, Heart, MessageSquare } from 'lucide-react';

export interface DiaryEntryType {
  log_id: string;
  watched_at: string;
  is_rewatch: boolean;
  rating?: number;
  liked?: boolean;
  review?: string;
  episode: {
    id: string;
    title: string;
    season_number: number;
    episode_number: number;
    thumbnail_url: string;
    series: {
      id: string;
      title: string;
    };
  };
}

interface DiaryRowProps {
  entry: DiaryEntryType;
}

function StarRating({ rating }: { rating?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors ${
            i < (rating ?? 0)
              ? 'text-streak-amber fill-streak-amber'
              : 'text-outline-variant fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export function DiaryRow({ entry }: DiaryRowProps) {
  const dateObj = new Date(entry.watched_at);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div className="group grid grid-cols-[72px_120px_1fr_160px_80px] items-center gap-md px-md py-sm border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-200">

      {/* ── COL 1: Date ── */}
      <div className="flex flex-col items-center justify-center text-center">
        <span
          className="text-[22px] font-bold leading-none"
          style={{ color: '#00FBFB' }}
        >
          {day}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.15em] text-on-surface-variant mt-[2px]">
          {month}
        </span>
      </div>

      {/* ── COL 2: Poster Thumbnail ── */}
      <div className="relative w-[104px] h-[68px] rounded-lg overflow-hidden bg-surface-container-high shrink-0 shadow-md">
        <img
          src={entry.episode.thumbnail_url}
          alt={entry.episode.series.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop';
          }}
        />
        {entry.is_rewatch && (
          <div className="absolute top-[5px] left-[5px] bg-black/60 backdrop-blur-sm rounded-full p-[4px]">
            <RefreshCw className="w-[10px] h-[10px] text-primary" />
          </div>
        )}
      </div>

      {/* ── COL 3: Title + Episode Metadata ── */}
      <div className="flex flex-col gap-[4px] min-w-0">
        <Link
          to={`/series/${entry.episode.series.id}`}
          className="font-semibold text-[15px] text-on-surface hover:text-primary transition-colors duration-200 truncate leading-snug"
        >
          {entry.episode.series.title}
        </Link>
        <div className="flex items-center gap-[6px] text-[13px] text-on-surface-variant">
          <span>S{entry.episode.season_number.toString().padStart(2, '0')}</span>
          <span className="text-outline-variant">·</span>
          <span>E{entry.episode.episode_number.toString().padStart(2, '0')}</span>
          <span className="text-outline-variant">·</span>
          <span className="italic truncate text-on-surface-variant/70">
            "{entry.episode.title}"
          </span>
        </div>
        {entry.review && (
          <div className="flex items-start gap-[5px] mt-[2px]">
            <MessageSquare className="w-[11px] h-[11px] text-outline shrink-0 mt-[2px]" />
            <p className="text-[12px] text-on-surface-variant/60 line-clamp-1 italic">
              {entry.review}
            </p>
          </div>
        )}
      </div>

      {/* ── COL 4: Star Rating ── */}
      <div className="flex items-center justify-center">
        {entry.rating ? (
          <StarRating rating={entry.rating} />
        ) : (
          <span className="text-[12px] italic text-outline-variant">—</span>
        )}
      </div>

      {/* ── COL 5: Badges ── */}
      <div className="flex items-center justify-end gap-[8px]">
        {entry.liked && (
          <Heart className="w-[16px] h-[16px] text-error fill-error" />
        )}
        {entry.is_rewatch && (
          <span
            className="text-[10px] font-semibold tracking-wider px-[6px] py-[2px] rounded-full border"
            style={{
              color: '#DCB8FF',
              borderColor: 'rgba(220,184,255,0.3)',
              background: 'rgba(220,184,255,0.08)',
            }}
          >
            REWATCH
          </span>
        )}
      </div>
    </div>
  );
}
