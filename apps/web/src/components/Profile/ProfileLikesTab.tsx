import React, { useState } from 'react';
import { Heart, MessageCircle, Star, Layers } from 'lucide-react';
import type { LikedShow, LikedReview, LikedList, LikeCategory } from '../../types/profile';

interface ProfileLikesTabProps {
  shows: LikedShow[];
  reviews: LikedReview[];
  lists: LikedList[];
}

export function ProfileLikesTab({ shows, reviews, lists }: ProfileLikesTabProps) {
  const [filter, setFilter] = useState<LikeCategory>('all');

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Sub-Tabs Filter */}
      <div className="flex items-center gap-sm border-b border-white/10 pb-md">
        {[
          { id: 'all', label: 'All' },
          { id: 'shows', label: 'Shows' },
          { id: 'reviews', label: 'Reviews' },
          { id: 'lists', label: 'Lists' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as LikeCategory)}
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

      <div className="flex flex-col gap-xl">
        {/* Shows Grid */}
        {(filter === 'all' || filter === 'shows') && shows.length > 0 && (
          <div className="flex flex-col gap-md">
            <h3 className="text-[16px] font-bold text-on-surface">Liked Shows</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-sm">
              {shows.map((show) => (
                <div key={show.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-surface-container-high">
                  <img src={show.imageUrl} alt={show.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/90 via-[#121317]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Persistent Filled Heart */}
                  <div className="absolute top-sm right-sm z-20 bg-black/40 backdrop-blur-sm p-1 rounded-full">
                    <Heart className="w-3.5 h-3.5 text-[#DCB8FF] fill-[#DCB8FF]" />
                  </div>

                  {/* Explicit Review Icon */}
                  {show.hasReview && (
                    <div className="absolute top-sm left-sm z-20 bg-black/40 backdrop-blur-sm p-1 rounded-full">
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {/* Title & Score on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-sm z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-1">
                    <div className="flex items-center gap-[4px] text-[#FFC107]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[11px] font-bold font-['Sora',sans-serif]">{show.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-on-surface leading-tight line-clamp-2">{show.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liked Reviews */}
        {(filter === 'all' || filter === 'reviews') && reviews.length > 0 && (
          <div className="flex flex-col gap-md">
            <h3 className="text-[16px] font-bold text-on-surface">Liked Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-sm bg-surface-container rounded-2xl p-md border border-white/5 hover:border-white/10 transition-colors">
                  {/* Reviewer Header */}
                  <div className="flex items-center gap-sm mb-xs">
                    <img src={review.creator.avatarUrl} alt={review.creator.username} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[13px] font-semibold text-on-surface">{review.creator.username}</span>
                    <Heart className="w-3 h-3 text-[#DCB8FF] fill-[#DCB8FF] ml-auto" />
                  </div>
                  
                  <div className="flex gap-md">
                    <div className="shrink-0">
                      <img src={review.imageUrl} alt={review.showTitle} className="w-[70px] h-[105px] object-cover rounded-lg shadow-sm border border-white/10" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-[16px] font-bold text-on-surface truncate font-['Sora',sans-serif]">{review.showTitle}</h4>
                        <span className="shrink-0 px-xs py-[2px] bg-[#00FBFB]/10 text-[#00FBFB] border border-[#00FBFB]/30 rounded text-[9px] font-bold uppercase">{review.scopeLabel}</span>
                      </div>
                      <div className="flex items-center gap-[2px] mb-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(review.rating) ? 'text-[#FFC107] fill-[#FFC107]' : 'text-white/10 fill-transparent'}`} />
                        ))}
                      </div>
                      <p className="text-[13px] leading-relaxed text-on-surface-variant font-['Hanken_Grotesk',sans-serif] line-clamp-3">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liked Lists */}
        {(filter === 'all' || filter === 'lists') && lists.length > 0 && (
          <div className="flex flex-col gap-md">
            <h3 className="text-[16px] font-bold text-on-surface">Liked Lists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {lists.map((list) => (
                <div key={list.id} className="flex flex-col bg-surface-container rounded-2xl p-md border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-sm mb-sm">
                    <img src={list.creator.avatarUrl} alt={list.creator.username} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[13px] font-semibold text-on-surface">{list.creator.username}</span>
                    <Heart className="w-3 h-3 text-[#DCB8FF] fill-[#DCB8FF] ml-auto" />
                  </div>
                  
                  <div className="flex -space-x-4 mb-md justify-center">
                    {list.previewPosters.map((poster, i) => (
                      <img key={i} src={poster} alt="" className="w-[80px] h-[120px] rounded-lg object-cover border-2 border-surface-container shadow-md relative group-hover:-translate-y-2 transition-transform" style={{ zIndex: 3 - i, transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>
                  
                  <div className="text-center flex flex-col gap-1">
                    <h4 className="text-[16px] font-bold text-on-surface">{list.title}</h4>
                    <div className="flex items-center justify-center gap-1 text-[13px] text-on-surface-variant">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{list.itemCount} items</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
