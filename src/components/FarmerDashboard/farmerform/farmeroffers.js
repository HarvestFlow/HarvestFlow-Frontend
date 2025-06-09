import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000';

const FarmerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
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
        const response = await axios.get(`${API_URL}/farmerform/farmer/${userId}`);
        // Filter out invalid offers
        const validOffers = response.data.filter(
          (offer) =>
            offer &&
            offer.quantityAvailable?.value != null &&
            offer.pricePerUnit?.value != null
        );
        setOffers(validOffers);
        if (validOffers.length < response.data.length) {
          setError('Some offers were excluded due to missing data.');
        }
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
      await axios.delete(`${API_URL}/farmerform/farmerforms/${offerToDelete}`);
      setOffers(offers.filter((offer) => offer._id !== offerToDelete));
      setSelectedOffer(null);
      setIsDeleteModalOpen(false);
      setSuccess('Offer deleted successfully!');
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete offer.');
    }
  };

  const openDetails = (offer) => {
    setSelectedOffer(offer);
  };

  const startEditing = (offer) => {
    navigate(`/dashboard/farmerform/${offer._id}`);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-800 tracking-tight">
            Your Farmer Offers
          </h1>
          <motion.button
            onClick={() => navigate('/farmingform')}
            className="bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition flex items-center gap-1.5 text-sm shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4"
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
            className="text-green-600 bg-green-50 p-3 rounded-lg mb-4 text-sm text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {success}
          </motion.p>
        )}

        {error && (
          <motion.p
            className="text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-sm text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        {isLoading ? (
          <div className="text-center text-green-600 text-sm font-medium">
            Loading offers...
            <motion.div
              className="inline-block w-5 h-5 border-3 border-green-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center text-gray-600 text-sm font-medium bg-white p-4 rounded-lg shadow-md">
            No offers found. Create a new offer to get started!
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-12 gap-3 bg-green-100 p-3 font-semibold text-green-800 text-xs border-b border-green-200">
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
                className="grid grid-cols-12 gap-3 p-3 hover:bg-green-50 cursor-pointer transition-colors border-b border-green-100 last:border-b-0 text-xs"
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
                  {offer.quantityAvailable?.value != null
                    ? `${offer.quantityAvailable.value} ${offer.quantityAvailable.unit}`
                    : 'N/A'}
                </div>
                <div className="col-span-2 text-gray-600">
                  {offer.pricePerUnit?.value != null
                    ? `${offer.pricePerUnit.value} ${offer.pricePerUnit.currency}`
                    : 'N/A'}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
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
                <div className="col-span-1 flex justify-end gap-1">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(offer);
                    }}
                    className="text-green-600 hover:text-green-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(offer);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOfferToDelete(offer._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {selectedOffer && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-2xl flex flex-col max-h-[80vh]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-green-800">{selectedOffer.title}</h3>
                    <motion.button
                      onClick={() => setSelectedOffer(null)}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-600">
                      <span className="font-medium">Company Name:</span> {selectedOffer.company.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {selectedOffer.company.contactEmail}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Country:</span> {selectedOffer.company.address.country}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Address:</span> {selectedOffer.company.address.street}, {selectedOffer.company.address.city}, {selectedOffer.company.address.postalCode}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {selectedOffer.company.contactPhone || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Product Offered:</span> {selectedOffer.productOffered}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Destination:</span> {selectedOffer.destination}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Payment Terms:</span> {selectedOffer.paymentTerms || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Buyers From:</span> {selectedOffer.lookingForBuyersFrom.length > 0 ? selectedOffer.lookingForBuyersFrom.join(', ') : 'Any'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Description:</span> {selectedOffer.productDescription}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Contact:</span> {selectedOffer.contactName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Offer Ends:</span> {selectedOffer.availabilityEndDate ? new Date(selectedOffer.availabilityEndDate).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Quantity:</span> {selectedOffer.quantityAvailable?.value != null
                        ? `${selectedOffer.quantityAvailable.value} ${selectedOffer.quantityAvailable.unit}`
                        : 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Price/Unit:</span> {selectedOffer.pricePerUnit?.value != null
                        ? `${selectedOffer.pricePerUnit.value} ${selectedOffer.pricePerUnit.currency}`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white z-10 p-3 border-t border-gray-200 shadow-sm">
                  <div className="flex justify-end gap-2">
                    <motion.button
                      onClick={() => startEditing(selectedOffer)}
                      className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition flex items-center gap-1 text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PencilIcon className="h-3 w-3" />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setOfferToDelete(selectedOffer._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition flex items-center gap-1 text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrashIcon className="h-3 w-3" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDeleteModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-md flex flex-col max-h-[80vh]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-green-800">Confirm Deletion</h3>
                    <motion.button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                  <p className="text-xs text-gray-600">
                    Are you sure you want to delete this offer? This action cannot be undone.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <motion.button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition flex items-center gap-1 text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrashIcon className="h-3 w-3" />
                      Delete
                    </motion.button>
                    <motion.button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700 transition flex items-center gap-1 text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <XMarkIcon className="h-3 w-3" />
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

export default FarmerOffers;