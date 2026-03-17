import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, BookOpen, Send } from 'lucide-react';
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
      text: 'Looks like that route doesn\'t exist. What were you trying to find? I know my way around this site pretty well.'
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

  const pick = (options: string[]) => options[Math.floor(Math.random() * options.length)];

  const createAssistantReply = (rawInput: string): AssistantMessage => {
    const normalized = rawInput.toLowerCase().trim();
    const greeting = /^(hi|hello|hey|yo)\b/.test(normalized);
    if (greeting) {
      return {
        role: 'assistant',
        text: pick([
          'Hey! What are you looking for? I can point you in the right direction.',
          'Hi there. What were you trying to find?',
          'Hey — tell me what you\'re after and I\'ll see what I can dig up.',
          'What\'s up! Looking for something specific on the site?',
        ]),
        source: 'local'
      };
    }

    const suggestions = findSuggestions(rawInput);

    if (suggestions.length === 0) {
      return {
        role: 'assistant',
        text: pick([
          'Hmm, nothing jumped out for that one. Maybe try "ARC", "book", "deliberate practice", or "big bang rewrites"?',
          'Not finding a strong match there. Try different keywords — topics like the book, ARC methodology, or a blog post title work best.',
          'Coming up empty on that. What topic were you interested in? I\'m good with engineering, AI lifecycle, and Joel\'s writing.',
          'No luck with that search. Try being more specific — like "software craft" or "platform rewrites".',
        ]),
        suggestions: routeCatalog.filter((r) => r.path === '/blog' || r.path === '/#arc' || r.path === '/#book'),
        source: 'local'
      };
    }

    return {
      role: 'assistant',
      text: pick([
        'Here\'s what I found — any of these what you had in mind?',
        'These look like solid matches. See anything that fits?',
        'Got a few options for you. Take a look.',
        'Think one of these is what you\'re after.',
        'Here are the closest matches I could find.',
      ]),
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827_45%,_#020617_90%)] text-white flex items-center justify-center"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-sm shadow-2xl overflow-hidden font-mono">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 bg-black/40">
            <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
            <span className="ml-auto text-xs text-white/40">404 &mdash; {location.pathname}</span>
          </div>

          {/* Logo header - Claude CLI style */}
          <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/[0.06]">
            <img
              src={logo}
              alt="Goat Wrangle logo"
              className="h-12 w-auto drop-shadow-lg"
            />
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight" style={{ fontFamily: 'inherit' }}>
                Goat Wrangle
              </h1>
              <p className="text-xs text-slate-400">route assistant v1.0</p>
            </div>
          </div>

          {/* Terminal body - curl output + chat */}
          <div className="px-6 pt-5 pb-2 max-h-[60vh] overflow-y-auto space-y-4 text-sm">
            {/* Initial curl output */}
            <div className="text-slate-400">
              <p className="text-cyan-300">$ curl -I {location.pathname || '/'}</p>
              <p className="mt-1 text-rose-400">HTTP/1.1 404 Not Found</p>
              <p className="text-slate-500">x-gw-trace: route-index-miss</p>
            </div>

            <div className="border-t border-white/[0.06]" />

            {/* Chat messages */}
            {messages.map((message, index) => (
              <div key={index} className="space-y-1">
                {message.role === 'user' ? (
                  <p className="text-cyan-300">
                    <span className="text-cyan-500">&gt; </span>
                    {message.text}
                  </p>
                ) : (
                  <div>
                    <p className="text-slate-200 leading-relaxed">{message.text}</p>
                    {message.source && (
                      <p className="text-[11px] text-slate-600 mt-1">
                        [{message.source === 'azure-openai' ? 'azure openai' : message.source}]
                      </p>
                    )}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion) => (
                          <Link
                            key={`${index}-${suggestion.path}`}
                            to={suggestion.path}
                            className="text-xs rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/20 px-2.5 py-1 transition-colors"
                          >
                            {suggestion.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <p className="text-slate-500 animate-pulse">thinking...</p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input prompt - CLI style */}
          <form onSubmit={handleSubmit} className="border-t border-white/[0.06] px-6 py-4 flex items-center gap-3">
            <span className="text-cyan-500 text-sm select-none">&gt;</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about a page, topic, or route..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none caret-cyan-400"
              aria-label="Ask Goat Wrangle route assistant"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="text-cyan-500 hover:text-cyan-300 transition-colors disabled:opacity-30"
              disabled={isLoading || !query.trim()}
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Quick nav footer */}
          <div className="border-t border-white/[0.06] px-6 py-3 flex items-center gap-4 text-xs text-slate-500">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Home size={12} aria-hidden="true" />
              home
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <BookOpen size={12} aria-hidden="true" />
              blog
            </Link>
            <span className="ml-auto text-slate-600">type a question or click a link</span>
          </div>
        </div>
      </div>
    </main>
  );
}
