import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

interface DashboardCarouselProps {
  title: string;
  icon?: LucideIcon;
  iconClassName?: string;
  viewAllLink?: string;
  children: ReactNode;
}

export function DashboardCarousel({
  title,
  icon: Icon,
  iconClassName = 'text-primary',
  viewAllLink,
  children,
}: DashboardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-lg">
      <div className="flex items-center justify-between mb-md gap-sm">
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon size={18} className={iconClassName} />}
          <h2 className="font-headline-lg text-headline-lg text-on-surface truncate">{title}</h2>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg border border-white/10 text-on-surface-variant hover:text-white hover:border-primary/30 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg border border-white/10 text-on-surface-variant hover:text-white hover:border-primary/30 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
          {viewAllLink && (
            <Link
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 uppercase transition-all ml-2"
              to={viewAllLink}
            >
              View All <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-sm overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-1 -mx-1 px-1"
      >
        {children}
      </div>
    </section>
  );
}
