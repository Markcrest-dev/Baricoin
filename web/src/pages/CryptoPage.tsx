import { useState } from 'react';
import { Bitcoin, Info, CheckCircle2, TrendingUp, ArrowDownLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const cryptoCoins = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: <Bitcoin size={24} className="text-[#F7931A]" />, rate: 125000000 },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: <Bitcoin size={24} className="text-[#627EEA]" />, rate: 4500000 },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: <Bitcoin size={24} className="text-[#26A17B]" />, rate: 1550 },
  { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', icon: <Bitcoin size={24} className="text-[#F3BA2F]" />, rate: 900000 },
];

const CryptoPage = () => {
  const [formData, setFormData] = useState({
    coin: '',
    amount: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const calculateReceive = () => {
    const amount = parseFloat(formData.amount) || 0;
    const selectedCoin = cryptoCoins.find(c => c.id === formData.coin);
    if (!selectedCoin) return 0;
    
    // Simple mock: amount is in USD, rate is NGN per USD
    const rate = 1550; 
    return amount * rate;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brown-900">Sell Crypto</h1>
            <p className="text-brown-500">Sell your crypto assets and get paid in Naira instantly.</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-cream-200 flex items-center gap-2">
              <TrendingUp size={16} className="text-success" />
              <span className="text-xs font-bold text-brown-600">USDT: ₦1,550</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-cream-200 flex items-center gap-2">
              <TrendingUp size={16} className="text-success" />
              <span className="text-xs font-bold text-brown-600">BTC: ₦125.4M</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-cream-200">
              {isSuccess ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-brown-900 mb-2">Transaction Initiated!</h2>
                  <p className="text-brown-500 mb-8">Please proceed to transfer the crypto to the provided wallet address. Your Naira wallet will be credited after 1 confirmation.</p>
                  <div className="bg-cream-50 rounded-2xl p-6 mb-8 text-left border border-cream-200">
                    <p className="text-xs font-bold text-brown-400 uppercase mb-2">Wallet Address (USDT - TRC20)</p>
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-sm font-mono text-brown-900 break-all bg-white px-3 py-2 rounded-lg border border-cream-200 flex-1">
                        TYZ8pYmZ9uQyH7vP4kL5rMwNx2S1VqA6jE
                      </code>
                      <button className="text-primary font-bold text-sm hover:underline shrink-0">Copy</button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-brown-700 ml-1">Select Asset</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {cryptoCoins.map((coin) => (
                        <button
                          key={coin.id}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, coin: coin.id }))}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                            formData.coin === coin.id
                              ? 'border-primary bg-primary/5'
                              : 'border-cream-100 bg-cream-50 hover:border-cream-300'
                          }`}
                        >
                          {coin.icon}
                          <span className="text-xs font-bold text-brown-800">{coin.symbol}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="amount" className="text-sm font-bold text-brown-700 ml-1">
                        Amount to Sell
                      </label>
                      <span className="text-xs text-brown-400">Min: $10.00</span>
                    </div>
                    <div className="relative">
                      <input
                        id="amount"
                        type="number"
                        required
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-12 pr-24 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-bold text-brown-900"
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-brown-400 font-bold text-lg">$</span>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                        <button type="button" className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-brown-600 border border-cream-200 hover:bg-cream-100">MAX</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-brown-800 to-brown-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                    <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                      <ArrowDownLeft size={160} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/60 text-sm">Exchange Rate</span>
                        <span className="font-bold">₦1,550.00 / $</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-white/60 font-medium">You Receive</span>
                        <div className="text-right">
                          <span className="text-2xl font-black block">
                            ₦ {calculateReceive().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-white/40">Fee: ₦0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
                  >
                    Generate Wallet Address
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Side Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-200">
              <h3 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-primary" />
                How it works
              </h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Start Trade', desc: 'Select the crypto asset you want to sell and enter the USD amount.' },
                  { step: '02', title: 'Transfer Asset', desc: 'Send the exact amount of crypto to the generated wallet address.' },
                  { step: '03', title: 'Wait for Confirmation', desc: 'Once confirmed on the blockchain, your trade is processed.' },
                  { step: '04', title: 'Instant Payment', desc: 'Your Naira wallet will be credited automatically.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-primary font-black text-lg opacity-30">{item.step}</span>
                    <div>
                      <h4 className="text-sm font-bold text-brown-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-brown-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-200">
              <h3 className="font-bold text-brown-900 mb-3">Live Network Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brown-500">Bitcoin Network</span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brown-500">Ethereum (ERC20)</span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brown-500">Tron (TRC20)</span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Fast Trade
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CryptoPage;
