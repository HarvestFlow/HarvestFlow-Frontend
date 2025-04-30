import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5000';

const FarmerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  // Fetch user profile to get userId
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

  // Fetch farmer offers for the user
  useEffect(() => {
    if (!userId) return; // Wait until userId is available

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/${userId}`);
        setOffers(response.data);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch offers.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, [userId]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">Your Farmer Offers</h1>
          <motion.button
            onClick={() => navigate('/farmingform')}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
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
            Create New Offer
          </motion.button>
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

        {isLoading ? (
          <div className="text-center text-green-600 text-lg">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No offers found. Create a new offer to get started!
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {offers.map((offer) => (
              <motion.div
                key={offer._id}
                className="bg-white p-6 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition"
                variants={cardVariants}
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">{offer.title}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Country:</span> {offer.country}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Destination:</span> {offer.destination}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Quantity:</span> {offer.quantityRequired}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Suppliers From:</span> {offer.lookingForSuppliersFrom}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Product Description:</span>
                </p>
                <pre className="text-gray-600 text-sm whitespace-pre-wrap">{offer.productDescription}</pre>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Contact:</span> {offer.contactName}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={
                      offer.verifiedStatus === 'VERIFIED'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }
                  >
                    {offer.verifiedStatus}
                  </span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FarmerOffers;