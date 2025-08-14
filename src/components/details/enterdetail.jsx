import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import axios from 'axios';

const Enterdetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get('carId');
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    drivingLicense: null,
    aadharCard: null,
    pickupDate: '',
    returnDate: '',
    policyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [policyRead, setPolicyRead] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    drivingLicense: { uploaded: false, error: null },
    aadharCard: { uploaded: false, error: null }
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [adminComment, setAdminComment] = useState('');

  // Fetch car info if carId is present
  useEffect(() => {
    if (carId) {
      axios.get(`http://localhost:7700/car/${carId}`)
        .then(res => setCar(res.data.car))
        .catch(() => setCar(null));
    }
  }, [carId]);

  // Fetch latest verification status after submitSuccess
  useEffect(() => {
    if (submitSuccess && formData.email) {
      axios.get('http://localhost:7700/detail/detail')
        .then(res => {
          const all = res.data.detail;
          const userDetail = all.find(d => d.email === formData.email);
          if (userDetail) {
            setVerificationStatus(userDetail.verificationStatus);
            setAdminComment(userDetail.adminComment);
          }
        })
        .catch(() => {});
    }
  }, [submitSuccess, formData.email]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { uploaded: false, error: 'Please upload a valid image or PDF file' }
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { uploaded: false, error: 'File size should be less than 5MB' }
      }));
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadStatus(prev => ({
        ...prev,
        [type]: { uploaded: true, error: null }
      }));
      setFormData(prev => ({
        ...prev,
        [type]: file
      }));
    } catch (error) {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { uploaded: false, error: 'Upload failed. Please try again.' }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.drivingLicense) newErrors.drivingLicense = 'Driving license is required';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar card is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
    if (!formData.policyAccepted) newErrors.policyAccepted = 'Please accept the policy';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Prepare form data for backend
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (carId) data.append('carId', carId);
    try {
      await axios.post('http://localhost:7700/api/buycar', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitSuccess(false);
      alert('Failed to submit details. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'>
        <div className='px-8 py-6 border-b border-gray-200'>
          <h2 className='text-3xl font-bold text-gray-900 text-center'>Enter Your Details</h2>
          <p className='mt-2 text-center text-gray-600'>Please provide your information to proceed with the car rental</p>
          {car && (
            <div className='mt-6 flex flex-col md:flex-row items-center gap-6 justify-center bg-blue-50 rounded-xl p-4'>
              <img src={`http://localhost:7700${car.image}`} alt={car.name} className='w-32 h-20 object-contain rounded-lg shadow' />
              <div>
                <h3 className='text-xl font-semibold text-blue-900'>{car.name}</h3>
                <p className='text-gray-700'>Type: {car.catagory}</p>
                <p className='text-gray-700'>Fuel: {car.fuel}</p>
                <p className='text-gray-700'>Price: ₹{car.price}</p>
              </div>
            </div>
          )}
          {carId && !car && (
            <div className='mt-4 text-center text-red-600'>Car details not found.</div>
          )}
          {submitSuccess && (
            <div className='mt-4 text-center text-green-600 font-semibold'>Your details have been submitted! Our team will contact you soon.</div>
          )}
          {verificationStatus && (
            <div className={`mt-4 text-center font-semibold ${verificationStatus === 'approved' ? 'text-green-600' : verificationStatus === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
              Document Status: {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
              {adminComment && <div className='mt-1 text-sm text-gray-700'>Admin comment: {adminComment}</div>}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className='p-8'>
          <div className='space-y-8'>
            {/* Personal Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder='Enter your first name'
                  />
                  {errors.firstName && <p className='mt-1 text-sm text-red-600'>{errors.firstName}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder='Enter your last name'
                  />
                  {errors.lastName && <p className='mt-1 text-sm text-red-600'>{errors.lastName}</p>}
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder='+91 00000 00000'
                  />
                  {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder='example@gmail.com'
                  />
                  {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className='space-y-6'>
              <h3 className='text-lg font-medium text-gray-900'>Required Documents</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Driving License</label>
                  <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200'>
                    <div className='space-y-1 text-center'>
                      <Upload className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='flex text-sm text-gray-600'>
                        <label className='relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500'>
                          <span>Upload a file</span>
                          <input
                            type='file'
                            name='drivingLicense'
                            onChange={(e) => handleFileUpload(e, 'drivingLicense')}
                            className='sr-only'
                            accept='.jpg,.jpeg,.png,.pdf'
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs text-gray-500'>PNG, JPG, PDF up to 5MB</p>
                    </div>
                  </div>
                  {uploadStatus.drivingLicense.uploaded && (
                    <div className='mt-2 flex items-center text-green-600'>
                      <CheckCircle2 className='h-5 w-5 mr-2' />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                  {uploadStatus.drivingLicense.error && (
                    <div className='mt-2 flex items-center text-red-600'>
                      <AlertCircle className='h-5 w-5 mr-2' />
                      <span>{uploadStatus.drivingLicense.error}</span>
                    </div>
                  )}
                  {errors.drivingLicense && <p className='mt-1 text-sm text-red-600'>{errors.drivingLicense}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Aadhar Card</label>
                  <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200'>
                    <div className='space-y-1 text-center'>
                      <Upload className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='flex text-sm text-gray-600'>
                        <label className='relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500'>
                          <span>Upload a file</span>
                          <input
                            type='file'
                            name='aadharCard'
                            onChange={(e) => handleFileUpload(e, 'aadharCard')}
                            className='sr-only'
                            accept='.jpg,.jpeg,.png,.pdf'
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs text-gray-500'>PNG, JPG, PDF up to 5MB</p>
                    </div>
                  </div>
                  {uploadStatus.aadharCard.uploaded && (
                    <div className='mt-2 flex items-center text-green-600'>
                      <CheckCircle2 className='h-5 w-5 mr-2' />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                  {uploadStatus.aadharCard.error && (
                    <div className='mt-2 flex items-center text-red-600'>
                      <AlertCircle className='h-5 w-5 mr-2' />
                      <span>{uploadStatus.aadharCard.error}</span>
                    </div>
                  )}
                  {errors.aadharCard && <p className='mt-1 text-sm text-red-600'>{errors.aadharCard}</p>}
                </div>
              </div>
            </div>

            {/* Rental Dates */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Pickup Date</label>
                <input
                  type='date'
                  name='pickupDate'
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-lg border ${errors.pickupDate ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.pickupDate && <p className='mt-1 text-sm text-red-600'>{errors.pickupDate}</p>}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Return Date</label>
                <input
                  type='date'
                  name='returnDate'
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-lg border ${errors.returnDate ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.returnDate && <p className='mt-1 text-sm text-red-600'>{errors.returnDate}</p>}
              </div>
            </div>

            {/* Policy Agreement */}
            <div className='bg-gray-50 p-6 rounded-lg'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    type='checkbox'
                    name='policyAccepted'
                    checked={formData.policyAccepted}
                    onChange={handleInputChange}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3'>
                  <label className='text-sm text-gray-700'>
                    I have read and agree to the{' '}
                    <Link to='/policy' className='text-blue-600 hover:text-blue-500 font-medium' onClick={() => setPolicyRead(true)}>
                      rental policy
                    </Link>
                  </label>
                  {errors.policyAccepted && <p className='mt-1 text-sm text-red-600'>{errors.policyAccepted}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105'
              >
                Submit Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Enterdetail;