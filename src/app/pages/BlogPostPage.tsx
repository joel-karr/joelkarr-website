import { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Share2,
  Linkedin,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { getPostBySlug, getRelatedPosts, formatDate } from '@/lib/blog';
import type { BlogPost } from '@/lib/blogTypes';

// --- Reading Progress Bar ---
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200">
      <div
        className="h-full bg-gray-900 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// --- Table of Contents ---
interface TocItem {
  id: string;
  text: string;
  level: number;
}

function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');

  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      items.push({ id, text, level: match[1].length });
    }
    return items;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
        On this page
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '1rem' : 0 }}>
            <a
              href={`#${id}`}
              className={`block py-1 transition-colors ${
                activeId === id
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// --- Share Links ---
function ShareLinks({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://joelkarr.com/blog/${slug}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [url]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <Share2 size={14} aria-hidden="true" /> Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check size={18} className="text-green-600" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}

// --- Author Info ---
function AuthorInfo() {
  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
      <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
        JK
      </div>
      <div>
        <p className="font-semibold text-gray-900">Joel Karr</p>
        <p className="text-sm text-gray-500 mb-2">CTO &bull; Author &bull; Engineering Leader</p>
        <p className="text-sm text-gray-600">
          Joel leads engineering teams building AI-augmented software. Author of an upcoming book on
          deliberate software engineering in the AI era.
        </p>
      </div>
    </div>
  );
}

// --- Related Posts ---
function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedPosts(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</p>
            <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// --- Markdown heading ID generator ---
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// --- Main Blog Post Page ---
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post: BlogPost | undefined = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl mb-6 text-gray-900">Post Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            This blog post doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || 'https://joelkarr.com/og-image.png',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://joelkarr.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Joel Karr',
      url: 'https://joelkarr.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://joelkarr.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        image={post.image || undefined}
        imageAlt={post.imageAlt || undefined}
        type="article"
        publishedTime={post.date}
        author={post.author}
        tags={post.tags}
        jsonLd={blogPostingJsonLd}
      />

      <ReadingProgressBar />

      <main id="main-content" className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 pb-12">
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
                <li>
                  <Link to="/blog" className="hover:text-gray-900 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <ChevronRight size={14} aria-hidden="true" />
                </li>
                <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs font-medium px-3 py-1 bg-white text-gray-600 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} aria-hidden="true" />
                {post.readingTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        {/* Article Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            {/* Main Content */}
            <article className="max-w-none">
              <div className="prose prose-lg prose-gray max-w-none prose-headings:scroll-mt-24 prose-a:text-gray-900 prose-a:underline-offset-2 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text =
                        typeof children === 'string'
                          ? children
                          : Array.isArray(children)
                            ? children
                                .map((c) => (typeof c === 'string' ? c : ''))
                                .join('')
                            : '';
                      const id = generateId(text);
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const text =
                        typeof children === 'string'
                          ? children
                          : Array.isArray(children)
                            ? children
                                .map((c) => (typeof c === 'string' ? c : ''))
                                .join('')
                            : '';
                      const id = generateId(text);
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Post Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 space-y-8">
                <ShareLinks title={post.title} slug={post.slug} />
                <AuthorInfo />
              </div>

              <RelatedPosts currentSlug={post.slug} />

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  Back to all posts
                </button>
              </div>
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block">
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
