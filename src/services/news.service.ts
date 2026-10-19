import type { NewsItem } from '@/types';
import { news as dummyNews } from '@/dummy';

export function getNews(): NewsItem[] {
  return [...dummyNews];
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return dummyNews.find((n) => n.slug === slug);
}

export function getFeaturedNews(): NewsItem[] {
  return dummyNews.filter((n) => n.isFeatured);
}

export function searchNews(query: string): NewsItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return dummyNews;
  return dummyNews.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getNewsByCategory(category: string): NewsItem[] {
  return dummyNews.filter((n) => n.category.toLowerCase() === category.toLowerCase());
}
