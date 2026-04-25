import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, ArrowUpRight } from 'lucide-react-native';

interface WalletCardProps {
  label: string;
  balance: string;
  currency: string;
  color: string;
  showBalance: boolean;
  onToggle: () => void;
}

export const WalletCard = ({ label, balance, currency, color, showBalance, onToggle }: WalletCardProps) => {
  return (
    <View className={`${color} p-6 rounded-[2.5rem] shadow-xl overflow-hidden relative`}>
      <View className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
      
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white/80 font-bold uppercase tracking-widest text-[10px]">{label}</Text>
        <TouchableOpacity onPress={onToggle}>
          {showBalance ? <Eye size={20} color="white" /> : <EyeOff size={20} color="white" />}
        </TouchableOpacity>
      </View>

      <View className="flex-row items-baseline gap-1 mb-6">
        <Text className="text-white text-3xl font-black">{showBalance ? balance : '••••••'}</Text>
        <Text className="text-white/60 font-bold text-sm">{currency}</Text>
      </View>

      <TouchableOpacity className="bg-white/20 self-start px-4 py-2 rounded-full flex-row items-center gap-2">
        <Text className="text-white font-bold text-xs">View Details</Text>
        <ArrowUpRight size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
};
