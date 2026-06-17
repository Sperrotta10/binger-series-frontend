import React from 'react';
import { Link } from 'react-router-dom';
import { Star, RefreshCw, Heart, MessageSquare, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ActivityService } from '@binger/shared';
import { useQuickLog } from './modals/QuickLogContext';

const MySwal = withReactContent(Swal);

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop';

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
  onDelete?: (logId: string) => void;
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

function PosterThumbnail({ src, alt }: { src?: string; alt: string }) {
  const [broken, setBroken] = React.useState(!src);

  return (
    <div className="relative w-[72px] aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-high shrink-0 shadow-md border border-white/5">
      {!broken && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-[#00FBFB]/5">
          <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider px-1 text-center">
            No Image
          </span>
        </div>
      )}
    </div>
  );
}


export function DiaryRow({ entry, onDelete }: DiaryRowProps) {
  const { openModal } = useQuickLog();
  const dateObj = new Date(entry.watched_at);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  const handleEdit = () => {
    openModal({
      type: 'episode',
      seriesId: entry.episode.series.id,
      seasonNumber: entry.episode.season_number,
      episodeId: entry.episode.id,
      episodeNumber: entry.episode.episode_number,
      title: entry.episode.series.title,
      subtitle: `S${String(entry.episode.season_number).padStart(2, '0')}E${String(entry.episode.episode_number).padStart(2, '0')} — ${entry.episode.title}`,
      posterUrl: entry.episode.thumbnail_url || FALLBACK_POSTER,
      mode: 'edit',
      logId: entry.log_id,
      initialRating: entry.rating,
      initialReview: entry.review,
      initialRewatch: entry.is_rewatch,
    });
  };

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: 'Delete this log entry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DCB8FF',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#1F1F24',
      color: '#fff',
    });

    if (!result.isConfirmed) return;

    try {
      await ActivityService.deleteWatchLog(entry.log_id);
      onDelete?.(entry.log_id);
      MySwal.fire({
        title: 'Deleted',
        text: 'Log entry removed from your diary.',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
        background: '#1F1F24',
        color: '#fff',
      });
    } catch {
      MySwal.fire({
        title: 'Error',
        text: 'Could not delete this entry. Please try again.',
        icon: 'error',
        background: '#1F1F24',
        color: '#fff',
      });
    }
  };

  return (
    <div className="group grid grid-cols-[72px_80px_1fr_140px_120px] items-center gap-md px-md py-sm border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-200">
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-[22px] font-bold leading-none" style={{ color: '#00FBFB' }}>
          {day}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.15em] text-on-surface-variant mt-[2px]">
          {month}
        </span>
      </div>

      <div className="relative">
        <PosterThumbnail src={entry.episode.thumbnail_url} alt={entry.episode.series.title} />
        {entry.is_rewatch && (
          <div className="absolute top-[5px] left-[5px] bg-black/60 backdrop-blur-sm rounded-full p-[4px]">
            <RefreshCw className="w-[10px] h-[10px] text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[4px] min-w-0">
        <Link
          to={`/shows/${entry.episode.series.id}`}
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

      <div className="flex items-center justify-center">
        {entry.rating ? (
          <StarRating rating={entry.rating} />
        ) : (
          <span className="text-[12px] italic text-outline-variant">—</span>
        )}
      </div>

      <div className="flex items-center justify-end gap-[6px]">
        {entry.liked && <Heart className="w-[16px] h-[16px] text-error fill-error" />}
        {entry.is_rewatch && (
          <span
            className="hidden sm:inline text-[10px] font-semibold tracking-wider px-[6px] py-[2px] rounded-full border"
            style={{
              color: '#DCB8FF',
              borderColor: 'rgba(220,184,255,0.3)',
              background: 'rgba(220,184,255,0.08)',
            }}
          >
            REWATCH
          </span>
        )}
        <button
          type="button"
          onClick={handleEdit}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
          aria-label="Edit log entry"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
          aria-label="Delete log entry"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
