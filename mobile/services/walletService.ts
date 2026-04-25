import api from './api';
import { useWalletStore } from '../store/useWalletStore';

export const walletService = {
  async fetchWallets() {
    const { setWallets, setLoading } = useWalletStore.getState();
    setLoading(true);
    try {
      const response = await api.get('/wallets');
      setWallets(response.data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  },

  async fetchTransactions(params?: any) {
    const { setTransactions, setLoading } = useWalletStore.getState();
    setLoading(true);
    try {
      const response = await api.get('/transactions', { params });
      setTransactions(response.data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  },

  async initiateWithdrawal(data: any) {
    try {
      const response = await api.post('/withdrawals/request', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async initiateTransfer(data: any) {
    try {
      const response = await api.post('/transfers/initiate', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
