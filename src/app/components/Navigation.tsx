import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/utils/scrollToSection';
import logo from '@/assets/b7a220cbd0224ff4115d16c15bd8c8d837d3cccd.png';

const NAV_SECTIONS = ['book', 'arc', 'about', 'gwtech', 'connect'] as const;
const NAV_LABELS: Record<string, string> = {
  book: 'The Book',
  arc: 'ARC',
  about: 'About',
  gwtech: 'GW Tech',
  connect: 'Connect',
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Throttled scroll handler for nav background
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver (only on homepage)
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback(
    (id: string) => {
      setIsMobileMenuOpen(false);
      if (isHomePage) {
        scrollToSection(id);
      } else {
        navigate(`/#${id}`);
      }
    },
    [isHomePage, navigate]
  );

  const handleLogoClick = useCallback(() => {
    if (isHomePage) {
      scrollToSection('hero');
    } else {
      navigate('/');
    }
  }, [isHomePage, navigate]);

  const isBlogActive = location.pathname.startsWith('/blog');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Joel Karr Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold text-gray-900">Joel Karr</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.filter((id) => id !== 'connect').map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`transition-colors ${
                  activeSection === id
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {NAV_LABELS[id]}
              </button>
            ))}
            <Link
              to="/blog"
              className={`transition-colors ${
                isBlogActive
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Blog
            </Link>
            <button
              onClick={() => handleNavClick('connect')}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-900"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 bg-white border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {NAV_SECTIONS.filter((id) => id !== 'connect').map((id) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`text-left py-2 transition-colors ${
                    activeSection === id
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {NAV_LABELS[id]}
                </button>
              ))}
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-left py-2 transition-colors ${
                  isBlogActive
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Blog
              </Link>
              <button
                onClick={() => handleNavClick('connect')}
                className="text-left bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
