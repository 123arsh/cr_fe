import Button from './subComponents/button';
import FeturedCars from './subComponents/feturedCars';
import HowItWork from './subComponents/HowItWork';
import { FaCar, FaClock, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[70vh] px-4 text-center py-16">
        <div className="max-w-6xl mx-auto">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 relative">
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium animate-fade-in">
                  Premium Car Rental Service
                </span>
                <h1 className="text-4xl sm:text-7xl font-bold font-serif text-gray-900 leading-tight animate-fade-in">
                  Drive Your Dream Today
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
                  Experience luxury and comfort with our premium car rental service. Choose from our extensive fleet of vehicles.
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <img
                  src="/images/car.png"
                  alt="Spinning Car"
                  className="h-[120px] sm:h-[180px] custom-spin hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Floating Stats */}
        <div className="h-8  mt-[100px]" />
        <div className="absolute -bottom-14 sm:-bottom-20 left-1/2 transform -translate-x-1/2 flex gap-50">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 w-[300px] min-w-[160px] flex flex-col items-center">
            <FaCar className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-700 font-semibold">Cars Available</p>
            <span className="text-xs text-gray-400">Wide range of models</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 w-[300px] min-w-[160px] flex flex-col items-center">
            <FaClock className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-700 font-semibold">Service & Support</p>
            <span className="text-xs text-gray-400">Always here for you</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 w-[300px] min-w-[160px] flex flex-col items-center">
            <FaStar className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-blue-600">100%</h3>
            <p className="text-gray-700 font-semibold">Satisfaction</p>
            <span className="text-xs text-gray-400">Top-rated by customers</span>
          </div>
        </div>
      </div>

      {/* Featured Cars */}
      <div className="mt-[140px] sm:mt-[200px]">
        <FeturedCars />
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <HowItWork />
      </div>
    </div>
  );
};

export default Hero;
