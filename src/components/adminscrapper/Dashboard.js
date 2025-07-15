import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf, FaChartBar, FaUsers, FaBoxes, FaGlobe, FaUser } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Dashboard = ({ setViewMode }) => {
    const [offers, setOffers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [offerResponse, buyerResponse, userResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/offers'),
                    axios.get('http://localhost:5000/api/buyers'),
                    axios.get('http://localhost:5000/user/getAllUsers', { withCredentials: true }),
                ]);
                if (offerResponse.data.status === 'success') setOffers(offerResponse.data.data);
                if (buyerResponse.data.status === 'success') setBuyers(buyerResponse.data.data);
                setUsers(
                    userResponse.data.map((user) => ({
                        ...user,
                        firstname: user.firstname || 'N/A',
                        lastname: user.lastname || 'N/A',
                        email: user.email || 'N/A',
                        role: user.role || 'N/A',
                        isActivated: user.isActivated ?? false,
                        companyname: user.companyname || 'N/A',
                        country: user.country || 'N/A',
                        address: user.address || 'N/A',
                        certification: user.certification || null,
                    }))
                );
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate user metrics
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActivated).length;
    const roleCounts = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, { farmer: 0, distributor: 0, transporter: 0, admin: 0, superAdmin: 0 });

    // Pie chart data for role distribution
    const roleChartData = {
        labels: ['Agriculteurs', 'Distributeurs', 'Transporteurs', 'Admins', 'Super Admins'],
        datasets: [{
            data: [
                roleCounts.farmer,
                roleCounts.distributor,
                roleCounts.transporter,
                roleCounts.admin,
                roleCounts.superAdmin
            ],
            backgroundColor: ['#4CAF50', '#81C784', '#2E7D32', '#A5D6A7', '#C8E6C9'],
            hoverBackgroundColor: ['#388E3C', '#66BB6A', '#1B5E20', '#90C7A2', '#B2DFDB'],
            borderWidth: 1,
        }]
    };

    const countryCounts = buyers.reduce((acc, buyer) => {
        const country = buyer.country.split(',')[0].trim();
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(countryCounts),
        datasets: [{
            label: 'Nombre d\'acheteurs par pays',
            data: Object.values(countryCounts),
            backgroundColor: '#81C784',
            borderColor: '#2E7D32',
            borderWidth: 1
        }]
    };

    const countryCoords = {
        'Egypt': [26.8206, 30.8025],
        'Kenya': [-1.2921, 36.8219],
    };

    return (
        <div className="space-y-6">
            <motion.h2
                className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <FaLeaf className="mr-2" /> Tableau de Bord
            </motion.h2>
            {loading ? (
                <p className="text-gray-600 dark:text-gray-300">Chargement...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewMode('offerCards')}
                        >
                            <FaBoxes className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Offres de Blé</h3>
                            <p className="text-gray-600 dark:text-gray-300">{offers.length} offres disponibles</p>
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewMode('buyerTable')}
                        >
                            <FaUsers className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Acheteurs de Blé</h3>
                            <p className="text-gray-600 dark:text-gray-300">{buyers.length} acheteurs actifs</p>
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewMode('admin')}
                        >
                            <FaChartBar className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Panneau Admin</h3>
                            <p className="text-gray-600 dark:text-gray-300">Gérer les données</p>
                        </motion.div>
                        <motion.div
                            className="bg-gradient-to-br from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 p-6 rounded-xl shadow-lg cursor-pointer relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setViewMode('gestionUser')}
                        >
                            <motion.div
                                className="absolute -top-4 -right-4 text-green-200 opacity-20"
                                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <FaUser size={80} />
                            </motion.div>
                            <FaUser className="text-4xl text-white mb-4" />
                            <h3 className="text-xl font-semibold text-white">Utilisateurs</h3>
                            <p className="text-white text-opacity-90">
                                {totalUsers} total | {activeUsers} actifs
                            </p>
                            <div className="mt-4">
                                <Pie
                                    data={roleChartData}
                                    options={{
                                        plugins: {
                                            legend: { position: 'bottom', labels: { color: 'white', font: { size: 12 } } },
                                            tooltip: { enabled: true },
                                        },
                                        maintainAspectRatio: false,
                                    }}
                                    height={150}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Répartition des acheteurs</h3>
                            <Bar data={chartData} options={{ responsive: true }} />
                        </motion.div>
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Localisation des acheteurs</h3>
                            <MapContainer center={[0, 0]} zoom={2} style={{ height: '300px' }} className="rounded-lg">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {buyers.map(buyer => {
                                    const country = buyer.country.split(',')[0].trim();
                                    const coords = countryCoords[country];
                                    if (coords) {
                                        return (
                                            <Marker key={buyer.buyer_id} position={coords}>
                                                <Popup>{buyer.title} - {buyer.country}</Popup>
                                            </Marker>
                                        );
                                    }
                                    return null;
                                })}
                            </MapContainer>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;