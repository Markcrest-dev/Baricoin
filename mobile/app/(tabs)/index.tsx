import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  Bell, 
  Settings, 
  ArrowUpRight, 
  ArrowDownLeft, 
  SendHorizonal, 
  CreditCard,
  Plus,
  Zap,
  Phone,
  Server,
  Tv
} from 'lucide-react-native';
import { WalletCard } from '../../components/WalletCard';
import { QuickAction } from '../../components/QuickAction';
import { useAuthStore } from '../../store/useAuthStore';
import { useWalletStore } from '../../store/useWalletStore';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const { wallets, recentTransactions, fetchWallets, fetchTransactions } = useWalletStore();
  const [showNaira, setShowNaira] = useState(true);
  const [showCrypto, setShowCrypto] = useState(true);

  useEffect(() => {
    fetchWallets();
    fetchTransactions({ limit: 5 });
  }, []);

  const nairaBalance = wallets.find(w => w.currency === 'NGN')?.balance || 0;
  const btcBalance = wallets.find(w => w.currency === 'BTC')?.balance || 0;

  return (
    <SafeAreaView className="flex-1 bg-brown-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-brown-100">
        <View>
          <Text className="text-brown-400 font-bold text-xs uppercase tracking-tighter">Welcome back,</Text>
          <Text className="text-brown-900 font-black text-xl">{user?.name || 'User'} 👋</Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 bg-brown-50 rounded-xl items-center justify-center border border-brown-100">
            <Bell size={20} color="#43302b" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-brown-900 rounded-xl items-center justify-center shadow-lg">
            <Text className="text-white font-black text-xs">{user?.name?.[0] || 'U'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="gap-4 mb-8">
          <WalletCard 
            label="Naira Wallet"
            balance={`₦ ${nairaBalance.toLocaleString()}`}
            currency="NGN"
            color="bg-primary"
            showBalance={showNaira}
            onToggle={() => setShowNaira(!showNaira)}
          />
          
          <WalletCard 
            label="Bitcoin Balance"
            balance={btcBalance.toString()}
            currency="BTC"
            color="bg-brown-900"
            showBalance={showCrypto}
            onToggle={() => setShowCrypto(!showCrypto)}
          />
        </View>

        <View className="flex-row gap-3 mb-8">
          <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl border border-brown-100 flex-row items-center justify-center gap-3 shadow-sm">
            <View className="w-8 h-8 bg-success/10 rounded-xl items-center justify-center">
              <Plus size={18} color="#10B981" />
            </View>
            <Text className="font-black text-brown-900 text-sm">Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl border border-brown-100 flex-row items-center justify-center gap-3 shadow-sm">
            <View className="w-8 h-8 bg-primary/10 rounded-xl items-center justify-center">
              <ArrowDownLeft size={18} color="#A97458" />
            </View>
            <Text className="font-black text-brown-900 text-sm">Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-black text-brown-900 mb-6 uppercase tracking-widest">Quick Services</Text>
          <View className="flex-row flex-wrap">
            <QuickAction label="Airtime" icon={<Phone size={22} color="#3b82f6" />} color="bg-blue-50" />
            <QuickAction label="Data" icon={<Server size={22} color="#10b981" />} color="bg-green-50" />
            <QuickAction label="Cable" icon={<Tv size={22} color="#8b5cf6" />} color="bg-purple-50" />
            <QuickAction label="Power" icon={<Zap size={22} color="#f59e0b" />} color="bg-orange-50" />
            <QuickAction label="Transfer" icon={<SendHorizonal size={22} color="#A97458" />} color="bg-primary/10" />
            <QuickAction label="Card" icon={<CreditCard size={22} color="#43302b" />} color="bg-brown-100" />
            <QuickAction label="Rates" icon={<ArrowUpRight size={22} color="#10b981" />} color="bg-green-100" />
            <QuickAction label="More" icon={<Settings size={22} color="#94a3b8" />} color="bg-slate-100" />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-sm font-black text-brown-900 uppercase tracking-widest">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="text-xs font-bold text-primary">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-[2rem] p-4 border border-brown-100 shadow-sm">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => (
                <TouchableOpacity key={tx.id} className="flex-row items-center justify-between py-4 border-b border-brown-50 last:border-0">
                  <View className="flex-row items-center gap-4">
                    <View className={`w-10 h-10 rounded-xl items-center justify-center ${tx.type === 'deposit' ? 'bg-success/10' : 'bg-primary/10'}`}>
                      {tx.type === 'deposit' ? <Plus size={18} color="#10B981" /> : <ArrowDownLeft size={18} color="#A97458" />}
                    </View>
                    <View>
                      <Text className="font-bold text-brown-900 text-sm">{tx.description}</Text>
                      <Text className="text-[10px] text-brown-400 font-medium">{tx.date}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`font-black text-sm ${tx.type === 'deposit' ? 'text-success' : 'text-danger'}`}>
                      {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()}
                    </Text>
                    <Text className={`text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'text-success' : 'text-warning'}`}>
                      {tx.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="py-10 items-center">
                <Text className="text-brown-400 italic text-xs">No recent activity</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
