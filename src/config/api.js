// API Configuration for Car Rental App
const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_URL) || 'https://cr-be-1.onrender.com';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
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
    DETAIL_SEND: '/detail/send',
    DETAIL_BY_ID: (id) => `/detail/${id}`,
    
    // API endpoints
    RATINGS: '/api/ratings',
    BUY_CAR: '/api/buycar',
    
    // Static assets
    CAR_IMAGE: (path) => `${API_BASE_URL}${path}`,
    DOC_IMAGE: (path) => `${API_BASE_URL}/docImages/${path}`,
  }
};

export default API_CONFIG; 