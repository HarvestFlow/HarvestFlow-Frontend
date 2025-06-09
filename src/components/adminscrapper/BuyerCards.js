import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BuyerCards = () => {
    const [buyers, setBuyers] = useState([]);
    const [filteredBuyers, setFilteredBuyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/buyers');
                if (response.data.status === 'success') {
                    setBuyers(response.data.data);
                    setFilteredBuyers(response.data.data);
                } else {
                    setError('Erreur lors de la récupération des acheteurs');
                    toast.error('Erreur lors de la récupération des acheteurs');
                }
            } catch (err) {
                setError('Erreur serveur : ' + err.message);
                toast.error('Erreur serveur');
            } finally {
                setLoading(false);
            }
        };
        fetchBuyers();
    }, []);

    useEffect(() => {
        const results = buyers.filter(buyer =>
            buyer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            buyer.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBuyers(results);
    }, [searchTerm, buyers]);

    if (loading) {
        return (
            <motion.div
                className="text-center text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Chargement des acheteurs...
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
                <FaLeaf className="mr-2" /> Acheteurs de Blé
            </motion.h2>
            <div className="mb-6">
                <div className="relative">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou contact..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>
            {filteredBuyers.length === 0 ? (
                <motion.div
                    className="text-center text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Aucun acheteur disponible.
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuyers.map((buyer, index) => (
                        <motion.div
                            key={buyer.buyer_id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate flex items-center">
                                    <FaLeaf className="text-green-600 mr-2" /> {buyer.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">Pays : {buyer.country}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">Quantité : {buyer.quantity_required}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">Contact : {buyer.contact_name !== 'N/A' ? buyer.contact_name : 'Inconnu'}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Description : {buyer.product_description !== 'N/A' ? buyer.product_description.slice(0, 100) + '...' : 'Non disponible'}</p>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs">Date : {buyer.date !== 'N/A' ? buyer.date : 'Non spécifiée'}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyerCards;