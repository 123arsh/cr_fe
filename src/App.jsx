import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Hero from './components/hero';
import BrowseCars from './components/navigation/lists';
import About from './components/navigation/About';
import HelpAndSupport from './components/details/help&support';
import EnterDetails from './components/details/enterdetail';
import Policy from './components/details/policy';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from './components/subComponents/navigation';
import Footer from './components/subComponents/Footer';
import Reviews from './components/subComponents/Reviews';
import MyRequests from './components/navigation/MyRequests';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Setup axios interceptor for handling 401 responses (expired token)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token has expired
          toast.error('Session expired. Please login again.');
          navigate('/login', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <>
      {!isAuthPage && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/policy" element={<Policy />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <>
              <Hero />
              <Reviews />
            </>
          </ProtectedRoute>
        } />
        <Route path="/browse" element={
          <ProtectedRoute>
            <BrowseCars />
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/help&support" element={
          <ProtectedRoute>
            <HelpAndSupport />
          </ProtectedRoute>
        } />
        <Route path="/enter-details" element={
          <ProtectedRoute>
            <EnterDetails />
          </ProtectedRoute>
        } />
        <Route path="/my-requests" element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        } />

        {/* Catch all route - redirect to signup */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
      {!isAuthPage && <Footer />}
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;