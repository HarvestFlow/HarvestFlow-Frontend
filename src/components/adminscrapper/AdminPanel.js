import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaLeaf, FaUsers, FaBoxes, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ScrapeButton from './ScrapeButton';

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

const parsePrice = (price) => {
    if (!price || price === 'Non spécifié') return 'N/A';
    const cleaned = price.replace('$US', '').replace(/\./g, '').replace(/,/g, '').trim();
    const parts = cleaned.split('-').map(part => {
        const num = parseFloat(part);
        if (isNaN(num)) return '';
        return Math.round(num * 100).toString();
    });
    return parts.filter(p => p).join('-') || 'N/A';
};

const AdminPanel = ({ setViewMode }) => {
    const [offers, setOffers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState('');
    const [view, setView] = useState('buyers');
    const [cerealFilter, setCerealFilter] = useState('all'); // New filter state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [offerResponse, buyerResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/offers'),
                axios.get('http://localhost:5000/api/buyers')
            ]);
            console.log('Buyers Response:', buyerResponse.data);
            setOffers(offerResponse.data.status === 'success' ? offerResponse.data.data : []);
            setBuyers(buyerResponse.data.status === 'success' ? buyerResponse.data.data : []);
            if (buyerResponse.data.status === 'success' && buyerResponse.data.data.length === 0) {
                setError('Aucun acheteur actif trouvé. Essayez de relancer le scraping.');
                toast.error('Aucun acheteur actif trouvé');
            } else if (buyerResponse.data.status !== 'success') {
                setError('Erreur API acheteurs: ' + buyerResponse.data.message);
                toast.error('Erreur API acheteurs');
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Erreur serveur : ' + err.message);
            toast.error('Erreur serveur');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item, type) => {
        setEditingItem({ ...item, type });
        setFormData(type === 'offer' ? { ...item, price: formatPrice(item.price) } : item);
        setFormError('');
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price' && editingItem.type === 'offer') {
            const validPrice = /^(\d{1,3}(?:\.\d{3})*,\d{2}(?:-\d{1,3}(?:\.\d{3})*,\d{2})?)?(?:\s*\$US)?$/.test(value.trim());
            if (!validPrice && value !== '') {
                setFormError('Le prix doit être au format "100,00 $US" ou "100,00-150,00 $US"');
            } else {
                setFormError('');
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        if (formError) {
            toast.error('Veuillez corriger le format du prix');
            return;
        }
        if (!formData.title) {
            toast.error('Le titre est requis');
            return;
        }
        try {
            const isOffer = editingItem.type === 'offer';
            const url = isOffer ? `http://localhost:5000/api/offers/${editingItem.offer_id}` : `http://localhost:5000/api/buyers/${editingItem.buyer_id}`;
            const payload = isOffer ? { ...formData, price: parsePrice(formData.price) } : formData;
            const response = await axios.put(url, payload);
            if (response.data.status === 'success') {
                if (isOffer) {
                    setOffers(offers.map(o => o.offer_id === editingItem.offer_id ? response.data.data : o));
                } else {
                    setBuyers(buyers.map(b => b.buyer_id === editingItem.buyer_id ? response.data.data : b));
                }
                setEditingItem(null);
                setFormError('');
                toast.success(
                    <div className="flex items-center">
                        <FaCheckCircle className="mr-2" /> Mise à jour réussie !
                    </div>,
                    { duration: 3000 }
                );
            } else {
                setError(response.data.message);
                toast.error(response.data.message);
            }
        } catch (err) {
            setError('Erreur serveur : ' + err.message);
            toast.error('Erreur serveur');
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm(`Voulez-vous vraiment supprimer cet${type === 'offer' ? 'te offre' : ' acheteur'} ?`)) {
            try {
                const url = type === 'offer' ? `http://localhost:5000/api/offers/${id}` : `http://localhost:5000/api/buyers/${id}`;
                const response = await axios.delete(url);
                if (response.data.status === 'success') {
                    if (type === 'offer') {
                        setOffers(offers.filter(o => o.offer_id !== id));
                    } else {
                        setBuyers(buyers.filter(b => b.buyer_id !== id));
                    }
                    toast.success(
                        <div className="flex items-center">
                            <FaCheckCircle className="mr-2" /> Suppression réussie !
                        </div>,
                        { duration: 3000 }
                    );
                } else {
                    setError(response.data.message);
                    toast.error(response.data.message);
                }
            } catch (err) {
                setError('Erreur serveur : ' + err.message);
                toast.error('Erreur serveur');
            }
        }
    };

    const filteredBuyers = buyers.filter(buyer => 
        cerealFilter === 'all' || buyer.cereal_type.toLowerCase() === cerealFilter
    );

    return (
        <div className="container mx-auto p-6">
            <motion.h2
                className="text-3xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaLeaf className="mr-2" /> Panneau Administrateur
            </motion.h2>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
                <motion.button
                    onClick={() => setView('offers')}
                    className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4 sm:mb-0 ${view === 'offers' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-green-800 dark:text-green-400 border border-green-600 dark:border-green-400'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Gérer les offres de blé"
                >
                    <FaBoxes className="mr-2" /> Offres
                </motion.button>
                <motion.button
                    onClick={() => setView('buyers')}
                    className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4 sm:mb-0 ${view === 'buyers' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-green-800 dark:text-green-400 border border-green-600 dark:border-green-400'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Gérer les acheteurs de blé"
                >
                    <FaUsers className="mr-2" /> Acheteurs
                </motion.button>
                <motion.button
                    onClick={() => setViewMode('dashboard')}
                    className="flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Retourner au tableau de bord"
                >
                    <FaArrowLeft className="mr-2" /> Retour
                </motion.button>
            </div>
            {view === 'buyers' && (
                <div className="mb-4 flex items-center space-x-4">
                    <ScrapeButton />
                    <select
                        value={cerealFilter}
                        onChange={(e) => setCerealFilter(e.target.value)}
                        className="px-4 py-2 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-200"
                    >
                        <option value="all">Tous les types de céréales</option>
                        <option value="wheat">Blé</option>
                        <option value="barley">Orge</option>
                    </select>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Rafraîchir
                    </button>
                </div>
            )}
            {loading && (
                <motion.p
                    className="text-gray-600 dark:text-gray-300 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Chargement...
                </motion.p>
            )}
            {error && (
                <motion.p
                    className="text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {error} <button onClick={fetchData} className="underline">Réessayer</button>
                </motion.p>
            )}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="py-4 px-6 text-left font-semibold">Titre</th>
                            {view === 'offers' ? (
                                <>
                                    <th className="py-4 px-6 text-left font-semibold">Prix</th>
                                    <th className="py-4 px-6 text-left font-semibold">Fournisseur</th>
                                    <th className="py-4 px-6 text-left font-semibold">Statut</th>
                                </>
                            ) : (
                                <>
                                    <th className="py-4 px-6 text-left font-semibold">Pays</th>
                                    <th className="py-4 px-6 text-left font-semibold">Quantité</th>
                                    <th className="py-4 px-6 text-left font-semibold">Type de Céréale</th>
                                    <th className="py-4 px-6 text-left font-semibold">Contact</th>
                                </>
                            )}
                            <th className="py-4 px-6 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(view === 'offers' ? offers : filteredBuyers).map((item, index) => (
                            <motion.tr
                                key={view === 'offers' ? item.offer_id : item.buyer_id}
                                className="border-b border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <td className="py-4 px-6 text-gray-800 dark:text-gray-200 truncate max-w-xs">{item.title}</td>
                                {view === 'offers' ? (
                                    <>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{formatPrice(item.price)}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{item.supplier}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{item.status}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{item.country}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{item.quantity_required}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200 capitalize">{item.cereal_type}</td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{item.contact_name}</td>
                                    </>
                                )}
                                <td className="py-4 px-6 flex space-x-3">
                                    <motion.button
                                        onClick={() => handleEdit(item, view === 'offers' ? 'offer' : 'buyer')}
                                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="Modifier cet élément"
                                        aria-label={`Modifier ${view === 'offers' ? 'l\'offre' : 'l\'acheteur'}`}
                                    >
                                        <FaEdit size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(view === 'offers' ? item.offer_id : item.buyer_id, view === 'offers' ? 'offer' : 'buyer')}
                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="Supprimer cet élément"
                                        aria-label={`Supprimer ${view === 'offers' ? 'l\'offre' : 'l\'acheteur'}`}
                                    >
                                        <FaTrash size={20} />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {(view === 'offers' ? offers : filteredBuyers).length === 0 && !loading && (
                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-300 py-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Aucun {view === 'offers' ? 'offre' : 'acheteur'} disponible.
                    </motion.p>
                )}
            </motion.div>

            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center">
                                <FaLeaf className="mr-2" /> Modifier {editingItem.type === 'offer' ? 'l\'Offre' : 'l\'Acheteur'}
                            </h3>
                            {formError && (
                                <motion.p
                                    className="text-red-500 dark:text-red-400 mb-4 bg-red-100 dark:bg-red-900 p-3 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {formError}
                                </motion.p>
                            )}
                            {(editingItem.type === 'offer' ? [
                                { name: 'title', label: 'Titre', required: true },
                                { name: 'price', label: 'Prix (ex. 100,00 $US ou 100,00-150,00 $US)' },
                                { name: 'supplier', label: 'Fournisseur' },
                                { name: 'supplier_info', label: 'Info Fournisseur' },
                                { name: 'contact_name', label: 'Nom du Contact' },
                                { name: 'email', label: 'Email' },
                                { name: 'phone', label: 'Téléphone' },
                                { name: 'image_url', label: 'URL de l\'Image' },
                                { name: 'status', label: 'Statut' },
                            ] : [
                                { name: 'title', label: 'Titre', required: true },
                                { name: 'country', label: 'Pays' },
                                { name: 'quantity_required', label: 'Quantité Requise' },
                                { name: 'cereal_type', label: 'Type de Céréale' },
                                { name: 'payment_terms', label: 'Termes de Paiement' },
                                { name: 'destination', label: 'Destination' },
                                { name: 'supplier_regions', label: 'Régions des Fournisseurs' },
                                { name: 'product_description', label: 'Description du Produit' },
                                { name: 'contact_name', label: 'Nom du Contact' },
                                { name: 'verified_status', label: 'Statut Vérifié' },
                                { name: 'date', label: 'Date' },
                            ]).map(field => (
                                <div className="mb-4" key={field.name}>
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleFormChange}
                                        className="w-full p-3 border border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-200 transition"
                                        required={field.required}
                                        aria-required={field.required}
                                        aria-label={field.label}
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end space-x-4">
                                <motion.button
                                    onClick={() => setEditingItem(null)}
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Annuler les modifications"
                                    aria-label="Annuler"
                                >
                                    Annuler
                                </motion.button>
                                <motion.button
                                    onClick={handleUpdate}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={formError || !formData.title}
                                    title="Enregistrer les modifications"
                                    aria-label="Enregistrer"
                                >
                                    Enregistrer
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;