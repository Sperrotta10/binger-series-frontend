import { PlayCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WatchingItem {
  id: number;
  title: string;
  episode: string;
  progress: number; // 0–100
  imageUrl: string;
  isLive?: boolean;
}

const WATCHING: WatchingItem[] = [
  {
    id: 1,
    title: 'Succession',
    episode: 'S04 · E08 — "America Decides"',
    progress: 68,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKe8cCIvFUJD8YTlxIK5kbXaycieeEyyWXaSs4pgCLDXdKaoVrmSP86Su_1N1_wFOnkbcUCylJ6aNb54CNL3K0sdISev3el3pl5LwzS-jV5j0cbNVasMvU_OKdiLh6YuvYtqkdpR4L9IAZ8XodXyK2XhQAMhgSYyVGs5CX8Fs1uqKRWqs7gEWwJMKWumv_hmuDiPXSe-DVH3Jta-cKuysl8-356laBS0EZlxF0EKCf6Idf8r2clgkJEnZvnjRS7ZI-UVPUSyqQhQmb',
  },
  {
    id: 2,
    title: 'Arcane: Season 2',
    episode: 'S02 · E04 — "The Weakest Heart"',
    progress: 31,
    isLive: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_xzeGwgCekTXsDIoCEqNqdDkKic1UJVN4xksm5X3Lj442VNxC2GXASqMI46d36exrmH3msahnIreEWEtH3ttXJqn1F4FGQMI1ndMoXKVO5YkvHgW33Ukpi1Av_izD1cRJAAaoyke5lu4ajJWm_P2JWQUBzbHAh_9b9enjpJmUzNtIflR44-NvqYDJppJjhpWS2cxi4nAwnXXNWhK8gLbmktBivL2Q-1pNOSYRImwanQdGFcy6VZ7XSVUhqzeQClIgmu0D_hwYI5av',
  },
  {
    id: 3,
    title: 'The Last Watcher',
    episode: 'S01 · E06 — "No Return"',
    progress: 55,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADY6mip_wctfo5Qu0bOCY2TElUvJtdwLI1O16l1aYBHHqhZffh79YjZpA_sLIPQrBWVid-5a2GR75Q_ZdKtRBbBWui33UssnjXbHo5giPUTnvBI9XwCj0eNS2nEbUyzIxrqVMA9TlN4Di75zou8z8piuT9wtaQy6BxQJ_AAh4o-TKWp6l2EXYv3IrJdNrsMrmpkzpGpm1tvMWV-6LCoxAk98pMAnYCl9IyKP_7wCnzSXsIjbZcZsXYnbxmLgyt43MvZAUX4PSlrW2q',
  },
];

export const ContinueWatching = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Continue Watching</h2>
        <Link
          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 uppercase transition-all"
          to="/diary"
        >
          View All <ChevronRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col gap-sm">
        {WATCHING.map((item) => (
          <div
            key={item.id}
            className="group relative bg-surface-container/70 backdrop-blur-[12px] border border-white/10 rounded-md overflow-hidden flex items-center gap-md p-sm hover:bg-surface-container-highest/80 hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-14 shrink-0 rounded-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <PlayCircle size={24} className="text-primary drop-shadow-[0_0_8px_rgba(220,184,255,0.8)]" />
              </div>
            </div>

            {/* Info */}
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

              {/* Progress bar */}
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
