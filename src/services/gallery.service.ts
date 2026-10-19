import type { GalleryItem } from '@/types';
import { gallery as dummyGallery } from '@/dummy';

export function getGalleryItems(): GalleryItem[] {
  return [...dummyGallery];
}

export function getGalleryItemById(id: string): GalleryItem | undefined {
  return dummyGallery.find((g) => g.id === id);
}

export function searchGallery(query: string): GalleryItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return dummyGallery;
  return dummyGallery.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
  );
}

export function getGalleryByCategory(category: string): GalleryItem[] {
  return dummyGallery.filter(
    (g) => g.category.toLowerCase() === category.toLowerCase()
  );
}
