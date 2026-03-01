import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl mb-6 text-gray-900">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
