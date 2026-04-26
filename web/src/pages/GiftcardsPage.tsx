import { useState } from 'react';
import { Upload, Info, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { tradeService } from '../services/tradeService';

const GiftcardsPage = () => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    currency: '',
    amount: '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('category', formData.category);
      data.append('type', formData.type);
      data.append('currency', formData.currency);
      data.append('amount', formData.amount);
      data.append('rate', '1250'); // Mock rate for now
      if (images?.[0]) {
        data.append('image', images[0]);
      }
      
      await tradeService.submitGiftCard(data);
      setIsSuccess(true);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const rate = 1250; // Mock rate
    return amount * rate;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={14} />
            <span>Secure Trading</span>
          </div>
          <h1 className="text-3xl font-black text-brand-900 leading-tight">Sell Gift Card</h1>
          <p className="text-brand-500 font-medium">Get the highest market rates for your digital assets.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-premium border border-surface-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              {isSuccess ? (
                <div className="text-center py-16 animate-fade-in relative z-10">
                  <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={56} className="text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-brand-900 mb-4">Trade Initiated!</h2>
                  <p className="text-brand-500 font-medium mb-12 max-w-sm mx-auto">Our agents are verifying your trade. You'll receive a notification and wallet credit in 5-15 minutes.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-10 py-5 bg-brand-900 text-white rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Start New Trade
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="category" className="text-xs font-black text-brand-700 uppercase tracking-widest ml-1">
                        Category
                      </label>
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none text-brand-900 font-bold text-sm"
                      >
                        <option value="">Select category</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="gaming">Gaming</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="retail">Retail</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="type" className="text-xs font-black text-brand-700 uppercase tracking-widest ml-1">
                        Card Type
                      </label>
                      <select
                        id="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none text-brand-900 font-bold text-sm"
                      >
                        <option value="">Choose card</option>
                        <option value="amazon">Amazon</option>
                        <option value="apple">Apple/iTunes</option>
                        <option value="google">Google Play</option>
                        <option value="steam">Steam</option>
                        <option value="ebay">eBay</option>
                        <option value="walmart">Walmart</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="currency" className="text-xs font-black text-brand-700 uppercase tracking-widest ml-1">
                        Currency
                      </label>
                      <select
                        id="currency"
                        required
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none text-brand-900 font-bold text-sm"
                      >
                        <option value="">Choose currency</option>
                        <option value="usd">USD ($)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="cad">CAD (C$)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="amount" className="text-xs font-black text-brand-700 uppercase tracking-widest ml-1">
                        Amount to Sell
                      </label>
                      <div className="relative">
                        <input
                          id="amount"
                          type="number"
                          required
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-brand-900 font-black"
                        />
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-400 font-black">$</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-700 uppercase tracking-widest ml-1">
                      Card Assets
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="border-2 border-dashed border-surface-200 rounded-[2rem] p-12 text-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                        <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                          <Upload size={28} className="text-brand-400 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-brand-900 font-black">
                          {images && images.length > 0 ? `${images.length} image(s) attached` : 'Upload card front & back'}
                        </p>
                        <p className="text-xs text-brand-400 font-bold mt-2 uppercase tracking-tight">Max 10MB per image • PNG, JPG</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        Current Market Rate: <span className="text-primary ml-1">₦ 1,250 / $</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div>
                        <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">Expected Payout</p>
                        <span className="text-4xl font-black text-white">
                          ₦ {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-5 bg-white text-brand-900 rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-base disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Complete Trade'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-surface-100 shadow-premium">
              <h3 className="font-black text-brand-900 text-lg mb-6 flex items-center gap-3">
                <Info size={22} className="text-primary" />
                Guidelines
              </h3>
              <ul className="space-y-6">
                {[
                  'Ensure high-quality images with all edges visible',
                  'Vouchers should include receipt if requested',
                  'Standard verification takes 5-15 mins',
                  'Rates update instantly with market changes'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-black text-primary">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-brand-600 font-semibold leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <HelpCircle size={32} className="text-primary" />
              </div>
              <h3 className="font-black text-brand-900 mb-2">Need Assistance?</h3>
              <p className="text-sm text-brand-500 font-medium mb-8 leading-relaxed">Our premium support team is available 24/7 to help you with your trades.</p>
              <button className="w-full py-4 bg-white border-2 border-primary/20 text-primary rounded-2xl font-black text-sm hover:border-primary transition-all">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GiftcardsPage;
