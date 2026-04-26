import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Bitcoin,
  CreditCard,
  Smartphone,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import heroImg from '../assets/images/hero-crypto.png';
import appMockup from '../assets/images/mobile-app-mockup.png';

/* ─────────── data ─────────── */
const features = [
  {
    icon: <Gift size={32} />,
    title: 'Gift Cards',
    desc: 'Sell gift cards for Naira at industry-leading rates. Fast, secure, and reliable.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: <Bitcoin size={32} />,
    title: 'Crypto Trading',
    desc: 'Convert BTC, ETH, and USDT to Naira instantly. We guarantee the best market prices.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Bill Payments',
    desc: 'Pay for utilities, airtime, and data in seconds. Convenience at your fingertips.',
    color: 'from-emerald-500 to-teal-600',
  },
];

const giftCards = [
  { name: 'Amazon', color: '#FF9900', letter: 'A' },
  { name: 'iTunes', color: '#A855F7', letter: '♪' },
  { name: 'Steam', color: '#1B2838', letter: 'S' },
  { name: 'Google Play', color: '#34A853', letter: 'G' },
  { name: 'eBay', color: '#E53238', letter: 'eB' },
  { name: 'Walmart', color: '#0071CE', letter: 'W' },
  { name: 'Xbox', color: '#107C10', letter: 'X' },
  { name: 'Visa', color: '#1434CB', letter: 'V' },
];

const stats = [
  { label: 'Active Users', value: '50k+' },
  { label: 'Daily Trades', value: '10k+' },
  { label: 'Rating', value: '4.9/5' },
];

const testimonials = [
  {
    text: "Baricoin is by far the most reliable platform for my crypto trades. The rates are unbeatable and payments are truly instant.",
    author: 'Adeniyi J.',
    role: 'Crypto Trader',
  },
  {
    text: "I was skeptical at first, but Baricoin proved me wrong. Sold my Steam cards and got paid in less than 5 minutes!",
    author: 'Obilo S.',
    role: 'Giftcard Vendor',
  },
  {
    text: "The mobile app is a game changer. I can pay my electricity bills and top up my phone while on the move. Super intuitive!",
    author: 'Olalekan N.',
    role: 'Freelancer',
  },
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface-50">
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />
          <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6 animate-fade-in">
                <ShieldCheck size={16} />
                <span>Trusted by 50,000+ Nigerians</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-900 leading-[1.1] mb-8">
                Trade <span className="gradient-text">Giftcards</span> & <span className="text-secondary">Crypto</span> Instantly.
              </h1>
              <p className="text-xl text-brand-600 leading-relaxed mb-10">
                Experience the fastest way to convert your digital assets to Naira. Best rates guaranteed, secure transactions, and zero hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn-primary text-center flex items-center justify-center gap-2">
                  Get Started Now <ArrowRight size={20} />
                </Link>
                <Link to="/rate-calculator" className="btn-secondary text-center">
                  Check Current Rates
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-surface-200">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-brand-900">{s.value}</div>
                    <div className="text-sm text-brand-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] -rotate-3" />
              <img
                src={heroImg}
                alt="Fintech Illustration"
                className="relative z-10 w-full rounded-[3rem] shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-brand-800 font-semibold uppercase tracking-widest text-sm mb-4">Why Baricoin?</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-brand-900">One Platform, Endless Possibilities</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] bg-surface-50 border border-surface-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-500 text-left"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h4 className="text-2xl font-bold text-brand-900 mb-4">{f.title}</h4>
                <p className="text-brand-600 leading-relaxed mb-6">{f.desc}</p>
                <div className="flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GIFT CARDS SHOWCASE ═══ */}
      <section className="py-24 bg-surface-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl text-left">
              <h3 className="text-4xl lg:text-5xl font-black text-brand-900 mb-6">Trade Any Gift Card</h3>
              <p className="text-lg text-brand-600">We accept over 20+ types of gift cards. Whether it's gaming, shopping, or specialized vouchers, we offer the best rates in Nigeria.</p>
            </div>
            <Link to="/signup" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              View All Cards <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {giftCards.map((gc) => (
              <div
                key={gc.name}
                className="group bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg"
                  style={{ backgroundColor: gc.color }}
                >
                  {gc.letter}
                </div>
                <span className="font-bold text-brand-900 text-sm">{gc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS SECTION ═══ */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-1 w-24 bg-primary mx-auto mb-10" />
          <div className="relative py-12">
            <p className="text-2xl lg:text-3xl font-medium leading-relaxed italic mb-10 transition-opacity duration-500">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div>
              <div className="text-xl font-black text-white">{testimonials[currentTestimonial].author}</div>
              <div className="text-primary font-bold text-sm uppercase tracking-widest mt-1">{testimonials[currentTestimonial].role}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              onClick={() => setCurrentTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentTestimonial(p => (p + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE APP PROMO ═══ */}
      <section className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-[3.5rem] p-12 lg:p-20 overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl lg:text-5xl font-black text-brand-900 mb-8">Trade Faster with our Mobile App</h3>
                <p className="text-lg text-brand-600 mb-12">Experience the full power of Baricoin on your smartphone. Track rates, manage your wallet, and execute trades in seconds.</p>
                
                <div className="space-y-6 mb-12">
                  {[
                    'Instant trade notifications',
                    'Biometric security login',
                    '24/7 Priority support access',
                    'Exclusive in-app rewards'
                  ].map(item => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check size={14} className="text-primary font-bold" />
                      </div>
                      <span className="font-semibold text-brand-800">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="px-8 py-4 bg-brand-900 text-white rounded-2xl font-bold flex items-center gap-3 cursor-pointer hover:bg-black transition-colors">
                    <Smartphone size={20} />
                    Download App
                  </div>
                </div>
              </div>

              <div className="relative">
                <img src={appMockup} alt="Mobile Mockup" className="w-full max-w-md mx-auto animate-float drop-shadow-2xl" />
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary to-primary-dark p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-white rounded-full blur-3xl" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10">Ready to Flip Your Assets?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">Join thousands of Nigerians trading securely on Baricoin. Create your free account in less than 2 minutes.</p>
          <div className="flex justify-center relative z-10">
            <Link to="/signup" className="px-10 py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
