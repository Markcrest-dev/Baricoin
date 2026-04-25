import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Phone, 
  Server, 
  Tv, 
  Zap, 
  CheckCircle2, 
  Smartphone,
  Wifi,
  CreditCard,
  Building,
  Info
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const serviceConfigs: Record<string, any> = {
  '/airtime': {
    title: 'Buy Airtime',
    icon: <Phone size={24} />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    fields: [
      { id: 'network', label: 'Network Provider', type: 'select', options: ['MTN', 'Airtel', 'Glo', '9Mobile'] },
      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '080 XXX XXX XXX' },
      { id: 'amount', label: 'Amount (NGN)', type: 'number', placeholder: '100' },
    ]
  },
  '/data': {
    title: 'Buy Data',
    icon: <Server size={24} />,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    fields: [
      { id: 'network', label: 'Network Provider', type: 'select', options: ['MTN', 'Airtel', 'Glo', '9Mobile'] },
      { id: 'plan', label: 'Data Plan', type: 'select', options: ['1GB - ₦300', '2GB - ₦500', '5GB - ₦1200', '10GB - ₦2200'] },
      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '080 XXX XXX XXX' },
    ]
  },
  '/cable': {
    title: 'TV Subscription',
    icon: <Tv size={24} />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    fields: [
      { id: 'provider', label: 'Provider', type: 'select', options: ['DSTV', 'GOTV', 'StarTimes'] },
      { id: 'plan', label: 'Package', type: 'select', options: ['Basic', 'Compact', 'Premium'] },
      { id: 'smartcard', label: 'Smartcard / IUC Number', type: 'text', placeholder: 'Enter number' },
    ]
  },
  '/electricity': {
    title: 'Utility Bills',
    icon: <Zap size={24} />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    fields: [
      { id: 'disco', label: 'Electricity Disco', type: 'select', options: ['IKEDC', 'EKEDC', 'AEDC', 'PHEDC'] },
      { id: 'meterType', label: 'Meter Type', type: 'select', options: ['Prepaid', 'Postpaid'] },
      { id: 'meterNumber', label: 'Meter Number', type: 'text', placeholder: 'Enter meter number' },
      { id: 'amount', label: 'Amount (NGN)', type: 'number', placeholder: '1000' },
    ]
  }
};

const ServicesPage = () => {
  const location = useLocation();
  const config = serviceConfigs[location.pathname] || serviceConfigs['/airtime'];
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setFormData({});
    setIsSuccess(false);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${config.bgColor} ${config.color} flex items-center justify-center shadow-sm`}>
            {config.icon}
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-brown-900">{config.title}</h1>
            <p className="text-sm text-brown-500">Fast, secure and reliable service delivery.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-cream-200">
              {isSuccess ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-brown-900 mb-2">Payment Successful!</h2>
                  <p className="text-brown-500 mb-8">Your transaction has been processed successfully. You'll receive a confirmation shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:bg-primary-dark transition-all"
                  >
                    Make Another Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {config.fields.map((field: any) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="text-xs font-bold text-brown-400 uppercase ml-1">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          required
                          className="w-full px-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-brown-900 font-medium"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.id}
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          className="w-full px-5 py-3.5 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-brown-900 font-medium"
                        />
                      )}
                    </div>
                  ))}

                  <div className="bg-cream-50 rounded-2xl p-6 border border-cream-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-brown-600">Wallet Balance</span>
                      <span className="text-sm font-black text-brown-900">₦ 125,400.00</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg`}
                  >
                    Confirm Payment
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-cream-200">
              <h3 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-primary" />
                Recent Orders
              </h3>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-xs pb-3 border-b border-cream-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cream-50 flex items-center justify-center text-brown-400">
                        {config.icon}
                      </div>
                      <div>
                        <p className="font-bold text-brown-800">₦2,500.00</p>
                        <p className="text-brown-400 tracking-tighter">Oct 24, 2:10 PM</p>
                      </div>
                    </div>
                    <span className="text-success font-bold">Success</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10">
              <h3 className="text-sm font-black text-brown-900 mb-3 uppercase tracking-wider">Fast Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'MTN', icon: <Wifi size={14} /> },
                  { label: 'Airtel', icon: <Wifi size={14} /> },
                  { label: 'Cable', icon: <Tv size={14} /> },
                  { label: 'Meter', icon: <CreditCard size={14} /> },
                ].map((link, i) => (
                  <button key={i} className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-cream-200 text-[10px] font-bold text-brown-600 hover:border-primary transition-all">
                    {link.icon}
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
