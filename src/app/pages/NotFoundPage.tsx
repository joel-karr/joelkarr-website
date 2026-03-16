import { Link, useLocation } from 'react-router';
import { ArrowLeft, Home, BookOpen, RefreshCw } from 'lucide-react';
import logo from '@/assets/b7a220cbd0224ff4115d16c15bd8c8d837d3cccd.png';

export function NotFoundPage() {
  const location = useLocation();

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
                Your request reached the server, but this path is not mapped. The goats are still
                wrangling packets. Try one of the known good routes below.
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

              <p className="relative mt-6 text-xl font-medium text-white">The Goat Wrangler</p>
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
        </div>
      </div>
    </main>
  );
}
