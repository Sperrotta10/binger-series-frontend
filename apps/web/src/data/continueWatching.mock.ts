export interface ContinueWatchingItem {
  id: number;
  seriesId: string;
  title: string;
  episode: string;
  progress: number;
  imageUrl: string;
  isLive?: boolean;
}

export const CONTINUE_WATCHING: ContinueWatchingItem[] = [
  {
    id: 1,
    seriesId: 'cw-1',
    title: 'Succession',
    episode: 'S04 · E08 — "America Decides"',
    progress: 68,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKe8cCIvFUJD8YTlxIK5kbXaycieeEyyWXaSs4pgCLDXdKaoVrmSP86Su_1N1_wFOnkbcUCylJ6aNb54CNL3K0sdISev3el3pl5LwzS-jV5j0cbNVasMvU_OKdiLh6YuvYtqkdpR4L9IAZ8XodXyK2XhQAMhgSYyVGs5CX8Fs1uqKRWqs7gEWwJMKWumv_hmuDiPXSe-DVH3Jta-cKuysl8-356laBS0EZlxF0EKCf6Idf8r2clgkJEnZvnjRS7ZI-UVPUSyqQhQmb',
  },
  {
    id: 2,
    seriesId: 'cw-2',
    title: 'Arcane: Season 2',
    episode: 'S02 · E04 — "The Weakest Heart"',
    progress: 31,
    isLive: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_xzeGwgCekTXsDIoCEqNqdDkKic1UJVN4xksm5X3Lj442VNxC2GXASqMI46d36exrmH3msahnIreEWEtH3ttXJqn1F4FGQMI1ndMoXKVO5YkvHgW33Ukpi1Av_izD1cRJAAaoyke5lu4ajJWm_P2JWQUBzbHAh_9b9enjpJmUzNtIflR44-NvqYDJppJjhpWS2cxi4nAwnXXNWhK8gLbmktBivL2Q-1pNOSYRImwanQdGFcy6VZ7XSVUhqzeQClIgmu0D_hwYI5av',
  },
  {
    id: 3,
    seriesId: 'cw-3',
    title: 'The Last Watcher',
    episode: 'S01 · E06 — "No Return"',
    progress: 55,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADY6mip_wctfo5Qu0bOCY2TElUvJtdwLI1O16l1aYBHHqhZffh79YjZpA_sLIPQrBWVid-5a2GR75Q_ZdKtRBbBWui33UssnjXbHo5giPUTnvBI9XwCj0eNS2nEbUyzIxrqVMA9TlN4Di75zou8z8piuT9wtaQy6BxQJ_AAh4o-TKWp6l2EXYv3IrJdNrsMrmpkzpGpm1tvMWV-6LCoxAk98pMAnYCl9IyKP_7wCnzSXsIjbZcZsXYnbxmLgyt43MvZAUX4PSlrW2q',
  },
];
