import React, { useEffect, useState } from 'react';
import { ActivityService } from '@binger/shared/src/api/services/activity.service';
import { DiaryRow, type DiaryEntryType } from '../components/DiaryRow';
import { CalendarDays, Tv2, BarChart2, Star } from 'lucide-react';

// ── Mock data for development (replaces empty API response) ──────────────────
const MOCK_ENTRIES: DiaryEntryType[] = [
  {
    log_id: 'log-1',
    watched_at: new Date(Date.now() - 0 * 86400000).toISOString(),
    is_rewatch: false,
    rating: 5,
    liked: true,
    episode: {
      id: 'ep-1',
      title: 'The Ghost Signal',
      season_number: 2,
      episode_number: 8,
      thumbnail_url: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-1', title: 'Neo-Genesis: Protocol' },
    },
  },
  {
    log_id: 'log-2',
    watched_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_rewatch: false,
    rating: 4,
    liked: false,
    review: 'A bit slower than the last ep but worldbuilding is 10/10.',
    episode: {
      id: 'ep-2',
      title: 'Silent Rhythm',
      season_number: 4,
      episode_number: 2,
      thumbnail_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-2', title: 'The Midnight Serenade' },
    },
  },
  {
    log_id: 'log-3',
    watched_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_rewatch: true,
    rating: 5,
    liked: true,
    episode: {
      id: 'ep-3',
      title: 'The Rift',
      season_number: 1,
      episode_number: 15,
      thumbnail_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-3', title: 'Starbound Voyagers' },
    },
  },
  {
    log_id: 'log-4',
    watched_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    is_rewatch: false,
    rating: 3,
    liked: false,
    episode: {
      id: 'ep-4',
      title: 'Hollow Men',
      season_number: 1,
      episode_number: 4,
      thumbnail_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-4', title: 'The Arcane Division' },
    },
  },
  {
    log_id: 'log-5',
    watched_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    is_rewatch: false,
    rating: 4,
    liked: true,
    review: 'Really strong episode, the pacing was perfect.',
    episode: {
      id: 'ep-5',
      title: 'Fire and Frost',
      season_number: 3,
      episode_number: 11,
      thumbnail_url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-5', title: 'Dragon Empire' },
    },
  },
  {
    log_id: 'log-6',
    watched_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    is_rewatch: true,
    rating: 5,
    liked: true,
    episode: {
      id: 'ep-6',
      title: 'Pilot',
      season_number: 1,
      episode_number: 1,
      thumbnail_url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop',
      series: { id: 'ser-6', title: 'Breaking the Silence' },
    },
  },
];

// ── Group entries by calendar day ────────────────────────────────────────────
function groupByDate(entries: DiaryEntryType[]): Record<string, DiaryEntryType[]> {
  return entries.reduce<Record<string, DiaryEntryType[]>>((acc, entry) => {
    const key = new Date(entry.watched_at).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});
}

function formatGroupLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// ── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="grid grid-cols-[72px_120px_1fr_160px_80px] items-center gap-md px-md py-sm border-b border-white/5 animate-pulse">
      <div className="flex flex-col items-center gap-1">
        <div className="h-6 w-8 bg-surface-container-high rounded" />
        <div className="h-3 w-10 bg-surface-container-high rounded" />
      </div>
      <div className="w-[104px] h-[68px] bg-surface-container-high rounded-lg" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-48 bg-surface-container-high rounded" />
        <div className="h-3 w-32 bg-surface-container-high rounded" />
      </div>
      <div className="flex items-center justify-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-surface-container-high rounded" />
        ))}
      </div>
      <div className="flex justify-end">
        <div className="h-5 w-5 bg-surface-container-high rounded-full" />
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-[6px] px-md py-sm bg-surface-container rounded-xl border border-white/5 min-w-[120px]">
      <div className="flex items-center gap-[6px] text-on-surface-variant">
        <Icon className="w-4 h-4" style={color ? { color } : {}} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <span className="text-[28px] font-bold leading-none text-on-surface" style={color ? { color } : {}}>
        {value}
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function Diary() {
  const [entries, setEntries] = useState<DiaryEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const logData = await ActivityService.getWatchLog();
        const mapped = (logData?.data || []).map((item: any, idx: number) => ({
          log_id: item.log_id || `log-${idx}`,
          watched_at: item.watched_at || new Date(Date.now() - idx * 86400000).toISOString(),
          is_rewatch: !!item.is_rewatch,
          rating: item.rating,
          liked: item.liked,
          review: item.review,
          episode: {
            id: item.episode_id || `ep-${idx}`,
            title: item.episode_title || 'Unknown Episode',
            season_number: item.season_number || 1,
            episode_number: item.episode_number || idx + 1,
            thumbnail_url: item.thumbnail_url || '',
            series: {
              id: item.series_id || `ser-${idx}`,
              title: item.series_title || 'Unknown Series',
            },
          },
        })) as DiaryEntryType[];

        // Fall back to mock data if API returns empty
        setEntries(mapped.length > 0 ? mapped : MOCK_ENTRIES);
      } catch {
        setEntries(MOCK_ENTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryData();
  }, []);

  const grouped = groupByDate(entries);
  const totalEpisodes = entries.length;
  const liked = entries.filter((e) => e.liked).length;
  const avgRating = entries.filter((e) => e.rating).reduce((s, e) => s + e.rating!, 0) /
    (entries.filter((e) => e.rating).length || 1);

  return (
    <div className="col-span-12 flex flex-col w-full gap-lg py-lg">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-xs">
        <h1 className="text-[36px] font-bold leading-none tracking-tight text-on-surface">
          Diary
        </h1>
        <p className="text-[14px] text-on-surface-variant">
          Your personal chronological watch history
        </p>
      </div>

      {/* ── STAT BAR ─────────────────────────────────────────────────────── */}
      <div className="flex items-stretch gap-md flex-wrap">
        <StatCard
          icon={Tv2}
          label="Episodes logged"
          value={loading ? '—' : totalEpisodes}
          color="#DCB8FF"
        />
        <StatCard
          icon={CalendarDays}
          label="Days active"
          value={loading ? '—' : Object.keys(grouped).length}
        />
        <StatCard
          icon={Star}
          label="Avg. rating"
          value={loading ? '—' : avgRating.toFixed(1)}
          color="#DCB8FF"
        />
        <StatCard
          icon={BarChart2}
          label="Liked"
          value={loading ? '—' : liked}
        />
      </div>

      {/* ── TABLE CONTAINER ──────────────────────────────────────────────── */}
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden">

        {/* Table column headers */}
        <div
          className="grid grid-cols-[72px_120px_1fr_160px_80px] items-center gap-md px-md py-[10px] border-b border-white/10"
          style={{ background: 'rgba(255,255,255,0.025)' }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
            Date
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
            Episode
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
            Title / Series
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant text-center">
            Rating
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant text-right">
            Tags
          </span>
        </div>

        {/* Rows */}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-xl gap-md text-center">
            <CalendarDays className="w-12 h-12 text-outline-variant opacity-40" />
            <div>
              <p className="font-semibold text-on-surface mb-xs">No entries yet</p>
              <p className="text-[13px] text-on-surface-variant">
                Start logging episodes to build your diary.
              </p>
            </div>
          </div>
        ) : (
          Object.entries(grouped).map(([dateKey, dayEntries]) => (
            <div key={dateKey}>
              {/* Day separator */}
              <div className="flex items-center gap-sm px-md py-[8px] border-b border-white/5 sticky top-0 z-10"
                style={{ background: 'rgba(18,19,23,0.9)', backdropFilter: 'blur(8px)' }}>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: '#00FBFB' }}
                >
                  {formatGroupLabel(dateKey)}
                </span>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[11px] text-on-surface-variant">
                  {dayEntries.length} {dayEntries.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>
              {dayEntries.map((entry) => (
                <DiaryRow key={entry.log_id} entry={entry} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
