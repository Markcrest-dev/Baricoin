import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Clock, 
  Copy, 
  Check,
  Share2,
  Trophy,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const ReferralPage = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = "BARI2024";
  const referralLink = `https://baricoin.com/ref/${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tiers = [
    { name: 'Bronze', range: '1-5 Referrals', reward: '₦500', icon: '🥉', color: 'from-orange-400 to-orange-600' },
    { name: 'Silver', range: '6-15 Referrals', reward: '₦750', icon: '🥈', color: 'from-slate-300 to-slate-500' },
    { name: 'Gold', range: '16+ Referrals', reward: '₦1,000', icon: '🥇', color: 'from-yellow-400 to-yellow-600' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-brown-900">Referral Program</h1>
          <p className="text-brown-500">Invite your friends to Baricoin and earn rewards for every trade they make.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-cream-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Users size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-brown-400 uppercase">Total Referrals</p>
              <h3 className="text-2xl font-black text-brown-900">0</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-cream-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center text-success">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-brown-400 uppercase">Total Earnings</p>
              <h3 className="text-2xl font-black text-brown-900">₦ 0.00</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-cream-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center text-warning">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-brown-400 uppercase">Pending Rewards</p>
              <h3 className="text-2xl font-black text-brown-900">₦ 0.00</h3>
            </div>
          </div>
        </div>

        {/* Invitation Controls */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-brown-800 to-brown-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Share2 size={20} className="text-primary" />
                Share your Link
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase mb-3 ml-1">Your Referral Code</label>
                  <div className="flex bg-white/10 rounded-2xl p-2 border border-white/10 group focus-within:border-primary/50 transition-all">
                    <div className="flex-1 px-4 flex items-center">
                      <span className="font-mono font-bold tracking-widest text-lg">{referralCode}</span>
                    </div>
                    <button 
                      onClick={handleCopyCode}
                      className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary-dark transition-all"
                    >
                      {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase mb-3 ml-1">Referral Link</label>
                  <div className="flex bg-white/10 rounded-2xl p-2 border border-white/10 group focus-within:border-primary/50 transition-all">
                    <div className="flex-1 px-4 flex items-center overflow-hidden">
                      <span className="text-sm text-white/70 truncate">{referralLink}</span>
                    </div>
                    <button 
                      onClick={handleCopyLink}
                      className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all shrink-0"
                    >
                      {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all">WhatsApp</button>
                <button className="flex-1 py-3 bg-[#1DA1F2] text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all">Twitter</button>
                <button className="flex-1 py-3 bg-[#0088cc] text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all">Telegram</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-cream-200 shadow-sm">
            <h2 className="text-xl font-bold text-brown-900 mb-6 flex items-center gap-2">
              <Trophy size={20} className="text-primary" />
              Reward Tiers
            </h2>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <div key={i} className="group flex items-center justify-between p-4 bg-cream-50 rounded-2xl border border-transparent hover:border-cream-200 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-2xl shadow-sm`}>
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-brown-900">{tier.name}</h4>
                      <p className="text-xs text-brown-400">{tier.range}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-primary">{tier.reward}</span>
                    <span className="text-[10px] uppercase font-bold text-brown-400 tracking-wider">Per Ref</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-bold text-brown-600 hover:text-primary transition-colors">
              View Program Terms & Conditions
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-cream-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-cream-200 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-brown-900">Referral History</h2>
            <div className="text-xs font-bold text-brown-400 uppercase tracking-widest">Live Updates</div>
          </div>
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-cream-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-brown-200" />
            </div>
            <h3 className="text-lg font-bold text-brown-900 mb-2">No referrals yet</h3>
            <p className="text-brown-500 max-w-sm mx-auto">Start sharing your unique referral link to earn rewards and climb the leaderboard!</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralPage;
