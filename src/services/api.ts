
import axios from 'axios';
import { toast } from "sonner";

// Replace with your actual backend API URL
const API_URL = 'https://api.karangnongkofarm.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Your session has expired. Please login again.');
    }
    
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  // Login method
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout method
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },
  
  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
  
  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

// Goat service
export const goatService = {
  // Get all goats
  getGoats: async (filters = {}) => {
    try {
      const response = await api.get('/goats', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a goat by ID
  getGoat: async (id: string) => {
    try {
      const response = await api.get(`/goats/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new goat
  createGoat: async (goatData: any) => {
    try {
      const response = await api.post('/goats', goatData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update a goat
  updateGoat: async (id: string, goatData: any) => {
    try {
      const response = await api.put(`/goats/${id}`, goatData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete a goat
  deleteGoat: async (id: string) => {
    try {
      const response = await api.delete(`/goats/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get goat stats
  getGoatStats: async () => {
    try {
      const response = await api.get('/goats/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Feeding log service
export const feedingService = {
  // Get feeding logs
  getFeedingLogs: async (filters = {}) => {
    try {
      const response = await api.get('/feed-logs', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a feeding log
  createFeedingLog: async (logData: any) => {
    try {
      const response = await api.post('/feed-logs', logData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update a feeding log
  updateFeedingLog: async (id: string, logData: any) => {
    try {
      const response = await api.put(`/feed-logs/${id}`, logData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete a feeding log
  deleteFeedingLog: async (id: string) => {
    try {
      const response = await api.delete(`/feed-logs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
