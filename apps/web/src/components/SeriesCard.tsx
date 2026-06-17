import React from 'react';

interface SeriesCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  badge?: string;
}

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop';

export const SeriesCard: React.FC<SeriesCardProps> = ({ title, subtitle, imageUrl, badge }) => {
  const [imgError, setImgError] = React.useState(false);
  const poster = imgError || !imageUrl ? FALLBACK_POSTER : imageUrl;

  return (
    <div className="group relative aspect-[2/3] rounded-md overflow-hidden bg-surface-container-low border border-white/5 transition-all duration-300 hover:-translate-y-[2px] hover:border-primary/50 hover:shadow-[0_0_15px_rgba(220,184,255,0.3)] cursor-pointer">
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        src={poster}
        alt={title}
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/90 via-[#121317]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-sm w-full">
        {badge && (
          <span className="bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase mb-1 inline-block">
            {badge}
          </span>
        )}
        <h3 className="font-label-md text-label-md text-white line-clamp-1">{title}</h3>
        <p className="text-[12px] text-on-surface-variant">{subtitle}</p>
      </div>
    </div>
  );
};
