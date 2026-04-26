import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  CreditCard,
  Bitcoin,
  ArrowLeftRight,
  Users,
  User,
  Settings,
  Phone,
  Server,
  Tv,
  Zap,
  LogOut,
  Search,
  Bell,
  MessageCircle,
  Menu,
  X,
} from 'lucide-react';
import logo from '../../assets/images/icon.png';

interface DashboardLayoutProps {
  children: ReactNode;
}

const mainMenu = [
  { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <CreditCard size={20} />, label: 'Giftcards', path: '/giftcards' },
  { icon: <Bitcoin size={20} />, label: 'Crypto', path: '/crypto' },
  { icon: <ArrowLeftRight size={20} />, label: 'Transactions', path: '/transactions' },
  { icon: <Users size={20} />, label: 'Referrals', path: '/referral' },
  { icon: <User size={20} />, label: 'Profile', path: '/profile' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

const bariServices = [
  { icon: <Phone size={18} />, label: 'Airtime', path: '/airtime' },
  { icon: <Server size={18} />, label: 'Data', path: '/data' },
  { icon: <Tv size={18} />, label: 'Cable', path: '/cable' },
  { icon: <Zap size={18} />, label: 'Electricity', path: '/electricity' },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('Good Afternoon');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-surface-50">
      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white shadow-premium z-40 flex flex-col transition-transform duration-500 border-r border-surface-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-8 py-8">
          <Link to="/" className="flex items-center hover:scale-105 transition-transform">
            <img src={logo} alt="Baricoin" className="h-10" />
          </Link>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 scrollbar-hide">
          <div className="flex flex-col gap-2">
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30'
                      : 'text-brand-500 hover:bg-surface-100 hover:text-brand-900'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-primary'}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Bari Services */}
          <div className="mt-10 pt-6 border-t border-surface-100">
            <p className="px-5 text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-4">
              Bari Services
            </p>
            <div className="flex flex-col gap-2">
              {bariServices.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-4 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-brand-500 hover:bg-surface-100 hover:text-brand-900'
                    }`}
                  >
                    <span className="text-brand-400group-hover:text-primary transition-colors">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-surface-100">
          <button className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 w-full transition-all duration-300">
            <LogOut size={20} />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 min-h-screen">
        {/* ─── Top Header ─── */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-2xl border-b border-surface-100 px-8 py-5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-surface-100 text-brand-900"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <div>
                <h1 className="font-heading text-xl font-black text-brand-900 leading-tight">
                  {greeting}, <span className="text-primary">Mark</span>
                </h1>
                <p className="text-xs text-brand-400 font-bold uppercase tracking-wider">Dashboard Overview</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-surface-50 rounded-2xl px-4 py-2.5 gap-3 border border-surface-100 focus-within:border-primary/40 focus-within:bg-white transition-all">
                <Search size={18} className="text-brand-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="bg-transparent border-none outline-none text-sm w-48 text-brand-900 placeholder:text-brand-400 font-medium"
                />
              </div>

              {/* Notification */}
              <button className="relative p-3 rounded-2xl bg-surface-50 border border-surface-100 hover:bg-white hover:shadow-md text-brand-600 transition-all" aria-label="Notifications">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
              </button>

              {/* Avatar */}
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20 flex items-center justify-center text-white font-black text-sm hover:scale-105 transition-transform cursor-pointer">
                M
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* ═══ CHAT WIDGET ═══ */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default DashboardLayout;
