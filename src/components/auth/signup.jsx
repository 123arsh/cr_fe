import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FaCar, FaShieldAlt, FaUserCheck, FaCreditCard } from 'react-icons/fa';
import { getErrorDetails } from '../../utils/errorHandler';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:7700/signup', 
                {
                    firstName,
                    lastName,
                    phNumber,
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
                // Navigate to home page
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
                                    Welcome to Car Rental
                                </h1>
                                <p className='text-lg text-gray-600'>
                                    Join our community of car enthusiasts and start your journey today.
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

                    {/* Right Section - Form */}
                    <div className='w-full md:w-1/2 max-w-md'>
                        {error && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSignup} className='bg-white rounded-2xl shadow-xl p-8 space-y-6'>
                            <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Create Account</h2>
                            
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
                                    <input 
                                        type='text' 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder='John'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                                    <input 
                                        type='text' 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder='Doe'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                <input 
                                    type='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    placeholder='john@example.com'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                                <input 
                                    type='tel' 
                                    value={phNumber}
                                    onChange={(e) => setPhNumber(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    placeholder='+91 00000 00000'
                                    required
                                    maxLength={10}
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                                <div className='relative'>
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder='Create a strong password'
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
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <p className='text-center text-gray-600'>
                                Already have an account?{' '}
                                <Link to='/login' className='text-blue-600 hover:text-blue-800 font-medium'>
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;