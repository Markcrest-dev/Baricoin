import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const QuickAction = ({ label, icon, color }: QuickActionProps) => {
  return (
    <View className="items-center w-1/4 mb-4">
      <TouchableOpacity className={`w-14 h-14 rounded-2xl ${color} items-center justify-center shadow-sm`}>
        {icon}
      </TouchableOpacity>
      <Text className="text-[10px] font-bold text-brown-600 mt-2 text-center uppercase tracking-tighter">{label}</Text>
    </View>
  );
};
