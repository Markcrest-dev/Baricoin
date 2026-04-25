import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Bitcoin,
  CreditCard,
  Zap,
  Lock,
  Smartphone,
  Check,
  ChevronLeft,
  ChevronRight,
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
    desc: 'Sell Gift Cards for Naira and Enjoy Highest Gift Cards Rates',
  },
  {
    icon: <Bitcoin size={32} />,
    title: 'Crypto',
    desc: 'Securely Sell and Convert Crypto to Naira at Amazing Rates',
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Bill Payment',
    desc: 'Pay Cable TV, Top up Airtime, Load Data, and keep your Power on.',
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

const whyUs = [
  {
    icon: <Zap size={36} />,
    title: 'Instant Payments',
    desc: 'Immediate and guaranteed withdrawals at any time and any day.',
  },
  {
    icon: <Lock size={36} />,
    title: 'Trusted & Secured',
    desc: 'Join thousands of users with multi-layered authentication and security.',
  },
  {
    icon: <Smartphone size={36} />,
    title: 'Cross-Platform',
    desc: 'Sell seamlessly across all platforms (iOS, Android and Web).',
  },
];

const testimonials = [
  {
    text: '"If you are looking for the best site to sell gift card in Nigeria, Baricoin is the best choice. Super responsive Support and Fast Payment."',
    author: 'Adeniyi J',
  },
  {
    text: '"I had a very smooth experience using the Baricoin app to convert gaming gift cards to cash at high rates."',
    author: 'Obilo S',
  },
  {
    text: '"Baricoin is a reliable trading platform that standouts among others. With Baricoin, I am able to securely transact crypto and other digital assets without stress."',
    author: 'Olalekan N',
  },
  {
    text: '"Best of d best! I am really amazed and happy. It gives me joy that I don\'t have to go out to buy airtime 😍"',
    author: 'Ejemi Famous',
  },
];

const alomaSteps = [
  {
    num: '01',
    title: 'The Discovery',
    desc: 'The search result was a couple of blogs and links, including the most relatable website connecting to his financial needs; Baricoin.',
  },
  {
    num: '02',
    title: 'Getting Started',
    desc: 'Aloma signed up and explored the user-friendly interface and competitive rates Baricoin offers for gift cards and crypto trading.',
  },
  {
    num: '03',
    title: 'The Success',
    desc: 'Aloma sold some BTC and ETH at the best rates, without any fees, seamlessly! Be like Aloma, Choose Baricoin. 😎',
  },
];

const appFeatures = [
  'Instant push notifications for trades',
  'Fingerprint & Face ID security',
  'Quick bill payments on the fly',
  'Real-time rate updates',
];

/* ─────────── page ─────────── */
const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary min-h-screen flex items-center overflow-hidden pt-20">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-[slide-up_0.8s_ease-out]">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Redeem Gift Cards, Sell Crypto And, Pay Bills in a Flip
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-lg">
                Baricoin helps you convert gift cards to Naira, and guarantees
                best rates when you trade crypto to Naira.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all duration-300 text-lg"
              >
                Get Started
              </Link>
            </div>

            <div className="hidden lg:flex justify-center animate-[fade-in_1s_ease-out_0.3s_both]">
              <img
                src={heroImg}
                alt="Cryptocurrency Trading"
                className="w-full max-w-xl rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="gradient-text font-semibold text-lg mb-2">
              Our top features
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900">
              Everything You Need in One Place
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-2xl flex items-center justify-center text-primary mb-5">
                  {f.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-brown-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GIFT CARDS ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900 mb-3">
              Gift Cards We Trade
            </h2>
            <p className="text-brown-600 text-lg max-w-xl mx-auto">
              Trade Unused Gift Cards for Instant Value: Sell and Cash Out in a
              Flip!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {giftCards.map((gc) => (
              <div
                key={gc.name}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold"
                  style={{ backgroundColor: gc.color }}
                >
                  {gc.letter}
                </div>
                <h4 className="font-semibold text-brown-800">{gc.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY FLIP WITH US ═══ */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900">
              Why Flip With Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg animate-[pulse-glow_3s_ease-in-out_infinite]">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-brown-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-brown-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              What Our Users Say
            </h2>
          </div>

          <div className="relative">
            <div className="text-center py-10 px-4 min-h-[200px] flex flex-col items-center justify-center">
              <p className="text-xl sm:text-2xl leading-relaxed italic mb-6 transition-all duration-500">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="font-bold text-lg">
                {testimonials[currentTestimonial].author}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (p) => (p - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentTestimonial
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentTestimonial((p) => (p + 1) % testimonials.length)
                }
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALOMA LEE ═══ */}
      <section className="py-24 px-6 bg-cream-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900 mb-3">
              Meet Aloma Lee
            </h2>
            <p className="text-brown-600 text-lg">
              Discover how Aloma found financial freedom with Baricoin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {alomaSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-8 shadow-md relative hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute -top-5 left-6 w-12 h-12 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-heading text-xl font-bold text-brown-900 mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-brown-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-lg"
            >
              Download app
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BLOG SECTION ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900 mb-6">
            Read About Our Latest News and Offers
          </h2>
          <p className="text-lg text-brown-600 mb-8 max-w-xl mx-auto">
            Stay updated with our latest blog posts, news, and special offers
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Visit Blog
          </Link>
        </div>
      </section>

      {/* ═══ MOBILE APP DOWNLOAD ═══ */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="gradient-text font-semibold text-lg mb-2">
                Download Our App
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brown-900 mb-6">
                Trade On The Go With Baricoin Mobile App
              </h2>
              <p className="text-brown-600 leading-relaxed mb-8 text-lg">
                Experience the convenience of managing your crypto and gift card
                trades anywhere, anytime. Get instant access to the best rates
                right from your phone.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {appFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-success" />
                    </div>
                    <span className="text-brown-700">{feat}</span>
                  </div>
                ))}
              </div>

              <img
                src={appMockup}
                alt="Download on App Store and Google Play"
                className="h-12 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => alert('Coming Soon!')}
              />
            </div>

            <div className="hidden lg:flex justify-center">
              <img
                src={appMockup}
                alt="Baricoin Mobile App"
                className="max-w-md w-full drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Get Started On Baricoin Today.
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join our Newsletter for special perks & updates
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed! 🎉');
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-xl text-brown-900 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
