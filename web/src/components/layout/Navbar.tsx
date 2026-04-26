import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Wallet, TrendingUp, HelpCircle, BookOpen, Info } from 'lucide-react';
import logo from '../../assets/images/baricoin-logo-new.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'About', path: '/about', icon: <Info size={16} /> },
    { label: 'Products', path: '/products', icon: <Wallet size={16} /> },
    { label: 'Rates', path: '/rate-calculator', icon: <TrendingUp size={16} /> },
    { label: 'Blog', path: '/blog', icon: <BookOpen size={16} /> },
    { label: 'Support', path: '/support', icon: <HelpCircle size={16} /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 pointer-events-none flex justify-center py-4 lg:py-6`}>
      <nav
        className={`pointer-events-auto transition-all duration-700 flex items-center justify-between px-6 lg:px-8 group ${
          isScrolled
            ? 'w-[92%] lg:w-[85%] max-w-6xl bg-white/90 backdrop-blur-2xl rounded-[3rem] py-3 shadow-2xl border border-white/50 ring-1 ring-brand-900/5'
            : 'w-[95%] max-w-7xl bg-white/40 backdrop-blur-xl rounded-[2.5rem] py-4 border border-brand-900/10 shadow-lg'
        }`}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="Baricoin" className={`transition-all duration-500 ${isScrolled ? 'h-9 lg:h-10' : 'h-11 lg:h-12'}`} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:bg-primary/10 hover:text-primary group/item text-brand-900`}
            >
              <span className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 scale-75 group-hover/item:scale-100">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className={`font-black text-sm uppercase tracking-widest transition-all duration-300 hover:text-primary text-brand-900`}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="group relative flex items-center gap-2 px-7 py-3.5 bg-brand-900 text-white rounded-full font-black text-xs uppercase tracking-widest overflow-hidden shadow-xl hover:shadow-brand-900/20 active:scale-95 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Start Trading</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isScrolled ? 'bg-brand-900 text-white' : 'bg-white/20 text-white backdrop-blur-md'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer (Overlay) */}
      <div
        className={`lg:hidden fixed inset-0 z-[-1] transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-screen w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <img src={logo} alt="Baricoin" className="h-9" />
            <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-surface-100 rounded-xl text-brand-900">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-4 py-4 px-6 rounded-2xl text-lg font-black text-brand-900 hover:bg-surface-50 transition-all border-b border-surface-100 last:border-0"
              >
                <span className="text-primary">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-surface-200 flex flex-col gap-4">
            <Link
              to="/login"
              className="w-full py-4 text-center border-2 border-surface-200 rounded-2xl font-black text-brand-900 uppercase tracking-widest text-xs"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="w-full py-5 text-center bg-gradient-to-r from-primary to-primary-dark rounded-2xl font-black text-white uppercase tracking-widest text-xs shadow-xl"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
