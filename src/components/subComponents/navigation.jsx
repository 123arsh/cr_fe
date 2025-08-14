import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, login } = useAuth();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:7700/check-auth', {
          withCredentials: true
        });
        if (response.data.user) {
          login(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [login]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7700/logout', {}, {
        withCredentials: true
      });
      navigate('/signup');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (isAuthenticated && user) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <div className='w-full shadow-2xl shadow-grey-500/20 bg-white sticky top-0 z-50'>
      {/* Mobile Header */}
      <div className='flex items-center justify-between p-4 md:hidden'>
        <Link to='/' className='flex items-center group'>
          <div className='flex items-center relative'>
            <div className='relative'>
              <span className='text-2xl font-black tracking-wider text-gray-900'>
                Car
              </span>
              <div className='absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
            </div>
            <span className='text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x'>
              Rental
            </span>
            <div className='ml-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 animate-pulse'></div>
          </div>
        </Link>
        <button 
          onClick={toggleMobileMenu}
          className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className='hidden md:flex justify-between items-center px-6 py-4'>
        {/* LEFT: Logo */}
        <Link to='/' className='flex items-center group'>
          <div className='flex items-center relative'>
            <div className='relative'>
              <span className='text-2xl font-black tracking-wider text-gray-900'>
                Car
              </span>
              <div className='absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
            </div>
            <span className='text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x'>
              Rental
            </span>
            <div className='ml-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 animate-pulse'></div>
          </div>
        </Link>

        {/* RIGHT: Search Icon, Browse, About, Dropdown */}
        <div className='flex items-center gap-4'>
          {/* Search Icon */}
          {isAuthenticated && user && !showSearch && (
            <button 
              onClick={toggleSearch} 
              className='focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              <Search className='h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors duration-200' />
            </button>
          )}

          {/* Expanding Search Input */}
          {isAuthenticated && (
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showSearch ? 'w-[300px] opacity-100' : 'w-0 opacity-0'} h-[40px] border border-gray-300 rounded-full flex items-center px-3 bg-white`}>
              {showSearch && (
                <form onSubmit={handleSearch} className="w-full flex items-center">
                  <input
                    type='text'
                    placeholder='Search by Name'
                    className='w-full focus:outline-none bg-transparent'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <img src='/images/search.png' alt='search icon' className='h-5 w-5 cursor-pointer ml-2' />
                  </button>
                </form>
              )}
            </div>
          )}
          {showSearch && (
            <button 
              onClick={toggleSearch} 
              className="text-gray-500 hover:text-red-500 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              x
            </button>
          )}

          {/* Browse + About */}
          <button 
            onClick={() => handleNavigation('/browse')} 
            className='hover:underline transition-colors duration-200'
          >
            Browse Cars
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className='hover:underline transition-colors duration-200'
          >
            About
          </button>

          {/* My Requests link for authenticated users */}
          {isAuthenticated && user && (
            <button 
              onClick={() => handleNavigation('/my-requests')} 
              className='hover:underline transition-colors duration-200'
            >
              My Requests
            </button>
          )}

          {/* Auth Buttons / User Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative dropdown-container">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <span className="text-gray-700">{user.firstName}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[1000] border border-gray-200 transform transition-all duration-200 ease-in-out">
                  <button
                    onClick={() => handleNavigation('/enter-details')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Enter Details
                  </button>
                  <button
                    onClick={() => handleNavigation('/help&support')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Help & Support
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to='/login'
                className='px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
              >
                Login
              </Link>
              <Link 
                to='/signup'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className='flex flex-col gap-4 px-4 pb-4 md:hidden animate-slideDown'>
          {/* Search Input */}
          {isAuthenticated && (
            <form onSubmit={handleSearch} className='flex h-[45px] w-full border border-gray-300 rounded-xl items-center px-3'>
              <input
                type='text'
                placeholder='Search by Name'
                className='w-full focus:outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <img src='/images/search.png' alt='search icon' className='h-5 w-5 cursor-pointer ml-2' />
              </button>
            </form>
          )}

          <button 
            onClick={() => handleNavigation('/browse')} 
            className='hover:underline text-left transition-colors duration-200'
          >
            Browse Cars
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className='hover:underline text-left transition-colors duration-200'
          >
            About
          </button>

          {/* Auth Buttons / Dropdown */}
          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleNavigation('/enter-details')}
                className='text-left hover:underline transition-colors duration-200'
              >
                Enter Details
              </button>
              <button
                onClick={() => handleNavigation('/help&support')}
                className='text-left hover:underline transition-colors duration-200'
              >
                Help & Support
              </button>
              <button
                onClick={handleLogout}
                className='text-left text-red-600 hover:underline transition-colors duration-200'
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link 
                to='/login'
                className='px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-center transition-colors duration-200'
              >
                Login
              </Link>
              <Link 
                to='/signup'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors duration-200'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
