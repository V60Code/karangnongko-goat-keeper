
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
  },
  timeout: 10000 // Adding a timeout to prevent long waiting times
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
      // For development/demo purposes - mock login when API is not available
      // This is a temporary solution until the backend API is properly set up
      if (
        (username === 'admin' && password === 'admin') ||
        (username === 'barat' && password === 'user123') ||
        (username === 'timur' && password === 'user123')
      ) {
        // Mock successful login response
        const mockUserData = {
          token: 'mock-jwt-token',
          user: {
            id: username === 'admin' ? '1' : username === 'barat' ? '2' : '3',
            username: username,
            role: username === 'admin' ? 'admin' : 'user',
            barn: username === 'admin' ? null : username === 'barat' ? 'barat' : 'timur'
          }
        };
        
        // Store mock token and user data in localStorage
        localStorage.setItem('token', mockUserData.token);
        localStorage.setItem('user', JSON.stringify(mockUserData.user));
        
        console.log('Mock login successful:', mockUserData);
        return mockUserData;
      }

      // Attempt real API login
      try {
        const response = await api.post('/login', { username, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      } catch (apiError: any) {
        console.error('API login error:', apiError);
        
        // If it's not a response error (like network error), throw our mock validation error
        if (!apiError.response) {
          // This is a network error - API might be down or unreachable
          if (
            (username === 'admin' && password === 'admin') ||
            (username === 'barat' && password === 'user123') ||
            (username === 'timur' && password === 'user123')
          ) {
            // Valid credentials but API is down - use mock data
            return this.login(username, password); // Recursive call to use the mock login
          }
        }
        
        // For wrong credentials or other API errors, rethrow
        throw apiError;
      }
    } catch (error) {
      console.error('Login error:', error);
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
