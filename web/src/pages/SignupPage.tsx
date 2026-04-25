import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { authService } from '../services/authService';
import logo from '../assets/images/baricoin-logo-new.png';

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
      placeholder: 'John Doe',
      icon: <User size={18} />,
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'johndoe123',
      icon: <User size={18} />,
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@example.com',
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
    <div className="min-h-screen flex">
      {/* Left – Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-secondary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite]" />
          <div className="absolute bottom-32 left-32 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite_2s]" />
        </div>

        <div className="relative z-10 text-center px-12 text-white max-w-md">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="text-5xl">🚀</span>
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">
            Join Baricoin Today
          </h2>
          <p className="text-white/80 leading-relaxed text-lg">
            Create your account and start trading gift cards, converting crypto,
            and paying bills — all in one place.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {['10K+ Users', 'Instant Pay', 'Best Rates'].map((stat) => (
              <div
                key={stat}
                className="bg-white/10 backdrop-blur-md rounded-xl py-3 px-2"
              >
                <p className="font-bold text-sm">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-cream-50">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img src={logo} alt="Baricoin" className="h-10" />
          </Link>

          <h2 className="font-heading text-3xl font-bold text-brown-900 mb-2">
            Create Account
          </h2>
          <p className="text-brown-600 mb-8">
            Start your journey with Baricoin
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label
                  htmlFor={`signup-${f.id}`}
                  className="text-sm font-medium text-brown-700"
                >
                  {f.label}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400">
                    {f.icon}
                  </div>
                  <input
                    id={`signup-${f.id}`}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => update(f.id, e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-brown-900 placeholder:text-brown-400"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-brown-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400">
                  <Lock size={18} />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  required
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-brown-900 placeholder:text-brown-400"
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

            {/* Terms */}
            <div className="flex items-start gap-2 mt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 accent-primary"
              />
              <label htmlFor="terms" className="text-sm text-brown-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary font-medium hover:underline">
                  Terms & Agreement
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-primary font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-brown-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
