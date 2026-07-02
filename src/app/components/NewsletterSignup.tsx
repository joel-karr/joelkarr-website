import { useState, FormEvent } from 'react';
import { Check, Loader2, Mail } from 'lucide-react';

type NewsletterSignupProps = {
  /** Where on the site the signup came from — included in the notification email. */
  source?: string;
  /** Optional heading rendered above the form. */
  heading?: string;
  /** Optional supporting copy rendered under the heading. */
  description?: string;
  className?: string;
};

export function NewsletterSignup({
  source = 'website',
  heading,
  description,
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 ${className}`}>
        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
          <Check size={18} className="text-white" aria-hidden="true" />
        </div>
        <p className="text-gray-900">
          You're on the list. You'll be the first to hear when the book is available.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {heading && <h4 className="text-lg text-gray-900 mb-1">{heading}</h4>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900 bg-white"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait whitespace-nowrap"
        >
          {status === 'submitting' ? (
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Mail size={18} aria-hidden="true" />
          )}
          Join the Launch List
        </button>
      </form>
      {status === 'error' && error && (
        <p className="text-sm text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        Launch news and a free sample chapter. No spam, unsubscribe anytime.
      </p>
    </div>
  );
}
