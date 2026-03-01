import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from '../components/Hero';
import { BookSection } from '../components/BookSection';
import { ARCSection } from '../components/ARCSection';
import { AboutSection } from '../components/AboutSection';
import { GWTechSection } from '../components/GWTechSection';
import { ConnectSection } from '../components/ConnectSection';
import { SEOHead } from '../components/SEOHead';
import { scrollToSection } from '@/utils/scrollToSection';

export function HomePage() {
  const location = useLocation();

  // Handle hash navigation (e.g., /#arc from blog pages)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(id), 100);
    }
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title="Joel Karr - AI-Era Software Development"
        description="Joel Karr is a CTO, engineering leader, and author exploring how AI transforms software development. Discover deliberate engineering practices for the AI era."
        path="/"
      />
      <main id="main-content">
        <Hero />
        <BookSection />
        <ARCSection />
        <AboutSection />
        <GWTechSection />
        <ConnectSection />
      </main>
    </>
  );
}
