import { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  Bitcoin,
  Smartphone
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const mockTransactions = [
  {
    id: '#BC-120491',
    type: 'Gift Card Sell',
    asset: 'Amazon Premium',
    amount: '₦ 125,000.00',
    usdAmount: '$100.00',
    status: 'Completed',
    date: 'Oct 24, 2024 • 2:45 PM',
    icon: <CreditCard size={18} />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    id: '#BC-120492',
    type: 'Crypto Sell',
    asset: 'USDT (TRC20)',
    amount: '₦ 155,000.00',
    usdAmount: '$100.00',
    status: 'Processing',
    date: 'Oct 24, 2024 • 1:12 PM',
    icon: <Bitcoin size={18} />,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    id: '#BC-120493',
    type: 'Wallet Withdrawal',
    asset: 'Bank Transfer',
    amount: '₦ 50,000.00',
    usdAmount: null,
    status: 'Completed',
    date: 'Oct 23, 2024 • 9:30 AM',
    icon: <ArrowUpRight size={18} />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: '#BC-120494',
    type: 'Airtime Purchase',
    asset: 'MTN - 08123456789',
    amount: '₦ 2,000.00',
    usdAmount: null,
    status: 'Failed',
    date: 'Oct 22, 2024 • 11:15 AM',
    icon: <Smartphone size={18} />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: '#BC-120495',
    type: 'Referral Bonus',
    asset: 'User: JhonDoe12',
    amount: '₦ 1,000.00',
    usdAmount: null,
    status: 'Completed',
    date: 'Oct 21, 2024 • 3:20 PM',
    icon: <ArrowDownLeft size={18} />,
    color: 'text-primary',
    bgColor: 'bg-primary/5'
  },
];

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors: Record<string, string> = {
    Completed: 'bg-success/10 text-success',
    Processing: 'bg-warning/10 text-warning',
    Failed: 'bg-danger/10 text-danger',
  };

  const statusIcons: Record<string, any> = {
    Completed: <CheckCircle2 size={12} />,
    Processing: <Clock size={12} />,
    Failed: <XCircle size={12} />,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brown-900">Transactions</h1>
            <p className="text-brown-500">Track and manage all your trades and payments.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-cream-200 rounded-xl text-sm font-bold text-brown-700 shadow-sm hover:shadow-md transition-all">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-cream-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" size={18} />
              <input
                type="text"
                placeholder="Search transaction ID, service, or asset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-5 py-3 bg-cream-50 border border-cream-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
            </div>
            
            <div className="flex gap-2 items-center overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {['All', 'Gift Cards', 'Crypto', 'Transfers', 'Bills'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-brown-600 hover:bg-cream-100 transition-all flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-sm font-medium">Dates</span>
              </button>
              <button className="p-2.5 bg-cream-50 border border-cream-200 rounded-xl text-brown-600 hover:bg-cream-100 transition-all">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-cream-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream-50 border-b border-cream-200">
                  <th className="px-6 py-4 text-xs font-bold text-brown-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-xs font-bold text-brown-500 uppercase tracking-wider">Asset/Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-brown-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-brown-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-brown-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-cream-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${tx.bgColor} ${tx.color} rounded-xl flex items-center justify-center shadow-sm`}>
                          {tx.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brown-900">{tx.type}</p>
                          <p className="text-xs text-brown-400 font-mono">{tx.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-brown-700">{tx.asset}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-black text-brown-900">{tx.amount}</p>
                        {tx.usdAmount && <p className="text-xs text-brown-400 font-medium">{tx.usdAmount}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[tx.status]}`}>
                        {statusIcons[tx.status]}
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-brown-500">
                      {tx.date}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-brown-300 hover:text-brown-600 rounded-lg hover:bg-cream-100 transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-5 border-t border-cream-200 flex items-center justify-between bg-white">
            <p className="text-sm text-brown-500">
              Showing <span className="font-bold">1</span> to <span className="font-bold">5</span> of <span className="font-bold">24</span> results
            </p>
            <div className="flex gap-2">
              <button className="p-2 border border-cream-200 rounded-lg text-brown-400 hover:bg-cream-50 disabled:opacity-50 transition-all" disabled>
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 border border-cream-200 rounded-lg text-brown-600 hover:bg-cream-50 hover:border-cream-300 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
