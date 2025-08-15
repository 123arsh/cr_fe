import { API_CONFIG } from '../config/api';

/**
 * Test API connectivity and authentication endpoints
 */
export const testApiConnection = async () => {
  console.log('🔍 Testing API connection...');
  
  try {
    // Test basic connectivity
    console.log('Testing basic connectivity...');
    const response = await fetch(API_CONFIG.BASE_URL);
    console.log('✅ Server is reachable');
    
    // Test check-auth endpoint
    console.log('Testing /check-auth endpoint...');
    const authResponse = await fetch(`${API_CONFIG.BASE_URL}/check-auth`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Auth response status:', authResponse.status);
    console.log('Auth response headers:', Object.fromEntries(authResponse.headers.entries()));
    
    if (authResponse.ok) {
      const authData = await authResponse.json();
      console.log('✅ Auth endpoint working:', authData);
    } else {
      console.log('⚠️ Auth endpoint returned:', authResponse.status, authResponse.statusText);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

/**
 * Check if user has valid session
 */
export const checkUserSession = async () => {
  try {
    const response = await API_CONFIG.CLIENT.get(API_CONFIG.ENDPOINTS.CHECK_AUTH);
    return {
      isAuthenticated: true,
      user: response.data.user,
      data: response.data
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      error: error.response?.status || 'Network error',
      message: error.response?.data?.message || error.message
    };
  }
};
