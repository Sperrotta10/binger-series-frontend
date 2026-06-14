import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { ReviewEntry, ReviewScope } from '../../types/profile';

interface ProfileReviewsTabProps {
  reviews: ReviewEntry[];
}

type FilterScope = 'all' | ReviewScope;

export function ProfileReviewsTab({ reviews }: ProfileReviewsTabProps) {
  const [filter, setFilter] = useState<FilterScope>('all');

  const filteredReviews = reviews.filter((r) => filter === 'all' || r.scope === filter);

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Sub-Tabs Filter */}
      <div className="flex items-center gap-sm border-b border-white/10 pb-md">
        {[
          { id: 'all', label: 'All' },
          { id: 'show', label: 'By Show' },
          { id: 'season', label: 'By Season' },
          { id: 'episode', label: 'By Episode' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as FilterScope)}
            className={`px-md py-[6px] rounded-full text-[13px] font-semibold transition-colors ${
              filter === tab.id
                ? 'bg-[#DCB8FF] text-[#121317]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-white/10 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2xl text-on-surface-variant">
          <p>No reviews found for this scope.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-lg">
          {filteredReviews.map((review) => (
            <div key={review.id} className="flex gap-md bg-surface-container rounded-2xl p-md border border-white/5 hover:border-white/10 transition-colors group">
              {/* Image */}
              <div className="shrink-0">
                <img 
                  src={review.imageUrl} 
                  alt={review.showTitle} 
                  className="w-[100px] h-[150px] object-cover rounded-lg shadow-md border border-white/10"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow min-w-0">
                {/* Header: Title + Badge */}
                <div className="flex items-center justify-between gap-md mb-xs">
                  <h3 className="text-[20px] font-bold text-on-surface truncate font-['Sora',sans-serif]">
                    {review.showTitle}
                  </h3>
                  
                  {/* Scope Badge (Cyan Neon) */}
                  <span className="shrink-0 px-xs py-[2px] bg-[#00FBFB]/10 text-[#00FBFB] border border-[#00FBFB]/30 rounded-md text-[10px] font-bold uppercase tracking-wider font-['Sora',sans-serif]">
                    {review.scopeLabel}
                  </span>
                </div>

                {/* Metadata (Rating, Date) - Sora font */}
                <div className="flex items-center gap-sm mb-sm font-['Sora',sans-serif]">
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-[#FFC107] fill-[#FFC107]' : 'text-white/10 fill-transparent'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-on-surface-variant">
                    Reviewed on {review.date}
                  </span>
                </div>

                {/* Review Body - Hanken Grotesk */}
                <p className="text-[15px] leading-relaxed text-on-surface-variant font-['Hanken_Grotesk',sans-serif] group-hover:text-on-surface transition-colors line-clamp-4">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
