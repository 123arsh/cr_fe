import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ReviewForm from './ReviewForm';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">CarRental</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium car rental services. Experience luxury and comfort with our extensive fleet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="http://localhost:5174/admin/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Admin Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Car Street, Auto City</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@carrental.com</li>
            </ul>
          </div>

          {/* Review Form */}
          <div>
            <ReviewForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {/* Admin link removed since admin is on a separate port */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 