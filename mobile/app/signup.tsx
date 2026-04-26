import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { authService } from '../services/authService';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !username || !email || !password) return;
    setLoading(true);
    setError('');
    try {
      await authService.register({ name, username, email, phone, password });
      router.replace('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8 pt-12">
          <View className="mb-12">
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Text className="text-primary font-bold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-black text-brown-900 tracking-tight">Create Account</Text>
            <Text className="text-brown-400 font-medium">Join the Baricoin ecosystem today</Text>
          </View>

          <View className="space-y-4">
            {error ? (
              <View className="bg-danger/10 p-4 rounded-2xl border border-danger/20 mb-4">
                <Text className="text-danger text-xs font-bold text-center">{error}</Text>
              </View>
            ) : null}

            <View className="space-y-2 mb-4">
              <Text className="text-[10px] font-bold text-brown-400 uppercase tracking-widest ml-1">Full Name</Text>
              <View className="flex-row items-center bg-brown-50 rounded-2xl px-4 py-4 border border-brown-100">
                <User size={18} color="#977669" />
                <TextInput 
                  className="flex-1 ml-3 text-brown-900 font-bold"
                  placeholder="John Doe"
                  placeholderTextColor="#d2bab0"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View className="space-y-2 mb-4">
              <Text className="text-[10px] font-bold text-brown-400 uppercase tracking-widest ml-1">Username</Text>
              <View className="flex-row items-center bg-brown-50 rounded-2xl px-4 py-4 border border-brown-100">
                <User size={18} color="#977669" />
                <TextInput 
                  className="flex-1 ml-3 text-brown-900 font-bold"
                  placeholder="johndoe123"
                  placeholderTextColor="#d2bab0"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="space-y-2 mb-4">
              <Text className="text-[10px] font-bold text-brown-400 uppercase tracking-widest ml-1">Email Address</Text>
              <View className="flex-row items-center bg-brown-50 rounded-2xl px-4 py-4 border border-brown-100">
                <Mail size={18} color="#977669" />
                <TextInput 
                  className="flex-1 ml-3 text-brown-900 font-bold"
                  placeholder="name@example.com"
                  placeholderTextColor="#d2bab0"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View className="space-y-2 mb-4">
              <Text className="text-[10px] font-bold text-brown-400 uppercase tracking-widest ml-1">Phone Number</Text>
              <View className="flex-row items-center bg-brown-50 rounded-2xl px-4 py-4 border border-brown-100">
                <Phone size={18} color="#977669" />
                <TextInput 
                  className="flex-1 ml-3 text-brown-900 font-bold"
                  placeholder="+234 800 000 0000"
                  placeholderTextColor="#d2bab0"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View className="space-y-2 mb-8">
              <Text className="text-[10px] font-bold text-brown-400 uppercase tracking-widest ml-1">Password</Text>
              <View className="flex-row items-center bg-brown-50 rounded-2xl px-4 py-4 border border-brown-100">
                <Lock size={18} color="#977669" />
                <TextInput 
                  className="flex-1 ml-3 text-brown-900 font-bold"
                  placeholder="••••••••"
                  placeholderTextColor="#d2bab0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} color="#977669" /> : <Eye size={18} color="#977669" />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleSignup}
              disabled={loading}
              className={`w-full py-5 rounded-2xl flex-row items-center justify-center gap-3 shadow-xl ${loading ? 'bg-primary-light' : 'bg-primary'}`}
            >
              <Text className="text-white font-black text-lg">{loading ? 'Creating...' : 'Create Account'}</Text>
              {!loading && <ArrowRight size={20} color="white" />}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center py-10 pb-20">
            <Text className="text-brown-400 font-medium">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-primary font-black">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
