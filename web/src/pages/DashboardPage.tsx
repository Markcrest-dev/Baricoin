import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Eye,
  EyeOff,
  Smartphone,
  Tv,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWalletStore } from '../store/useWalletStore';
import { walletService } from '../services/walletService';

const quickActions = [
  {
    icon: <Smartphone size={24} />,
    title: 'Buy Airtime',
    desc: 'Recharge your phone',
    path: '/airtime',
    colorClass: 'from-blue-500 to-blue-600',
    shortcut: 'A',
  },
  {
    icon: <Tv size={24} />,
    title: 'Pay Bills',
    desc: 'Cable, data, electricity',
    path: '/cable',
    colorClass: 'from-purple-500 to-purple-600',
    shortcut: 'B',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Sell Gift Card',
    desc: 'Convert cards to cash',
    path: '/giftcards',
    colorClass: 'from-orange-500 to-orange-600',
    shortcut: 'G',
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

  return (
    <DashboardLayout>
      {/* ─── Wallets ─── */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Naira Wallet */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-lg">Naira Wallet</h2>
              <span className="bg-white/20 text-xs font-bold px-2.5 py-1 rounded-full">
                NGN
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-extrabold">
                ₦ {showNairaBalance ? (wallets.find(w => w.currency === 'NGN')?.balance?.toLocaleString() || '0.00') : '*******'}
              </span>
              <button
                onClick={() => setShowNairaBalance(!showNairaBalance)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Toggle balance visibility"
              >
                {showNairaBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-white/70 text-sm mb-5">
              Bonus: ₦ 2,000.00
            </p>
            <div className="flex gap-3">
              <Link
                to="/transfer"
                className="flex-1 text-center py-2.5 rounded-xl bg-white/20 font-semibold text-sm hover:bg-white/30 transition-colors"
              >
                Transfer
              </Link>
              <Link
                to="/withdraw"
                className="flex-1 text-center py-2.5 rounded-xl bg-white font-semibold text-sm text-primary hover:bg-white/90 transition-colors"
              >
                Withdraw
              </Link>
            </div>
          </div>
        </div>

        {/* Crypto Wallet */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-cream-200 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/5 to-primary-dark/5 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-lg text-brown-900">
                Crypto Wallet
              </h2>
              <span className="bg-cream-100 text-brown-600 text-xs font-bold px-2.5 py-1 rounded-full">
                USD
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-extrabold text-brown-900">
                $ {showCryptoBalance ? (wallets.find(w => w.currency === 'BTC')?.balance || '0.0000') : '*******'}
              </span>
              <button
                onClick={() => setShowCryptoBalance(!showCryptoBalance)}
                className="p-1 rounded-lg hover:bg-cream-100 text-brown-400 transition-colors"
                aria-label="Toggle balance visibility"
              >
                {showCryptoBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex gap-4 text-sm text-brown-500 mb-5">
              <span>BTC: ₦ 0.00</span>
              <span>ETH: ₦ 0.00</span>
              <span>USDT: ₦ 0.00</span>
            </div>
            <div className="flex gap-3">
              <Link
                to="/deposit-crypto"
                className="flex-1 text-center py-2.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Deposit Crypto
              </Link>
              <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                Sell All Crypto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="font-heading text-xl font-bold text-brown-900">
            Quick Actions
          </h2>
          <p className="text-sm text-brown-500">
            Shortcuts to your most used features
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-cream-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.colorClass} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>
              <div>
                <h3 className="font-bold text-brown-900 text-sm">
                  {action.title}
                </h3>
                <p className="text-brown-500 text-xs">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Recent Transactions ─── */}
      <div className="bg-white rounded-3xl shadow-sm border border-cream-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-cream-200">
          <h2 className="font-heading text-lg font-bold text-brown-900">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-brown-900">{tx.description}</p>
                        <p className="text-[10px] text-brown-400 uppercase font-bold tracking-tighter">{tx.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-bold text-sm ${tx.type === 'deposit' ? 'text-success' : 'text-danger'}`}>
                        {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()} {tx.currency}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        tx.status === 'completed' ? 'bg-success/10 text-success' :
                        tx.status === 'pending' ? 'bg-warning/10 text-warning' :
                        'bg-danger/10 text-danger'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-brown-400 italic">
                    No transactions yet
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
