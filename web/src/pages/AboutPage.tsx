import { Info, Target, Users, ShieldCheck, Heart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: <Target size={32} />,
      title: 'Our Mission',
      desc: 'To provide Nigerians with the most reliable, transparent, and fastest way to trade digital assets.',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Our Security',
      desc: 'We employ bank-grade security protocols to ensure your funds and data are always protected.',
    },
    {
      icon: <Users size={32} />,
      title: 'Our Community',
      desc: 'Trusted by over 50,000 active users who rely on us for their daily digital asset transactions.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Our Support',
      desc: 'A dedicated team available 24/7 to assist you through every step of your trading journey.',
    },
  ];

  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-900 text-white">
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/10 rounded-full blur-[120px] -mr-[25%]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                <Info size={16} className="text-primary" />
                <span>Our Story</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight">
                Redefining <span className="text-primary">Digital Trade</span> in Nigeria.
              </h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                Founded with a vision to bridge the gap in digital asset liquidity, Baricoin has grown into the leading platform for giftcard and crypto exchange.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
              <div>
                <h2 className="text-4xl font-black text-brand-900 mb-8">Who We Are</h2>
                <div className="space-y-6 text-brand-600 text-lg leading-relaxed">
                  <p>
                    Baricoin Technologies is a premier fintech company dedicated to providing seamless digital asset exchange services. We understand the challenges of trading giftcards and cryptocurrencies in Nigeria, and we've built a solution that prioritizes speed, security, and the best market rates.
                  </p>
                  <p>
                    Our platform is designed with the user in mind, offering an intuitive interface that makes trading simple for both beginners and experienced pros. Since our inception, we've remained committed to transparency and excellence.
                  </p>
                </div>
              </div>
              <div className="relative">
                 <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-primary/20 to-primary-dark/20 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Users size={120} className="text-primary/30" />
                    </div>
                 </div>
                 <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-[2.5rem] shadow-premium max-w-xs border border-surface-100">
                    <p className="text-sm font-bold text-brand-900 italic">"Our goal isn't just to be the biggest, but to be the most trusted name in the industry."</p>
                    <div className="mt-4 pt-4 border-t border-surface-50">
                        <p className="text-xs font-black text-primary uppercase">Managing Director</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-surface-100 shadow-sm hover:shadow-premium transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-4">{v.title}</h3>
                  <p className="text-brand-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
