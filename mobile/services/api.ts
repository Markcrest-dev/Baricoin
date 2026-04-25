import axios from 'axios';
import { storage } from './storage';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Default for local dev

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem('bari_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.removeItem('bari_auth_token');
      // Potential redirect logic for mobile
    }
    return Promise.reject(error);
  }
);

export default api;
