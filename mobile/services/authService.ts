import api from './api';
import { useAuthStore } from '../store/useAuthStore';
import { storage } from './storage';

export const authService = {
  async login(credentials: any) {
    const { setLoading, setAuth, setError } = useAuthStore.getState();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      await storage.setItem('bari_auth_token', token);
      setAuth(user, token);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  async register(data: any) {
    const { setLoading, setError } = useAuthStore.getState();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  async logout() {
    const { clearAuth } = useAuthStore.getState();
    try {
      await api.post('/auth/logout');
    } finally {
      await storage.removeItem('bari_auth_token');
      clearAuth();
    }
  },

  async fetchCurrentUser() {
    const { setAuth } = useAuthStore.getState();
    try {
      const response = await api.get('/auth/user');
      const { user } = response.data;
      const token = await storage.getItem('bari_auth_token') || '';
      setAuth(user, token);
      return user;
    } catch (error) {
      throw error;
    }
  }
};
