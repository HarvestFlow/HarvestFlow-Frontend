import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import { FaSort, FaSortUp, FaSortDown, FaLeaf, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BuyerTable = () => {
    const [buyers, setBuyers] = useState([]);
    const [filteredBuyers, setFilteredBuyers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchBuyers();
    }, []);

    const fetchBuyers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/buyers');
            if (response.data.status === 'success') {
                setBuyers(response.data.data);
                setFilteredBuyers(response.data.data);
            } else {
                toast.error('Erreur lors de la récupération des acheteurs');
            }
        } catch (err) {
            toast.error('Erreur serveur');
        }
    };

    useEffect(() => {
        let results = buyers;
        if (searchTerm) {
            results = results.filter(buyer =>
                buyer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                buyer.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (countryFilter) {
            results = results.filter(buyer =>
                buyer.country.toLowerCase().includes(countryFilter.toLowerCase())
            );
        }
        setFilteredBuyers(results);
        setCurrentPage(0);
    }, [searchTerm, countryFilter, buyers]);

    const sortBuyers = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedBuyers = [...filteredBuyers].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredBuyers(sortedBuyers);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const paginatedBuyers = filteredBuyers.slice(
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
                <FaLeaf className="mr-2" /> Acheteurs de Blé
            </motion.h2>
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou contact..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Filtrer par pays..."
                    value={countryFilter}
                    onChange={e => setCountryFilter(e.target.value)}
                    className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>
            {filteredBuyers.length === 0 ? (
                <motion.p
                    className="text-gray-600 dark:text-gray-300 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Aucun acheteur disponible.
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
                                        onClick={() => sortBuyers('title')}
                                    >
                                        Titre {getSortIcon('title')}
                                    </th>
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortBuyers('country')}
                                    >
                                        Pays {getSortIcon('country')}
                                    </th>
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortBuyers('quantity_required')}
                                    >
                                        Quantité {getSortIcon('quantity_required')}
                                    </th>
                                    <th
                                        className="py-4 px-6 text-left font-semibold cursor-pointer flex items-center"
                                        onClick={() => sortBuyers('contact_name')}
                                    >
                                        Contact {getSortIcon('contact_name')}
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedBuyers.map((buyer, index) => (
                                    <motion.tr
                                        key={buyer.buyer_id}
                                        className="border-b border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{buyer.title}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{buyer.country}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{buyer.quantity_required}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{buyer.contact_name}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{buyer.product_description}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={'Précédent'}
                        nextLabel={'Suivant'}
                        pageCount={Math.ceil(filteredBuyers.length / itemsPerPage)}
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

export default BuyerTable;