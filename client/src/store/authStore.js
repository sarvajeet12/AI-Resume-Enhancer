import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axios';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ accessToken: token }),

      login: async (email, otp) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/verify-otp', { email, otp });
          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error.response?.data?.message || 'Login failed',
          };
        }
      },

      sendOTP: async (email) => {
        try {
          await api.post('/auth/send-otp', { email });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || 'Failed to send OTP',
          };
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get('/auth/me');
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      acceptPolicy: async (type) => {
        try {
          const response = await api.post('/auth/accept-policy', { type });
          set((state) => ({
            user: state.user ? { ...state.user, ...response.data.user } : response.data.user,
          }));
          return { success: true, message: response.data.message };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || 'Failed to accept policy',
          };
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

