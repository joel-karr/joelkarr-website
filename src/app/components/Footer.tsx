import { Link, useLocation, useNavigate } from 'react-router';
import logo from '@/assets/3f5e9f8d1d265121df8f64ff7c560376bf2fde12.png';
import { scrollToSection } from '@/utils/scrollToSection';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleSectionClick = (id: string) => {
    if (isHomePage) {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Joel Karr Logo" className="h-12 w-auto" />
            <div>
              <p className="text-xl mb-1">Joel Karr</p>
              <p className="text-gray-400">CTO &bull; Author &bull; Engineering Leader</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400">
            <a
              href="https://linkedin.com/in/joelkarr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <span className="hidden md:block">&bull;</span>
            <a href="mailto:joel@joelkarr.com" className="hover:text-white transition-colors">
              Email
            </a>
            <span className="hidden md:block">&bull;</span>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="hidden md:block">&bull;</span>
            <button
              onClick={() => handleSectionClick('arc')}
              className="hover:text-white transition-colors"
            >
              ARC
            </button>
            <span className="hidden md:block">&bull;</span>
            <button
              onClick={() => handleSectionClick('gwtech')}
              className="hover:text-white transition-colors"
            >
              GW Tech
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Joel Karr. All rights reserved.</p>
          <p className="mt-2 italic">"Software is a craft. Respect the process."</p>
        </div>
      </div>
    </footer>
  );
}
