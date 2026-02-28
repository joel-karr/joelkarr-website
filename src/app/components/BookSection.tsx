import { BookOpen, Brain, Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BookSection() {
  const sections = [
    {
      icon: Brain,
      title: "The Craft of Software Engineering",
      topics: [
        "Finding flow states as a software engineer",
        "Deliberate practice in software engineering",
        "Pattern recognition and reducing cognitive load",
        "Using analogies as engineering decision frameworks",
        "How AI transforms the craft of writing software"
      ]
    },
    {
      icon: Users,
      title: "Leading Engineering Teams",
      topics: [
        "The illusion of alignment in engineering organizations",
        "Making architectural decisions durable",
        "The feedback paradox and psychological safety",
        "Performing under pressure during production outages",
        "Spreading ideas by showing, not telling"
      ]
    },
    {
      icon: TrendingUp,
      title: "The Path to Engineering Leadership",
      topics: [
        "Reducing uncertainty in software projects",
        "Why big bang platform rewrites fail",
        "Turning around struggling engineering teams",
        "Protecting focus in chaotic engineering environments",
        "Engineering leadership as a deliberate practice"
      ]
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

        {/* Book Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <Icon size={24} className="text-white" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm uppercase tracking-wider text-gray-400">Part {index + 1}</span>
                </div>
                <h3 className="text-xl mb-4 text-gray-900">{section.title}</h3>
                <ul className="space-y-3">
                  {section.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400 mt-1" aria-hidden="true">&bull;</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      </article>
    </section>
  );
}
