import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, Tag, ArrowRight, ChevronRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { getAllPostMeta, getAllTags, formatDate } from '@/lib/blog';
import type { BlogPostMeta } from '@/lib/blogTypes';

function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {post.image && (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
          >
            Read
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TagFilter({
  tags,
  activeTag,
  onTagSelect,
}: {
  tags: string[];
  activeTag: string | null;
  onTagSelect: (tag: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeTag === null
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Tag size={12} className="inline mr-1" aria-hidden="true" />
          {tag}
        </button>
      ))}
    </div>
  );
}

export function BlogListPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allPosts = getAllPostMeta();
  const allTags = getAllTags();

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter((post) => post.tags.includes(activeTag));
  }, [allPosts, activeTag]);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Joel Karr Blog',
    description:
      'Insights on AI-era software development, deliberate engineering practices, and building software that lasts.',
    url: 'https://joelkarr.com/blog',
    author: {
      '@type': 'Person',
      name: 'Joel Karr',
      url: 'https://joelkarr.com',
    },
    blogPost: allPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://joelkarr.com/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Blog - AI-Era Software Development Insights"
        description="Practical insights on software architecture, AI-augmented development, and building engineering teams that ship. By Joel Karr, CTO and author."
        path="/blog"
        jsonLd={blogJsonLd}
      />

      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight size={14} aria-hidden="true" />
                </li>
                <li className="text-gray-900 font-medium">Blog</li>
              </ol>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Practical insights on software architecture, AI-augmented development, and building
              engineering teams that ship.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="mb-8">
              <TagFilter tags={allTags} activeTag={activeTag} onTagSelect={setActiveTag} />
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            {activeTag ? ` tagged "${activeTag}"` : ''}
          </p>

          {/* Post Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No posts found for this tag.</p>
              <button
                onClick={() => setActiveTag(null)}
                className="mt-4 text-gray-900 font-medium hover:underline"
              >
                View all posts
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
