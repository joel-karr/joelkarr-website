import { Users, Calendar, Award, ExternalLink } from 'lucide-react';
import logo from '@/assets/b7a220cbd0224ff4115d16c15bd8c8d837d3cccd.png';

export function GWTechSection() {
  return (
    <section id="gwtech" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <article itemScope itemType="https://schema.org/Organization">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="GW Tech community logo — founded by Joel Karr" className="h-16 w-auto" />
              <h2 itemProp="name" className="text-3xl sm:text-4xl lg:text-5xl text-gray-900">
                GW Tech
              </h2>
            </div>

            <p itemProp="description" className="text-xl text-gray-700 mb-8 leading-relaxed">
              Founded by Joel Karr in 2016, GW Tech is a community of software engineers, engineering
              leaders, and technologists passionate about the craft of building software. What started
              as a gathering of curious minds has grown into a vibrant network focused on sharing
              ideas, building connections, and exploring innovation in AI-era software development.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-gray-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community-Driven</h3>
                  <p className="text-gray-700">
                    Connect with software engineers, engineering leaders, and technologists who share your passion for software craft and deliberate practice.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gray-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tech Events</h3>
                  <p className="text-gray-700">
                    Regular meetups, tech talks, and events exploring AI-driven development, engineering leadership, and software craft.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Award className="w-6 h-6 text-gray-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Annual Awards (Coming 2026)</h3>
                  <p className="text-gray-700">
                    Recognizing excellence and innovation in technology through the inaugural GW Tech Annual Awards.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/groups/15863032/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all"
            >
              Join GW Tech on LinkedIn
              <ExternalLink size={20} aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 md:p-12 text-white">
              <div className="flex items-center justify-center mb-8">
                <img src={logo} alt="GW Tech community logo" className="h-32 w-auto" />
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-white/30 pl-6">
                  <p className="text-2xl font-semibold mb-2">Founded 2016</p>
                  <p className="text-gray-300">Nearly a decade of building community</p>
                </div>

                <div className="border-l-4 border-white/30 pl-6">
                  <p className="text-2xl font-semibold mb-2">Tech Focused</p>
                  <p className="text-gray-300">Passionate about innovation and craft</p>
                </div>

                <div className="border-l-4 border-white/30 pl-6">
                  <p className="text-2xl font-semibold mb-2">Growing Network</p>
                  <p className="text-gray-300">Connect with like-minded technologists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </section>
  );
}
