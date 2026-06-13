import { Calendar, Flame, Play, ArrowRight } from 'lucide-react';

export const DailySummary = () => {
  // Progress ring metrics
  const hours = 4.2;
  const goalHours = 5;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(hours / goalHours, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="col-span-4 sticky top-xl h-fit space-y-md">

      {/* ── Daily Summary ── */}
      <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 p-md rounded-md shadow-[0_0_15px_rgba(220,184,255,0.05)]">
        <div className="flex items-center justify-between mb-md">
          <h2 className="font-headline-md text-headline-md text-white">Daily Summary</h2>
          <Calendar size={20} className="text-on-surface-variant" />
        </div>

        {/* Progress Ring — Vivid Violet */}
        <div className="flex flex-col items-center mb-md">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
              {/* Track */}
              <circle
                cx="96" cy="96" r={radius}
                fill="transparent"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />
              {/* Vivid Violet active arc */}
              <circle
                cx="96" cy="96" r={radius}
                fill="transparent"
                stroke="#dcb8ff"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ filter: 'drop-shadow(0 0 8px rgba(220,184,255,0.5))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display-lg text-[36px] font-bold text-white leading-none">{hours}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Hrs Today</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-[13px] italic text-center mt-sm">
            "45 mins left to reach your goal!"
          </p>
        </div>

        {/* Active Streak — Luxury Amber */}
        <div className="bg-surface-container-high/50 p-md rounded-md border border-streak-amber/20 flex items-center justify-between mb-md">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Active Streak</p>
            <p
              className="font-headline-lg text-headline-lg text-streak-amber"
              style={{ textShadow: '0 0 15px rgba(255,179,0,0.5)' }}
            >
              12 Days
            </p>
          </div>
          <div className="w-14 h-14 bg-streak-amber/10 rounded-md flex items-center justify-center border border-streak-amber/30">
            <Flame size={28} className="text-streak-amber drop-shadow-[0_0_8px_rgba(255,179,0,0.5)]" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-sm">
          <div className="bg-surface-container-high p-sm rounded-md border border-white/5">
            <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Episodes</p>
            <p className="text-xl font-bold text-white">8</p>
          </div>
          <div className="bg-surface-container-high p-sm rounded-md border border-white/5">
            <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">XP Gained</p>
            <p className="text-xl font-bold text-primary drop-shadow-[0_0_6px_rgba(220,184,255,0.6)]">450</p>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 p-md rounded-md">
        <h3 className="font-label-md text-label-md text-white mb-md uppercase tracking-wider">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button className="w-full flex items-center justify-between p-sm rounded-md bg-white/5 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 group">
            <div className="flex items-center gap-sm">
              <Play size={16} className="text-primary" />
              <span className="text-[14px] text-on-surface">Resume: Succession</span>
            </div>
            <Play size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-full flex items-center justify-between p-sm rounded-md bg-white/5 hover:bg-secondary-fixed/10 border border-transparent hover:border-secondary-fixed/20 transition-all duration-200 group">
            <div className="flex items-center gap-sm">
              <ArrowRight size={16} className="text-secondary-fixed" />
              <span className="text-[14px] text-on-surface">Discover Similar</span>
            </div>
            <ArrowRight size={16} className="text-secondary-fixed opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

    </div>
  );
};
