import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingCar, setBookingCar] = useState(null);
  const [bookingForm, setBookingForm] = useState({ firstName: '', lastName: '', phNumber: '', email: '', startDate: '', endDate: '', adharCard: null, drivingLicence: null });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const itemsPerPage = 5;
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7700/car/list')
      .then((res) => res.json())
      .then((data) => {
        setList(data.carsData);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible || showBooking ? 'hidden' : 'auto';
  }, [visible, showBooking]);

  useEffect(() => {
    // Fetch accepted bookings
    fetch('http://localhost:7700/detail/detail')
      .then(res => res.json())
      .then(data => {
        const accepted = (data.detail || []).filter(d => d.verificationStatus === 'approved');
        setAcceptedBookings(accepted);
      });
  }, []);

  const DisplayTheCard = (e) => {
    setVisible(e);
  };

  const HideTheCard = () => {
    setVisible(null);
  };

  const openBookingForm = (car) => {
    setBookingCar(car);
    setShowBooking(true);
    setBookingForm({ firstName: '', lastName: '', phNumber: '', email: '', startDate: '', endDate: '', adharCard: null, drivingLicence: null });
    setBookingSuccess('');
    setBookingError('');
  };

  const closeBookingForm = () => {
    setShowBooking(false);
    setBookingCar(null);
  };

  const handleBookingChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setBookingForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setBookingForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingSuccess('');
    setBookingError('');
    try {
      const data = new FormData();
      Object.entries(bookingForm).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('carId', bookingCar._id);
      const res = await fetch('http://localhost:7700/detail/send', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setBookingSuccess('Booking request submitted! Await admin approval.');
        setBookingForm({ firstName: '', lastName: '', phNumber: '', email: '', startDate: '', endDate: '', adharCard: null, drivingLicence: null });
      } else {
        setBookingError('Failed to submit booking. Please try again.');
      }
    } catch {
      setBookingError('Failed to submit booking. Please try again.');
    }
    setBookingLoading(false);
  };

  // Filter cars based on search query
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // Helper for fuzzy match (Levenshtein distance)
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  const filteredList = searchQuery
    ? list.filter(car => {
        const name = car.name.toLowerCase();
        // Partial match anywhere
        if (name.includes(searchQuery)) return true;
        // Starts with (prefix)
        if (name.startsWith(searchQuery)) return true;
        // Fuzzy match for queries >= 2 chars
        if (searchQuery.length >= 2 && levenshtein(name, searchQuery) <= 1) return true;
        return false;
      })
    : list;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedList = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Helper to check if a car is unavailable for the current date
  const isCarUnavailable = (carId) => {
    const today = new Date();
    return acceptedBookings.some(b => b.carId === carId && new Date(b.startDate) <= today && today <= new Date(b.endDate));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-3xl text-red-700">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 py-10 gap-10 bg-[#f6f6f6] relative">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="w-full max-w-5xl text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredList.length > 0 
              ? `Found ${filteredList.length} car${filteredList.length === 1 ? '' : 's'} matching "${searchQuery}"`
              : `No cars found matching "${searchQuery}"`
            }
          </h2>
        </div>
      )}

      {/* CAR LIST */}
      <div className={`flex flex-col items-center gap-10 w-full ${visible ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {paginatedList.length > 0 ? (
          paginatedList.map((e) => (
            <div
              key={e._id}
              className="flex flex-col md:flex-row w-full max-w-5xl min-h-[400px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className='relative w-full md:w-[400px] h-[300px] bg-white flex items-center justify-center group'>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={`http://localhost:7700${e.image}`}
                  alt={e.name}
                  className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105 relative z-10"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${isCarUnavailable(e._id) ? 'bg-red-100/90 text-red-800' : 'bg-green-100/90 text-green-800'}`}>
                    {isCarUnavailable(e._id) ? 'Unavailable' : 'Available'}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm bg-blue-100/90 text-blue-800">
                    Premium
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 p-8 bg-gradient-to-br from-white to-gray-50/50">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{e.name}</h1>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-500">{e.catagory}</p>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <p className="text-gray-500">{e.fuel}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => DisplayTheCard(e)}
                      className="hidden md:flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Quick View</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm font-medium">Horsepower</p>
                      </div>
                      <p className="font-semibold text-lg">{e.hp}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm font-medium">Torque</p>
                      </div>
                      <p className="font-semibold text-lg">{e.torque} Nm</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm font-medium">Transmission</p>
                      </div>
                      <p className="font-semibold text-lg">{e.transmission}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 line-clamp-2">{e.discription}</p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={() => DisplayTheCard(e)}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Quick View</span>
                  </button>
                  <button 
                    onClick={() => openBookingForm(e)}
                    className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Car
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full max-w-5xl text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No cars found</h2>
            <p className="text-gray-600">Try adjusting your search or browse all available cars.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredList.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {visible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{visible.name}</h2>
                <button
                  onClick={HideTheCard}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-row h-[80vh] items-start gap-8 mt-12">
                {/* Left Section - Fixed */}
                <div className='w-[50%] h-full flex flex-col gap-6'>
                  <div className='bg-white rounded-2xl p-6 h-[400px] flex items-center justify-center group relative overflow-hidden shadow-lg'>
                    <img
                      src={`http://localhost:7700${visible.image}`}
                      alt={visible.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Transmission</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.transmission.toUpperCase()}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Horsepower</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.hp}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Drive Train</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.drivetrain.toUpperCase()}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Category</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.catagory.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Scrollable */}
                <div className='w-[50%] h-full overflow-y-auto pr-4'>
                  <div className='bg-white rounded-2xl p-6 shadow-lg'>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{visible.discription}</p>
                  </div>

                  <div className='mt-6 bg-white rounded-2xl p-6 shadow-lg'>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className='text-gray-500 text-sm font-medium'>Drive Train</span>
                        </div>
                        <p className='font-semibold text-gray-900'>{visible.drivetrain.toUpperCase()}</p>
                      </div>
                      <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className='text-gray-500 text-sm font-medium'>Category</span>
                        </div>
                        <p className='font-semibold text-gray-900'>{visible.catagory.toUpperCase()}</p>
                      </div>
                      <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className='text-gray-500 text-sm font-medium'>Horsepower</span>
                        </div>
                        <p className='font-semibold text-gray-900'>{visible.horsepower}</p>
                      </div>
                      <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          <span className='text-gray-500 text-sm font-medium'>Torque</span>
                        </div>
                        <p className='font-semibold text-gray-900'>{visible.torque} Nm</p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6'>
                    <button 
                      className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                      onClick={() => { setShowBooking(true); setBookingCar(visible); setBookingForm({ firstName: '', lastName: '', phNumber: '', email: '', startDate: '', endDate: '', adharCard: null, drivingLicence: null }); setBookingSuccess(''); setBookingError(''); }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Book Car
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl animate-fade-in">
            <button onClick={closeBookingForm} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center gap-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Book {bookingCar?.name}
            </h2>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input name="firstName" value={bookingForm.firstName} onChange={handleBookingChange} required className="peer input-floating" autoComplete="off" />
                  <label className="label-floating">First Name</label>
                </div>
                <div className="relative">
                  <input name="lastName" value={bookingForm.lastName} onChange={handleBookingChange} required className="peer input-floating" autoComplete="off" />
                  <label className="label-floating">Last Name</label>
                </div>
                <div className="relative md:col-span-2">
                  <input name="email" value={bookingForm.email} onChange={handleBookingChange} required className="peer input-floating" type="email" autoComplete="off" />
                  <label className="label-floating">Email</label>
                </div>
                <div className="relative">
                  <input name="phNumber" value={bookingForm.phNumber} onChange={handleBookingChange} required className="peer input-floating" autoComplete="off" />
                  <label className="label-floating">Phone Number</label>
                </div>
                <div className="relative">
                  <input name="startDate" value={bookingForm.startDate} onChange={handleBookingChange} required className="peer input-floating" type="date" autoComplete="off" />
                  <label className="label-floating">Start Date</label>
                </div>
                <div className="relative md:col-span-2">
                  <input name="endDate" value={bookingForm.endDate} onChange={handleBookingChange} required className="peer input-floating" type="date" autoComplete="off" />
                  <label className="label-floating">End Date</label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium flex items-center gap-2">Aadhar Card <span className="text-xs text-gray-400">(image/pdf)</span></label>
                  <div className="relative border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition cursor-pointer flex flex-col items-center justify-center group" onDrop={e => { e.preventDefault(); setBookingForm(prev => ({ ...prev, adharCard: e.dataTransfer.files[0] })); }} onDragOver={e => e.preventDefault()} onClick={() => document.getElementById('adharCardInput').click()}>
                    <svg className="w-7 h-7 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" /></svg>
                    <span className="text-gray-600 text-sm">Drag & drop or click to select</span>
                    <input id="adharCardInput" name="adharCard" type="file" accept="image/*,application/pdf" onChange={handleBookingChange} required className="absolute inset-0 opacity-0 cursor-pointer" tabIndex={-1} />
                    {bookingForm.adharCard && <span className="mt-2 text-xs text-blue-700">{bookingForm.adharCard.name}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium flex items-center gap-2">Driving Licence <span className="text-xs text-gray-400">(image/pdf)</span></label>
                  <div className="relative border-2 border-dashed border-green-400 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition cursor-pointer flex flex-col items-center justify-center group" onDrop={e => { e.preventDefault(); setBookingForm(prev => ({ ...prev, drivingLicence: e.dataTransfer.files[0] })); }} onDragOver={e => e.preventDefault()} onClick={() => document.getElementById('drivingLicenceInput').click()}>
                    <svg className="w-7 h-7 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" /></svg>
                    <span className="text-gray-600 text-sm">Drag & drop or click to select</span>
                    <input id="drivingLicenceInput" name="drivingLicence" type="file" accept="image/*,application/pdf" onChange={handleBookingChange} required className="absolute inset-0 opacity-0 cursor-pointer" tabIndex={-1} />
                    {bookingForm.drivingLicence && <span className="mt-2 text-xs text-green-700">{bookingForm.drivingLicence.name}</span>}
                  </div>
                </div>
              </div>
              {bookingError && <div className="text-red-600 text-sm text-center">{bookingError}</div>}
              {bookingSuccess && <div className="text-green-600 text-sm text-center">{bookingSuccess}</div>}
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={bookingLoading}>
                {bookingLoading && <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" className="opacity-75" /></svg>}
                {bookingLoading ? 'Booking...' : 'Submit Booking Request'}
              </button>
            </form>
            <style>{`
              .input-floating {
                width: 100%;
                border: 1px solid #b0b3b8;
                border-radius: 0.5rem;
                padding: 1.25rem 1rem 0.5rem 1rem;
                font-size: 1rem;
                background: transparent;
                outline: none;
                transition: border 0.2s;
              }
              .input-floating:focus {
                border-color: #6b7280;
              }
              .label-floating {
                position: absolute;
                left: 1rem;
                top: 1.1rem;
                font-size: 1rem;
                color: #6b7280;
                background: white;
                padding: 0 0.25rem;
                pointer-events: none;
                transition: all 0.2s;
              }
              .input-floating:focus + .label-floating,
              .input-floating:not(:placeholder-shown) + .label-floating,
              textarea.input-floating:focus + .label-floating,
              textarea.input-floating:not(:placeholder-shown) + .label-floating {
                top: -0.7rem;
                left: 0.75rem;
                font-size: 0.85rem;
                color: #6b7280;
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
