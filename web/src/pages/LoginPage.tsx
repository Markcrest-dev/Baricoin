import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Bitcoin, Zap, CreditCard, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/images/baricoin-logo-new.png';

const cubeContent = [
  { icon: <Gift size={36} />, title: 'Trade Gift Cards', desc: 'Sell gift cards at the best rates instantly' },
  { icon: <Bitcoin size={36} />, title: 'Convert Crypto', desc: 'Exchange crypto to Naira securely' },
  { icon: <Zap size={36} />, title: 'Instant Payments', desc: 'Get paid immediately to your account' },
  { icon: <CreditCard size={36} />, title: 'Bill Payments', desc: 'Pay for airtime, data, and utilities' },
  { icon: <Lock size={36} />, title: 'Secure Platform', desc: 'Your transactions are safe with us' },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to backend
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left – Animated Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-secondary relative items-center justify-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_1s]" />
        </div>

        <div className="relative z-10 text-center px-12">
          <div className="grid gap-5">
            {cubeContent.map((item, i) => (
              <div
                key={i}
                className="glass-white rounded-2xl p-5 flex items-center gap-4 text-left hover:scale-[1.02] transition-transform duration-300"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animation: 'slide-up 0.6s ease-out forwards',
                  opacity: 0,
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brown-900 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-brown-600 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-cream-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <img src={logo} alt="Baricoin" className="h-10" />
          </Link>

          <h2 className="font-heading text-3xl font-bold text-brown-900 mb-8">
            Sign in to Baricoin
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-sm font-medium text-brown-700"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-brown-900 placeholder:text-brown-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                className="text-sm font-medium text-brown-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-brown-900 placeholder:text-brown-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-700 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-brown-600">
            Don't have an account with us?{' '}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
