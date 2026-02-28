import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BookSection } from './components/BookSection';
import { ARCSection } from './components/ARCSection';
import { AboutSection } from './components/AboutSection';
import { GWTechSection } from './components/GWTechSection';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BackToTop } from './components/BackToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">
          <Hero />
          <BookSection />
          <ARCSection />
          <AboutSection />
          <GWTechSection />
          <ConnectSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}
