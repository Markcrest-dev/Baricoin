import { Wallet, Gift, Bitcoin, Zap, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ProductsPage = () => {
  const products = [
    {
      icon: <Gift size={40} />,
      title: 'Gift Card Trading',
      desc: 'Sell your Amazon, iTunes, Steam, and 20+ other gift cards at industry-leading rates. Instant Naira payouts.',
      path: '/signup',
      color: 'from-primary to-primary-dark',
      features: ['20+ Card Types', 'Highest Rates', 'Under 5 min Payouts'],
    },
    {
      icon: <Bitcoin size={40} />,
      title: 'Crypto Exchange',
      desc: 'Convert BTC, ETH, and USDT to Naira seamlessly. Safe, secure, and always at the best market prices.',
      path: '/signup',
      color: 'from-brand-800 to-brand-900',
      features: ['Instant Conversion', 'Secure Wallets', 'Multiple Assets'],
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Digital Utilities',
      desc: 'Top up airtime, buy data, and pay your utility bills. Quick and convenient payments from your wallet.',
      path: '/signup',
      color: 'from-secondary to-primary',
      features: ['Airtime & Data', 'TV Subscriptions', 'Electricity Bills'],
    },
  ];

  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main>
        {/* Header Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-24 bg-white border-b border-surface-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 text-primary">
              <Wallet size={16} />
              <span>Our Ecosystem</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-brand-900 mb-8 max-w-4xl mx-auto leading-tight">
              Premium <span className="gradient-text">Solutions</span> for Your Digital Assets.
            </h1>
            <p className="text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed">
              Explore our range of services designed to give you the most value for your digital assets and everyday utility needs.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-20">
              {products.map((product, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2">
                    <div className={`w-24 h-24 rounded-[2.5rem] bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-10 shadow-2xl`}>
                      {product.icon}
                    </div>
                    <h2 className="text-4xl font-black text-brand-900 mb-6">{product.title}</h2>
                    <p className="text-lg text-brand-600 mb-10 leading-relaxed">{product.desc}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                      {product.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                             <ShieldCheck size={14} className="text-primary" />
                          </div>
                          <span className="font-bold text-brand-800">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={product.path} className="btn-primary inline-flex items-center gap-2">
                       Get Started Now <ArrowRight size={20} />
                    </Link>
                  </div>
                  
                  <div className="lg:w-1/2 w-full">
                     <div className={`aspect-[4/3] rounded-[3.5rem] bg-gradient-to-br ${product.color} opacity-10 animate-pulse-soft flex items-center justify-center border border-primary/20`}>
                        <div className="scale-[2] opacity-20">
                           {product.icon}
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-brand-900 p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <h2 className="text-4xl lg:text-5xl font-black mb-8 relative z-10">Experience the Best Rates Today.</h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto relative z-10">Join thousands of users who have already found their home for digital asset trading.</p>
            <Link to="/signup" className="px-12 py-6 bg-white text-brand-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all inline-block relative z-10">
               Create Your Free Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
