import { BookOpen, Lightbulb, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const milestones = [
    {
      icon: BookOpen,
      title: "Published Author",
      description: "Author of \"Don't Think When You Code\" — teaching software craft and deliberate practice through 20+ years of engineering stories"
    },
    {
      icon: Lightbulb,
      title: "Created ARC",
      description: "Developed the ARC methodology for AI-era software development, focused on outcomes over output"
    },
    {
      icon: Zap,
      title: "Battle-Tested Leader",
      description: "Led engineering teams through platform modernizations, production crises, and AI-driven transformations"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <article itemScope itemType="https://schema.org/Person">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform -rotate-2"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1597239450996-ea7c2c564412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwY29kaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjIxNDkzNHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Software engineering workspace — deliberate practice and engineering leadership"
              className="relative rounded-2xl shadow-2xl w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <div className="inline-block mb-4">
              <span className="text-sm uppercase tracking-wider text-gray-600 bg-gray-200 px-4 py-1.5 rounded-full">
                About Joel
              </span>
            </div>

            <h2 itemProp="name" className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-gray-900">
              From QuickBASIC to<br />AI-Era Engineering Leadership
            </h2>

            <p itemProp="description" className="text-lg text-gray-700 mb-6 leading-relaxed">
              Joel Karr is a Chief Technology Officer with over 20 years in software engineering.
              His journey began at age 10 in small-town Illinois, learning QuickBASIC from
              a book his dad discovered at a university bookstore.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              That early curiosity grew into a career defined by a core principle: <strong>mastery comes
              from drilling one small detail at a time</strong>. This discipline shaped his approach to
              both writing code and leading engineering teams.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Throughout his career, he's led engineering teams through full-scale platform
              modernizations, survived Cyber Monday crashes that cost hundreds of thousands in lost
              revenue, and built engineering cultures rooted in deliberate practice. He teaches through
              stories, not lectures, connecting software engineering to craftsmanship, psychology,
              and the emerging role of AI in software development.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon size={24} className="text-white" aria-hidden="true" />
                    </div>
                    <h4 className="mb-2 text-gray-900">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-lg text-gray-700">
              Joel believes the future of AI-driven software development isn't about typing faster —
              it's about solving the right problems with clarity, discipline, and respect for the craft.
            </p>
          </div>
        </div>
      </div>
      </article>
    </section>
  );
}
