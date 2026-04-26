import { useState } from 'react';
import { TrendingUp, Calculator, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const RatesPage = () => {
  const [asset, setAsset] = useState('giftcard');
  const [type, setType] = useState('amazon');
  const [amount, setAmount] = useState('');
  
  const mockRates: Record<string, number> = {
    amazon: 1250,
    itunes: 1220,
    steam: 1280,
    google: 1210,
    btc: 1650,
    usdt: 1620,
    eth: 1600,
  };

  const calculate = () => {
    const rate = mockRates[type] || 0;
    return (parseFloat(amount) || 0) * rate;
  };

  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main>
        {/* Header Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/10 rounded-full blur-[120px] -mr-[30%]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                <TrendingUp size={16} className="text-secondary" />
                <span>Live Market Rates</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                Transparent <span className="text-primary">Rates</span>. <br />No Hidden Fees.
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                Check the current market value for your giftcards and crypto assets instantly. We update our rates every 5 minutes to stay ahead.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-24 -mt-20 relative z-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-[3.5rem] shadow-premium p-8 lg:p-16 border border-surface-100 flex flex-col lg:flex-row gap-16">
              {/* Controls */}
              <div className="flex-1 space-y-10">
                <div>
                  <h3 className="text-2xl font-black text-brand-900 mb-6 flex items-center gap-3">
                    <Calculator size={24} className="text-primary" />
                    Rate Calculator
                  </h3>
                  
                  <div className="flex gap-2 p-1.5 bg-surface-50 rounded-2xl border border-surface-100 mb-10">
                    <button 
                      onClick={() => setAsset('giftcard')}
                      className={`flex-1 py-3 font-bold rounded-xl transition-all duration-300 ${asset === 'giftcard' ? 'bg-white shadow-md text-brand-900' : 'text-brand-400 hover:text-brand-900'}`}
                    >
                      Gift Cards
                    </button>
                    <button 
                      onClick={() => setAsset('crypto')}
                      className={`flex-1 py-3 font-bold rounded-xl transition-all duration-300 ${asset === 'crypto' ? 'bg-white shadow-md text-brand-900' : 'text-brand-400 hover:text-brand-900'}`}
                    >
                      Crypto
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-brand-500 uppercase tracking-widest ml-1">Choose Asset</label>
                      <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-6 py-4 bg-surface-50 border-2 border-surface-100 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-brand-900"
                      >
                        {asset === 'giftcard' ? (
                          <>
                            <option value="amazon">Amazon Gift Card</option>
                            <option value="itunes">iTunes/Apple Card</option>
                            <option value="steam">Steam Wallet</option>
                            <option value="google">Google Play</option>
                          </>
                        ) : (
                          <>
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="usdt">USDT (Tether)</option>
                            <option value="eth">Ethereum (ETH)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-brand-500 uppercase tracking-widest ml-1">Amount ($)</label>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-6 py-4 bg-surface-50 border-2 border-surface-100 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-black text-brand-900 text-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center gap-4">
                  <RefreshCw size={20} className="text-primary animate-spin-slow" />
                  <p className="text-sm font-bold text-brand-600">Rates are updated in real-time according to industry standards.</p>
                </div>
              </div>

              {/* Result */}
              <div className="flex-1 bg-brand-900 rounded-[2.5rem] p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <p className="text-white/50 text-sm font-black uppercase tracking-[0.2em] mb-4">Final Value</p>
                  <div className="text-5xl font-black mb-2">
                    ₦ {calculate().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-primary font-bold">@ ₦ {mockRates[type]} / $</div>
                </div>

                <div className="mt-12 space-y-8 relative z-10">
                   <div className="space-y-4">
                      {[
                        'Instant Verification',
                        'Direct Wallet Funding',
                        'Best Market Rates Guarantee'
                      ].map(item => (
                        <div key={item} className="flex items-center gap-3">
                           <ShieldCheck size={16} className="text-primary" />
                           <span className="text-sm font-bold text-white/80">{item}</span>
                        </div>
                      ))}
                   </div>

                   <button className="w-full py-5 bg-white text-brand-900 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/20">
                      Start Trading Now <ArrowRight size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Sheet Component - Optional Add-on */}
        <section className="py-24">
           <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-black text-brand-900 mb-12 text-center">Todays Top Rates</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {Object.entries(mockRates).slice(0, 4).map(([name, rate]) => (
                    <div key={name} className="p-8 bg-white border border-surface-100 rounded-[2.5rem] shadow-sm text-center">
                       <span className="text-xs font-black text-brand-400 underline decoration-primary underline-offset-8 uppercase mb-6 block">{name}</span>
                       <div className="text-2xl font-black text-brand-900 mb-1">₦{rate}</div>
                       <div className="text-[10px] font-bold text-success">HIGH VALUE</div>
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

export default RatesPage;
