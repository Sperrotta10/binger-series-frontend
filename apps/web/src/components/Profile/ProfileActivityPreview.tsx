import React from 'react';
import { Calendar, Star } from 'lucide-react';
import type { ActivityEntry } from '../../types/profile';

interface ProfileActivityPreviewProps {
  activities: ActivityEntry[];
  loading: boolean;
}

export function ProfileActivityPreview({ activities, loading }: ProfileActivityPreviewProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-sm animate-pulse w-full">
        <div className="h-8 w-48 bg-surface-container rounded mb-sm" />
        <div className="flex flex-col gap-sm">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-surface-container rounded-xl border border-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Calendar className="w-5 h-5 text-[#00FBFB]" />
          <h2 className="text-[20px] font-bold tracking-tight text-on-surface">Recent Activity</h2>
        </div>
        <button className="text-[13px] font-semibold text-on-surface-variant hover:text-[#DCB8FF] transition-colors">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-sm">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col gap-xs p-md bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl border border-white/5 group">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-on-surface group-hover:text-[#00FBFB] transition-colors">{activity.title}</h3>
              <span className="text-[12px] text-on-surface-variant font-medium">{activity.date}</span>
            </div>
            <div className="flex items-center gap-[2px] text-[#DCB8FF]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < activity.rating ? 'fill-current' : 'opacity-20'}`} />
              ))}
            </div>
            {activity.comment && (
              <p className="text-[14px] text-on-surface-variant italic border-l-2 border-[#1F1F24] pl-xs mt-xs group-hover:border-[#DCB8FF]/30 transition-colors">
                "{activity.comment}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
