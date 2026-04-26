import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Globe, 
  Smartphone, 
  Shield, 
  FileText, 
  HelpCircle,
  ToggleRight,
  ToggleLeft,
  ChevronRight,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    transactions: true,
  });

  const [language] = useState('English');
  const [theme, setTheme] = useState('Light');

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-200">
      <h3 className="text-lg font-bold text-brown-900 mb-6 pb-2 border-b border-cream-50">{title}</h3>
      <div className="space-y-6">{children}</div>
    </div>
  );

  const SettingItem = ({ 
    icon, 
    title, 
    desc, 
    action, 
    type = 'link',
    to
  }: { 
    icon: React.ReactNode; 
    title: string; 
    desc: string; 
    action?: React.ReactNode;
    type?: 'link' | 'toggle' | 'select';
    to?: string;
  }) => {
    const content = (
      <div className={`flex items-center justify-between group ${to ? 'cursor-pointer' : ''}`}>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-cream-50 rounded-xl flex items-center justify-center text-brown-600 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-brown-900">{title}</h4>
            <p className="text-[10px] text-brown-400 font-medium">{desc}</p>
          </div>
        </div>
        {type === 'link' && <ChevronRight size={18} className="text-brown-200 group-hover:text-primary transition-colors" />}
        {type === 'toggle' && action}
        {type === 'select' && action}
      </div>
    );

    if (to) {
      return <Link to={to}>{content}</Link>;
    }

    return content;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-brown-900">Settings</h1>
          <p className="text-brown-500">Customize your Baricoin experience and notification preferences.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <SettingSection title="Preferences">
              <SettingItem 
                icon={<Globe size={18} />} 
                title="App Language" 
                desc="Choose your preferred language" 
                type="select"
                action={
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-cream-50 rounded-lg text-xs font-bold text-brown-700 border border-cream-100">
                    {language}
                    <ChevronDown size={14} />
                  </button>
                }
              />
              <SettingItem 
                icon={theme === 'Light' ? <Sun size={18} /> : <Moon size={18} />} 
                title="Theme Appearance" 
                desc="Switch between light and dark modes" 
                type="select"
                action={
                  <button 
                    onClick={() => setTheme(t => t === 'Light' ? 'Dark' : 'Light')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-cream-50 rounded-lg text-xs font-bold text-brown-700 border border-cream-100"
                  >
                    {theme}
                    <ChevronDown size={14} />
                  </button>
                }
              />
            </SettingSection>

            <SettingSection title="Notifications">
              <SettingItem 
                icon={<Bell size={18} />} 
                title="Email Notifications" 
                desc="Receive transaction updates via email" 
                type="toggle"
                action={
                  <button onClick={() => toggleNotification('email')}>
                    {notifications.email ? <ToggleRight size={32} className="text-primary" /> : <ToggleLeft size={32} className="text-brown-200" />}
                  </button>
                }
              />
              <SettingItem 
                icon={<Smartphone size={18} />} 
                title="Push Notifications" 
                desc="Receive real-time alerts on your device" 
                type="toggle"
                action={
                  <button onClick={() => toggleNotification('push')}>
                    {notifications.push ? <ToggleRight size={32} className="text-primary" /> : <ToggleLeft size={32} className="text-brown-200" />}
                  </button>
                }
              />
              <SettingItem 
                icon={<Bell size={18} />} 
                title="Transaction Alerts" 
                desc="Get notified about all account movements" 
                type="toggle"
                action={
                  <button onClick={() => toggleNotification('transactions')}>
                    {notifications.transactions ? <ToggleRight size={32} className="text-primary" /> : <ToggleLeft size={32} className="text-brown-200" />}
                  </button>
                }
              />
            </SettingSection>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <SettingSection title="Legal & Help">
              <SettingItem 
                icon={<Shield size={18} />} 
                title="Privacy Policy" 
                desc="How we handle and protect your data" 
                to="/privacy-policy"
              />
              <SettingItem 
                icon={<FileText size={18} />} 
                title="Terms of Service" 
                desc="The rules for using our platform" 
                to="/terms"
              />
              <SettingItem 
                icon={<HelpCircle size={18} />} 
                title="Help Center" 
                desc="Get answers to your questions 24/7" 
                to="/support"
              />
            </SettingSection>

            <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 relative overflow-hidden">
               <div className="relative z-10">
                <h3 className="text-lg font-bold text-brown-900 mb-2">Need more help?</h3>
                <p className="text-sm text-brown-600 mb-6 leading-relaxed">Our dedicated support team is available around the clock to assist you with any transaction or account issues.</p>
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:bg-primary-dark transition-all">
                  Chat with Support
                </button>
               </div>
            </div>

            <div className="px-4 text-center">
              <p className="text-[10px] font-bold text-brown-400 uppercase tracking-widest mb-2">Baricoin App Version 2.0.4</p>
              <p className="text-[10px] text-brown-300 font-medium">© 2024 Baricoin Global Ltd. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
