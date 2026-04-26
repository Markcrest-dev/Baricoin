import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { authService } from '../services/authService';
import logo from '../assets/images/icon.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const update = (field: string, val: string) =>
    setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.register({ 
        name: form.fullName, 
        username: form.username,
        email: form.email, 
        phone: form.phone,
        password: form.password 
      });
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Mark Spencer',
      icon: <User size={18} />,
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'marky_trades',
      icon: <User size={18} />,
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'mark@trades.com',
      icon: <Mail size={18} />,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+234 800 000 0000',
      icon: <Phone size={18} />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">


      {/* Left – Visual Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative items-center justify-center overflow-hidden p-20">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] -mr-[40%] -mt-[40%]" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[100px] -ml-[30%] -mb-[30%]" />

        <div className="relative z-10 w-full max-w-md text-white text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl">
            <ShieldCheck size={48} className="text-primary" />
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">Start Your <span className="text-primary">Premium</span> Journey.</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12">
            Join thousands of traders enjoying instant payouts and the highest rates in the market.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Fast Payout', sub: 'Under 5 mins' },
              { label: 'Highest Rates', sub: 'Market Leader' },
              { label: 'Secure', sub: 'Bank Grade' },
              { label: '24/7 Help', sub: 'Priority Chat' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left">
                <div className="font-black text-white text-base">{stat.label}</div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-50 overflow-y-auto">
        <div className="w-full max-w-md py-12">          {/* Logo */}
          <div className="mb-10">
            <Link to="/" className="inline-block hover:scale-105 transition-transform">
              <img src={logo} alt="Baricoin" className="h-10" />
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-brand-900 mb-3">Create Free Account.</h1>
            <p className="text-brand-500 font-medium">Join the most reliable trading community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
               {fields.slice(0, 2).map((f) => (
                  <div key={f.id} className="space-y-2">
                    <label htmlFor={f.id} className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => update(f.id, e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-surface-200 bg-white focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-brand-900 font-medium text-sm"
                    />
                  </div>
               ))}
            </div>

            {fields.slice(2).map((f) => (
              <div key={f.id} className="space-y-2">
                <label htmlFor={f.id} className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">{f.label}</label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.id as keyof typeof form]}
                  onChange={(e) => update(f.id, e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-surface-200 bg-white focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-brand-900 font-medium text-sm"
                />
              </div>
            ))}

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-surface-200 bg-white focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-brand-900 font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 py-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 w-5 h-5 rounded-lg border-2 border-surface-300 text-primary focus:ring-primary/20"
              />
              <label htmlFor="terms" className="text-xs text-brand-500 font-medium leading-relaxed">
                By signing up, I agree to the <Link to="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-200 text-center">
            <p className="text-brand-500 font-bold">
              Already have an account? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
