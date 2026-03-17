import { useState } from 'react';
import { Link } from 'react-router';
import { Lightbulb, Wrench, Users, ChevronRight, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const AWARDS = [
  {
    id: 'innovator',
    icon: Lightbulb,
    title: 'Innovator of the Year',
    tagline: 'Outcomes over output.',
    description:
      'Rooted in the ARC methodology — this award recognizes someone who identified a meaningful opportunity and delivered measurable outcomes, not just shipped features.',
    criteria: [
      'Identified a valuable opportunity others overlooked',
      'Defined clear success metrics before starting work',
      'Delivered measurable outcomes, not just output volume',
      'Used modern tools to amplify judgment, not replace it',
      'Demonstrated that speed with direction beats speed alone',
    ],
  },
  {
    id: 'craft',
    icon: Wrench,
    title: 'The Craft Award',
    tagline: 'Mastery through deliberate practice.',
    description:
      'Rooted in "Don\'t Think When You Code" — this award recognizes an engineer who visibly invests in their craft and raises the quality bar through intentional practice.',
    criteria: [
      'Demonstrates systematic improvement through deliberate practice',
      'Builds or shares reusable patterns, task templates, and mental models',
      'Invests in deep work: code reading, constraint-based exercises, decision journaling',
      'Makes architecture decisions that hold up under pressure',
      'Elevates code quality and engineering standards around them',
    ],
  },
  {
    id: 'community-builder',
    icon: Users,
    title: 'Community Builder of the Year',
    tagline: 'Lift the people around you.',
    description:
      'Rooted in the principles of engineering leadership and GW Tech\'s founding mission — this award recognizes someone who strengthens the community through mentorship, knowledge sharing, and culture.',
    criteria: [
      'Creates environments where engineers feel safe to take risks and give honest feedback',
      'Shares knowledge through talks, writing, mentoring, or open source contributions',
      'Builds team culture rooted in learning and deliberate practice',
      'Helps others grow by showing, not just telling',
      'Strengthens connections across the engineering community',
    ],
  },
] as const;

interface FormData {
  award: string;
  nominatorName: string;
  nominatorEmail: string;
  nomineeName: string;
  nomineeRole: string;
  justification: string;
}

const initialForm: FormData = {
  award: '',
  nominatorName: '',
  nominatorEmail: '',
  nomineeName: '',
  nomineeRole: '',
  justification: '',
};

export function AwardsPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};

    if (!form.award) next.award = 'Please select an award';
    if (!form.nominatorName.trim() || form.nominatorName.trim().length < 2)
      next.nominatorName = 'Your name is required';
    if (!form.nominatorEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.nominatorEmail))
      next.nominatorEmail = 'A valid email is required';
    if (!form.nomineeName.trim() || form.nomineeName.trim().length < 2)
      next.nomineeName = 'Nominee name is required';
    if (!form.nomineeRole.trim()) next.nomineeRole = 'Nominee role or company is required';
    if (!form.justification.trim() || form.justification.trim().length < 50)
      next.justification = 'Please write at least 50 characters explaining why this person deserves the award';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/nominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError('Could not reach the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const awardsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'GW Tech Annual Awards 2026',
    description:
      'Peer-nominated awards recognizing innovation, engineering craft, and community building in software engineering.',
    url: 'https://www.joelkarr.com/awards',
    organizer: {
      '@type': 'Organization',
      name: 'GW Tech',
      url: 'https://www.joelkarr.com',
    },
  };

  return (
    <main id="main-content" className="pt-20">
      <SEOHead
        title="GW Tech Annual Awards 2026"
        description="Nominate a peer for the inaugural GW Tech Annual Awards — recognizing innovation, engineering craft, and community building."
        path="/awards"
        jsonLd={awardsJsonLd}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-gray-900">Awards</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
            GW Tech Annual Awards
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl leading-relaxed">
            Peer-driven recognition for engineers who solve the right problems, invest in their craft,
            and lift the people around them. Nominate someone who deserves to be recognized.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Self-nominations are not accepted — this is about recognizing a peer.
          </p>
        </div>
      </section>

      {/* Award Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {AWARDS.map((award) => {
              const Icon = award.icon;
              return (
                <div
                  key={award.id}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-gray-100 rounded-xl">
                      <Icon className="w-6 h-6 text-gray-900" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{award.title}</h2>
                  </div>
                  <p className="text-sm font-medium text-gray-500 italic mb-4">{award.tagline}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{award.description}</p>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                    Criteria
                  </h3>
                  <ul className="space-y-2">
                    {award.criteria.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-gray-400 mt-0.5 shrink-0">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nomination Form */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Submit a Nomination</h2>
          <p className="text-gray-600 mb-10">
            Know someone who deserves recognition? Tell us who and why.
          </p>

          {isSubmitted ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nomination Submitted</h3>
              <p className="text-gray-600 mb-6">
                Thanks for recognizing great work. We'll review all nominations and announce winners
                at the inaugural GW Tech Annual Awards.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setForm(initialForm);
                }}
                className="text-gray-900 underline underline-offset-4 hover:text-gray-700 transition-colors"
              >
                Submit another nomination
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Award Selection */}
              <fieldset>
                <legend className="text-sm font-semibold text-gray-900 mb-3">
                  Which award are you nominating for?
                </legend>
                <div className="space-y-3">
                  {AWARDS.map((award) => (
                    <label
                      key={award.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        form.award === award.id
                          ? 'border-gray-900 bg-gray-900/[0.03]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="award"
                        value={award.id}
                        checked={form.award === award.id}
                        onChange={(e) => handleChange('award', e.target.value)}
                        className="accent-gray-900"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{award.title}</p>
                        <p className="text-sm text-gray-500">{award.tagline}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.award && <p className="mt-2 text-sm text-red-600">{errors.award}</p>}
              </fieldset>

              {/* Nominator Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nominatorName" className="block text-sm text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="nominatorName"
                      type="text"
                      value={form.nominatorName}
                      onChange={(e) => handleChange('nominatorName', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    {errors.nominatorName && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.nominatorName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="nominatorEmail" className="block text-sm text-gray-700 mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="nominatorEmail"
                      type="email"
                      value={form.nominatorEmail}
                      onChange={(e) => handleChange('nominatorEmail', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    {errors.nominatorEmail && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.nominatorEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Nominee Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Nominee Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nomineeName" className="block text-sm text-gray-700 mb-1.5">
                      Nominee Name
                    </label>
                    <input
                      id="nomineeName"
                      type="text"
                      value={form.nomineeName}
                      onChange={(e) => handleChange('nomineeName', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    {errors.nomineeName && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.nomineeName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="nomineeRole" className="block text-sm text-gray-700 mb-1.5">
                      Nominee Role / Company
                    </label>
                    <input
                      id="nomineeRole"
                      type="text"
                      value={form.nomineeRole}
                      onChange={(e) => handleChange('nomineeRole', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    {errors.nomineeRole && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.nomineeRole}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Justification */}
              <div>
                <label htmlFor="justification" className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Why does this person deserve this award?
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Share specific examples of their impact. Minimum 50 characters.
                </p>
                <textarea
                  id="justification"
                  rows={5}
                  maxLength={2000}
                  value={form.justification}
                  onChange={(e) => handleChange('justification', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors resize-y"
                />
                <div className="flex justify-between mt-1.5">
                  {errors.justification ? (
                    <p className="text-sm text-red-600">{errors.justification}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-gray-400">{form.justification.length}/2000</p>
                </div>
              </div>

              {submitError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
