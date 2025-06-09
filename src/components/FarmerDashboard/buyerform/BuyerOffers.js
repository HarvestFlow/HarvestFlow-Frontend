import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000';

const BuyerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState(''); // Collapse both sections by default
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        if (response.status === 200) {
          setUserId(response.data._id);
        }
      } catch (error) {
        setError('You must be authenticated to view offers.');
        navigate('/404');
        console.error('Authentication error:', error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/buyer/${userId}`);
        setOffers(response.data);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch offers.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, [userId]);

  const handleDelete = async () => {
    if (!offerToDelete) return;

    try {
      await axios.delete(`${API_URL}/farmerform/buyerforms/${offerToDelete}`, { withCredentials: true });
      setOffers(offers.filter((offer) => offer._id !== offerToDelete));
      setSelectedOffer(null);
      setEditingOffer(null);
      setIsDeleteModalOpen(false);
      setSuccess('Offer deleted successfully!');
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete offer.');
    }
  };

  const openDetails = (offer) => {
    setSelectedOffer(offer);
    setActiveSection('company');
  };

  const startEditing = (offer) => {
    setEditingOffer(offer._id);
    setFormData({
      title: offer.title,
      company: {
        name: offer.company.name,
        registrationNumber: offer.company.registrationNumber,
        address: { ...offer.company.address },
        contactEmail: offer.company.contactEmail,
        contactPhone: offer.company.contactPhone,
      },
      productCategory: offer.productCategory,
      productNeeded: offer.productNeeded,
      quantityDesired: { ...offer.quantityDesired },
      pricePerUnit: { ...offer.pricePerUnit },
      paymentTerms: offer.paymentTerms,
      deliveryLocation: offer.deliveryLocation,
      preferredSuppliersFrom: [...offer.preferredSuppliersFrom],
      productSpecifications: offer.productSpecifications,
      contactName: offer.contactName,
      verifiedStatus: offer.verifiedStatus,
      offerEndDate: offer.offerEndDate ? offer.offerEndDate.split('T')[0] : '',
      userId: offer.userId,
    });
    setFormErrors({});
    setPreviewMode(false);
    setActiveSection('');
  };

  const cancelEditing = () => {
    setEditingOffer(null);
    setFormData(null);
    setFormErrors({});
    setError('');
    setPreviewMode(false);
    setActiveSection('');
  };

  const handleInputChange = (e, nestedField = null, subField = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (subField) {
        return {
          ...prev,
          [nestedField]: {
            ...prev[nestedField],
            [subField]: {
              ...prev[nestedField][subField],
              [name]: value,
            },
          },
        };
      } else if (nestedField) {
        return {
          ...prev,
          [nestedField]: {
            ...prev[nestedField],
            [name]: value,
          },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      preferredSuppliersFrom: options,
    }));
  };

  const validateFormData = () => {
    const errors = {};
    if (!formData.title || formData.title.length < 3 || formData.title.length > 100) {
      errors.title = 'Title must be 3-100 characters long';
    }
    if (!formData.company.name || formData.company.name.length < 2 || formData.company.name.length > 100) {
      errors.companyName = 'Company name must be 2-100 characters long';
    }
    if (!formData.company.contactEmail || !/^\S+@\S+\.\S+$/.test(formData.company.contactEmail)) {
      errors.contactEmail = 'Valid email is required';
    }
    if (!formData.company.address.country) {
      errors.country = 'Company country is required';
    }
    if (!formData.productCategory) {
      errors.productCategory = 'Product category is required';
    }
    if (!formData.productNeeded) {
      errors.productNeeded = 'Product needed is required';
    }
    if (!formData.quantityDesired.value || formData.quantityDesired.value < 0) {
      errors.quantityDesired = 'Quantity must be a non-negative number';
    }
    if (!formData.pricePerUnit.value || formData.pricePerUnit.value < 0) {
      errors.pricePerUnit = 'Price per unit must be a non-negative number';
    }
    if (!formData.pricePerUnit.currency) {
      errors.currency = 'Currency is required';
    }
    if (!formData.deliveryLocation) {
      errors.deliveryLocation = 'Delivery location is required';
    }
    if (!formData.productSpecifications || formData.productSpecifications.length < 10) {
      errors.productSpecifications = 'Specifications must be at least 10 characters';
    }
    if (!formData.contactName || formData.contactName.length < 2) {
      errors.contactName = 'Contact name must be at least 2 characters';
    }
    if (formData.offerEndDate && new Date(formData.offerEndDate) < new Date()) {
      errors.offerEndDate = 'Offer end date must be in the future';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      setError('Please correct the errors in the form.');
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/farmerform/buyerforms/${editingOffer}`,
        { ...formData, userId },
        { withCredentials: true }
      );
      setOffers(offers.map((offer) => (offer._id === editingOffer ? response.data.form : offer)));
      setEditingOffer(null);
      setFormData(null);
      setSuccess('Offer updated successfully!');
      setError('');
      setFormErrors({});
      setSelectedOffer(response.data.form);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update offer.');
    }
  };

  const openDeleteModal = (offerId) => {
    setOfferToDelete(offerId);
    setIsDeleteModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
            Your Buyer Offers
          </h1>
          <motion.button
            onClick={() => navigate('/dashboard/BuyerForm')}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center gap-2 shadow-md"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Offer
          </motion.button>
        </div>

        {success && (
          <motion.p
            className="text-green-600 bg-green-50 p-4 rounded-lg mb-6 text-center font-medium shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="polite"
          >
            {success}
          </motion.p>
        )}

        {error && (
          <motion.p
            className="text-red-600 bg-red-50 p-4 rounded-lg mb-6 text-center font-medium shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </motion.p>
        )}

        {isLoading ? (
          <div className="text-center text-green-600 text-lg font-medium">
            Loading offers...
            <motion.div
              className="inline-block w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium bg-white p-6 rounded-lg shadow-md">
            No offers found. Create a new offer to get started!
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-12 gap-4 bg-green-100 p-4 font-semibold text-green-800 border-b border-green-200">
              <div className="col-span-3">Offer Title</div>
              <div className="col-span-2">Product</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Price/Unit</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>

            {offers.map((offer) => (
              <motion.div
                key={offer._id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-green-50 cursor-pointer transition-colors border-b border-green-100 last:border-b-0"
                variants={rowVariants}
                onClick={() => openDetails(offer)}
                role="button"
                aria-label={`View details for ${offer.title}`}
              >
                <div className="col-span-3 font-medium text-gray-800 truncate">
                  {offer.title}
                </div>
                <div className="col-span-2 text-gray-600">{offer.productCategory}</div>
                <div className="col-span-2 text-gray-600">
                  {offer.quantityDesired.value} {offer.quantityDesired.unit}
                </div>
                <div className="col-span-2 text-gray-600">
                  {offer.pricePerUnit.value} {offer.pricePerUnit.currency}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      offer.verifiedStatus === 'VERIFIED'
                        ? 'bg-green-100 text-green-700'
                        : offer.verifiedStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {offer.verifiedStatus}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(offer);
                    }}
                    className="text-green-600 hover:text-green-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {selectedOffer && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-3xl flex flex-col max-h-[85vh]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-green-800">{selectedOffer.title}</h3>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => startEditing(selectedOffer)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => openDeleteModal(selectedOffer._id)}
                        className="p-2 text-red-600 hover:text-red-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => setSelectedOffer(null)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => setActiveSection('company')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        activeSection === 'company'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Company Details
                    </button>
                    <button
                      onClick={() => setActiveSection('offer')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        activeSection === 'offer'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Offer Details
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {activeSection === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Name:</span> {selectedOffer.company.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Email:</span>{' '}
                        {selectedOffer.company.contactEmail}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Country:</span>{' '}
                        {selectedOffer.company.address.country}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Address:</span>{' '}
                        {selectedOffer.company.address.street}, {selectedOffer.company.address.city},{' '}
                        {selectedOffer.company.address.postalCode}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Phone:</span>{' '}
                        {selectedOffer.company.contactPhone || 'N/A'}
                      </p>
                    </motion.div>
                  )}

                  {activeSection === 'offer' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Product Needed:</span>{' '}
                        {selectedOffer.productNeeded}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Delivery Location:</span>{' '}
                        {selectedOffer.deliveryLocation}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Payment Terms:</span>{' '}
                        {selectedOffer.paymentTerms || 'N/A'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Suppliers From:</span>{' '}
                        {selectedOffer.preferredSuppliersFrom.length > 0
                          ? selectedOffer.preferredSuppliersFrom.join(', ')
                          : 'Any'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Specifications:</span>
                      </p>
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {selectedOffer.productSpecifications}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Contact:</span> {selectedOffer.contactName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Offer Ends:</span>{' '}
                        {selectedOffer.offerEndDate
                          ? new Date(selectedOffer.offerEndDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editingOffer && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-xl flex flex-col max-h-[75vh] modal-content"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-green-800">
                      {previewMode ? 'Preview Offer' : 'Edit Offer'}
                    </h3>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setPreviewMode(!previewMode)}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {previewMode ? 'Edit' : 'Preview'}
                      </motion.button>
                      <motion.button
                        onClick={cancelEditing}
                        className="p-1 text-gray-600 hover:text-gray-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                  {previewMode && formData ? (
                    <div className="p-3 space-y-2">
                      <div>
                        <h4 className="text-sm font-semibold text-green-800">Company Details</h4>
                        <div className="mt-1 space-y-1 text-xs">
                          <p className="text-gray-600">
                            <span className="font-medium">Name:</span> {formData.company.name}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Email:</span>{' '}
                            {formData.company.contactEmail}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Country:</span>{' '}
                            {formData.company.address.country}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-800">Offer Details</h4>
                        <div className="mt-1 space-y-1 text-xs">
                          <p className="text-gray-600">
                            <span className="font-medium">Title:</span> {formData.title}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Product Needed:</span>{' '}
                            {formData.productNeeded}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Quantity:</span>{' '}
                            {formData.quantityDesired.value} {formData.quantityDesired.unit}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Price/Unit:</span>{' '}
                            {formData.pricePerUnit.value} {formData.pricePerUnit.currency}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                      <div
                        className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3"
                        style={{ maxHeight: 'calc(75vh - 60px - 60px)' }} // Adjust for header and footer
                      >
                        <div className="space-y-2">
                          <div className="border-b border-gray-200 pb-1">
                            <button
                              type="button"
                              onClick={() => setActiveSection(activeSection === 'company' ? '' : 'company')}
                              className="flex items-center gap-1 text-sm font-semibold text-green-800 hover:bg-gray-100 rounded px-1 py-1"
                            >
                              <svg
                                className={`w-3 h-3 transform ${activeSection === 'company' ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                              Company Details
                            </button>
                            {activeSection === 'company' && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-1 space-y-1"
                              >
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Company Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData?.company.name || ''}
                                    onChange={(e) => handleInputChange(e, 'company')}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.companyName ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.companyName && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.companyName}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Contact Email
                                  </label>
                                  <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData?.company.contactEmail || ''}
                                    onChange={(e) => handleInputChange(e, 'company')}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.contactEmail ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.contactEmail && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.contactEmail}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    name="country"
                                    value={formData?.company.address.country || ''}
                                    onChange={(e) => handleInputChange(e, 'company', 'address')}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.country ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.country && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.country}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Street
                                  </label>
                                  <input
                                    type="text"
                                    name="street"
                                    value={formData?.company.address.street || ''}
                                    onChange={(e) => handleInputChange(e, 'company', 'address')}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={formData?.company.address.city || ''}
                                    onChange={(e) => handleInputChange(e, 'company', 'address')}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Postal Code
                                  </label>
                                  <input
                                    type="text"
                                    name="postalCode"
                                    value={formData?.company.address.postalCode || ''}
                                    onChange={(e) => handleInputChange(e, 'company', 'address')}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Contact Phone
                                  </label>
                                  <input
                                    type="text"
                                    name="contactPhone"
                                    value={formData?.company.contactPhone || ''}
                                    onChange={(e) => handleInputChange(e, 'company')}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div className="border-b border-gray-200 pb-1">
                            <button
                              type="button"
                              onClick={() => setActiveSection(activeSection === 'offer' ? '' : 'offer')}
                              className="flex items-center gap-1 text-sm font-semibold text-green-800 hover:bg-gray-100 rounded px-1 py-1"
                            >
                              <svg
                                className={`w-3 h-3 transform ${activeSection === 'offer' ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                              Offer Details
                            </button>
                            {activeSection === 'offer' && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-1 space-y-1"
                              >
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    value={formData?.title || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.title ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.title && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.title}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Product Category
                                  </label>
                                  <select
                                    name="productCategory"
                                    value={formData?.productCategory || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.productCategory ? 'border-red-500' : ''
                                    }`}
                                  >
                                    <option value="">Select Category</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Barley">Barley</option>
                                  </select>
                                  {formErrors.productCategory && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.productCategory}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Product Needed
                                  </label>
                                  <select
                                    name="productNeeded"
                                    value={formData?.productNeeded || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.productNeeded ? 'border-red-500' : ''
                                    }`}
                                  >
                                    <option value="">Select Product</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Barley">Barley</option>
                                  </select>
                                  {formErrors.productNeeded && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.productNeeded}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Quantity Desired
                                  </label>
                                  <div className="flex gap-1">
                                    <input
                                      type="number"
                                      name="value"
                                      value={formData?.quantityDesired.value || ''}
                                      onChange={(e) => handleInputChange(e, 'quantityDesired')}
                                      className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                        formErrors.quantityDesired ? 'border-red-500' : ''
                                      }`}
                                    />
                                    <select
                                      name="unit"
                                      value={formData?.quantityDesired.unit || ''}
                                      onChange={(e) => handleInputChange(e, 'quantityDesired')}
                                      className="mt-0.5 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                    >
                                      <option value="tons">Tons</option>
                                      <option value="kg">Kilograms</option>
                                    </select>
                                  </div>
                                  {formErrors.quantityDesired && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.quantityDesired}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Price per Unit
                                  </label>
                                  <div className="flex gap-1">
                                    <input
                                      type="number"
                                      name="value"
                                      value={formData?.pricePerUnit.value || ''}
                                      onChange={(e) => handleInputChange(e, 'pricePerUnit')}
                                      className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                        formErrors.pricePerUnit ? 'border-red-500' : ''
                                      }`}
                                    />
                                    <select
                                      name="currency"
                                      value={formData?.pricePerUnit.currency || ''}
                                      onChange={(e) => handleInputChange(e, 'pricePerUnit')}
                                      className={`mt-0.5 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                        formErrors.currency ? 'border-red-500' : ''
                                      }`}
                                    >
                                      <option value="">Select Currency</option>
                                      <option value="USD">USD</option>
                                      <option value="EUR">EUR</option>
                                      <option value="GBP">GBP</option>
                                      <option value="CNY">CNY</option>
                                      <option value="INR">INR</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  {formErrors.pricePerUnit && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.pricePerUnit}</p>
                                  )}
                                  {formErrors.currency && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.currency}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Delivery Location
                                  </label>
                                  <input
                                    type="text"
                                    name="deliveryLocation"
                                    value={formData?.deliveryLocation || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.deliveryLocation ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.deliveryLocation && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.deliveryLocation}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Preferred Suppliers From
                                  </label>
                                  <select
                                    multiple
                                    name="preferredSuppliersFrom"
                                    value={formData?.preferredSuppliersFrom || []}
                                    onChange={handleMultiSelect}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-16"
                                  >
                                    <option value="United States">United States</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="India">India</option>
                                    <option value="China">China</option>
                                    <option value="Australia">Australia</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Product Specifications
                                  </label>
                                  <textarea
                                    name="productSpecifications"
                                    value={formData?.productSpecifications || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-14 ${
                                      formErrors.productSpecifications ? 'border-red-500' : ''
                                    }`}
                                    rows="2"
                                  />
                                  {formErrors.productSpecifications && (
                                    <p className="mt-0.5 text-xs text-red-600">
                                      {formErrors.productSpecifications}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Contact Name
                                  </label>
                                  <input
                                    type="text"
                                    name="contactName"
                                    value={formData?.contactName || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.contactName ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.contactName && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.contactName}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Offer End Date
                                  </label>
                                  <input
                                    type="date"
                                    name="offerEndDate"
                                    value={formData?.offerEndDate || ''}
                                    onChange={handleInputChange}
                                    className={`mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7 ${
                                      formErrors.offerEndDate ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {formErrors.offerEndDate && (
                                    <p className="mt-0.5 text-xs text-red-600">{formErrors.offerEndDate}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700">
                                    Verified Status
                                  </label>
                                  <select
                                    name="verifiedStatus"
                                    value={formData?.verifiedStatus || ''}
                                    onChange={handleInputChange}
                                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs h-7"
                                  >
                                    <option value="NOT_VERIFIED">Not Verified</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="VERIFIED">Verified</option>
                                  </select>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="sticky bottom-0 bg-white z-10 p-3 border-t border-gray-200 shadow-sm">
                        <div className="flex gap-2 justify-end">
                          <motion.button
                            type="submit"
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition flex items-center gap-1 text-xs"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CheckIcon className="h-3 w-3" />
                            Save
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={cancelEditing}
                            className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition flex items-center gap-1 text-xs"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XMarkIcon className="h-3 w-3" />
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDeleteModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-md flex flex-col max-h-[85vh]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-green-800">Confirm Deletion</h3>
                    <motion.button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete this offer? This action cannot be undone.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <motion.button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition flex items-center gap-1 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </motion.button>
                    <motion.button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition flex items-center gap-1 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyerOffers;