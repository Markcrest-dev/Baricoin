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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-premium border-b border-surface-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img src={logo} alt="Baricoin" className="h-11" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
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
                className={`font-semibold relative py-1 transition-all duration-300 hover:text-primary group ${
                  isScrolled ? 'text-brand-800' : 'text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className={`px-6 py-2.5 font-bold rounded-xl border-2 transition-all duration-300 ${
                isScrolled 
                  ? 'border-primary/20 text-primary hover:bg-primary/5 hover:border-primary' 
                  : 'border-white/30 text-white hover:bg-white/10 hover:border-white'
              }`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 font-bold rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden p-2.5 rounded-xl transition-all ${
            isScrolled ? 'text-brand-800 bg-surface-100' : 'text-white bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl shadow-premium border-b border-surface-200 transition-all duration-500 overflow-hidden ${
          isMobileOpen ? 'max-h-[600px] opacity-100 py-8' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-6">
          {['About', 'Blog', 'Products', 'Rate Calculator', 'Support'].map(
            (label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase().replace(' ', '-')}`}
                className="text-brand-800 font-bold text-lg hover:text-primary transition-colors"
              >
                {label}
              </Link>
            )
          )}
          <div className="flex flex-col gap-4 mt-4 pt-6 border-t border-surface-200">
            <Link
              to="/login"
              className="text-center px-6 py-4 font-bold rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-center px-6 py-4 font-bold rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
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
