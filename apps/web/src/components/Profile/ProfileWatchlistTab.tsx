import { BookMarked } from 'lucide-react';
import type { WatchlistItem, WatchlistStatus } from '../../types/profile';

interface ProfileWatchlistTabProps {
  items: WatchlistItem[];
}

const STATUS_META: Record<WatchlistStatus, { label: string; color: string }> = {
  'plan-to-watch': { label: 'Plan to Watch', color: '#DCB8FF' },
  'on-hold':       { label: 'On Hold',        color: '#00FBFB' },
  'dropped':       { label: 'Dropped',        color: '#FF6B6B' },
};

export function ProfileWatchlistTab({ items }: ProfileWatchlistTabProps) {
  const byStatus = (s: WatchlistStatus) => items.filter((i) => i.status === s);
  const statuses: WatchlistStatus[] = ['plan-to-watch', 'on-hold', 'dropped'];

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center gap-xs">
        <BookMarked className="w-5 h-5 text-[#00FBFB]" />
        <h2 className="text-[20px] font-bold tracking-tight text-on-surface">Watchlist</h2>
        <span className="text-[13px] text-on-surface-variant ml-xs">{items.length} shows</span>
      </div>

      {statuses.map((status) => {
        const group = byStatus(status);
        if (group.length === 0) return null;
        const meta = STATUS_META[status];
        return (
          <div key={status} className="flex flex-col gap-md">
            {/* Section header */}
            <div className="flex items-center gap-sm">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: meta.color }}
              >
                {meta.label}
              </span>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[11px] text-on-surface-variant">{group.length}</span>
            </div>

            {/* Poster grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-sm">
              {group.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/90 via-[#121317]/20 to-transparent z-10" />
                  {/* Status dot */}
                  <div
                    className="absolute top-sm left-sm z-20 w-2 h-2 rounded-full shadow-lg"
                    style={{ backgroundColor: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
                  />
                  {/* Genre chip */}
                  <div className="absolute top-sm right-sm z-20">
                    <span className="text-[9px] font-semibold uppercase tracking-wider px-[6px] py-[2px] rounded-full bg-black/50 border border-white/10 text-on-surface-variant backdrop-blur-sm">
                      {item.genre}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-sm z-20">
                    <p className="text-[11px] font-semibold text-on-surface leading-tight line-clamp-2">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
