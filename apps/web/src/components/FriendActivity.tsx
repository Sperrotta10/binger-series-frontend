import { SlidersHorizontal, Heart, MoreHorizontal, Star } from 'lucide-react';

export const FriendActivity = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Friend Activity</h2>
        <button className="text-on-surface-variant hover:text-white transition-colors">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      <div className="space-y-sm">
        {/* Activity Card 1 */}
        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 p-md rounded-md flex items-start gap-md hover:bg-surface-container-highest/80 transition-colors cursor-pointer group">
          <img 
            className="w-12 h-12 rounded-full border-2 border-primary/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQz37YnoFwWYdoohAG7qBUQ77YJ06b6LVFeKrgxykZ5CAXzQO_iTwI3nsgSWCaQxSXT0adUhwAxp_m8UH2E5QPbW5n7MaCMWSwAcHUKuC5CSZF8Edfa4bDzPh0QXMred38heSNheUZC1Uoei_6dA7nlpaVbWGbkJNcfON6RLpadyuSWukmX8yV6XObpiQw7NBPhaX7353xB83KjJobH3KD4DmR-pIyFtFpQcJy_Sw2ET57iwWWfeXsUz6hrbuLjm6dhKmSf88JzKkd" 
            alt="Alex Rivera"
          />
          <div className="flex-1">
            <p className="font-body-md">
              <span className="text-primary font-bold">Alex Rivera </span>
              <span className="text-on-surface-variant">finished watching </span>
              <span className="text-white font-semibold">The Night Agent</span>
            </p>
            <p className="text-[13px] text-on-surface-variant mt-1 flex items-center gap-2">
              2 hours ago • <span className="flex items-center text-streak-amber"><Star size={14} className="mr-1 fill-streak-amber" /> 4.5/5</span>
            </p>
            <div className="mt-sm bg-surface-container-lowest/50 p-sm rounded-md italic text-[14px] border-l-2 border-primary text-on-surface">
              "That season finale twist was absolutely insane. Highly recommended for fans of the genre."
            </div>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Heart size={18} className="group-hover:text-primary/70 transition-colors" />
            </button>
            <span className="text-[11px] text-on-surface-variant">12</span>
          </div>
        </div>
        
        {/* Activity Card 2 */}
        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 p-md rounded-md flex items-start gap-md hover:bg-surface-container-highest/80 transition-colors cursor-pointer group">
          <img 
            className="w-12 h-12 rounded-full border-2 border-primary/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuzEsIM3fmOw6Kkzp4NnT_xW59om2hFS8UWACRyLyuXtRtQoE2a4_fDlZOe_OK0jduiQQPLd9X50S7U8i5HnMzvxXnpN8H69n0v5520eKpxC-ek5ZOPV66Qm-na8S3uM3nKzfH9Lkf5q2-uyuBuHQoKQU8eVAhnd1vI5nmz_L2i_NyQ_dVlRbwYVW4n5QxUaxYsOxKRjX2BHW5YFXHOdzDEiqF0hnfqDkk6CtwvVN3zCLpEvyXOEliNi5Bp-YJq3g28TBPHBdEoor6" 
            alt="Sarah Chen"
          />
          <div className="flex-1">
            <p className="font-body-md">
              <span className="text-primary font-bold">Sarah Chen </span>
              <span className="text-on-surface-variant">added to watchlist </span>
              <span className="text-white font-semibold">Interstellar</span>
            </p>
            <p className="text-[13px] text-on-surface-variant mt-1">4 hours ago</p>
          </div>
          <button className="text-on-surface-variant hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Activity Card 3 */}
        <div className="bg-surface-container/70 backdrop-blur-[12px] border border-white/10 p-md rounded-md flex items-start gap-md hover:bg-surface-container-highest/80 transition-colors cursor-pointer group">
          <img 
            className="w-12 h-12 rounded-full border-2 border-primary/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6QgiyDaAec5-c9t85uL3r_wUFTmU17BUxqWpKP51RaanCDeCOiJ3j07CgsUWw8W16E2U2TwakuVKNcvOFzwmKbOINMqqM_oCydULEyFS3ZPn2HDPhvqfseONWLGnvutmOnkNaTj4gtnXIsHygTzL4Gl-ip7NEkrmGR4wSt19jH7p2G-UwcOgIl6u7K10wSQr_XFQG2tFwKNgTAizfh5K_UBE5pbEpEEfjPCojWChg6BQe3gfjGRk1AXHdCi3xW9qmKmFIY3J4nRxx" 
            alt="Mark Julian"
          />
          <div className="flex-1">
            <p className="font-body-md">
              <span className="text-primary font-bold">Mark Julian </span>
              <span className="text-on-surface-variant">is currently watching </span>
              <span className="text-white font-semibold">Arcane: Season 2</span>
            </p>
            <p className="text-[13px] text-on-surface-variant mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(0,251,251,0.6)] animate-pulse"></span> Now Watching
            </p>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Heart size={18} className="group-hover:text-primary/70 transition-colors" />
            </button>
            <span className="text-[11px] text-on-surface-variant">24</span>
          </div>
        </div>
      </div>
    </section>
  );
};
