import { PlayCircle, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CONTINUE_WATCHING } from '../data/continueWatching.mock';

export const ContinueWatching = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Continue Watching</h2>
        <Link
          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 uppercase transition-all"
          to="/catalog/continue-watching"
        >
          View All <ChevronRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col gap-sm">
        {CONTINUE_WATCHING.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/shows/${item.seriesId}`)}
            className="group relative bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-md overflow-hidden flex items-center gap-md p-sm hover:bg-surface-container-highest/80 hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            <div className="relative w-20 h-14 shrink-0 rounded-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <PlayCircle size={24} className="text-primary drop-shadow-[0_0_8px_rgba(220,184,255,0.8)]" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-sm mb-1">
                <h4 className="font-label-md text-label-md text-white truncate">{item.title}</h4>
                {item.isLive && (
                  <span className="shrink-0 flex items-center gap-1 bg-secondary-fixed/10 border border-secondary-fixed/30 text-secondary-fixed text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                    Now Airing
                  </span>
                )}
              </div>
              <p className="text-[12px] text-on-surface-variant truncate mb-sm">{item.episode}</p>

              <div className="flex items-center gap-sm">
                <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${item.progress}%`,
                      boxShadow: '0 0 6px rgba(220,184,255,0.6)',
                    }}
                  />
                </div>
                <span className="text-[11px] text-on-surface-variant shrink-0">{item.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
