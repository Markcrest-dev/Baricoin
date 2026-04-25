import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { authService } from '../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      await authService.login({ email, password });
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
          <View className="items-center mb-12">
            <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center shadow-lg mb-4">
              <Text className="text-white text-3xl font-black italic">B</Text>
            </View>
            <Text className="text-2xl font-black text-brown-900 tracking-tight">Welcome Back</Text>
            <Text className="text-brown-400 font-medium">Log in to your Baricoin account</Text>
          </View>

          <View className="space-y-6">
            {error ? (
              <View className="bg-danger/10 p-4 rounded-2xl border border-danger/20 mb-4">
                <Text className="text-danger text-xs font-bold text-center">{error}</Text>
              </View>
            ) : null}

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
                />
              </View>
            </View>

            <View className="space-y-2 mb-2">
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

            <TouchableOpacity className="self-end mb-8">
              <Text className="text-xs font-bold text-primary">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleLogin}
              disabled={loading}
              className={`w-full py-5 rounded-2xl flex-row items-center justify-center gap-3 shadow-xl ${loading ? 'bg-primary-light' : 'bg-primary'}`}
            >
              <Text className="text-white font-black text-lg">{loading ? 'Logging in...' : 'Sign In'}</Text>
              {!loading && <ArrowRight size={20} color="white" />}
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center my-10">
            <View className="flex-1 h-[1px] bg-brown-100" />
            <Text className="mx-4 text-brown-300 font-bold text-[10px] uppercase">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-brown-100" />
          </View>

          <View className="flex-row gap-4 mb-12">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center p-4 rounded-2xl border border-brown-100 bg-white shadow-sm">
              <Github size={20} color="#43302b" />
              <Text className="ml-2 font-bold text-brown-900">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center p-4 rounded-2xl border border-brown-100 bg-white shadow-sm">
              <Github size={20} color="#43302b" />
              <Text className="ml-2 font-bold text-brown-900">Apple</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center pb-20">
            <Text className="text-brown-400 font-medium">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-primary font-black">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
