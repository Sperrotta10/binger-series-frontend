import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Minus,
  Plus,
  RotateCcw,
  MessageSquare,
  Share2,
  Send,
  Loader2,
} from 'lucide-react';
import { useQuickLog } from './QuickLogContext';
import { ActivityService, CatalogService, type HybridSearchResult } from '@binger/shared';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Toast } from '../Toast';

interface SearchResult {
  id: string;
  title: string;
  year: string;
  posterUrl?: string;
  genre?: string;
  isImported?: boolean;
}

interface HalfStarProps {
  index: number;
  rating: number;
  hoverRating: number;
  onRate: (value: number) => void;
  onHover: (value: number) => void;
  onLeave: () => void;
  disabled: boolean;
}

const HalfStar: React.FC<HalfStarProps> = ({
  index,
  rating,
  hoverRating,
  onRate,
  onHover,
  onLeave,
  disabled,
}) => {
  const activeRating = hoverRating > 0 ? hoverRating : rating;
  const isFull = activeRating >= index;
  const isHalf = !isFull && activeRating >= index - 0.5;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2 ? index - 0.5 : index;
    onHover(half);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const val = x < rect.width / 2 ? index - 0.5 : index;
    onRate(val);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      className="relative p-1 focus:outline-none transition-transform hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
      aria-label={`Rate ${index - 0.5} or ${index} stars`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" className="transition-all duration-150">
        <defs>
          <linearGradient id={`half-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor={isHalf || isFull ? '#F5C518' : 'transparent'} />
            <stop offset="50%" stopColor={isFull ? '#F5C518' : 'transparent'} />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
        {(isHalf || isFull) && (
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={isFull ? '#F5C518' : `url(#half-grad-${index})`}
            clipPath={isHalf && !isFull ? 'inset(0 50% 0 0)' : undefined}
          />
        )}
        {isHalf && !isFull && (
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#F5C518"
            clipPath="inset(0 50% 0 0)"
          />
        )}
      </svg>
    </button>
  );
};

function mapHybridResult(result: HybridSearchResult): SearchResult {
  return {
    id: result.id,
    title: result.title,
    year: result.premiered?.substring(0, 4) ?? '',
    posterUrl: result.poster_url ?? undefined,
    genre: result.genres?.[0],
    isImported: result.isImported,
  };
}

export const QuickLogModal: React.FC = () => {
  const { isOpen, entity, closeModal } = useQuickLog();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedShow, setSelectedShow] = useState<SearchResult | null>(null);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isRewatch, setIsRewatch] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const debouncedQuery = useDebouncedValue(searchQuery, 450);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && entity) {
      setTimeout(() => {
        setSelectedShow({
        id: entity.seriesId,
        title: entity.title,
        year: '',
        posterUrl: entity.posterUrl,
        genre: entity.subtitle ?? '',
      });
      }, 0);
      setTimeout(() => {
        setSearchQuery(entity.title !== 'Log Activity' ? entity.title : '');
      }, 0);
      setTimeout(() => {
        setRating(entity.initialRating ?? 0);
      }, 0);
      setTimeout(() => {
        setHoverRating(0);
      }, 0);
      setTimeout(() => {
        setSeason(entity.seasonNumber ?? 1);
      }, 0);
      setTimeout(() => {
        setEpisode(entity.episodeNumber ?? 1);
      }, 0);
      setTimeout(() => {
        setReviewText(entity.initialReview ?? '');
      }, 0);
      setTimeout(() => {
        setIsRewatch(entity.initialRewatch ?? false);
      }, 0);
      setTimeout(() => {
        setIsReviewOpen(Boolean(entity.initialReview));
      }, 0);
      setTimeout(() => {
        setError(null);
      }, 0);
    }
  }, [isOpen, entity]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) return;

    const q = debouncedQuery.trim();
    if (q.length < 2) {
      setTimeout(() => {
        setSearchResults([]);
      }, 0);
      setTimeout(() => {
        setIsSearching(false);
      }, 0);
      return;
    }

    let cancelled = false;
    setTimeout(() => {
      setIsSearching(true);
    }, 0);

    CatalogService.hybridSearch({ q })
      .then((resp) => {
        if (cancelled) return;
        setSearchResults((resp?.data ?? []).map(mapHybridResult));
      })
      .catch(() => {
        if (!cancelled) setSearchResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsSearching(false);
      });

    return () => { cancelled = true; };
  }, [debouncedQuery, isOpen]);

  const handleSelectResult = (result: SearchResult) => {
    setSelectedShow(result);
    setSearchQuery(result.title);
    setSearchResults([]);
  };

  const handleShare = async () => {
    const seriesId = selectedShow?.id ?? entity?.seriesId;
    if (!seriesId) return;

    const shareUrl = `${window.location.origin}/shows/${seriesId}`;
    const sharePayload = {
      title: selectedShow?.title ?? entity?.title ?? 'Binger Series',
      text: `Check out ${selectedShow?.title ?? 'this show'} on Binger`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
      setToastVisible(true);
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setToastVisible(true);
      } catch {
        setError('Could not copy share link.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (entity?.mode === 'edit' && entity.logId) {
        await ActivityService.updateWatchLog(entity.logId, { is_rewatch: isRewatch });
      } else if (entity?.type === 'episode' && entity.episodeId) {
        await ActivityService.watchEpisode({ episode_id: entity.episodeId });
      }

      if (entity?.type === 'episode' && entity.episodeId && entity.seasonId && rating > 0) {
        await ActivityService.createEpisodeReview({
          series_id: entity.seriesId,
          season_id: entity.seasonId,
          episode_id: entity.episodeId,
          rating,
          content: isReviewOpen ? reviewText : '',
          contains_spoilers: false,
        });
      } else if (entity?.seriesId && rating > 0 && entity.type !== 'episode') {
        await ActivityService.createSeriesReview({
          series_id: entity.seriesId,
          rating,
          content: isReviewOpen ? reviewText : '',
          contains_spoilers: false,
        });
      }

      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save log. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !entity) return null;

  const displayRating = hoverRating > 0 ? hoverRating : rating;
  const episodeTitle = selectedShow
    ? `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
    : null;
  const modalTitle = entity.mode === 'edit' ? 'Edit Diary Entry' : 'Log an Episode';

  return (
    <>
      <Toast
        message="Share link copied to clipboard!"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-lg"
          onClick={!isSubmitting ? closeModal : undefined}
          aria-hidden="true"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalTitle}
          className="relative flex flex-col lg:flex-row shrink-0 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)] border border-white/10 max-h-[95vh] overflow-y-auto"
          style={{ width: '860px', maxWidth: 'calc(100vw - 2rem)', minHeight: '520px' }}
        >
          <div
            className="flex flex-col gap-5 p-7 lg:w-1/2"
            style={{ background: 'linear-gradient(160deg, #1a1a22 0%, #16161e 100%)' }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#DCB8FF]/15 border border-[#DCB8FF]/30 flex items-center justify-center">
                <Send size={18} className="text-[#DCB8FF] rotate-[-30deg]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {modalTitle}
                </h2>
                <p className="text-xs text-white/40 mt-0.5 leading-snug">
                  Recording your journey through the multiverse.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="ml-auto p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-white/40 tracking-[0.12em] uppercase">
                What did you watch?
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search series title..."
                  className="w-full bg-white/5 border border-white/8 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#DCB8FF]/50 focus:ring-1 focus:ring-[#DCB8FF]/30 transition-all"
                />
                {isSearching && (
                  <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 animate-spin" />
                )}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1F1F28] border border-white/10 rounded-lg overflow-hidden z-10 shadow-xl max-h-48 overflow-y-auto">
                    {searchResults.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleSelectResult(r)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="w-7 aspect-[2/3] bg-white/5 rounded flex-shrink-0 border border-white/10 overflow-hidden">
                          {r.posterUrl ? (
                            <img src={r.posterUrl} alt="" className="w-full h-full object-cover" />
                          ) : null}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{r.title}</p>
                          <p className="text-xs text-white/40">{r.year}{r.genre ? ` · ${r.genre}` : ''}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-white/40 tracking-[0.12em] uppercase">Season</label>
                <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-lg px-3 py-2.5">
                  <button type="button" onClick={() => setSeason((s) => Math.max(1, s - 1))} className="text-white/40 hover:text-white transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-white tabular-nums">{season}</span>
                  <button type="button" onClick={() => setSeason((s) => s + 1)} className="text-white/40 hover:text-white transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-white/40 tracking-[0.12em] uppercase">Episode</label>
                <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-lg px-3 py-2.5">
                  <button type="button" onClick={() => setEpisode((ep) => Math.max(1, ep - 1))} className="text-white/40 hover:text-white transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-white tabular-nums">{episode}</span>
                  <button type="button" onClick={() => setEpisode((ep) => ep + 1)} className="text-white/40 hover:text-white transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-xl border border-white/8 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex gap-3 p-3">
                <div className="flex-shrink-0 w-14 aspect-[2/3] rounded-lg bg-gradient-to-br from-[#DCB8FF]/20 to-[#00FBFB]/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  {selectedShow?.posterUrl ? (
                    <img src={selectedShow.posterUrl} alt={selectedShow.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[9px] text-white/20 uppercase tracking-wider text-center px-1">
                      {selectedShow?.title?.slice(0, 2) ?? '—'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{selectedShow?.title ?? 'Select a show'}</p>
                  <p className="text-xs text-white/50 leading-snug">
                    Season {season}, Episode {episode}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {selectedShow?.genre && (
                      <span className="text-[10px] font-medium text-[#00FBFB] bg-[#00FBFB]/10 border border-[#00FBFB]/20 px-2 py-0.5 rounded-full">
                        {selectedShow.genre}
                      </span>
                    )}
                    {episodeTitle && (
                      <span className="text-[10px] font-medium text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        {episodeTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-7 lg:w-1/2"
            style={{ background: 'linear-gradient(160deg, #141419 0%, #111116 100%)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-col items-center gap-3 flex-1 justify-center">
              <label className="text-[10px] font-semibold text-white/40 tracking-[0.14em] uppercase">Rating</label>
              <div className="relative flex items-end justify-center gap-1">
                <span
                  className="font-black leading-none tabular-nums transition-all duration-200"
                  style={{
                    fontSize: '72px',
                    color: displayRating > 0 ? '#F5C518' : 'rgba(255,255,255,0.08)',
                    fontFamily: 'Sora, sans-serif',
                    textShadow: displayRating > 0 ? '0 0 40px rgba(245,197,24,0.3)' : 'none',
                  }}
                >
                  {displayRating > 0 ? displayRating.toFixed(1) : '—'}
                </span>
                {displayRating > 0 && (
                  <span className="text-lg font-semibold text-white/30 mb-3">/5</span>
                )}
              </div>
              <div className="flex items-center gap-0.5" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <HalfStar
                    key={i}
                    index={i}
                    rating={rating}
                    hoverRating={hoverRating}
                    onRate={setRating}
                    onHover={setHoverRating}
                    onLeave={() => {}}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              {rating > 0 && (
                <button
                  type="button"
                  onClick={() => setRating(0)}
                  className="text-[10px] text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
                >
                  Clear rating
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-white/40 tracking-[0.12em] uppercase">Quick Actions</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRewatch((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 flex-1 justify-center ${
                    isRewatch
                      ? 'bg-[#DCB8FF]/15 border-[#DCB8FF]/40 text-[#DCB8FF]'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  <RotateCcw size={13} />
                  Rewatch
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewOpen((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 flex-1 justify-center ${
                    isReviewOpen
                      ? 'bg-[#DCB8FF]/15 border-[#DCB8FF]/40 text-[#DCB8FF]'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  <MessageSquare size={13} />
                  Review
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 flex-1 justify-center bg-white/5 border-white/10 text-white/50 hover:border-[#00FBFB]/40 hover:text-[#00FBFB]"
                >
                  <Share2 size={13} />
                  Share
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isReviewOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review…"
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DCB8FF]/40 focus:ring-1 focus:ring-[#DCB8FF]/25 resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-[#0e0e14] text-sm transition-all duration-300 overflow-hidden group disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #DCB8FF 0%, #c084fc 50%, #a855f7 100%)',
                  boxShadow: '0 0 24px rgba(220,184,255,0.35)',
                }}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Saving...' : 'Save to Diary'}
                </span>
                {isSubmitting ? (
                  <Loader2 size={16} className="relative z-10 animate-spin" />
                ) : (
                  <Send size={15} className="relative z-10 rotate-[30deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <p className="text-center text-[11px] text-white/30 leading-snug">
                Changes are only saved when you click Save to Diary.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
