import { Linkedin, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/utils/scrollToSection';

export function ConnectSection() {
  return (
    <section id="connect" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-block mb-4">
          <span className="text-sm uppercase tracking-wider text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full">
            Let's Connect
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-gray-900">
          Ready to Talk About<br />AI-Era Software Development?
        </h2>

        <p className="text-xl text-gray-700 mb-12 leading-relaxed">
          Whether you want to discuss engineering leadership, the ARC methodology, AI-driven
          software development, or just connect with someone who's been in the trenches — reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href="https://linkedin.com/in/joelkarr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white p-8 rounded-xl hover:bg-gray-800 transition-all group"
          >
            <Linkedin size={40} className="mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl mb-2">Connect on LinkedIn</h3>
            <p className="text-gray-300 mb-4">Join the conversation on engineering leadership, AI-driven development, and software craft</p>
            <div className="flex items-center justify-center gap-2 text-white">
              <span>Visit Profile</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </div>
          </a>

          <a
            href="mailto:joel@joelkarr.com"
            className="bg-gray-100 text-gray-900 p-8 rounded-xl hover:bg-gray-200 transition-all group border-2 border-gray-200"
          >
            <Mail size={40} className="mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl mb-2">Send an Email</h3>
            <p className="text-gray-600 mb-4">Reach out for speaking, consulting, or engineering leadership collaboration</p>
            <div className="flex items-center justify-center gap-2 text-gray-900">
              <span>joel@joelkarr.com</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </a>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <BookOpen size={40} className="mx-auto mb-4 text-gray-900" aria-hidden="true" />
          <h3 className="text-2xl mb-3 text-gray-900">Get the Book</h3>
          <p className="text-gray-600 mb-6">
            "Don't Think When You Code" is coming Summer 2026. Dive deeper into software craft,
            engineering team dynamics, and the path to AI-era engineering leadership.
          </p>
          <button
            onClick={() => scrollToSection('book')}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
