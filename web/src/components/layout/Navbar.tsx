import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/baricoin-logo-new.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Baricoin" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {[
              { label: 'About', path: '/about' },
              { label: 'Blog', path: '/blog' },
              { label: 'Products', path: '/products' },
              { label: 'Rate Calculator', path: '/rate-calculator' },
              { label: 'Support', path: '/support' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium relative py-1 transition-colors duration-200 hover:text-primary group ${
                  isScrolled ? 'text-brown-700' : 'text-white/90'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 font-semibold rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-brown-800' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {['About', 'Blog', 'Products', 'Rate Calculator', 'Support'].map(
            (label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase().replace(' ', '-')}`}
                className="text-brown-700 font-medium py-2 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            )
          )}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-cream-200">
            <Link
              to="/login"
              className="text-center px-5 py-2.5 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-center px-5 py-2.5 font-semibold rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
