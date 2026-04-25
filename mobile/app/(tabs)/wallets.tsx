import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  SendHorizonal, 
  ChevronRight,
  TrendingUp
} from 'lucide-react-native';
import { WalletCard } from '../../components/WalletCard';

export default function WalletsScreen() {
  const [showBalances, setShowBalances] = useState(true);

  const wallets = [
    { label: 'Naira Wallet', balance: '₦ 45,600.00', currency: 'NGN', color: 'bg-primary' },
    { label: 'Bitcoin Wallet', balance: '0.00245', currency: 'BTC', color: 'bg-brown-900' },
    { label: 'Ethereum Wallet', balance: '1.24', currency: 'ETH', color: 'bg-blue-600' },
    { label: 'USDT Wallet', balance: '520.00', currency: 'USDT', color: 'bg-green-600' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-brown-50">
      <View className="px-6 py-8 flex-row justify-between items-center">
        <Text className="text-2xl font-black text-brown-900">My Wallets</Text>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-xl items-center justify-center shadow-sm border border-brown-100">
          <Plus size={20} color="#A97458" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-6 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="gap-6">
          {wallets.map((wallet, index) => (
            <WalletCard 
              key={index}
              label={wallet.label}
              balance={wallet.balance}
              currency={wallet.currency}
              color={wallet.color}
              showBalance={showBalances}
              onToggle={() => setShowBalances(!showBalances)}
            />
          ))}
        </View>

        <View className="mt-12 bg-white rounded-[2.5rem] p-6 border border-brown-100 shadow-sm">
          <Text className="text-sm font-black text-brown-900 mb-6 uppercase tracking-widest">Active Stats</Text>
          <View className="space-y-4">
            <View className="flex-row items-center justify-between py-4 border-b border-brown-50">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-success/10 rounded-xl items-center justify-center">
                  <TrendingUp size={18} color="#10B981" />
                </View>
                <Text className="font-bold text-brown-800">Total Asset Value</Text>
              </View>
              <Text className="font-black text-brown-900 text-sm">₦ 1,450,200</Text>
            </View>
            
            <View className="flex-row items-center justify-between py-4 border-b border-brown-50">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center">
                  <ArrowUpRight size={18} color="#A97458" />
                </View>
                <Text className="font-bold text-brown-800">Monthly Growth</Text>
              </View>
              <Text className="font-black text-success text-sm">+12.4%</Text>
            </View>
          </View>
          
          <TouchableOpacity className="mt-6 flex-row items-center justify-center gap-2">
            <Text className="text-xs font-bold text-brown-400">View Detailed Analytics</Text>
            <ChevronRight size={14} color="#d2bab0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
