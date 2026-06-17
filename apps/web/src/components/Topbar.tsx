import { Link } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { useMobileNav } from '../contexts/useMobileNav';

export const Topbar = () => {
  const { toggle } = useMobileNav();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-surface/50 backdrop-blur-[12px] border-b border-white/10 flex justify-between items-center px-4 sm:px-margin-desktop py-base h-16">
      <div className="flex items-center gap-md flex-1 min-w-0">
        <button
          type="button"
          onClick={toggle}
          className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors shrink-0"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
        <div className="relative flex-1 max-w-md">
          <input
            className="bg-surface-container-lowest border border-white/5 rounded-md py-1.5 px-md w-full text-sm focus:ring-1 focus:ring-primary focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant transition-all outline-none"
            placeholder="Search series, movies, actors..."
            type="text"
          />
          <Link to="/search" className="absolute right-3 top-2 text-on-surface-variant hover:text-primary transition-colors">
            <Search size={18} />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-md shrink-0">
        <button className="text-on-surface-variant hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(220,184,255,0.5)]">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-sm ml-sm">
          <img
            alt="User profile"
            className="w-8 h-8 rounded-full border border-primary/30 hover:border-primary transition-colors cursor-pointer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfWkMjeesCU1qa5twOUS8_klAx66gTeO2qIQp3dmwEPKJOQjYcKkomZ9e3AyZNL_TZPOUp32ykmEmF99jkXDQjaROQItngyHrOgYcKCmX27YgLIQZ-_uT0jTBKLQ4h40sCZWm1bw3fCAnP9-DO5J6NC47pqi9qx6XeQzpK39AS31Lo8x_xbA7u0GQp05pWdhkqLxju_Qwp6Ppx2BMsEuUBJlpdDT6nC3n_-trDNLFbJ6_oeOUu2mPdt4jVfdooU4EZJAMURnmA3OpI"
          />
        </div>
      </div>
    </header>
  );
};
