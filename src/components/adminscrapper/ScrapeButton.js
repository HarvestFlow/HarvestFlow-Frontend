import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaDownload, FaLeaf } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import toast from 'react-hot-toast';

const ScrapeButton = () => {
    const [status, setStatus] = useState('');
    const [summary, setSummary] = useState(null);
    const [isScrapingOffers, setIsScrapingOffers] = useState(false);
    const [isScrapingBuyers, setIsScrapingBuyers] = useState(false);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/offers');
            if (response.data.status === 'success') {
                setOffers(response.data.data);
            }
        } catch (err) {
            toast.error('Erreur lors de la récupération des offres');
        }
    };

    const handleScrapeOffers = async () => {
        setIsScrapingOffers(true);
        setStatus('Scraping des offres en cours...');
        toast.loading('Scraping des offres en cours...');

        try {
            const response = await axios.post('http://localhost:5000/api/scrape');
            const { status: scrapeStatus, data, message } = response.data;

            if (scrapeStatus === 'success') {
                setStatus(message);
                setSummary(data);
                fetchOffers();
                toast.success('Scraping des offres terminé !');
            } else {
                setStatus('Erreur lors du scraping des offres');
                toast.error(message);
            }
        } catch (err) {
            setStatus('Erreur serveur');
            toast.error(err.message);
        } finally {
            setIsScrapingOffers(false);
        }
    };

    const handleScrapeBuyers = async () => {
        setIsScrapingBuyers(true);
        setStatus('Scraping des acheteurs en cours...');
        toast.loading('Scraping des acheteurs en cours...');

        try {
            const response = await axios.post('http://localhost:5000/api/scrape-buyers');
            const { status: scrapeStatus, data, message } = response.data;

            if (scrapeStatus === 'success') {
                setStatus(message);
                setSummary(data);
                toast.success('Scraping des acheteurs terminé !');
            } else {
                setStatus('Erreur lors du scraping des acheteurs');
                toast.error(message);
            }
        } catch (err) {
            setStatus('Erreur serveur');
            toast.error(err.message);
        } finally {
            setIsScrapingBuyers(false);
        }
    };

    const exportToCSV = () => {
        const csv = [
            'Title,Price,Supplier,Supplier Info (Years & Location),Contact Name,Email,Phone,Image URL',
            ...offers.map(o => `"${o.title.replace(/"/g, '""')}",${o.price},${o.supplier},${o.supplier_info},${o.contact_name},${o.email},${o.phone},${o.image_url}`)
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'alibaba_wheat_offers.csv';
        a.click();
        toast.success('Exportation CSV réussie !');
    };

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex space-x-4 mb-6">
                <motion.button
                    onClick={handleScrapeOffers}
                    disabled={isScrapingOffers || isScrapingBuyers}
                    className={`flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 ${
                        isScrapingOffers || isScrapingBuyers ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                    whileHover={{ scale: (isScrapingOffers || isScrapingBuyers) ? 1 : 1.05 }}
                    whileTap={{ scale: (isScrapingOffers || isScrapingBuyers) ? 1 : 0.95 }}
                    animate={isScrapingOffers ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: isScrapingOffers ? Infinity : 0, duration: 0.8 }}
                    data-tip="Lancer le scraping des offres de blé depuis Alibaba"
                >
                    {isScrapingOffers ? <LoadingSpinner /> : <><FaLeaf className="mr-2" /> Scraper les Offres</>}
                </motion.button>
                <motion.button
                    onClick={handleScrapeBuyers}
                    disabled={isScrapingOffers || isScrapingBuyers}
                    className={`flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 ${
                        isScrapingOffers || isScrapingBuyers ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                    whileHover={{ scale: (isScrapingOffers || isScrapingBuyers) ? 1 : 1.05 }}
                    whileTap={{ scale: (isScrapingOffers || isScrapingBuyers) ? 1 : 0.95 }}
                    animate={isScrapingBuyers ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: isScrapingBuyers ? Infinity : 0, duration: 0.8 }}
                    data-tip="Lancer le scraping des acheteurs de blé depuis go4worldbusiness"
                >
                    {isScrapingBuyers ? <LoadingSpinner /> : <><FaLeaf className="mr-2" /> Scraper les Acheteurs</>}
                </motion.button>
                {offers.length > 0 && (
                    <motion.button
                        onClick={exportToCSV}
                        className="flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-gray-900 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-tip="Exporter les offres en fichier CSV"
                    >
                        <FaDownload className="mr-2" /> Exporter en CSV
                    </motion.button>
                )}
            </div>
            {status && (
                <motion.p
                    className="text-lg text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {status}
                </motion.p>
            )}
            {summary && (
                <motion.div
                    className="bg-green-100 dark:bg-green-900 p-6 rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                        <FaLeaf className="mr-2" /> Résumé
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">Enregistrements insérés : {summary.inserted_count}</p>
                    <p className="text-gray-700 dark:text-gray-300">Enregistrements marqués inactifs : {summary.inactive_count || 0}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ScrapeButton;