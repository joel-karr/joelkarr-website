import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowLeft, Home, BookOpen, RefreshCw } from 'lucide-react';
import logo from '@/assets/b7a220cbd0224ff4115d16c15bd8c8d837d3cccd.png';
import { getAllPostMeta } from '@/lib/blog';

interface RouteItem {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

interface AssistantMessage {
  role: 'assistant' | 'user';
  text: string;
  suggestions?: RouteItem[];
  source?: 'azure-openai' | 'fallback' | 'local';
}

export function NotFoundPage() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasSuggestedForPath = useRef(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: 'assistant',
      text: 'I can help you find the right page. Ask for topics like ARC, book chapters, AI software lifecycle, SDLC, or a blog post topic.'
    }
  ]);

  const routeCatalog = useMemo<RouteItem[]>(() => {
    const staticRoutes: RouteItem[] = [
      {
        title: 'Home',
        description: 'Main landing page with Joel Karr overview and navigation.',
        path: '/',
        keywords: ['home', 'landing', 'overview', 'joel']
      },
      {
        title: 'The Book Section',
        description: 'Chapter highlights from Don\'t Think When You Code and software engineering themes.',
        path: '/#book',
        keywords: ['book', 'chapters', 'dont think when you code', 'engineering craft']
      },
      {
        title: 'ARC Methodology Section',
        description: 'AI-era ARC framework for modern software delivery.',
        path: '/#arc',
        keywords: ['arc', 'methodology', 'framework', 'ai delivery', 'software lifecycle', 'sdlc']
      },
      {
        title: 'About Section',
        description: 'Joel\'s background and engineering journey.',
        path: '/#about',
        keywords: ['about', 'bio', 'background', 'story']
      },
      {
        title: 'GW Tech Section',
        description: 'GW Tech community details and links.',
        path: '/#gwtech',
        keywords: ['gw', 'gw tech', 'community', 'events']
      },
      {
        title: 'Connect Section',
        description: 'Ways to connect, follow, and get updates.',
        path: '/#connect',
        keywords: ['connect', 'contact', 'linkedin', 'email']
      },
      {
        title: 'Blog Index',
        description: 'All published articles on software engineering and AI.',
        path: '/blog',
        keywords: ['blog', 'posts', 'articles', 'engineering blog']
      }
    ];

    const postRoutes = getAllPostMeta().map((post) => ({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      keywords: [post.slug, ...post.tags]
    }));

    return [...staticRoutes, ...postRoutes];
  }, []);

  const scoreRoute = (item: RouteItem, terms: string[]): number => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const path = item.path.toLowerCase();
    const keywords = item.keywords.join(' ').toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 6;
      if (keywords.includes(term)) score += 4;
      if (description.includes(term)) score += 2;
      if (path.includes(term)) score += 3;
    }
    return score;
  };

  const findSuggestions = (rawInput: string): RouteItem[] => {
    const normalized = rawInput.toLowerCase().trim();
    if (!normalized) return [];

    const terms = normalized
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 1);

    if (terms.length === 0) return [];

    return routeCatalog
      .map((item) => ({ item, score: scoreRoute(item, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ item }) => item);
  };

  const createAssistantReply = (rawInput: string): AssistantMessage => {
    const normalized = rawInput.toLowerCase().trim();
    const greeting = /^(hi|hello|hey|yo)\b/.test(normalized);
    if (greeting) {
      return {
        role: 'assistant',
        text: 'Hey. Tell me what you were trying to find and I will suggest the best page links.',
        source: 'local'
      };
    }

    const suggestions = findSuggestions(rawInput);

    if (suggestions.length === 0) {
      return {
        role: 'assistant',
        text: 'I could not find a strong match yet. Try keywords like "AI software lifecycle", "SDLC", "book chapters", "ARC", or "big bang rewrites".',
        suggestions: routeCatalog.filter((r) => r.path === '/blog' || r.path === '/#arc' || r.path === '/#book'),
        source: 'local'
      };
    }

    return {
      role: 'assistant',
      text: 'These look like your best matches. Open one and I can keep narrowing if needed.',
      suggestions,
      source: 'local'
    };
  };

  const fetchAssistantReply = async (rawInput: string): Promise<AssistantMessage> => {
    try {
      const response = await fetch('/api/route-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: rawInput,
          currentPath: location.pathname,
          routeCatalog,
        }),
      });

      if (!response.ok) {
        return createAssistantReply(rawInput);
      }

      const data = await response.json();
      if (!data || typeof data.message !== 'string') {
        return createAssistantReply(rawInput);
      }

      const safeSuggestions: RouteItem[] = Array.isArray(data.suggestions)
        ? data.suggestions
            .filter((s: RouteItem) => typeof s.path === 'string' && typeof s.title === 'string')
            .slice(0, 3)
        : [];

      return {
        role: 'assistant',
        text: data.message,
        suggestions: safeSuggestions.length > 0 ? safeSuggestions : createAssistantReply(rawInput).suggestions,
        source: data.source === 'azure-openai' ? 'azure-openai' : 'fallback',
      };
    } catch {
      return createAssistantReply(rawInput);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setQuery('');
    setIsLoading(true);

    const reply = await fetchAssistantReply(trimmed);
    setMessages((prev) => [...prev, reply]);
    setIsLoading(false);
  };

  useEffect(() => {
    hasSuggestedForPath.current = false;
  }, [location.pathname]);

  useEffect(() => {
    if (hasSuggestedForPath.current) return;
    const pathHint = location.pathname.replace(/^\//, '').replace(/[-_/]+/g, ' ').trim();
    if (!pathHint) return;

    hasSuggestedForPath.current = true;

    let cancelled = false;
    const run = async () => {
      const reply = await fetchAssistantReply(pathHint);
      if (cancelled) return;

      setMessages((prev) => {
        if (prev.length > 1) return prev;
        return [
          ...prev,
          {
            role: 'assistant',
            text: `I also analyzed this broken path: "${location.pathname}". ${reply.text}`,
            suggestions: reply.suggestions
          }
        ];
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, routeCatalog]);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827_45%,_#020617_90%)] text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 bg-black/20">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden="true" />
            <p className="ml-3 text-xs uppercase tracking-[0.2em] text-white/70">GW Debug Console</p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 p-6 sm:p-10">
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">Error 404</p>
              <h1 className="text-4xl sm:text-6xl leading-tight font-semibold">
                Route Not Found
              </h1>
              <p className="mt-4 text-lg text-slate-200 max-w-2xl">
                Your request reached the server, but this path is not mapped. The GOAT route assistant
                is ready to help you find the right destination below.
              </p>

              <div className="mt-8 rounded-2xl bg-slate-950/70 border border-cyan-400/20 p-5 font-mono text-sm text-cyan-100">
                <p className="text-cyan-300">$ curl -I {location.pathname || '/'}</p>
                <p className="mt-2 text-rose-300">HTTP/1.1 404 Not Found</p>
                <p className="mt-1 text-slate-300">x-gw-trace: route-index-miss</p>
                <p className="mt-1 text-slate-300">hint: check slug, path, or navigation source</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 text-slate-950 px-5 py-3 hover:bg-cyan-300 transition-colors"
                >
                  <Home size={18} aria-hidden="true" />
                  Home
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 hover:bg-white/10 transition-colors"
                >
                  <BookOpen size={18} aria-hidden="true" />
                  Blog Index
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  Back to Safe Route
                </Link>
              </div>
            </section>

            <aside className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_24px,rgba(255,255,255,0.06)_25px),linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.06)_25px)] bg-[size:25px_25px] opacity-20 rounded-2xl" aria-hidden="true" />

              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-cyan-400/20 blur-2xl" aria-hidden="true" />
                <img
                  src={logo}
                  alt="GW logo"
                  className="relative h-36 sm:h-44 w-auto drop-shadow-2xl"
                />
              </div>

              <p className="relative mt-6 text-xl font-medium text-white">The GOAT Assistant</p>
              <p className="relative mt-2 text-sm text-slate-300 max-w-xs">
                A pathfinder for lost developers, broken links, and ambitious routes.
              </p>

              <button
                onClick={() => window.location.reload()}
                className="relative mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2.5 text-cyan-100 hover:bg-cyan-400/20 transition-colors"
              >
                <RefreshCw size={16} aria-hidden="true" />
                Retry Request
              </button>
            </aside>
          </div>

          <div className="border-t border-white/10 bg-black/15 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl text-white">GW Route Assistant</h2>
            <p className="text-sm text-slate-300 mt-1">
              Ask what you are looking for and get suggested pages from site content.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 max-h-80 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-xl px-4 py-3 ${
                    message.role === 'assistant'
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-cyan-400/15 border border-cyan-300/30'
                  }`}
                >
                  <p className="text-sm text-slate-100">{message.text}</p>
                  {message.role === 'assistant' && message.source && (
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
                      mode: {message.source === 'azure-openai' ? 'azure openai' : message.source}
                    </p>
                  )}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion) => (
                        <Link
                          key={`${index}-${suggestion.path}`}
                          to={suggestion.path}
                          className="text-xs rounded-lg bg-white/10 hover:bg-white/20 text-cyan-100 border border-cyan-200/25 px-3 py-1.5 transition-colors"
                        >
                          {suggestion.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: AI software lifecycle, SDLC, book chapters, ARC..."
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-300"
                aria-label="Ask GW Route Assistant"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="rounded-xl bg-cyan-400 text-slate-950 px-5 py-3 hover:bg-cyan-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
