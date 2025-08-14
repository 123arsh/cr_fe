import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://localhost:7700';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 0,
    email: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 2) {
      setErrorMessage('Name must be at least 2 characters long');
      return false;
    }
    if (!formData.comment || formData.comment.length < 10) {
      setErrorMessage('Comment must be at least 10 characters long');
      return false;
    }
    if (!formData.rating || formData.rating < 1) {
      setErrorMessage('Please select a rating');
      return false;
    }
    if (formData.email && !formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      // Test server connection first
      try {
        await axios.get(`${API_URL}/api/ratings/health`);
      } catch (error) {
        throw new Error('Server is not responding. Please try again later.');
      }

      // Submit the review
      const response = await axios.post(`${API_URL}/api/ratings`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);
      setSubmitStatus('success');
      setFormData({ name: '', comment: '', rating: 0, email: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      
      if (error.response) {
        // Server responded with an error
        console.error('Server error:', error.response.data);
        setErrorMessage(error.response.data.message || 'Failed to submit review. Please try again.');
      } else if (error.request) {
        // Request was made but no response
        console.error('No response from server:', error.request);
        setErrorMessage('Server is not responding. Please try again later.');
      } else {
        // Error before making request
        console.error('Request error:', error.message);
        setErrorMessage(error.message || 'Failed to submit review. Please try again.');
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <label key={index} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => setFormData(prev => ({ ...prev, rating: ratingValue }))}
            className="hidden"
          />
          <FaStar
            className={`text-2xl transition-colors duration-200 ${
              ratingValue <= (hoveredRating || formData.rating) 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        </label>
      );
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-serif font-bold mb-6 text-white">Share Your Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            minLength={2}
            maxLength={50}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email (optional)"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
          />
        </div>
        
        <div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Your Review"
            required
            minLength={10}
            maxLength={500}
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
          />
        </div>

        <div className="flex gap-2 justify-center">
          {renderStars()}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.rating}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            isSubmitting 
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>

        {submitStatus === 'success' && (
          <p className="text-green-400 text-center animate-fade-in">Thank you for your review!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-400 text-center animate-fade-in">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm; 