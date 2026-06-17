import { Suspense } from 'react';
import { TrendingSeries } from '../components/TrendingSeries';
import { FriendActivity } from '../components/FriendActivity';
import { DailySummary } from '../components/DailySummary';
import { ContinueWatching } from '../components/ContinueWatching';
import { CommunityHighlyRated } from '../components/CommunityHighlyRated';

/** Reusable shimmer skeleton card */
const SkeletonCard = () => (
  <div className="animate-pulse bg-surface-container-high rounded-md w-full h-48" />
);

const DashboardSkeleton = () => (
  <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
    <div className="grid grid-cols-4 gap-sm">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
    <div className="space-y-sm">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse bg-surface-container/70 rounded-md h-24 w-full" />
      ))}
    </div>
  </div>
);

export const Home = () => {
  return (
    <>
      {/* ── CENTRAL PANEL (8 Columns) ── */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
        <Suspense fallback={<DashboardSkeleton />}>
          <TrendingSeries />
          <ContinueWatching />
          <CommunityHighlyRated />
          <FriendActivity />
        </Suspense>
      </div>

      {/* ── RIGHT PANEL (4 Columns) ── */}
      <div className="col-span-12 lg:col-span-4">
        <DailySummary />
      </div>
    </>
  );
};
