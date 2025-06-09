import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import Dashboard from './Dashboard';
import ScrapeButton from './ScrapeButton';
import OfferCards from './OfferCards';
import OfferTable from './OfferTable';
import BuyerCards from './BuyerCards';
import BuyerTable from './BuyerTable';
import AdminPanel from './AdminPanel';
import toast, { Toaster } from 'react-hot-toast';

function AdminScrapper() {
    const [viewMode, setViewMode] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`min-h-screen font-poppins ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-beige-100 to-green-50'}`}>
       
            <main className="container mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {viewMode === 'dashboard' ? (
                        <Dashboard setViewMode={setViewMode} />
                    ) : viewMode === 'offerCards' ? (
                        <>
                            <ScrapeButton />
                            <OfferCards />
                        </>
                    ) : viewMode === 'offerTable' ? (
                        <>
                            <ScrapeButton />
                            <OfferTable />
                        </>
                    ) : viewMode === 'buyerCards' ? (
                        <>
                            <ScrapeButton />
                            <BuyerCards />
                        </>
                    ) : viewMode === 'buyerTable' ? (
                        <>
                            <ScrapeButton />
                            <BuyerTable />
                        </>
                    ) : (
                        <AdminPanel setViewMode={setViewMode} />
                    )}
                </motion.div>
            </main>
            <Toaster position="top-right" />
        </div>
    );
}

export default AdminScrapper;