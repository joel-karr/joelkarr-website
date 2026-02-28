import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { scrollToSection } from '@/utils/scrollToSection';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-70"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="text-sm uppercase tracking-wider text-gray-600 bg-gray-200 px-4 py-1.5 rounded-full">
                CTO &bull; Author &bull; AI-Era Engineering Leader
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Software is a craft.<br />
              <span className="text-gray-600">Respect the process.</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Joel Karr has spent 20+ years building and leading engineering teams through platform
              modernizations, high-stakes outages, and AI-driven transformations. As a CTO and author of{' '}
              <em>Don't Think When You Code</em>, he believes the future of software development isn't
              about typing faster — it's about solving the right problems with deliberate practice and craft.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('book')}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Read the Book
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => scrollToSection('arc')}
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-900 hover:text-white transition-all"
              >
                Discover ARC
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform rotate-3"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765371512336-99c2b1c6975f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzIyMTQ2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Joel Karr's workspace — software engineering and AI-driven development"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
