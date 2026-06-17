import { CatalogService, type HybridSearchResult, type TrendingSeries } from '@binger/shared';

const CURRENT_YEAR = 2026;
const GLOBAL_GENRE_QUERIES = ['drama', 'comedy', 'thriller', 'sci-fi', 'fantasy', 'crime'];

function hybridToTrending(item: HybridSearchResult): TrendingSeries {
  return {
    id: item.id,
    external_id: item.api_id ? parseInt(item.api_id, 10) : undefined,
    is_imported: item.isImported,
    title: item.title,
    poster_url: item.poster_url ?? '',
    rating_average: item.rating_average,
    weekly_views_count: 0,
  };
}

function dedupeById(items: TrendingSeries[]): TrendingSeries[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

/** Merge local trending with live TVmaze hybrid hits for the current broadcast year. */
export async function fetchGlobalTrendingFeed(): Promise<TrendingSeries[]> {
  const [trendingResp, ...hybridResponses] = await Promise.all([
    CatalogService.getTrending().catch(() => ({ data: [] as TrendingSeries[] })),
    ...GLOBAL_GENRE_QUERIES.map((genre) =>
      CatalogService.hybridSearch({ q: genre, year: CURRENT_YEAR }).catch(() => ({ data: [] as HybridSearchResult[] })),
    ),
  ]);

  const local = trendingResp?.data ?? [];
  const globalHits = hybridResponses.flatMap((resp) =>
    (resp?.data ?? [])
      .filter((item) => {
        if (!item.premiered) return true;
        return item.premiered.startsWith(String(CURRENT_YEAR));
      })
      .map(hybridToTrending),
  );

  return dedupeById([...local, ...globalHits]);
}

/** Community picks sorted by platform rating distribution. */
export async function fetchCommunityHighlyRated(): Promise<TrendingSeries[]> {
  const items = await fetchGlobalTrendingFeed();
  return [...items]
    .filter((item) => item.rating_average > 0)
    .sort((a, b) => b.rating_average - a.rating_average)
    .slice(0, 20);
}
