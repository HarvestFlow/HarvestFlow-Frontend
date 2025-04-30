import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample static lists for other fields
const products = ['Wheat Flour', 'Corn Flour', 'Rice', 'Barley', 'Soybeans', 'Sugar'];
const supplierRegions = ['Worldwide', 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Middle East'];

const API_URL = 'http://localhost:5000';
const COUNTRIES_API = 'https://restcountries.com/v3.1/all';

const FarmerForm = () => {
  const [formData, setFormData] = useState({
    title: 'Wanted: Wheat Flour',
    country: 'Egypt',
    quantityRequired: '1,000 - 3,000 Tons',
    paymentTerms: 'To be discussed with suppliers',
    destination: 'Egypt',
    lookingForSuppliersFrom: 'Worldwide',
    product: 'Wheat Flour',
    proteinMin: '12',
    glutenMin: '27',
    qtyMonthly: '1000-3000 tons monthly',
    contactName: 'Amro',
    verifiedStatus: 'VERIFIED',
    availabilityEndDate: '',
    userId: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState('');
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setFormData((prev) => ({ ...prev, userId: response.data._id }));
          if (!response.data.isActivated) console.log('Account not activated');
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/404');
        console.error('Authentication error:', error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await axios.get(COUNTRIES_API);
        const countryList = response.data
          .map((country) => country.name.common)
          .sort()
          .concat('Worldwide');
        setCountries(countryList);
      } catch (error) {
        setCountriesError('Failed to load countries. Please try again later.');
        setCountries(['Egypt', 'United States', 'India', 'China', 'Brazil', 'Worldwide']);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'proteinMin' || name === 'glutenMin') {
      if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setError('You must be authenticated to submit the form.');
      return;
    }

    const productDescription = `Product: ${formData.product}\nSpecifications:\nProtein Min ${formData.proteinMin}%\nGluten Min ${formData.glutenMin}%\nQty: ${formData.qtyMonthly}`;

    const submitData = {
      title: formData.title,
      country: formData.country,
      quantityRequired: formData.quantityRequired,
      paymentTerms: formData.paymentTerms,
      destination: formData.destination,
      lookingForSuppliersFrom: formData.lookingForSuppliersFrom,
      productDescription,
      contactName: formData.contactName,
      verifiedStatus: formData.verifiedStatus,
      availabilityEndDate: formData.availabilityEndDate || undefined,
      userId: formData.userId,
    };

    try {
      const response = await axios.post(`${API_URL}/farmerform`, submitData);
      setSuccess('Form submitted successfully!');
      setFormData({
        title: '',
        country: '',
        quantityRequired: '',
        paymentTerms: '',
        destination: '',
        lookingForSuppliersFrom: '',
        product: '',
        proteinMin: '',
        glutenMin: '',
        qtyMonthly: '',
        contactName: '',
        verifiedStatus: 'NOT_VERIFIED',
        availabilityEndDate: '',
        userId: formData.userId,
      });
      setCurrentStep(1);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit form.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    focus: { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.3)' },
  };

  const steps = ['General Info', 'Product Details', 'Contact & Verification'];
  const progressWidth = `${(currentStep / steps.length) * 100}%`;

  // Get today's date for the min attribute of the date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
          <path
            d="M0 200C100 150, 300 50, 500 200S900 350, 1000 500C900 650, 700 850, 500 800S100 650, 0 500Z"
            fill="#10b981"
          />
        </svg>
      </div>
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl relative z-10 border border-green-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-green-800 tracking-tight">
          Farmer Supplier Form
        </h1>
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${
                  currentStep >= index + 1 ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: progressWidth }}
              initial={{ width: 0 }}
              animate={{ width: progressWidth }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        {error && (
          <motion.p
            className="text-red-600 bg-red-50 p-4 rounded-lg mb-6 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            className="text-green-600 bg-green-50 p-4 rounded-lg mb-6 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {success}
          </motion.p>
        )}
        {countriesError && (
          <motion.p
            className="text-yellow-600 bg-yellow-50 p-4 rounded-lg mb-6 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {countriesError}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentStep === 1 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">General Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    required
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    required
                    disabled={isLoadingCountries}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {isLoadingCountries && (
                    <p className="text-sm text-green-600 mt-1">Loading countries...</p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Quantity Required
                  </label>
                  <input
                    type="text"
                    name="quantityRequired"
                    value={formData.quantityRequired}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    required
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Offer Availability End Date
                  </label>
                  <input
                    type="date"
                    name="availabilityEndDate"
                    value={formData.availabilityEndDate}
                    onChange={handleChange}
                    min={today}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Payment Terms
                  </label>
                  <textarea
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    rows="4"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Destination
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    disabled={isLoadingCountries}
                  >
                    <option value="">Select Destination</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {isLoadingCountries && (
                    <p className="text-sm text-green-600 mt-1">Loading countries...</p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Looking for Suppliers From
                  </label>
                  <select
                    name="lookingForSuppliersFrom"
                    value={formData.lookingForSuppliersFrom}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  >
                    <option value="">Select Region</option>
                    {supplierRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
              <div className="mt-6 bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div variants={inputVariants} whileHover="hover">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Product
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                      required
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div variants={inputVariants} whileHover="hover">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Protein Min (%)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="proteinMin"
                        value={formData.proteinMin}
                        onChange={handleChange}
                        className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all pr-10"
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700">
                        %
                      </span>
                    </div>
                  </motion.div>
                  <motion.div variants={inputVariants} whileHover="hover">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Gluten Min (%)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="glutenMin"
                        value={formData.glutenMin}
                        onChange={handleChange}
                        className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all pr-10"
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700">
                        %
                      </span>
                    </div>
                  </motion.div>
                  <motion.div variants={inputVariants} whileHover="hover">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Quantity Monthly
                    </label>
                    <input
                      type="text"
                      name="qtyMonthly"
                      value={formData.qtyMonthly}
                      onChange={handleChange}
                      className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                      required
                    />
                  </motion.div>
                </div>
                <p className="mt-4 text-sm text-green-600">
                  Specify details like product type and quality requirements.
                </p>
              </div>
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">Contact & Verification</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                    required
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Verified Status
                  </label>
                  <select
                    name="verifiedStatus"
                    value={formData.verifiedStatus}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="NOT_VERIFIED">NOT VERIFIED</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>
          )}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <motion.button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </motion.button>
            )}
            {currentStep < 3 && (
              <motion.button
                type="button"
                onClick={handleNext}
                className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 ml-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}
            {currentStep === 3 && (
              <motion.button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center gap-2 ml-auto"
                disabled={!isAuthenticated}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submit Form
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FarmerForm;