import type { BlogPost, BlogPostMeta } from './blogTypes';
import posts from 'virtual:blog-posts';

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllPostMeta(): BlogPostMeta[] {
  return posts.map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return posts
    .filter(p => p.tags.includes(tag))
    .map(({ content: _, ...meta }) => meta);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  const current = posts.find(p => p.slug === currentSlug);
  if (!current) return [];

  return posts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      ...p,
      score: p.tags.filter(t => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
    .map(({ content: _, score: __, ...meta }) => meta);
}

export function formatDate(dateString: string): string {
  // Append T00:00:00 to parse as local time, not UTC
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
