import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCar, FaShieldAlt, FaUserCheck, FaCreditCard } from 'react-icons/fa';
import { getErrorDetails } from '../../utils/errorHandler';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmits = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:7700/login', 
                {
                    email,
                    password
                },
                {
                    withCredentials: true,
                    timeout: 10000 // 10 second timeout
                }
            );
            
            if(response.status === 200 || response.status === 201){
                // Set user data in AuthContext
                login(response.data.user);
                // Clear any existing errors
                setError('');
                navigate('/', { replace: true });
            }
        } catch (err) {
            const errorDetails = getErrorDetails(err);
            setError(errorDetails.message);
        } finally {
            setIsLoading(false);
        }
    }

    const features = [
        {
            icon: <FaCar className="text-blue-500 text-2xl" />,
            title: "Premium Fleet",
            description: "Access to luxury and premium vehicles"
        },
        {
            icon: <FaShieldAlt className="text-green-500 text-2xl" />,
            title: "Secure Booking",
            description: "Safe and secure payment process"
        },
        {
            icon: <FaUserCheck className="text-purple-500 text-2xl" />,
            title: "Verified Users",
            description: "Trusted community of drivers"
        },
        {
            icon: <FaCreditCard className="text-orange-500 text-2xl" />,
            title: "Flexible Plans",
            description: "Choose from various rental options"
        }
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white'>
            <div className='container mx-auto px-4 py-8'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
                    {/* Left Section - Branding */}
                    <div className='w-full md:w-1/2 text-center md:text-left'>
                        <div className='space-y-8'>
                            <div className='space-y-4'>
                                <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>
                                    Welcome Back to Car Rental
                                </h1>
                                <p className='text-lg text-gray-600'>
                                    Log in to access your account and continue your journey.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className='grid grid-cols-2 gap-6 mt-8'>
                                {features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
                                    >
                                        <div className='flex items-center gap-3 mb-2'>
                                            {feature.icon}
                                            <h3 className='font-semibold text-gray-800'>{feature.title}</h3>
                                        </div>
                                        <p className='text-sm text-gray-600'>{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Badges */}
                            <div className='mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100'>
                                <div className='flex flex-wrap justify-center md:justify-start gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                        <span className='text-sm text-gray-600'>24/7 Support</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                        <span className='text-sm text-gray-600'>Secure Payments</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                        <span className='text-sm text-gray-600'>Verified Users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Login Form */}
                    <div className='w-full md:w-1/2 max-w-md'>
                        {error && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
                                {error}
                            </div>
                        )}
                        <form className='bg-white rounded-2xl shadow-xl p-8 space-y-6' onSubmit={handleSubmits}>
                            <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Login</h2>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                <input 
                                    value={email} 
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    type='email' 
                                    placeholder='example@gmail.com'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                                <div className='relative'>
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                        value={password} 
                                        onChange={(e)=>{setPassword(e.target.value)}} 
                                        placeholder='Enter Password'
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2'
                                    >
                                        <img 
                                            src={showPassword ? '/images/visible.png' : '/images/hide.png'} 
                                            className='h-5 w-5'
                                            alt={showPassword ? 'Hide Password' : 'Show Password'}
                                        />
                                    </button>
                                </div>
                            </div>
                            <button 
                                type='submit' 
                                className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Logging in...
                                    </div>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <p className='text-center text-gray-600'>
                                Don't have an account?{' '}
                                <Link to='/signup' className='text-blue-600 hover:text-blue-800 font-medium'>
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;