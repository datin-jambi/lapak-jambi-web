import type { FAQItem } from '@/types';
import { faq as dummyFAQ } from '@/dummy';

export function getFAQs(): FAQItem[] {
  return [...dummyFAQ].sort((a, b) => a.order - b.order);
}

export function getFAQById(id: string): FAQItem | undefined {
  return dummyFAQ.find((f) => f.id === id);
}

export function searchFAQs(query: string): FAQItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return getFAQs();
  return dummyFAQ.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
  );
}

export function getFAQsByCategory(category: string): FAQItem[] {
  return dummyFAQ.filter(
    (f) => f.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPublishedFAQs(): FAQItem[] {
  return dummyFAQ.filter((f) => f.isPublished).sort((a, b) => a.order - b.order);
}
