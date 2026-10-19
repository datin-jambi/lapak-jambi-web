import type { Asset } from '@/types';
import { assets as dummyAssets } from '@/dummy';

export interface AssetFilters {
  categoryId?: string;
  type?: string;
  city?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export function getAssets(filters?: AssetFilters): Asset[] {
  let result = [...dummyAssets];

  if (!filters) return result;

  if (filters.categoryId) {
    result = result.filter((a) => a.categoryId === filters.categoryId);
  }
  if (filters.type) {
    result = result.filter((a) => a.type === filters.type);
  }
  if (filters.city) {
    result = result.filter((a) => a.city.toLowerCase().includes(filters.city!.toLowerCase()));
  }
  if (filters.status) {
    result = result.filter((a) => a.status === filters.status);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((a) => a.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((a) => a.price <= filters.maxPrice!);
  }
  if (filters.rating !== undefined) {
    result = result.filter((a) => a.rating >= filters.rating!);
  }

  return result;
}

export function getAssetBySlug(slug: string): Asset | undefined {
  return dummyAssets.find((a) => a.slug === slug);
}

export function getFeaturedAssets(): Asset[] {
  return dummyAssets.filter((a) => a.isFeatured);
}

export function getPopularAssets(): Asset[] {
  return dummyAssets.filter((a) => a.isPopular);
}

export function getAssetsByCategory(categoryId: string): Asset[] {
  return dummyAssets.filter((a) => a.categoryId === categoryId);
}

export function searchAssets(query: string): Asset[] {
  const q = query.toLowerCase().trim();
  if (!q) return dummyAssets;
  return dummyAssets.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.shortDescription.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.categoryName.toLowerCase().includes(q)
  );
}

export function getRelatedAssets(assetId: string): Asset[] {
  const asset = dummyAssets.find((a) => a.id === assetId);
  if (!asset) return [];
  return dummyAssets.filter(
    (a) => a.id !== assetId && (a.categoryId === asset.categoryId || a.type === asset.type)
  );
}
