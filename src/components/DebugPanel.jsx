import React, { useState } from 'react';
import { API_CONFIG } from '../config/api';
import { testApiConnection, checkUserSession } from '../utils/apiTest';

const DebugPanel = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const runTests = async () => {
    setDebugInfo({ loading: true });
    
    try {
      // Test API connection
      await testApiConnection();
      
      // Test user session
      const sessionResult = await checkUserSession();
      
      setDebugInfo({
        loading: false,
        apiUrl: API_CONFIG.BASE_URL,
        session: sessionResult,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setDebugInfo({
        loading: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (!import.meta.env.DEV) {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
      >
        {isVisible ? 'Hide' : 'Show'} Debug
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-2">Debug Panel</h3>
          
          <button
            onClick={runTests}
            disabled={debugInfo.loading}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm mb-3 hover:bg-green-700 disabled:opacity-50"
          >
            {debugInfo.loading ? 'Running...' : 'Run Tests'}
          </button>
          
          {debugInfo.loading && (
            <div className="text-sm text-gray-600">Running API tests...</div>
          )}
          
          {debugInfo.error && (
            <div className="text-sm text-red-600 mb-2">
              Error: {debugInfo.error}
            </div>
          )}
          
          {debugInfo.apiUrl && (
            <div className="text-sm mb-2">
              <strong>API URL:</strong> {debugInfo.apiUrl}
            </div>
          )}
          
          {debugInfo.session && (
            <div className="text-sm mb-2">
              <strong>Session:</strong>
              <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-x-auto">
                {JSON.stringify(debugInfo.session, null, 2)}
              </pre>
            </div>
          )}
          
          {debugInfo.timestamp && (
            <div className="text-xs text-gray-500">
              Last updated: {debugInfo.timestamp}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
