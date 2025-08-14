import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Marquee from 'react-fast-marquee';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:7700/api/ratings?page=${page}&limit=10`);
        const newReviews = response.data.ratings;
        if (newReviews.length === 0) {
          setHasMore(false);
        } else {
          setReviews((prevReviews) => {
            const ids = new Set(prevReviews.map((r) => r._id));
            const filtered = newReviews.filter((r) => !ids.has(r._id));
            return [...prevReviews, ...filtered];
          });
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page]);

  // Infinite scroll: load more when reviews are less than total
  const handleMarqueeCycle = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="w-full py-12 px-4 sm:px-10 bg-gradient-to-b from-blue-50 via-blue-100 to-purple-50 mt-24">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Customer Reviews
        </h2>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          See what our customers have to say about their experience with us.
        </p>
      </div>
      <div style={{ minHeight: 220 }}>
        <Marquee
          gradient={false}
          speed={30}
          pauseOnHover={true}
          direction="left"
          onCycleComplete={handleMarqueeCycle}
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className="min-w-[240px] max-w-xs bg-white rounded-2xl p-4 shadow-lg flex-shrink-0 h-[180px] flex flex-col justify-between mx-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{review.name}</h3>
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {loading && (
            <div className="min-w-[240px] flex items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </Marquee>
      </div>
    </div>
  );
};

export default Reviews;
