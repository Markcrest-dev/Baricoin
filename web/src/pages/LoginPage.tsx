import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Gift, Bitcoin, Zap, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import logo from '../assets/images/icon.png';

const showcaseItems = [
  { icon: <Gift size={28} />, title: 'High Rate Giftcards', desc: 'Get the best value for your cards instantly.' },
  { icon: <Bitcoin size={28} />, title: 'Secure Crypto', desc: 'Safe and swift crypto to Naira conversions.' },
  { icon: <Zap size={28} />, title: 'Instant Payouts', desc: 'Withdraw your funds in less than 5 minutes.' },
  { icon: <ShieldCheck size={28} />, title: 'Bank Grade Security', desc: 'Your assets and data are always protected.' },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left – Visual Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative items-center justify-center overflow-hidden p-20">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] -mr-[40%] -mt-[40%]" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[100px] -ml-[30%] -mb-[30%]" />

        <div className="relative z-10 w-full max-w-lg text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-white/10">
            <Lock size={14} className="text-primary" />
            <span>Secure Access</span>
          </div>
          <h2 className="text-5xl font-black mb-12 leading-tight">Welcome Back to <span className="text-primary">Baricoin.</span></h2>
          
          <div className="space-y-6">
            {showcaseItems.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-xl flex items-center gap-6 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <Link to="/" className="inline-block hover:scale-105 transition-transform">
              <img src={logo} alt="Baricoin" className="h-12" />
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-brand-900 mb-3">Sign In.</h1>
            <p className="text-brand-500 font-medium">Continue your premium trading experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-brand-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-surface-200 bg-white focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-brand-900 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-bold text-brand-700 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-black text-primary hover:underline uppercase tracking-wide">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-surface-200 bg-white focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-brand-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-900 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In to Account <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-surface-200 text-center">
            <p className="text-brand-500 font-bold">
              New here? <Link to="/signup" className="text-primary hover:underline underline-offset-4">Create a free account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
