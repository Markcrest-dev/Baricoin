import { useState } from 'react';
import { 
  User, 
  Camera, 
  CheckCircle2, 
  Calendar, 
  Plus, 
  Lock, 
  ShieldCheck, 
  ToggleRight, 
  ToggleLeft,
  ChevronRight,
  Building2,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const ProfilePage = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-brown-900">My Profile</h1>
          <p className="text-brown-500">View and update your personal information and account security.</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-cream-200 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-4xl font-black shadow-xl">
                U
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-brown-600 hover:text-primary transition-colors border border-cream-100">
                <Camera size={20} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h2 className="text-2xl font-black text-brown-900">Username</h2>
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider rounded-lg border border-success/20">
                    <CheckCircle2 size={12} />
                    Verified
                  </span>
                </div>
                <p className="text-brown-500 font-medium">user@example.com</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-cream-50 rounded-xl border border-cream-100 text-sm text-brown-600">
                  <Calendar size={16} className="text-brown-400" />
                  Joined Oct 2024
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-cream-50 rounded-xl border border-cream-100 text-sm text-brown-600">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  Account Active
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto text-center">
              <div className="mb-2 flex justify-between md:justify-end items-center gap-2">
                <span className="text-xs font-bold text-brown-400 uppercase">Profile Completion</span>
                <span className="text-xs font-black text-primary">85%</span>
              </div>
              <div className="w-full md:w-48 h-2.5 bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] rounded-full shadow-inner" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-200">
              <h3 className="text-lg font-bold text-brown-900 mb-6 pb-2 border-b border-cream-50">Personal Information</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brown-400 uppercase ml-1">Full Name</label>
                    <div className="relative">
                      <input type="text" defaultValue="Username" className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-brown-900 font-medium" />
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-300" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brown-400 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <input type="email" defaultValue="user@example.com" disabled className="w-full pl-10 pr-4 py-3 bg-cream-100 border border-cream-200 rounded-xl opacity-60 text-brown-900 font-medium cursor-not-allowed" />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-300" size={18} />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brown-400 uppercase ml-1">Phone Number</label>
                    <div className="relative">
                      <input type="tel" placeholder="+234 XXX XXX XXXX" className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-brown-900 font-medium" />
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-300" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brown-400 uppercase ml-1">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-brown-900 font-medium" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Bank Accounts */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-200">
              <div className="flex items-center justify-between mb-8 pb-2 border-b border-cream-50">
                <h3 className="text-lg font-bold text-brown-900">Withdrawal Accounts</h3>
                <button className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider hover:underline">
                  <Plus size={16} />
                  Add New Bank
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-cream-50 to-white rounded-2xl border border-cream-200 shadow-sm group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brown-600 border border-cream-100">
                      <Building2 size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-success uppercase tracking-widest px-2 py-1 bg-success/5 rounded-md">Primary</span>
                  </div>
                  <h4 className="font-black text-brown-900 mb-1 tracking-tight">Access Bank</h4>
                  <p className="text-sm text-brown-500 font-mono">0123456789</p>
                  <div className="mt-4 pt-4 border-t border-cream-100 flex justify-end">
                    <button className="text-xs font-bold text-danger uppercase opacity-0 group-hover:opacity-100 transition-all">Remove</button>
                  </div>
                </div>

                <button className="flex flex-col items-center justify-center p-8 bg-cream-50/50 rounded-2xl border-2 border-dashed border-cream-200 hover:border-primary hover:bg-white transition-all group">
                  <div className="w-12 h-12 rounded-full border-2 border-cream-200 flex items-center justify-center text-brown-300 group-hover:border-primary group-hover:text-primary transition-all mb-3">
                    <Plus size={24} />
                  </div>
                  <p className="text-sm font-bold text-brown-400 group-hover:text-primary transition-colors tracking-tight">Connect bank account</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Security & Actions */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-200">
              <h3 className="text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary" />
                Account Security
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-cream-50 rounded-xl flex items-center justify-center text-brown-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brown-900">Change Password</h4>
                      <p className="text-[10px] text-brown-400 font-medium">Last updated 2 days ago</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-brown-200 group-hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center justify-between py-4 border-y border-cream-50">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${twoFactor ? 'bg-primary/10 text-primary' : 'bg-cream-50 text-brown-600'}`}>
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brown-900">Two-Factor Auth</h4>
                      <p className="text-[10px] text-brown-400 font-medium">{twoFactor ? 'Active' : 'Disabled'}</p>
                    </div>
                  </div>
                  <button onClick={() => setTwoFactor(!twoFactor)}>
                    {twoFactor ? <ToggleRight size={32} className="text-primary" /> : <ToggleLeft size={32} className="text-brown-200 hover:text-brown-300" />}
                  </button>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <h4 className="text-xs font-black text-brown-900 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-primary" />
                    KYC Required
                  </h4>
                  <p className="text-xs text-brown-600 leading-relaxed mb-4">Complete your account verification to increase withdrawal limits.</p>
                  <button className="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 hover:bg-primary-dark transition-all">
                    Verify Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-200">
              <h3 className="text-lg font-bold text-brown-900 mb-6">Recent Logins</h3>
              <div className="space-y-4">
                {[
                  { device: 'iPhone 15 Pro', location: 'Lagos, Nigeria', time: 'Active Now', status: 'Online' },
                  { device: 'MacBook Air M2', location: 'Lagos, Nigeria', time: '2 hours ago', status: 'Offline' },
                ].map((login, i) => (
                  <div key={i} className="flex items-center justify-between text-xs pb-3 border-b border-cream-50 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-bold text-brown-800">{login.device}</h4>
                      <p className="text-brown-400">{login.location}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${login.status === 'Online' ? 'text-success' : 'text-brown-400'}`}>{login.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
