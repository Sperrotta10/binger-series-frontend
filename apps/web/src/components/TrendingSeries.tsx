import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SeriesCard } from './SeriesCard';

export const TrendingSeries = () => {
  const trendingData = [
    {
      id: 1,
      title: 'Neon Chronicles',
      subtitle: 'S03 • E12',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKe8cCIvFUJD8YTlxIK5kbXaycieeEyyWXaSs4pgCLDXdKaoVrmSP86Su_1N1_wFOnkbcUCylJ6aNb54CNL3K0sdISev3el3pl5LwzS-jV5j0cbNVasMvU_OKdiLh6YuvYtqkdpR4L9IAZ8XodXyK2XhQAMhgSYyVGs5CX8Fs1uqKRWqs7gEWwJMKWumv_hmuDiPXSe-DVH3Jta-cKuysl8-356laBS0EZlxF0EKCf6Idf8r2clgkJEnZvnjRS7ZI-UVPUSyqQhQmb',
      badge: 'Trending'
    },
    {
      id: 2,
      title: 'The Last Watcher',
      subtitle: 'S01 • E08',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTQHo_Ou1G6y-rpZ04rPwE3l3iH1m7tQo5izwqQep7kwuLcv1_IiO1vnkuJUmNtGVQNGbO5VNLOeNMavidqBOobCZWdonLEKJ0gGgl_-4TfqdxY3SwfB-QYHN38_ZSDf_RO_Cnery65aKtg9vVQfExVKnZnbZmEM5efIhNixHkYLvJkMa1-Zc1wsdkFAqfZFjuwbQwl9clXF40M-I0l9_s6aiKNEUuD8fxEIXhhuaKm3X4GlUiep00gS0Knp1Ti2r9gTufU2Abuuv',
    },
    {
      id: 3,
      title: 'Mirror Protocol',
      subtitle: 'S02 • E04',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_xzeGwgCekTXsDIoCEqNqdDkKic1UJVN4xksm5X3Lj442VNxC2GXASqMI46d36exrmH3msahnIreEWEtH3ttXJqn1F4FGQMI1ndMoXKVO5YkvHgW33Ukpi1Av_izD1cRJAAaoyke5lu4ajJWm_P2JWQUBzbHAh_9b9enjpJmUzNtIflR44-NvqYDJppJjhpWS2cxi4nAwnXXNWhK8gLbmktBivL2Q-1pNOSYRImwanQdGFcy6VZ7XSVUhqzeQClIgmu0D_hwYI5av',
    },
    {
      id: 4,
      title: 'Velocity Noir',
      subtitle: 'S04 • E01',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADY6mip_wctfo5Qu0bOCY2TElUvJtdwLI1O16l1aYBHHqhZffh79YjZpA_sLIPQrBWVid-5a2GR75Q_ZdKtRBbBWui33UssnjXbHo5giPUTnvBI9XwCj0eNS2nEbUyzIxrqVMA9TlN4Di75zou8z8piuT9wtaQy6BxQJ_AAh4o-TKWp6l2EXYv3IrJdNrsMrmpkzpGpm1tvMWV-6LCoxAk98pMAnYCl9IyKP_7wCnzSXsIjbZcZsXYnbxmLgyt43MvZAUX4PSlrW2q',
    }
  ];

  return (
    <section className="mb-lg">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Trending This Week</h2>
        <Link className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 uppercase transition-all" to="/trending">
          View All <ChevronRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-sm">
        {trendingData.map((series) => (
          <SeriesCard 
            key={series.id}
            title={series.title}
            subtitle={series.subtitle}
            imageUrl={series.imageUrl}
            badge={series.badge}
          />
        ))}
      </div>
    </section>
  );
};
