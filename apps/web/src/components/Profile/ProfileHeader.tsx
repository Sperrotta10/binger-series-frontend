import React from 'react';
import { Settings, Edit2 } from 'lucide-react';
import type { UserProfile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile | null;
  loading: boolean;
}

export function ProfileHeader({ profile, loading }: ProfileHeaderProps) {
  if (loading || !profile) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-lg animate-pulse bg-surface-container rounded-2xl p-lg border border-white/5">
        <div className="w-[120px] h-[120px] rounded-full bg-surface-container-high border-4 border-surface-container-highest" />
        <div className="flex flex-col gap-sm w-full max-w-xl text-center md:text-left">
          <div className="h-8 w-64 bg-surface-container-high rounded" />
          <div className="h-4 w-full bg-surface-container-high rounded" />
          <div className="h-4 w-3/4 bg-surface-container-high rounded" />
          <div className="flex gap-md mt-2">
            <div className="h-6 w-24 bg-surface-container-high rounded" />
            <div className="h-6 w-24 bg-surface-container-high rounded" />
          </div>
          <div className="flex items-center justify-center md:justify-start gap-sm mt-sm">
            <div className="h-10 w-32 bg-surface-container-high rounded" />
            <div className="h-10 w-10 bg-surface-container-high rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-lg bg-surface-container rounded-2xl p-lg border border-white/5 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DCB8FF]/10 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 shrink-0">
        <img
          src={profile.avatarUrl}
          alt={profile.username}
          className="w-[120px] h-[120px] rounded-full object-cover border-[4px] border-[#1F1F24] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_0_2px_#DCB8FF] transition-shadow duration-300"
        />
      </div>
      <div className="flex flex-col gap-xs w-full text-center md:text-left relative z-10">
        <h1 className="text-[32px] md:text-[40px] font-bold leading-tight tracking-tight text-on-surface">
          {profile.username}
        </h1>
        <p className="text-[14px] md:text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
          {profile.bio}
        </p>
        
        {/* Social Metrics */}
        <div className="flex items-center justify-center md:justify-start gap-md mt-xs">
          <div className="flex items-center gap-sm cursor-pointer group/stat">
            <span className="text-[20px] font-bold text-on-surface group-hover/stat:text-[#00FBFB] transition-colors">{profile.followersCount?.toLocaleString() || 0}</span>
            <span className="text-[13px] text-on-surface-variant font-medium uppercase tracking-[0.08em] group-hover/stat:text-on-surface transition-colors">Seguidores</span>
          </div>
          <div className="w-[1px] h-[16px] bg-white/10" />
          <div className="flex items-center gap-sm cursor-pointer group/stat">
            <span className="text-[20px] font-bold text-on-surface group-hover/stat:text-[#00FBFB] transition-colors">{profile.followingCount?.toLocaleString() || 0}</span>
            <span className="text-[13px] text-on-surface-variant font-medium uppercase tracking-[0.08em] group-hover/stat:text-on-surface transition-colors">Siguiendo</span>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-sm mt-md">
          <button className="flex items-center justify-center gap-xs px-md py-sm bg-[#DCB8FF] text-[#121317] font-semibold text-[14px] rounded-lg hover:bg-[#c99cfc] transition-colors shadow-[0_0_20px_rgba(220,184,255,0.2)]">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-surface-container-high text-on-surface hover:bg-white/10 rounded-full transition-colors border border-white/5">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
