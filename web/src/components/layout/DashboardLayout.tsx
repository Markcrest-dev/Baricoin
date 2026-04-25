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
import logo from '../../assets/images/baricoin-logo-new.png';

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
    <div className="flex min-h-screen bg-cream-50">
      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-xl z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-cream-200">
          <Link to="/">
            <img src={logo} alt="Baricoin" className="h-9" />
          </Link>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="flex flex-col gap-1">
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md'
                      : 'text-brown-600 hover:bg-cream-100 hover:text-brown-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Bari Services */}
          <div className="mt-6 pt-4 border-t border-cream-200">
            <p className="px-4 text-xs font-semibold text-brown-400 uppercase tracking-wider mb-2">
              Bari Services
            </p>
            <div className="flex flex-col gap-1">
              {bariServices.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all ${
                      isActive
                        ? 'bg-cream-200 text-brown-900 font-bold'
                        : 'text-brown-600 hover:bg-cream-100 hover:text-brown-900'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-cream-200">
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 min-h-screen">
        {/* ─── Top Header ─── */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-cream-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-cream-100 text-brown-700"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <div>
                <h1 className="font-heading text-lg font-bold text-brown-900">
                  {greeting}
                </h1>
                <p className="text-sm text-brown-500">username</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden sm:flex items-center bg-cream-50 rounded-xl px-3 py-2 gap-2 border border-cream-200">
                <Search size={16} className="text-brown-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-40 text-brown-900 placeholder:text-brown-400"
                />
              </div>

              {/* Notification */}
              <button className="relative p-2.5 rounded-xl hover:bg-cream-100 text-brown-600 transition-colors" aria-label="Notifications">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* ═══ CHAT WIDGET ═══ */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default DashboardLayout;
