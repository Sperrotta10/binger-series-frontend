import React, { useEffect, useState } from 'react';
import { AuthService } from '@binger/shared/src/api/services/auth.service';
import type {
  UserProfile,
  FavoriteShow,
  ActivityEntry,
  RatingBar,
  UserList,
  LikedShow,
  LikedReview,
  LikedList,
  WatchlistItem,
  ReviewEntry,
} from '../types/profile';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileStatsGrid } from '../components/Profile/ProfileStatsGrid';
import { ProfileFavoritesGrid } from '../components/Profile/ProfileFavoritesGrid';
import { ProfileActivityPreview } from '../components/Profile/ProfileActivityPreview';
import { ProfileRatingChart } from '../components/Profile/ProfileRatingChart';
import { ProfileListsTab } from '../components/Profile/ProfileListsTab';
import { ProfileLikesTab } from '../components/Profile/ProfileLikesTab';
import { ProfileWatchlistTab } from '../components/Profile/ProfileWatchlistTab';
import { ProfileReviewsTab } from '../components/Profile/ProfileReviewsTab';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_PROFILE: UserProfile = {
  username: 'Alexander Thorne',
  bio: "Professional binge-watcher & narrative enthusiast. Curator of the 'Obsidian Vault' collection. Mapping the future of cinematic storytelling, one log at a time.",
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  followersCount: 1420,
  followingCount: 350,
};

const MOCK_FAVORITES: FavoriteShow[] = [
  { id: '1', title: 'Neo-Genesis: Protocol',   imageUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&auto=format&fit=crop' },
  { id: '2', title: 'The Midnight Serenade',   imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop' },
  { id: '3', title: 'Starbound Voyagers',      imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop' },
  { id: '4', title: 'The Arcane Division',     imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop' },
];

const MOCK_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', title: 'The Ghost Signal',  rating: 5, date: '2 hours ago',  comment: 'Absolute cinema.'                  },
  { id: 'a2', title: 'Silent Rhythm',    rating: 4, date: 'Yesterday',     comment: 'Worldbuilding is 10/10.'           },
  { id: 'a3', title: 'The Rift',         rating: 5, date: '3 days ago',    comment: 'Best episode of the season.'       },
];

// 10-bar histogram: 0.5 → 5.0
const MOCK_RATING_BARS: RatingBar[] = [
  { score: '0.5', count: 4  },
  { score: '1.0', count: 9  },
  { score: '1.5', count: 14 },
  { score: '2.0', count: 22 },
  { score: '2.5', count: 31 },
  { score: '3.0', count: 58 },
  { score: '3.5', count: 87 },
  { score: '4.0', count: 134 },
  { score: '4.5', count: 96 },
  { score: '5.0', count: 71 },
];

const MOCK_LISTS: UserList[] = [
  {
    id: 'l1',
    title: 'Cyberpunk Masterpieces',
    description: 'A hand-picked tour through neon-lit dystopias and rebellious hackers. Essential viewing.',
    itemCount: 17,
    previewPosters: [
      'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop',
    ],
  },
  {
    id: 'l2',
    title: 'Mind-bending Sci-Fi Finales',
    description: 'Season finales so good they rewired my brain. Only the most extraordinary closers make the cut.',
    itemCount: 12,
    previewPosters: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop',
    ],
  },
  {
    id: 'l3',
    title: 'Slow-burn Psychological Thrillers',
    description: 'Shows that plant a seed of dread in episode one and let it bloom over ten agonizing hours.',
    itemCount: 9,
    previewPosters: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop',
    ],
  },
];

const MOCK_LIKED_SHOWS: LikedShow[] = [
  { id: 'lk1',  title: 'Westworld',              imageUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=300&auto=format&fit=crop', rating: 4.5, hasReview: true },
  { id: 'lk2',  title: 'Severance',              imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop', rating: 5.0, hasReview: false },
  { id: 'lk3',  title: 'Dark',                   imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop', rating: 5.0, hasReview: true },
  { id: 'lk4',  title: 'Succession',             imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop', rating: 4.0, hasReview: false },
  { id: 'lk5',  title: 'Mindhunter',             imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=300&auto=format&fit=crop', rating: 4.5, hasReview: false },
  { id: 'lk6',  title: 'The Leftovers',          imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&auto=format&fit=crop', rating: 5.0, hasReview: true },
];

const MOCK_LIKED_REVIEWS: LikedReview[] = [
  {
    id: 'lr1',
    showTitle: 'Andor',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    date: 'Nov 15, 2024',
    content: 'The most grounded, politically dense, and thrilling Star Wars project since Empire Strikes Back. Gilroy created a masterpiece of tension.',
    scopeLabel: 'SHOW',
    creator: {
      username: 'Sarah Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    }
  },
  {
    id: 'lr2',
    showTitle: 'The Bear',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    date: 'Jun 22, 2024',
    content: '"Fishes" gave me actual anxiety. The chaos, the screaming, the underlying trauma—pure visceral storytelling at its absolute best.',
    scopeLabel: 'S02E06',
    creator: {
      username: 'Marcus Reed',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop'
    }
  }
];

const MOCK_LIKED_LISTS: LikedList[] = [
  {
    id: 'll1',
    title: 'Neon Dystopias',
    itemCount: 24,
    previewPosters: [
      'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop',
    ],
    creator: {
      username: 'CyberPunk99',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
    }
  }
];

const MOCK_WATCHLIST: WatchlistItem[] = [
  { id: 'w1', title: 'Shogun (2024)',        imageUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=300&auto=format&fit=crop', genre: 'Drama',    status: 'plan-to-watch' },
  { id: 'w2', title: 'The Bear',             imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop', genre: 'Comedy',   status: 'plan-to-watch' },
  { id: 'w3', title: 'Slow Horses',          imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop', genre: 'Thriller', status: 'plan-to-watch' },
  { id: 'w4', title: 'Interview with the Vampire', imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop', genre: 'Horror', status: 'plan-to-watch' },
  { id: 'w5', title: 'From',                 imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=300&auto=format&fit=crop', genre: 'Sci-Fi',   status: 'on-hold'       },
  { id: 'w6', title: '1883',                 imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&auto=format&fit=crop', genre: 'Western',  status: 'on-hold'       },
  { id: 'w7', title: 'The Witcher S3',       imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop', genre: 'Fantasy',  status: 'dropped'       },
];

const MOCK_REVIEWS: ReviewEntry[] = [
  {
    id: 'r1',
    scope: 'show',
    scopeLabel: 'SHOW',
    showTitle: 'Succession',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    date: 'Oct 24, 2024',
    content: 'A masterclass in modern tragedy. The corporate maneuvering is just the backdrop for one of the most poignant explorations of generational trauma and broken family dynamics ever put to screen. Every performance is pitch-perfect, but Macfadyen and Strong are doing something entirely transcendent.',
  },
  {
    id: 'r2',
    scope: 'season',
    scopeLabel: 'SEASON 4',
    showTitle: 'Breaking Bad',
    imageUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    date: 'Sep 12, 2024',
    content: 'The chess match between Walt and Gus reaches its absolute zenith. The tension is unbearable, the plotting is meticulous, and "Crawl Space" remains one of the most terrifying hours of television in existence. Peak fiction.',
  },
  {
    id: 'r3',
    scope: 'episode',
    scopeLabel: 'S03E08',
    showTitle: 'Twin Peaks',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop',
    rating: 4,
    date: 'Aug 05, 2024',
    content: 'An avant-garde explosion of the origin of evil. I have no idea what half of it means, but the visual of the Trinity test and the sheer atmospheric dread are forever burned into my retinas. Lynch unleashed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TABS CONFIG
// ─────────────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'reviews' | 'lists' | 'likes' | 'watchlist';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Overview'  },
  { id: 'reviews',    label: 'Reviews'   },
  { id: 'lists',      label: 'Lists'     },
  { id: 'likes',      label: 'Likes'     },
  { id: 'watchlist',  label: 'Watchlist' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await AuthService.getProfile();
        if (response.data && response.data.user) {
          setProfile({
            username:  response.data.user.username   || MOCK_PROFILE.username,
            bio:       response.data.user.biography  || MOCK_PROFILE.bio,
            avatarUrl: response.data.user.avatar_url || MOCK_PROFILE.avatarUrl,
            followersCount: response.data.user.followers_count ?? MOCK_PROFILE.followersCount,
            followingCount: response.data.user.following_count ?? MOCK_PROFILE.followingCount,
          });
        } else {
          setProfile(MOCK_PROFILE);
        }
      } catch {
        setProfile(MOCK_PROFILE);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProfileData, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-span-12 flex flex-col w-full gap-xl py-lg">
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <ProfileHeader profile={profile} loading={loading} />

      {/* ── TABS ────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-md border-b border-white/10">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`text-[14px] font-semibold tracking-wide uppercase pb-[10px] px-sm relative transition-colors ${
              activeTab === id
                ? 'text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {label}
            {activeTab === id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DCB8FF] rounded-t-full shadow-[0_0_8px_#DCB8FF]" />
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ────────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-xl">
          <ProfileStatsGrid loading={loading} />

          {/* Rating chart + Activity side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-md">
            <ProfileRatingChart data={MOCK_RATING_BARS} loading={loading} />
            <ProfileActivityPreview activities={MOCK_ACTIVITY} loading={loading} />
          </div>

          {/* Favorites full-width */}
          <ProfileFavoritesGrid favorites={MOCK_FAVORITES} loading={loading} />
        </div>
      )}

      {/* ── LISTS ───────────────────────────────────────────────────────────── */}
      {activeTab === 'lists' && (
        <ProfileListsTab lists={MOCK_LISTS} />
      )}

      {/* ── LIKES ───────────────────────────────────────────────────────────── */}
      {activeTab === 'likes' && (
        <ProfileLikesTab 
          shows={MOCK_LIKED_SHOWS} 
          reviews={MOCK_LIKED_REVIEWS} 
          lists={MOCK_LIKED_LISTS} 
        />
      )}

      {/* ── WATCHLIST ───────────────────────────────────────────────────────── */}
      {activeTab === 'watchlist' && (
        <ProfileWatchlistTab items={MOCK_WATCHLIST} />
      )}

      {/* ── REVIEWS ─────────────────────────────────────────────────────────── */}
      {activeTab === 'reviews' && (
        <ProfileReviewsTab reviews={MOCK_REVIEWS} />
      )}
    </div>
  );
}

export default Profile;
