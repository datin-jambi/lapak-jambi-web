import type { Asset } from '@/types';
import type { ProductCard, PricingUnit } from '@/types/api';

/**
 * Adapter untuk mengubah data aset dummy lama menjadi format ProductCard
 * sesuai kontrak Seloko API, sebagai fallback sementara jika database backend
 * belum memiliki produk bertatus PUBLISHED.
 */
export function adaptAssetToProductCard(asset: Asset): ProductCard {
  const pricingUnitMap: Record<string, PricingUnit> = {
    hari: 'DAY',
    jam: 'HOUR',
    bulan: 'MONTH',
    tahun: 'YEAR',
    sesi: 'SESSION',
    orang: 'PERSON',
    m2: 'M2',
  };

  const rawUnit = (asset.priceUnit || 'hari').toLowerCase();
  const pricingUnit: PricingUnit = pricingUnitMap[rawUnit] || 'DAY';

  return {
    id: asset.id,
    name: asset.name,
    slug: asset.slug,
    excerpt: asset.shortDescription || asset.description?.slice(0, 120) || null,
    coverUrl: asset.images?.[0]?.url || null,
    address: `${asset.location || ''}, ${asset.city || 'Provinsi Jambi'}`.replace(/^, /, ''),
    pricingUnit,
    startingPrice: asset.price || 0,
    organization: {
      code: 'opd-prov-jambi',
      name: 'Pemerintah Provinsi Jambi',
    },
    category: {
      name: asset.categoryName || 'Fasilitas Daerah',
      slug: asset.categoryId || 'sewa-gedung-ruangan',
    },
  };
}
