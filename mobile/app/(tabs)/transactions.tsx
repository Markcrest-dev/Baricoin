import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput
} from 'react-native';
import { 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Download
} from 'lucide-react-native';

const transactions = [
  { id: '1', type: 'received', amount: '₦ 25,000.00', label: 'Wallet Deposit', date: 'Oct 24, 2:15 PM', status: 'completed' },
  { id: '2', type: 'sent', amount: '₦ 10,000.00', label: 'Airtime Purchase', date: 'Oct 23, 11:30 AM', status: 'pending' },
  { id: '3', type: 'trade', amount: '0.0012 BTC', label: 'Sell Crypto', date: 'Oct 22, 9:20 AM', status: 'completed' },
  { id: '4', type: 'received', amount: '₦ 5,000.00', label: 'Referral Bonus', date: 'Oct 21, 6:45 PM', status: 'completed' },
  { id: '5', type: 'sent', amount: '₦ 2,500.00', label: 'Utility Bill', date: 'Oct 20, 1:10 PM', status: 'failed' },
  { id: '6', type: 'received', amount: '₦ 15,000.00', label: 'Bank Transfer', date: 'Oct 19, 10:05 AM', status: 'completed' },
];

export default function TransactionsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={12} color="#10B981" />;
      case 'pending': return <Clock size={12} color="#F59E0B" />;
      case 'failed': return <XCircle size={12} color="#EF4444" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-danger';
      default: return 'text-brown-400';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brown-50">
      <View className="px-6 py-8">
        <Text className="text-2xl font-black text-brown-900 mb-6">Transaction History</Text>
        
        {/* Search & Filter */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 border border-brown-100 shadow-sm h-12">
            <Search size={18} color="#977669" />
            <TextInput 
              placeholder="Search history..." 
              className="flex-1 ml-3 text-brown-900 font-bold text-sm"
              placeholderTextColor="#d2bab0"
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-brown-900 rounded-2xl items-center justify-center shadow-lg">
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 h-10">
          {['All', 'Deposits', 'Withdrawals', 'Transfers', 'Bills'].map((filter) => (
            <TouchableOpacity 
              key={filter} 
              onPress={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full mr-2 h-10 items-center justify-center ${activeFilter === filter ? 'bg-primary' : 'bg-white border border-brown-100'}`}
            >
              <Text className={`text-[10px] font-black uppercase tracking-widest ${activeFilter === filter ? 'text-white' : 'text-brown-400'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white rounded-[2.5rem] p-4 border border-brown-100 shadow-sm">
          {transactions.map((tx, index) => (
            <TouchableOpacity key={tx.id} className="flex-row items-center justify-between py-5 border-b border-brown-50 last:border-0">
              <View className="flex-row items-center gap-4">
                <View className={`w-10 h-10 rounded-xl items-center justify-center ${tx.type === 'received' ? 'bg-success/10' : 'bg-primary/10'}`}>
                  {tx.type === 'received' ? <ArrowDownLeft size={18} color="#10B981" /> : <ArrowUpRight size={18} color="#A97458" />}
                </View>
                <View>
                  <Text className="font-bold text-brown-900 text-sm">{tx.label}</Text>
                  <View className="flex-row items-center gap-1.5 mt-0.5">
                    {getStatusIcon(tx.status)}
                    <Text className={`text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(tx.status)}`}>{tx.status}</Text>
                  </View>
                </View>
              </View>
              <View className="items-end">
                <Text className={`font-black text-sm ${tx.type === 'received' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'received' ? '+' : '-'} {tx.amount}
                </Text>
                <Text className="text-[10px] text-brown-300 font-medium">{tx.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="mt-8 bg-brown-50 p-4 rounded-2xl border border-dashed border-brown-200 flex-row items-center justify-center gap-2">
          <Download size={16} color="#977669" />
          <Text className="text-xs font-bold text-brown-600">Export Report as CSV</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
