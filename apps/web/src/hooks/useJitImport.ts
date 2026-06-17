import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatalogService, type HybridSearchResult } from '@binger/shared';

type SyncPhase = 'syncing' | 'done' | 'error';

export function useJitImport() {
  const navigate = useNavigate();
  const [syncTarget, setSyncTarget] = useState<HybridSearchResult | null>(null);
  const [syncPhase, setSyncPhase] = useState<SyncPhase>('syncing');

  const handleShowClick = useCallback(async (item: HybridSearchResult) => {
    if (item.isImported) {
      navigate(`/shows/${item.id}`);
      return;
    }

    setSyncTarget(item);
    setSyncPhase('syncing');

    try {
      await CatalogService.triggerJitImport(item.id, item.title);
      setSyncPhase('done');

      let localId: string | null = null;
      for (let attempt = 0; attempt < 10; attempt++) {
        await new Promise((r) => setTimeout(r, 3000));
        try {
          const detail = await CatalogService.getSeriesDetail(item.id);
          if (detail?.data?.id) {
            localId = detail.data.id;
            break;
          }
        } catch {
          /* not ready yet */
        }
      }

      if (localId) {
        setTimeout(() => {
          setSyncTarget(null);
          navigate(`/shows/${localId}`);
        }, 600);
      } else {
        setTimeout(() => setSyncTarget(null), 2500);
      }
    } catch {
      setSyncPhase('error');
      setTimeout(() => setSyncTarget(null), 3000);
    }
  }, [navigate]);

  return { syncTarget, syncPhase, handleShowClick };
}
