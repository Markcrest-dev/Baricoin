import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, token) => {
        localStorage.setItem('bari_auth_token', token);
        set({ user, token, isAuthenticated: true, error: null });
      },

      clearAuth: () => {
        localStorage.removeItem('bari_auth_token');
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      updateUser: (updatedFields) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null
        })),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'bari-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
