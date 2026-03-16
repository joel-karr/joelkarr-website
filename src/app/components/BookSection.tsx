import { BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BookSection() {
  const chapterHighlights = [
    {
      chapter: 'Chapter 1',
      title: 'Flow State for Software Engineers',
      summary:
        'How top engineers enter flow more often by matching challenge to skill and training pattern recognition.'
    },
    {
      chapter: 'Chapter 2',
      title: 'Deliberate Practice That Improves Coding Faster',
      summary:
        'A practical training-journal method to become a better software engineer with targeted, repeatable skill reps.'
    },
    {
      chapter: 'Chapter 3',
      title: 'Task Templates for a Faster SDLC',
      summary:
        'Use reusable implementation playbooks to reduce rework, improve estimates, and speed up the software development lifecycle.'
    },
    {
      chapter: 'Chapter 4',
      title: 'Mental Models for Legacy Code and Architecture',
      summary:
        'Make stronger architecture decisions under uncertainty by scanning for patterns instead of rethinking every line.'
    },
    {
      chapter: 'Chapter 5',
      title: 'Framing Problems Before Estimating Delivery',
      summary:
        'Improve SDLC planning by surfacing hidden assumptions early so teams avoid expensive late-stage changes.'
    },
    {
      chapter: 'Chapter 9',
      title: 'How Teams Make Decisions That Stay Decided',
      summary:
        'Prevent decision churn by tying choices to assumptions and only reopening when new information appears.'
    },
    {
      chapter: 'Chapter 10',
      title: 'Feedback Systems That Improve Engineering Velocity',
      summary:
        'Build psychological safety with high standards so code reviews drive learning, quality, and faster execution.'
    },
    {
      chapter: 'Chapter 16',
      title: 'AI in the Software Lifecycle and Modern SDLC',
      summary:
        'Translate proven task templates into AI prompt templates to improve output quality across the AI software lifecycle.'
    }
  ];

  return (
    <section id="book" className="py-24 bg-white">
      <article itemScope itemType="https://schema.org/Book">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-gray-600 mb-4">
              <BookOpen size={20} aria-hidden="true" />
              <span className="uppercase tracking-wider text-sm">Coming Soon &bull; Summer 2026</span>
            </div>

            <h2 itemProp="name" className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-gray-900">
              Don't Think<br />When You Code
            </h2>

            <p itemProp="description" className="text-xl text-gray-700 mb-6 leading-relaxed">
              A book about the craft of software engineering in the AI era, drawn from 20+ years of
              experience building high-performing teams, surviving production disasters, and learning
              that mastery comes from deliberate practice — drilling one small detail at a time.
            </p>

            <p className="text-lg text-gray-600 mb-8">
              From learning QuickBASIC as a 10-year-old in small-town Illinois to leading
              engineering teams through full-scale platform modernizations and AI transformations,
              Joel shares the stories, frameworks, and hard-won lessons that shaped his approach
              to building software and leading engineers.
            </p>

            <p className="text-base text-gray-600 mb-8">
              These chapter highlights focus on practical systems for AI software development lifecycle
              execution, modern SDLC planning, and becoming a better software engineer.
            </p>

            <button
              disabled
              className="bg-gray-400 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 cursor-not-allowed"
            >
              Pre-Order Coming Soon
              <BookOpen size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl transform -rotate-2"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1637962638310-e6787f7eb324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMHJlYWRpbmd8ZW58MXx8fHwxNzcyMTgzNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Don't Think When You Code — a book on software engineering craft and AI-era development"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Chapter Highlights */}
        <div className="mb-6">
          <h3 className="text-2xl text-gray-900">Chapter Highlights (8 of 16)</h3>
          <p className="text-gray-600 mt-2">
            Built for engineers focused on AI-driven software lifecycle execution, stronger SDLC practices,
            and long-term software engineering growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {chapterHighlights.map((chapter, index) => {
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-sm" aria-hidden="true">{index + 1}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-wider text-gray-400">{chapter.chapter}</span>
                </div>
                <h4 className="text-lg mb-3 text-gray-900">{chapter.title}</h4>
                <p className="text-gray-600">{chapter.summary}</p>
              </div>
            );
          })}
        </div>
      </div>
      </article>
    </section>
  );
}
