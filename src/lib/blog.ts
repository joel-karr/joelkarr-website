import type { BlogPost, BlogPostMeta } from './blogTypes';
import posts from 'virtual:blog-posts';

function normalizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/\/+$/g, '')
    .replace(/(^-|-$)/g, '');
}

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllPostMeta(): BlogPostMeta[] {
  return posts.map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const normalized = normalizeSlug(slug);
  return posts.find((p) => normalizeSlug(p.slug) === normalized);
}

// Resolve likely deep-link typos/truncations to a canonical blog post slug.
export function findClosestPostBySlug(slug: string): BlogPost | undefined {
  const normalized = normalizeSlug(slug);
  if (!normalized) return undefined;

  const prefixMatches = posts
    .filter((p) => p.slug.startsWith(normalized) || normalized.startsWith(p.slug))
    .sort((a, b) => {
      const aDelta = Math.abs(a.slug.length - normalized.length);
      const bDelta = Math.abs(b.slug.length - normalized.length);
      return aDelta - bDelta;
    });

  if (prefixMatches.length > 0) return prefixMatches[0];

  const maxDistance = 2;
  let bestMatch: BlogPost | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  const levenshtein = (a: string, b: string): number => {
    const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
    for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[a.length][b.length];
  };

  for (const post of posts) {
    const distance = levenshtein(normalized, post.slug);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = post;
    }
  }

  return bestDistance <= maxDistance ? bestMatch : undefined;
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
