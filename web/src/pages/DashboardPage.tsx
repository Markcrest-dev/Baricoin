import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Eye,
  EyeOff,
  Smartphone,
  Tv,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Bitcoin,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWalletStore } from '../store/useWalletStore';
import { walletService } from '../services/walletService';

const quickActions = [
  {
    icon: <Smartphone size={24} />,
    title: 'Buy Airtime',
    desc: 'Recharge instantly',
    path: '/airtime',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: <Tv size={24} />,
    title: 'Pay Bills',
    desc: 'Cable & Electricity',
    path: '/cable',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Sell Cards',
    desc: 'High rates only',
    path: '/giftcards',
    gradient: 'from-amber-400 to-orange-600',
  },
];

const DashboardPage = () => {
  const { wallets, recentTransactions } = useWalletStore();

  useEffect(() => {
    walletService.fetchWallets();
    walletService.fetchTransactions({ limit: 5 });
  }, []);

  const [showNairaBalance, setShowNairaBalance] = useState(false);
  const [showCryptoBalance, setShowCryptoBalance] = useState(false);

  const nairaWallet = wallets.find(w => w.currency === 'NGN');
  const cryptoWallet = wallets.find(w => w.currency === 'BTC');

  return (
    <DashboardLayout>
      {/* ─── Wallets Grid ─── */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Naira Wallet Card */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform group-hover:scale-110" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <span className="font-bold text-xs">₦</span>
                </div>
                <h2 className="font-bold text-base opacity-80 uppercase tracking-widest">Naira Balance</h2>
              </div>
              <button
                onClick={() => setShowNairaBalance(!showNairaBalance)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Toggle balance"
              >
                {showNairaBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-10">
              <span className="text-4xl lg:text-5xl font-black tracking-tight">
                ₦ {showNairaBalance ? (nairaWallet?.balance?.toLocaleString() || '0.00') : '******'}
              </span>
              <p className="mt-3 text-white/50 text-sm font-medium flex items-center gap-2">
                Bonus Balance: <span className="text-emerald-400 font-bold">₦ 2,000.00</span>
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                to="/transfer"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/10 font-bold text-sm hover:bg-white/20 transition-all border border-white/5"
              >
                <ArrowUpRight size={18} /> Transfer
              </Link>
              <Link
                to="/withdraw"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-brand-900 font-black text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                <Plus size={18} /> Add Money
              </Link>
            </div>
          </div>
        </div>

        {/* Crypto Wallet Card */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-white p-8 border border-surface-200 shadow-xl transition-all duration-500 hover:shadow-premium">
          <div className="absolute top-0 right-0 w-64 h-64 bg-surface-100 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bitcoin size={20} className="text-primary" />
                </div>
                <h2 className="font-bold text-base text-brand-400 uppercase tracking-widest">Crypto Assets</h2>
              </div>
              <button
                onClick={() => setShowCryptoBalance(!showCryptoBalance)}
                className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 text-brand-400 transition-colors"
                aria-label="Toggle balance"
              >
                {showCryptoBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-10">
              <span className="text-4xl lg:text-5xl font-black tracking-tight text-brand-900">
                $ {showCryptoBalance ? (cryptoWallet?.balance || '0.0000') : '******'}
              </span>
              <div className="flex gap-4 text-xs font-bold mt-4 uppercase tracking-tighter">
                <span className="px-2 py-1 rounded-md bg-surface-100 text-brand-500">BTC: $0.00</span>
                <span className="px-2 py-1 rounded-md bg-surface-100 text-brand-500">ETH: $0.00</span>
                <span className="px-2 py-1 rounded-md bg-surface-100 text-brand-500">USDT: $0.00</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/deposit-crypto"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 hover:border-primary transition-all"
              >
                <ArrowDownLeft size={18} /> Deposit
              </Link>
              <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Sell Assets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-brand-900">Quick Actions</h2>
            <p className="text-sm text-brand-400 font-medium">Frequently used services</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="group relative flex items-center gap-5 bg-white rounded-3xl p-6 shadow-sm border border-surface-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-surface-50 rounded-full -mr-12 -mt-12 group-hover:bg-primary/5 transition-colors" />
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform relative z-10`}
              >
                {action.icon}
              </div>
              <div className="relative z-10">
                <h3 className="font-black text-brand-900 text-base mb-0.5">
                  {action.title}
                </h3>
                <p className="text-brand-400 text-xs font-medium">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Recent Transactions ─── */}
      <div className="bg-white rounded-[2.5rem] shadow-premium border border-surface-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-surface-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-brand-900">Recent Activity</h2>
          <Link to="/transactions" className="text-sm font-bold text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50">
                <th className="text-left px-8 py-4 text-xs font-black text-brand-400 uppercase tracking-[0.2em]">
                  Activity Details
                </th>
                <th className="text-left px-8 py-4 text-xs font-black text-brand-400 uppercase tracking-[0.2em]">
                  Amount
                </th>
                <th className="text-left px-8 py-4 text-xs font-black text-brand-400 uppercase tracking-[0.2em]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {tx.type === 'deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-brand-900">{tx.description}</p>
                          <p className="text-xs text-brand-400 font-bold uppercase tracking-widest mt-0.5">{tx.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className={`font-black text-base ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()} {tx.currency}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                        tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        tx.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-brand-400 font-bold italic opacity-60">
                    No transactions recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
