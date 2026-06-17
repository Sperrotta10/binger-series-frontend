import { Tv, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileStatsGridProps {
  loading: boolean;
}

export function ProfileStatsGrid({ loading }: ProfileStatsGridProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full animate-pulse">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-[140px] bg-surface-container rounded-xl border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
      {/* TV Show Milestone Tracker */}
      <button 
        onClick={() => navigate('/catalog')}
        className="text-left flex flex-col justify-between p-lg bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl border border-white/5 relative overflow-hidden group min-h-[140px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#DCB8FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center justify-between relative z-10 w-full mb-md">
          <div className="flex items-center gap-sm text-on-surface-variant group-hover:text-[#DCB8FF] transition-colors">
            <Tv className="w-5 h-5" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em]">Active Airtime</span>
          </div>
          <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-on-surface transition-colors transform group-hover:translate-x-1 duration-300" />
        </div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold leading-none text-on-surface">200</span>
            <span className="text-[18px] text-on-surface-variant font-medium">/50</span>
          </div>
          <span className="text-[14px] text-on-surface-variant">Shows this year</span>
        </div>
      </button>

      {/* Episode Diary Tracker */}
      <button 
        onClick={() => navigate('/diary')}
        className="text-left flex flex-col justify-between p-lg bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl border border-white/5 relative overflow-hidden group min-h-[140px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FBFB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center justify-between relative z-10 w-full mb-md">
          <div className="flex items-center gap-sm text-on-surface-variant group-hover:text-[#00FBFB] transition-colors">
            <BookOpen className="w-5 h-5" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em]">Transmission Log</span>
          </div>
          <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-on-surface transition-colors transform group-hover:translate-x-1 duration-300" />
        </div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold leading-none text-on-surface">130</span>
            <span className="text-[18px] text-on-surface-variant font-medium">/50</span>
          </div>
          <span className="text-[14px] text-on-surface-variant">Episodes entry</span>
        </div>
      </button>
    </div>
  );
}
