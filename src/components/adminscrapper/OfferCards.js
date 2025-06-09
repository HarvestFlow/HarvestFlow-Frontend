import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
    if (!price || price === 'N/A') return 'Non spécifié';
    const parts = price.split('-');
    const formattedParts = parts.map(part => {
        const num = parseInt(part, 10);
        if (isNaN(num)) return 'N/A';
        return (num / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    });
    return formattedParts.join('-') + ' $US';
};

const OfferCards = () => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/offers');
                if (response.data.status === 'success') {
                    setOffers(response.data.data);
                    setFilteredOffers(response.data.data);
                } else {
                    setError('Erreur lors de la récupération des offres');
                    toast.error('Erreur lors de la récupération des offres');
                }
            } catch (err) {
                setError('Erreur serveur : ' + err.message);
                toast.error('Erreur serveur');
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    useEffect(() => {
        const results = offers.filter(offer =>
            offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.supplier.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOffers(results);
    }, [searchTerm, offers]);

    if (loading) {
        return (
            <motion.div
                className="text-center text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Chargement des offres...
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="text-center text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {error}
            </motion.div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <motion.h2
                className="text-3xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaLeaf className="mr-2" /> Offres de Blé
            </motion.h2>
            <div className="mb-6">
                <div className="relative">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou fournisseur..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>
            {filteredOffers.length === 0 ? (
                <motion.div
                    className="text-center text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Aucune offre disponible.
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffers.map((offer, index) => (
                        <motion.div
                            key={offer.offer_id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={offer.image_url !== 'N/A' ? offer.image_url : 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={offer.title}
                                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found')}
                                />
                                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                                    {offer.status}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate flex items-center">
                                    <FaLeaf className="text-green-600 mr-2" /> {offer.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">Prix : {formatPrice(offer.price)}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">Fournisseur : {offer.supplier !== 'N/A' ? offer.supplier : 'Inconnu'}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Info : {offer.supplier_info !== 'N/A' ? offer.supplier_info : 'Non disponible'}</p>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs">Mis à jour : {new Date(offer.last_updated).toLocaleDateString()}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OfferCards;