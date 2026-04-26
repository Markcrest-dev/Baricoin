import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-surface-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-2xl font-bold text-white">
              Baricoin
            </h4>
            <p className="text-brand-400 leading-relaxed">
              The premium platform for trading gift cards and converting crypto to Naira. Experience the highest rates and instant payments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Products', path: '/products' },
                { label: 'Read Blog', path: '/blog' },
                { label: 'Help & Support', path: '/support' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-brand-400 hover:text-primary transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/terms"
                  className="text-brand-400 hover:text-primary transition-all duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-brand-400 hover:text-primary transition-all duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Utilities
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/rate-calculator"
                  className="text-brand-400 hover:text-primary transition-all duration-200"
                >
                  Rate Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-500 text-sm">
            © {new Date().getFullYear()} Baricoin Technologies. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
