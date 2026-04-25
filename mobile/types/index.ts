export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  memberSince: string;
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
}

export interface Wallet {
  id: string;
  currency: 'NGN' | 'USDT' | 'BTC' | 'ETH';
  balance: number;
  label: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'trade' | 'bill_payment';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  date: string;
  recipient?: string;
}

export interface GiftCardRate {
  id: string;
  category: string;
  type: string;
  rate: number;
  currency: string;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}
