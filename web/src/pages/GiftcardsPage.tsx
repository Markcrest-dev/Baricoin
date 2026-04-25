import { useState } from 'react';
import { Upload, Info, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-brown-900">Sell Gift Card</h1>
          <p className="text-brown-500">Convert your gift cards to Naira instantly at the best rates.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-cream-200">
              {isSuccess ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-brown-900 mb-2">Trade Submitted!</h2>
                  <p className="text-brown-500 mb-8">Your gift card trade has been submitted for verification. You'll be notified once it's processed.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all"
                  >
                    Sell Another Card
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-bold text-brown-700 ml-1">
                        Category
                      </label>
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none text-brown-900"
                      >
                        <option value="">Select category</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="gaming">Gaming</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="retail">Retail</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-bold text-brown-700 ml-1">
                        Gift Card Type
                      </label>
                      <select
                        id="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none text-brown-900"
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

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="currency" className="text-sm font-bold text-brown-700 ml-1">
                        Card Currency
                      </label>
                      <select
                        id="currency"
                        required
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none text-brown-900"
                      >
                        <option value="">Choose currency</option>
                        <option value="usd">USD ($)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="cad">CAD (C$)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm font-bold text-brown-700 ml-1">
                        Amount
                      </label>
                      <div className="relative">
                        <input
                          id="amount"
                          type="number"
                          required
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-brown-900"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400 font-bold">$</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brown-700 ml-1">
                      Upload Card Images
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="border-2 border-dashed border-cream-300 rounded-2xl p-8 text-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                        <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <Upload size={24} className="text-brown-600 group-hover:text-primary" />
                        </div>
                        <p className="text-brown-700 font-medium">
                          {images && images.length > 0 ? `${images.length} image(s) selected` : 'Click or drag images to upload'}
                        </p>
                        <p className="text-xs text-brown-400 mt-1">PNG, JPG, JPEG (Max 10MB per file)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cream-50 rounded-2xl p-6 border border-cream-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-brown-600 flex items-center gap-1.5">
                        Current Rate <Info size={14} className="text-brown-400" />
                      </span>
                      <span className="font-bold text-brown-900">₦ 1,250 / $</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brown-600 font-medium">Total to Receive</span>
                      <span className="text-2xl font-black text-primary">
                        ₦ {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Proceed with Trade'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <h3 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-primary" />
                Trading Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-brown-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Ensure card images are clear and full code is visible.
                </li>
                <li className="flex gap-3 text-sm text-brown-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  We only accept cards with receipts if required.
                </li>
                <li className="flex gap-3 text-sm text-brown-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Standard verification takes 3-15 minutes.
                </li>
                <li className="flex gap-3 text-sm text-brown-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Rates are dynamic and update in real-time.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-200">
              <h3 className="font-bold text-brown-900 mb-4">Support</h3>
              <p className="text-sm text-brown-500 mb-4">Need help with your trade? Our support team is active 24/7.</p>
              <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GiftcardsPage;
