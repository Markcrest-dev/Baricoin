import { create } from 'zustand';
import { Wallet, Transaction } from '../types';

interface WalletState {
  wallets: Wallet[];
  recentTransactions: Transaction[];
  isLoading: boolean;

  setWallets: (wallets: Wallet[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (isLoading: boolean) => void;
  getWalletByCurrency: (currency: string) => Wallet | undefined;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  wallets: [],
  recentTransactions: [],
  isLoading: false,

  setWallets: (wallets) => set({ wallets }),
  setTransactions: (transactions) => set({ recentTransactions: transactions }),
  setLoading: (isLoading) => set({ isLoading }),
  
  getWalletByCurrency: (currency) => {
    return get().wallets.find(w => w.currency === currency);
  }
}));
