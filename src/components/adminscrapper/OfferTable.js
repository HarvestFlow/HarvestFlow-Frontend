import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import { FaSort, FaSortUp, FaSortDown, FaLeaf, FaSearch } from 'react-icons/fa';
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

const OfferTable = () => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/offers');
            if (response.data.status === 'success') {
                setOffers(response.data.data);
                setFilteredOffers(response.data.data);
            } else {
                toast.error('Erreur lors de la récupération des offres');
            }
        } catch (err) {
            toast.error('Erreur serveur');
        }
    };

    useEffect(() => {
        let results = offers;
        if (searchTerm) {
            results = results.filter(offer =>
                offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                offer.supplier.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(v => parseInt(v) || 0);
            results = results.filter(offer => {
                if (offer.price === 'N/A') return false;
                const [offerMin, offerMax] = offer.price.split('-').map(v => parseInt(v) || 0);
                return offerMin >= min && (!offerMax || offerMax <= max);
            });
        }
        setFilteredOffers(results);
        setCurrentPage(0);
    }, [searchTerm, priceFilter, offers]);

    const sortOffers = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedOffers = [...filteredOffers].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredOffers(sortedOffers);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const paginatedOffers = filteredOffers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

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
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou fournisseur..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Filtrer par prix (ex. 10000-20000)"
                    value={priceFilter}
                    onChange={e => setPriceFilter(e.target.value)}
                    className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>
            {filteredOffers.length === 0 ? (
                <motion.p
                    className="text-gray-600 dark:text-gray-300 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Aucune offre disponible.
                </motion.p>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-green-600 text-white">
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortOffers('title')}
                                    >
                                        Titre {getSortIcon('title')}
                                    </th>
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortOffers('price')}
                                    >
                                        Prix {getSortIcon('price')}
                                    </th>
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortOffers('supplier')}
                                    >
                                        Fournisseur {getSortIcon('supplier')}
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold">
                                        Info Fournisseur
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold">
                                        Image
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOffers.map((offer, index) => (
                                    <motion.tr
                                        key={offer.offer_id}
                                        className="border-b border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{offer.title}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{formatPrice(offer.price)}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{offer.supplier}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{offer.supplier_info}</td>
                                        <td className="py-4 px-6">
                                            <a
                                                href={offer.image_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 hover:underline"
                                            >
                                                Voir
                                            </a>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={'Précédent'}
                        nextLabel={'Suivant'}
                        pageCount={Math.ceil(filteredOffers.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName="flex justify-center mt-6 space-x-2"
                        pageClassName="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 transition"
                        activeClassName="bg-green-600 text-white dark:bg-green-400 dark:text-gray-800 border-green-600 dark:border-green-400"
                        previousClassName="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 transition"
                        nextClassName="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 transition"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                </motion.div>
            )}
        </div>
    );
};

export default OfferTable;