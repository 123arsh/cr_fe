import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
    // Fetch all cars
    fetch('http://localhost:7700/car/list')
      .then(res => res.json())
      .then(data => setCars(data.carsData || []));
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log('Requests:', requests);
      console.log('Cars:', cars);
    }
  }, [loading, requests, cars]);

  const fetchRequests = () => {
    setLoading(true);
    fetch('http://localhost:7700/detail/detail', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setRequests(data.detail || []);
        setLoading(false);
      });
  };

  // Helper to get car details by carId
  const getCarDetails = (carId) => cars.find(car => car._id === carId);

  const handleSelectRequest = (requestId) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map(req => req._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedRequests.length) return;
    
    setIsDeleting(true);
    try {
      const deletePromises = selectedRequests.map(id => 
        fetch(`http://localhost:7700/detail/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
      );
      
      await Promise.all(deletePromises);
      setSelectedRequests([]);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting requests:', error);
    }
    setIsDeleting(false);
  };

  const handleDeleteAll = async () => {
    if (!requests.length) return;
    
    setIsDeleting(true);
    try {
      const deletePromises = requests.map(req => 
        fetch(`http://localhost:7700/detail/${req._id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
      );
      
      await Promise.all(deletePromises);
      setSelectedRequests([]);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting all requests:', error);
    }
    setIsDeleting(false);
  };

  const handleCarClick = (carId) => {
    navigate(`/list?carId=${carId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">My Booking Requests</h2>
      
      {/* Action Buttons */}
      {requests.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 justify-end">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {selectedRequests.length === requests.length ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={!selectedRequests.length || isDeleting}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedRequests.length && !isDeleting
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete Selected'}
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isDeleting
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete All'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-blue-600 font-semibold">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-600">No booking requests found.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {requests.map(req => {
            const car = getCarDetails(req.carId);
            return (
              <div key={req._id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col gap-3 animate-fade-in relative hover:shadow-2xl transition-shadow duration-300">
                {/* Checkbox */}
                <div className="absolute top-4 right-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(req._id)}
                    onChange={() => handleSelectRequest(req._id)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${req.verificationStatus === 'approved' ? 'bg-green-100 text-green-700' : req.verificationStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {req.verificationStatus === 'approved' ? 'Accepted' : req.verificationStatus === 'rejected' ? 'Rejected' : 'Pending'}
                  </span>
                  <span className="text-gray-400 text-xs">Request ID: {req._id.slice(-6)}</span>
                </div>

                {/* Car Information Section */}
                {car ? (
                  <div 
                    className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-100 cursor-pointer hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleCarClick(car._id)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCarClick(car._id); }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 bg-white rounded-lg shadow-md overflow-hidden group">
                        <img 
                          src={`http://localhost:7700${car.image}`} 
                          alt={car.name} 
                          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <button
                          type="button"
                          className="text-lg font-bold text-blue-900 group-hover:text-blue-700 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer text-left"
                          onClick={e => { e.stopPropagation(); handleCarClick(car._id); }}
                          tabIndex={-1}
                        >
                          {car.name}
                        </button>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                            <FaCar className="text-blue-500" />
                            {car.catagory}
                          </span>
                          <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                            {car.fuel}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FaInfoCircle className="text-blue-500" />
                          Click to view full details
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500">
                    Car information not available
                  </div>
                )}

                {/* Booking Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-sm">Booking Period:</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Start: {req.startDate}</span>
                    <span>End: {req.endDate}</span>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-xs mb-1">Aadhar</span>
                    <img 
                      src={`http://localhost:7700/docImages/${req.adharCard}`} 
                      alt='Aadhar' 
                      className='w-24 h-16 object-contain border-2 border-blue-200 rounded-lg shadow cursor-pointer hover:border-blue-400 transition-colors' 
                      onClick={() => setPreviewImg(`http://localhost:7700/docImages/${req.adharCard}`)} 
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-xs mb-1">License</span>
                    <img 
                      src={`http://localhost:7700/docImages/${req.drivingLicence}`} 
                      alt='License' 
                      className='w-24 h-16 object-contain border-2 border-green-200 rounded-lg shadow cursor-pointer hover:border-green-400 transition-colors' 
                      onClick={() => setPreviewImg(`http://localhost:7700/docImages/${req.drivingLicence}`)} 
                    />
                  </div>
                </div>

                {/* Admin Comment */}
                {req.adminComment && (
                  <div className={`mt-2 p-3 rounded-lg text-sm ${req.verificationStatus === 'approved' ? 'bg-green-50 text-green-800' : req.verificationStatus === 'rejected' ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'}`}>
                    <b>Admin Comment:</b> {req.adminComment}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="Preview" className="max-w-3xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white" />
        </div>
      )}
    </div>
  );
};

export default MyRequests; 