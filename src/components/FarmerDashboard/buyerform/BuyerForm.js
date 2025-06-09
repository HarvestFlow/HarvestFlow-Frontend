import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const products = ['Wheat', 'Barley'];
const paymentTermsOptions = ['Net 30', 'Net 60', 'Advance', 'COD', 'Other'];
const currencies = ['USD', 'EUR', 'GBP', 'CNY', 'INR', 'Other'];
const API_URL = 'http://localhost:5000';
const COUNTRIES_API = 'https://restcountries.com/v3.1/all';

const BuyerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: {
      name: '',
      registrationNumber: 'N/A',
      address: {
        street: 'N/A',
        city: 'N/A',
        country: '',
        postalCode: 'N/A',
      },
      contactEmail: '',
      contactPhone: 'N/A',
    },
    productCategory: 'Wheat', // Default to a valid value
    productNeeded: 'Wheat', // Default to a valid value
    quantityDesired: { value: '', unit: 'tons' },
    pricePerUnit: { value: '', currency: 'USD' }, // Default to a valid currency
    paymentTerms: 'Other',
    deliveryLocation: '',
    preferredSuppliersFrom: [],
    productSpecifications: '',
    contactName: '',
    verifiedStatus: 'NOT_VERIFIED',
    offerEndDate: '',
    userId: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); // Track field-specific errors
  const [currentStep, setCurrentStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await axios.get(COUNTRIES_API);
        const countryList = response.data.map((country) => country.name.common).sort();
        setCountries(countryList);
      } catch (error) {
        setCountriesError('Failed to load countries. Please try again later.');
        setCountries(['Egypt', 'United States', 'India', 'China', 'Brazil']);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validateFormData = () => {
    const errors = {};

    if (!formData.title || formData.title.length < 3 || formData.title.length > 100) {
      errors.title = 'Title is required and must be 3-100 characters long.';
    }
    if (!formData.company.name || formData.company.name.length < 2 || formData.company.name.length > 100) {
      errors.companyName = 'Company name is required and must be 2-100 characters long.';
    }
    if (!formData.company.contactEmail || !validateEmail(formData.company.contactEmail)) {
      errors.contactEmail = 'A valid company contact email is required.';
    }
    if (!formData.company.address.country) {
      errors.companyCountry = 'Company country is required.';
    }
    if (!formData.productCategory || !products.includes(formData.productCategory)) {
      errors.productCategory = 'Product category is required and must be Wheat or Barley.';
    }
    if (!formData.productNeeded || !products.includes(formData.productNeeded)) {
      errors.productNeeded = 'Product needed is required and must be Wheat or Barley.';
    }
    if (!formData.quantityDesired.value || formData.quantityDesired.value < 0) {
      errors.quantityDesired = 'Quantity desired must be a non-negative number.';
    }
    if (!formData.pricePerUnit.value || formData.pricePerUnit.value < 0) {
      errors.pricePerUnit = 'Price per unit must be a non-negative number.';
    }
    if (!formData.pricePerUnit.currency || !currencies.includes(formData.pricePerUnit.currency)) {
      errors.currency = 'Currency is required.';
    }
    if (!formData.deliveryLocation) {
      errors.deliveryLocation = 'Delivery location is required.';
    }
    if (!formData.productSpecifications || formData.productSpecifications.length < 10) {
      errors.productSpecifications = 'Product specifications are required and must be at least 10 characters long.';
    }
    if (!formData.contactName || formData.contactName.length < 2) {
      errors.contactName = 'Contact name is required and must be at least 2 characters long.';
    }
    if (!formData.offerEndDate || new Date(formData.offerEndDate) < new Date()) {
      errors.offerEndDate = 'Offer end date is required and must be in the future.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name.split('.').pop()]: '' })); // Clear error for the field

    if (name.includes('company.address.')) {
      const field = name.split('.')[2];
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          address: { ...formData.company.address, [field]: value },
        },
      });
    } else if (name.includes('company.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        company: { ...formData.company, [field]: value },
      });
    } else if (name === 'quantityDesired.value' || name === 'pricePerUnit.value') {
      if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
        const field = name.split('.')[1];
        setFormData({
          ...formData,
          [name.split('.')[0]]: { ...formData[name.split('.')[0]], [field]: value },
        });
      }
    } else if (name === 'pricePerUnit.currency') {
      setFormData({
        ...formData,
        pricePerUnit: { ...formData.pricePerUnit, currency: value },
      });
    } else if (name === 'preferredSuppliersFrom') {
      const values = value ? [value] : [];
      setFormData({ ...formData, preferredSuppliersFrom: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.title || formData.title.length < 3 || formData.title.length > 100) {
        setError('Title is required and must be 3-100 characters long.');
        setFieldErrors((prev) => ({ ...prev, title: 'Title is required and must be 3-100 characters long.' }));
        return;
      }
      if (!formData.company.name || formData.company.name.length < 2 || formData.company.name.length > 100) {
        setError('Company name is required and must be 2-100 characters long.');
        setFieldErrors((prev) => ({
          ...prev,
          companyName: 'Company name is required and must be 2-100 characters long.',
        }));
        return;
      }
      if (!formData.company.contactEmail || !validateEmail(formData.company.contactEmail)) {
        setError('A valid company contact email is required.');
        setFieldErrors((prev) => ({ ...prev, contactEmail: 'A valid company contact email is required.' }));
        return;
      }
      if (!formData.company.address.country) {
        setError('Company country is required.');
        setFieldErrors((prev) => ({ ...prev, companyCountry: 'Company country is required.' }));
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.productCategory || !products.includes(formData.productCategory)) {
        setError('Product category is required and must be Wheat or Barley.');
        setFieldErrors((prev) => ({
          ...prev,
          productCategory: 'Product category is required and must be Wheat or Barley.',
        }));
        return;
      }
      if (!formData.productNeeded || !products.includes(formData.productNeeded)) {
        setError('Product needed is required and must be Wheat or Barley.');
        setFieldErrors((prev) => ({
          ...prev,
          productNeeded: 'Product needed is required and must be Wheat or Barley.',
        }));
        return;
      }
      if (!formData.quantityDesired.value || formData.quantityDesired.value < 0) {
        setError('Quantity desired must be a non-negative number.');
        setFieldErrors((prev) => ({
          ...prev,
          quantityDesired: 'Quantity desired must be a non-negative number.',
        }));
        return;
      }
      if (!formData.pricePerUnit.value || formData.pricePerUnit.value < 0) {
        setError('Price per unit must be a non-negative number.');
        setFieldErrors((prev) => ({ ...prev, pricePerUnit: 'Price per unit must be a non-negative number.' }));
        return;
      }
      if (!formData.pricePerUnit.currency) {
        setError('Currency is required.');
        setFieldErrors((prev) => ({ ...prev, currency: 'Currency is required.' }));
        return;
      }
      if (!formData.deliveryLocation) {
        setError('Delivery location is required.');
        setFieldErrors((prev) => ({ ...prev, deliveryLocation: 'Delivery location is required.' }));
        return;
      }
      if (!formData.productSpecifications || formData.productSpecifications.length < 10) {
        setError('Product specifications are required and must be at least 10 characters long.');
        setFieldErrors((prev) => ({
          ...prev,
          productSpecifications: 'Product specifications are required and must be at least 10 characters long.',
        }));
        return;
      }
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});

    if (!isAuthenticated) {
      setError('You must be authenticated to submit the form.');
      return;
    }

    if (!validateFormData()) {
      setError('Please correct the errors in the form before submitting.');
      return;
    }

    const submitData = {
      title: formData.title,
      company: formData.company,
      productCategory: formData.productCategory,
      productNeeded: formData.productNeeded,
      quantityDesired: formData.quantityDesired,
      pricePerUnit: formData.pricePerUnit,
      paymentTerms: formData.paymentTerms,
      deliveryLocation: formData.deliveryLocation,
      preferredSuppliersFrom: formData.preferredSuppliersFrom,
      productSpecifications: formData.productSpecifications,
      contactName: formData.contactName,
      verifiedStatus: formData.verifiedStatus,
      offerEndDate: formData.offerEndDate || undefined,
      userId: formData.userId,
    };

    try {
      const response = await axios.post(`${API_URL}/farmerform/buyer`, submitData);
      setSuccess('Form submitted successfully!');
      setFormData({
        title: '',
        company: {
          name: '',
          registrationNumber: 'N/A',
          address: { street: 'N/A', city: 'N/A', country: '', postalCode: 'N/A' },
          contactEmail: '',
          contactPhone: 'N/A',
        },
        productCategory: 'Wheat',
        productNeeded: 'Wheat',
        quantityDesired: { value: '', unit: 'tons' },
        pricePerUnit: { value: '', currency: 'USD' },
        paymentTerms: 'Other',
        deliveryLocation: '',
        preferredSuppliersFrom: [],
        productSpecifications: '',
        contactName: '',
        verifiedStatus: 'NOT_VERIFIED',
        offerEndDate: '',
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
          Buyer Request Form
        </h1>
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${currentStep >= index + 1 ? 'text-green-600' : 'text-gray-400'}`}
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
            role="alert"
            aria-live="assertive"
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
            role="alert"
            aria-live="polite"
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
            role="alert"
            aria-live="assertive"
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
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.title ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.title ? 'title-error' : undefined}
                  />
                  {fieldErrors.title && (
                    <p id="title-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.title}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="company-name">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    name="company.name"
                    value={formData.company.name}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.companyName ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.companyName ? 'company-name-error' : undefined}
                  />
                  {fieldErrors.companyName && (
                    <p id="company-name-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.companyName}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="registration-number">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="registration-number"
                    name="company.registrationNumber"
                    value={formData.company.registrationNumber}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="contact-email">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="company.contactEmail"
                    value={formData.company.contactEmail}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.contactEmail ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.contactEmail ? 'contact-email-error' : undefined}
                  />
                  {fieldErrors.contactEmail && (
                    <p id="contact-email-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.contactEmail}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="contact-phone">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    id="contact-phone"
                    name="company.contactPhone"
                    value={formData.company.contactPhone}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="street">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="company.address.street"
                    value={formData.company.address.street}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="company.address.city"
                    value={formData.company.address.city}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  />
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="company-country">
                    Country
                  </label>
                  <select
                    id="company-country"
                    name="company.address.country"
                    value={formData.company.address.country}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.companyCountry ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    disabled={isLoadingCountries}
                    aria-describedby={fieldErrors.companyCountry ? 'company-country-error' : undefined}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {isLoadingCountries && <p className="text-sm text-green-600 mt-1">Loading countries...</p>}
                  {fieldErrors.companyCountry && (
                    <p id="company-country-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.companyCountry}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="postal-code">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal-code"
                    name="company.address.postalCode"
                    value={formData.company.address.postalCode}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
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
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="product-category">
                    Product Category
                  </label>
                  <select
                    id="product-category"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.productCategory ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.productCategory ? 'product-category-error' : undefined}
                  >
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.productCategory && (
                    <p id="product-category-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.productCategory}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="product-needed">
                    Product Needed
                  </label>
                  <select
                    id="product-needed"
                    name="productNeeded"
                    value={formData.productNeeded}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.productNeeded ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.productNeeded ? 'product-needed-error' : undefined}
                  >
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.productNeeded && (
                    <p id="product-needed-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.productNeeded}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="quantity-desired">
                    Quantity Desired (tons)
                  </label>
                  <input
                    type="number"
                    id="quantity-desired"
                    name="quantityDesired.value"
                    value={formData.quantityDesired.value}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.quantityDesired ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    min="0"
                    aria-describedby={fieldErrors.quantityDesired ? 'quantity-desired-error' : undefined}
                  />
                  {fieldErrors.quantityDesired && (
                    <p id="quantity-desired-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.quantityDesired}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="price-per-unit">
                    Price Per Unit
                  </label>
                  <input
                    type="number"
                    id="price-per-unit"
                    name="pricePerUnit.value"
                    value={formData.pricePerUnit.value}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.pricePerUnit ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    min="0"
                    aria-describedby={fieldErrors.pricePerUnit ? 'price-per-unit-error' : undefined}
                  />
                  {fieldErrors.pricePerUnit && (
                    <p id="price-per-unit-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.pricePerUnit}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="pricePerUnit.currency"
                    value={formData.pricePerUnit.currency}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.currency ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.currency ? 'currency-error' : undefined}
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.currency && (
                    <p id="currency-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.currency}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="payment-terms">
                    Payment Terms
                  </label>
                  <select
                    id="payment-terms"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  >
                    <option value="Other">Select Payment Terms</option>
                    {paymentTermsOptions.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="delivery-location">
                    Delivery Location
                  </label>
                  <select
                    id="delivery-location"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.deliveryLocation ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    disabled={isLoadingCountries}
                    aria-describedby={fieldErrors.deliveryLocation ? 'delivery-location-error' : undefined}
                  >
                    <option value="">Select Delivery Location</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {isLoadingCountries && <p className="text-sm text-green-600 mt-1">Loading countries...</p>}
                  {fieldErrors.deliveryLocation && (
                    <p id="delivery-location-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.deliveryLocation}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label
                    className="block text-sm font-medium text-green-700 mb-2"
                    htmlFor="preferred-suppliers-from"
                  >
                    Preferred Suppliers From
                  </label>
                  <select
                    id="preferred-suppliers-from"
                    name="preferredSuppliersFrom"
                    value={formData.preferredSuppliersFrom[0] || ''}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="product-specifications">
                    Product Specifications
                  </label>
                  <textarea
                    id="product-specifications"
                    name="productSpecifications"
                    value={formData.productSpecifications}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.productSpecifications ? 'border-red-500' : 'border-green-300'
                    }`}
                    rows="4"
                    required
                    aria-describedby={fieldErrors.productSpecifications ? 'product-specifications-error' : undefined}
                  />
                  {fieldErrors.productSpecifications && (
                    <p id="product-specifications-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.productSpecifications}
                    </p>
                  )}
                </motion.div>
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
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="contact-name">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.contactName ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.contactName ? 'contact-name-error' : undefined}
                  />
                  {fieldErrors.contactName && (
                    <p id="contact-name-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.contactName}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="verified-status">
                    Verified Status
                  </label>
                  <select
                    id="verified-status"
                    name="verifiedStatus"
                    value={formData.verifiedStatus}
                    onChange={handleChange}
                    className="block w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="NOT_VERIFIED">NOT VERIFIED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover">
                  <label className="block text-sm font-medium text-green-700 mb-2" htmlFor="offer-end-date">
                    Offer End Date
                  </label>
                  <input
                    type="date"
                    id="offer-end-date"
                    name="offerEndDate"
                    value={formData.offerEndDate}
                    onChange={handleChange}
                    min={today}
                    className={`block w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-green-50/50 transition-all ${
                      fieldErrors.offerEndDate ? 'border-red-500' : 'border-green-300'
                    }`}
                    required
                    aria-describedby={fieldErrors.offerEndDate ? 'offer-end-date-error' : undefined}
                  />
                  {fieldErrors.offerEndDate && (
                    <p id="offer-end-date-error" className="text-red-600 text-sm mt-1" role="alert">
                      {fieldErrors.offerEndDate}
                    </p>
                  )}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

export default BuyerForm;