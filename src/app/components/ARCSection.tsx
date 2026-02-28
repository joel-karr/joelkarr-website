import { Target, GitBranch, FileText, Users, Wrench, BarChart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { scrollToSection } from '@/utils/scrollToSection';

export function ARCSection() {
  const steps = [
    {
      icon: Target,
      title: "Opportunities",
      description: "Start with valuable outcomes, not feature requests. Define success metrics before work begins."
    },
    {
      icon: GitBranch,
      title: "Ventures",
      description: "Each opportunity spawns multiple parallel ventures, each owned end-to-end by a single engineer with AI-assisted development tools."
    },
    {
      icon: FileText,
      title: "Task Templates",
      description: "Shorthand for common task groups engineers already understand, containing interfaces, objects, and tasks."
    },
    {
      icon: Users,
      title: "Team Review",
      description: "Review design decisions that are expensive to change (interfaces, data structures, resilience plans), then trust the engineer to build."
    },
    {
      icon: Wrench,
      title: "Build and Test",
      description: "Engineers build with AI-assisted coding tools, test incrementally, and validate against success criteria before shipping."
    },
    {
      icon: BarChart,
      title: "Measure",
      description: "Evaluate ventures against success metrics, learn, and feed insights back."
    }
  ];

  return (
    <section id="arc" className="py-24 bg-gray-900 text-white">
      <article itemScope itemType="https://schema.org/HowTo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-wider text-gray-400 bg-gray-800 px-4 py-1.5 rounded-full">
              The Future of Software Development
            </span>
          </div>

          <h2 itemProp="name" className="text-3xl sm:text-4xl lg:text-5xl mb-2">
            Introducing ARC
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl mb-6 text-gray-400">
            A Methodology for AI-Era Software Development
          </p>

          <p itemProp="description" className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            A methodology designed for the AI era, where the bottleneck isn't typing speed —
            it's whether you're solving the right problem.
          </p>

          <p className="text-2xl text-white italic">
            "Software is a craft. Respect the process."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-3xl mb-6">Why Your Engineering Team Needs ARC</h3>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              AI-assisted planning, code generation, and automated reviews have fundamentally changed
              development velocity. But speed without direction creates waste — and most software teams
              are optimizing for output instead of outcomes.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              The ARC methodology shifts your team's focus from maximizing output to maximizing
              outcomes. It respects the craft of software engineering while embracing AI tools that
              amplify human judgment and engineering expertise.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Built on principles learned from 20+ years of engineering leadership, deliberate
              practice, and surviving production disasters at scale — the same lessons explored
              in <em>Don't Think When You Code</em>.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl transform rotate-2"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1657834713969-6592efed8913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW5zaGlwJTIwd29ya3Nob3AlMjB0b29sc3xlbnwxfHx8fDE3NzIyMTQ2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Software craftsmanship — deliberate practice in engineering"
              className="relative rounded-2xl shadow-2xl w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* ARC Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all" itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                <meta itemProp="position" content={String(index + 1)} />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-gray-900" aria-hidden="true" />
                  </div>
                  <div className="text-3xl text-gray-600">{index + 1}</div>
                </div>
                <h4 itemProp="name" className="text-xl mb-3">{step.title}</h4>
                <p itemProp="text" className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to implement the ARC methodology in your engineering organization?
          </p>
          <button
            onClick={() => scrollToSection('connect')}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all"
          >
            Get in Touch
          </button>
        </div>
      </div>
      </article>
    </section>
  );
}
