import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Switch
} from 'react-native';
import { 
  User, 
  ChevronRight, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  HelpCircle, 
  LogOut,
  Camera,
  Moon,
  Globe
} from 'lucide-react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  isLast?: boolean;
}

const SettingItem = ({ icon, label, value, hasSwitch, switchValue, onSwitchChange, isLast }: SettingItemProps) => (
  <TouchableOpacity className={`flex-row items-center justify-between py-5 ${!isLast ? 'border-b border-brown-50' : ''}`}>
    <View className="flex-row items-center gap-4">
      <View className="w-10 h-10 bg-brown-50 rounded-xl items-center justify-center">
        {icon}
      </View>
      <View>
        <Text className="font-bold text-brown-900 text-sm">{label}</Text>
        {value && <Text className="text-[10px] text-brown-400 font-medium">{value}</Text>}
      </View>
    </View>
    {hasSwitch ? (
      <Switch 
        value={switchValue} 
        onValueChange={onSwitchChange} 
        trackColor={{ false: '#eaddd7', true: '#A97458' }}
        thumbColor="white"
      />
    ) : (
      <ChevronRight size={18} color="#d2bab0" />
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brown-50">
      <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
        <View className="py-10 items-center">
          <View className="relative">
            <View className="w-24 h-24 bg-brown-900 rounded-full items-center justify-center border-4 border-white shadow-xl">
              <Text className="text-white text-3xl font-black">U</Text>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-white shadow-lg">
              <Camera size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-black text-brown-900 mt-4 tracking-tight">Username</Text>
          <Text className="text-xs font-bold text-brown-400 uppercase tracking-widest mt-1">Verified Member</Text>
        </View>

        {/* Account Section */}
        <View className="mb-8">
          <Text className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-4 ml-1">Account Management</Text>
          <View className="bg-white rounded-[2.5rem] p-4 border border-brown-100 shadow-sm">
            <SettingItem icon={<User size={18} color="#A97458" />} label="Personal Information" value="Name, Email, Phone" />
            <SettingItem icon={<CreditCard size={18} color="#10b981" />} label="Bank Accounts" value="2 Linked Accounts" />
            <SettingItem icon={<ShieldCheck size={18} color="#3b82f6" />} label="Security & KYC" value="Fingerprint, Passcode" isLast />
          </View>
        </View>

        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-4 ml-1">App Preferences</Text>
          <View className="bg-white rounded-[2.5rem] p-4 border border-brown-100 shadow-sm">
            <SettingItem icon={<Bell size={18} color="#f59e0b" />} label="Push Notifications" hasSwitch switchValue={true} />
            <SettingItem icon={<Moon size={18} color="#43302b" />} label="Dark Mode" hasSwitch switchValue={false} />
            <SettingItem icon={<Globe size={18} color="#A97458" />} label="Language" value="English (United States)" isLast />
          </View>
        </View>

        {/* Support & Logout */}
        <View className="mb-20">
          <Text className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-4 ml-1">Support</Text>
          <View className="bg-white rounded-[2.5rem] p-4 border border-brown-100 shadow-sm">
            <SettingItem icon={<HelpCircle size={18} color="#94a3b8" />} label="Help Center" />
            <SettingItem icon={<LogOut size={18} color="#EF4444" />} label="Log Out" isLast />
          </View>
        </View>

        <View className="items-center pb-12">
          <Text className="text-[10px] font-bold text-brown-200 uppercase tracking-tighter">Baricoin v1.0.0 (Build 42)</Text>
          <Text className="text-[10px] font-bold text-brown-200 mt-1 italic">Made with Love for the Bari Ecosystem</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
