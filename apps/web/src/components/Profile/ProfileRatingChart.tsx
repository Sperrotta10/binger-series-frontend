import React, { useEffect, useRef } from 'react';
import type { RatingBar } from '../../types/profile';

/** Static skeleton heights — fixed so every render is identical (pure component rule). */
const SKELETON_HEIGHTS = [45, 62, 38, 78, 55, 90, 67, 83, 42, 70];

interface ProfileRatingChartProps {
  data: RatingBar[];
  loading?: boolean;
}

export function ProfileRatingChart({ data, loading = false }: ProfileRatingChartProps) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate bars in on mount via a CSS class toggle
  useEffect(() => {
    if (loading) return;
    const timeout = setTimeout(() => {
      barRefs.current.forEach((bar) => {
        if (bar) bar.style.transform = 'scaleY(1)';
      });
    }, 80);
    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center gap-md animate-pulse bg-surface-container rounded-2xl p-md border border-white/5 h-full"
        style={{ background: 'linear-gradient(135deg, rgba(31,31,36,0.9) 0%, rgba(18,19,23,0.95) 100%)' }}
      >
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 bg-surface-container-high rounded" />
          <div className="h-3 w-20 bg-surface-container-high rounded" />
        </div>
        {/* Bars skeleton */}
        <div className="flex items-end gap-[5px] h-[88px] w-full mb-sm">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-[4px] flex-1">
              <div className="w-full flex flex-col justify-end" style={{ height: '72px' }}>
                <div className="w-full bg-surface-container-high rounded-t-[3px]" style={{ height: `${SKELETON_HEIGHTS[i]}%` }} />
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded" />
            </div>
          ))}
        </div>
        {/* Stats grid skeleton */}
        <div className="grid grid-cols-3 gap-xs pt-sm border-t border-white/5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1 p-xs rounded-lg bg-white/5">
              <div className="h-2 w-16 bg-surface-container-high rounded" />
              <div className="h-4 w-10 bg-surface-container-high rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center gap-md bg-surface-container rounded-2xl p-md border border-white/5 relative overflow-hidden h-full"
      style={{ background: 'linear-gradient(135deg, rgba(31,31,36,0.9) 0%, rgba(18,19,23,0.95) 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-12 blur-[40px] bg-[#DCB8FF]/15 pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-xs">
          <span className="text-[14px] font-bold tracking-tight text-on-surface">Rating Distribution</span>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
          {data.reduce((s, d) => s + d.count, 0)} ratings
        </span>
      </div>

      <div className="flex items-end gap-[5px] h-[88px] w-full relative z-10 mb-sm">
        {data.map((bar, i) => {
          const pct = (bar.count / max) * 100;
          return (
            <div key={bar.score} className="flex flex-col items-center gap-[4px] flex-1">
              {/* Bar wrapper — acts as container for grow animation */}
              <div className="w-full flex flex-col justify-end" style={{ height: '72px' }}>
                <div
                  ref={(el) => { barRefs.current[i] = el; }}
                  title={`${bar.score}★ — ${bar.count} ratings`}
                  className="w-full rounded-t-[3px] cursor-pointer group/bar transition-all duration-200 hover:brightness-125"
                  style={{
                    height: `${pct}%`,
                    minHeight: bar.count > 0 ? '4px' : '0px',
                    background: `linear-gradient(to top, #8a2be2, #DCB8FF)`,
                    transform: 'scaleY(0)',
                    transformOrigin: 'bottom',
                    transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 45}ms, filter 0.2s`,
                    boxShadow: pct > 60 ? '0 0 12px rgba(220,184,255,0.35)' : undefined,
                  }}
                />
              </div>
              {/* Score label */}
              <span className="text-[9px] font-semibold text-on-surface-variant leading-none">{bar.score}</span>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics Grid to fix visual balance */}
      <div className="grid grid-cols-3 gap-xs pt-sm border-t border-white/5 relative z-10">
        <div className="flex flex-col items-center justify-center p-xs rounded-lg bg-white/5">
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Most Common</span>
          <span className="text-[14px] font-bold text-on-surface">
            {data.reduce((prev, current) => (prev.count > current.count) ? prev : current).score}★
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-xs rounded-lg bg-white/5">
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Masterpieces</span>
          <span className="text-[14px] font-bold text-[#FFC107]">
            {data.find(d => d.score === '5.0')?.count || 0}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-xs rounded-lg bg-white/5">
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Average</span>
          <span className="text-[14px] font-bold text-on-surface">
            {(data.reduce((sum, d) => sum + (parseFloat(d.score) * d.count), 0) / Math.max(1, data.reduce((sum, d) => sum + d.count, 0))).toFixed(1)}★
          </span>
        </div>
      </div>
    </div>
  );
}
