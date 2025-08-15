import axios from 'axios';

// API Configuration for Car Rental App
const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_URL) || 'https://cr-be-1.onrender.com';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      console.log('Unauthorized request - user may need to login');
      // You could redirect to login here if needed
    }
    return Promise.reject(error);
  }
);

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  CLIENT: apiClient,
  ENDPOINTS: {
    // Authentication endpoints
    LOGIN: '/login',
    SIGNUP: '/signup',
    LOGOUT: '/logout',
    CHECK_AUTH: '/check-auth',
    
    // Car management endpoints
    CAR_LIST: '/car/list',
    CAR_DETAIL: (id) => `/car/${id}`,
    
    // Booking and details endpoints
    DETAIL_LIST: '/detail/detail',
    DETAIL_BY_ID: (id) => `/detail/${id}`,
    DETAIL_SEND: '/detail/send',
    
    // API endpoints
    RATINGS: '/api/ratings',
    BUY_CAR: '/api/buycar',
    
    // Static assets
    CAR_IMAGE: (path) => `${API_BASE_URL}${path}`,
    DOC_IMAGE: (path) => `${API_BASE_URL}/docImages/${path}`,
  }
};

export default API_CONFIG; 