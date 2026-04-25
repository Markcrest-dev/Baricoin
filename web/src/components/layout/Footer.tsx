import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brown-900 text-cream-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-4">
              Baricoin
            </h4>
            <p className="text-cream-300 leading-relaxed text-sm">
              The Best Site and App to Trade Giftcards & Convert Crypto to Naira
              at the Highest Rates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'About', path: '/about' },
                { label: 'Products', path: '/products' },
                { label: 'Blog', path: '/blog' },
                { label: 'Support', path: '/support' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-cream-300 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/terms"
                  className="text-cream-300 hover:text-primary transition-colors text-sm"
                >
                  Terms & Agreement
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-cream-300 hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4">
              Connect
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/rate-calculator"
                  className="text-cream-300 hover:text-primary transition-colors text-sm"
                >
                  Rate Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brown-700 pt-6 text-center">
          <p className="text-cream-300 text-sm">
            © {new Date().getFullYear()}, Baricoin. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
