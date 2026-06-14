import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, User, PlusCircle, Settings, HelpCircle } from 'lucide-react';
import { useQuickLog } from './modals/QuickLogContext';

/** Navigation items for the main sidebar */
const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/diary', label: 'Diary', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: User },
] as const;

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { openModal } = useQuickLog();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col py-md px-sm bg-surface-container/70 backdrop-blur-[12px] border-r border-white/10 shadow-[0_0_15px_rgba(220,184,255,0.1)] z-50">
      <div className="mb-lg px-base">
        <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">SerieLog</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Premium Logbook</p>
      </div>
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-sm p-sm rounded-md transition-all duration-300 border ${
                isActive
                  ? 'text-primary font-bold shadow-[0_0_10px_rgba(220,184,255,0.3)] bg-surface-container-highest/50 border-primary/20'
                  : 'text-on-surface-variant hover:text-primary hover:bg-white/5 border-transparent hover:border-primary/20 hover:shadow-[0_0_10px_rgba(220,184,255,0.15)]'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
              <span className="font-label-md text-label-md">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 pt-md border-t border-white/10">
        <button 
          onClick={() => openModal({
            type: 'series',
            seriesId: 'new-log',
            title: 'Log Activity',
            subtitle: 'Select what you watched'
          })}
          className="w-full bg-gradient-to-r from-primary-container to-inverse-primary text-white font-label-md text-label-md py-sm rounded-md shadow-[0_0_15px_rgba(220,184,255,0.3)] hover:shadow-[0_0_20px_rgba(220,184,255,0.5)] hover:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mb-md"
        >
          <PlusCircle size={18} />
          Log an Episode
        </button>
        <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 rounded-md" to="/settings">
          <Settings size={20} />
          <span className="font-label-md text-label-md">Settings</span>
        </Link>
        <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-all duration-300 rounded-md" to="/support">
          <HelpCircle size={20} />
          <span className="font-label-md text-label-md">Support</span>
        </Link>
      </div>
    </aside>
  );
};
