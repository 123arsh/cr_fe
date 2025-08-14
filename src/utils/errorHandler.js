/**
 * Get detailed error message based on the error type
 * @param {Error} error - The error object from axios or other sources
 * @returns {Object} Object containing error message and type
 */
export const getErrorDetails = (error) => {
    // Network error (no response from server)
    if (error.message === 'Network Error') {
        return {
            message: 'Unable to connect to the server. Please check your internet connection.',
            type: 'network'
        };
    }

    // Server is down or not reachable
    if (!error.response) {
        return {
            message: 'Server is not responding. Please try again later.',
            type: 'server'
        };
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
        case 400:
            return {
                message: error.response.data.message || 'Invalid request. Please check your input.',
                type: 'validation'
            };
        case 401:
            return {
                message: 'Session expired. Please login again.',
                type: 'auth'
            };
        case 403:
            return {
                message: 'You do not have permission to perform this action.',
                type: 'auth'
            };
        case 404:
            return {
                message: 'Resource not found.',
                type: 'not_found'
            };
        case 422:
            return {
                message: error.response.data.message || 'Validation failed. Please check your input.',
                type: 'validation'
            };
        case 429:
            return {
                message: 'Too many requests. Please try again later.',
                type: 'rate_limit'
            };
        case 500:
            return {
                message: 'Internal server error. Please try again later.',
                type: 'server'
            };
        default:
            return {
                message: error.response?.data?.message || error.message || 'Something went wrong',
                type: 'unknown'
            };
    }
}; 