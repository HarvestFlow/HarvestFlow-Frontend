import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NioSection, NioButton, NioIcon, NioBadge } from '../../../components';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const API_URL = 'http://localhost:5000';
const WHEAT_IMAGE_URL = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';
const USER_PROFILE_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

function MyOffers() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [filter, setFilter] = useState('all');
  const [recommendations, setRecommendations] = useState({});
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        setIsAuthenticated(true);
        setUserId(response.data._id);
        if (!response.data.isActivated) console.log('Account not activated');
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    checkAuthStatus();
  }, [navigate]);

  // Fetch user offers
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      console.log('Skipping fetch: Not authenticated or no userId', { isAuthenticated, userId });
      return;
    }

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const url = `${API_URL}/farmerform/farmer/${userId}`;
        const response = await axios.get(url, { withCredentials: true });
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
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch your offers.');
        setOffers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [isAuthenticated, userId]);

  // Fetch recommendations for an offer
  const fetchRecommendations = async (offerId) => {
    try {
      const response = await axios.get(`${API_URL}/farmerform/recommendations/${offerId}`);
      setRecommendations((prev) => ({
        ...prev,
        [offerId]: response.data,
      }));
    } catch (err) {
      setRecommendations((prev) => ({
        ...prev,
        [offerId]: [],
      }));
    }
  };

  // Toggle recommendations visibility
  const toggleRecommendations = (offerId) => {
    if (expandedOffer === offerId) {
      setExpandedOffer(null);
    } else {
      setExpandedOffer(offerId);
      if (!recommendations[offerId]) {
        fetchRecommendations(offerId);
      }
    }
  };

  // Filter offers
  const filteredOffers = offers.filter((offer) => {
    if (filter === 'active') return isOfferActive(offer.availabilityEndDate);
    if (filter === 'expired') return !isOfferActive(offer.availabilityEndDate);
    return true;
  });

  // Format helpers
  const formatQuantity = (quantity) => {
    if (quantity && typeof quantity === 'object' && 'value' in quantity) {
      return `${quantity.value} ${quantity.unit || 'tonnes'}`;
    }
    if (typeof quantity === 'string') {
      const match = quantity.match(/^(\d+)([a-zA-Z]*)$/);
      if (match) {
        const [, value, unit] = match;
        return `${value} ${unit || 'tonnes'}`;
      }
      return `${quantity} tonnes`;
    }
    if (typeof quantity === 'number') {
      return `${quantity} tonnes`;
    }
    return 'N/A';
  };

  const formatPrice = (price) => {
    if (price && typeof price === 'object' && 'value' in price) {
      return `${price.value} ${price.currency || 'USD'}/ton`;
    }
    if (typeof price === 'string') {
      return price.includes('USD') ? price : `${price}/ton`;
    }
    return 'N/A';
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';
  const isOfferActive = (endDate) => !endDate || new Date(endDate) >= new Date();

  const renderRecommendationCard = (rec, index, offerId) => {
    const item = rec.item || {};
    const status = rec.status || 'Vérifié'; // Default to 'Vérifié' if not provided
    const statusClass = {
      'Expire': 'bg-red-100 text-red-800',
      'Vérifié': 'bg-green-100 text-green-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
    }[status] || 'bg-gray-100 text-gray-800';
    const endDate = item.availabilityEndDate || new Date().toISOString().split('T')[0];
    const contactName = item.contactName || 'N/A';

    return (
      <div
        key={`${offerId}-rec-${index}`}
        className="relative w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
      >
        <img
          src={WHEAT_IMAGE_URL}
          alt={item.title || 'Product Image'}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <NioBadge rounded className={`text-xs ${statusClass}`} label={status} />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title || 'Untitled'}</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center"><NioIcon name="map-pin" className="mr-2 text-indigo-600" size="sm" />Pays: {item.country || 'N/A'}</p>
            <p className="flex items-center"><NioIcon name="package" className="mr-2 text-indigo-600" size="sm" />Quantité: {formatQuantity(item.quantity)}</p>
            <p className="flex items-center"><NioIcon name="leaf" className="mr-2 text-indigo-600" size="sm" />Produit: {item.productCategory || 'N/A'}</p>
            <p className="flex items-center"><NioIcon name="calendar" className="mr-2 text-indigo-600" size="sm" />Durée: {formatDate(endDate)}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <NioIcon name="user" className="mr-2 text-indigo-600" size="sm" />
              <span>{contactName} {formatDate(endDate)}</span>
            </div>
            <NioButton
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              label="Détails"
              onClick={() => setSelectedRecommendation(rec)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout title="My Offers" rootClass="layout-1">
      <>
        <style>
          {`
            .offer-card { transition: transform 0.3s ease, box-shadow 0.3s ease; max-width: 448px; } /* Increased from max-w-xs (320px) to max-w-md (448px) */
            .offer-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); }
            .cta-section { background: linear-gradient(135deg, #4f46e5, #7c3aed); animation: gradientShift 10s ease infinite; }
            @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            .filter-button { transition: all 0.2s ease; }
            .filter-button.active { background-color: #4f46e5; color: white; }
            .verified-badge { background-color: #10b981; color: white; }
            .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
            .modal-content { background: white; padding: 2rem; border-radius: 0.5rem; max-width: 600px; max-height: 80vh; overflow-y: auto; }
            .recommendation-card { min-height: 150px; }
            .recommendations-section { background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 1rem; padding: 1.5rem; margin-top: 1rem; transition: all 0.3s ease; }
            .recommendations-section.expanded { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
          `}
        </style>

        <NioSection className="pt-16 md:pt-24 bg-gradient-to-b from-gray-50 to-white">
          <NioSection.Content>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs uppercase tracking-wider text-indigo-600 font-semibold mb-4">Farmer Nexus</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Votre marché agricole</h1>
              <p className="text-lg text-gray-600 mb-8">Découvrez, gérez et élargissez vos offres pour connecter avec des acheteurs mondiaux.</p>
              <NioButton as={Link} to="/farmer-form" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition" label="Créer une nouvelle offre" icon="plus before" />
            </div>
          </NioSection.Content>
        </NioSection>

        <NioSection className="py-12 bg-gray-100">
          <NioSection.Content>
            <div className="flex justify-center mb-8 space-x-4">
              {['all', 'active', 'expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`filter-button px-4 py-2 rounded-full text-sm font-medium ${filter === status ? 'active' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {error && <div className="text-center bg-red-100 p-4 rounded-lg mb-6"><p className="text-sm text-red-600">{error}</p></div>}

            {isLoading ? (
              <div className="text-center text-indigo-600"><NioIcon name="spinner" className="inline-block mr-2 animate-spin" /> Chargement des offres...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center py-16">
                <NioIcon name="inbox" className="text-4xl text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-4">Aucune offre trouvée.</p>
                <p className="text-sm text-gray-500"><Link to="/farmer-form" className="text-indigo-600 hover:underline">Créez votre première offre</Link> pour vous connecter avec des acheteurs.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOffers.map((offer) => (
                  <div key={offer._id} className="offer-card rounded-xl overflow-hidden">
                    <div className="relative">
                      <img src={offer.photo || WHEAT_IMAGE_URL} alt={offer.title || 'Farmer Offer'} loading="lazy" className="w-full h-40 object-cover" onError={(e) => (e.target.src = WHEAT_IMAGE_URL)} /> {/* Increased from h-32 to h-40 */}
                      <div className="absolute top-3 left-3 flex space-x-2">
                        <NioBadge rounded className={`text-xs ${isOfferActive(offer.availabilityEndDate) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} label={isOfferActive(offer.availabilityEndDate) ? 'Actif' : 'Expiré'} />
                        {offer.verifiedStatus === 'VERIFIED' && <NioBadge rounded className="text-xs verified-badge" label="Vérifié" />}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"> {/* Reverted padding to p-4 */}
                        <h3 className="text-white text-lg font-semibold truncate">{offer.title || 'Offre sans titre'}</h3>
                      </div>
                    </div>
                    <div className="p-6"> {/* Reverted padding to p-6 */}
                      <div className="space-y-2 mb-4"> {/* Reverted margin-bottom to mb-4 */}
                        <p className="text-sm text-gray-600 flex items-center"><NioIcon name="leaf" className="mr-2 text-indigo-600" size="sm" /><span><strong>Culture:</strong> {offer.productCategory || 'N/A'}</span></p>
                        <p className="text-sm text-gray-600 flex items-center"><NioIcon name="package" className="mr-2 text-indigo-600" size="sm" /><span><strong>Quantité:</strong> {formatQuantity(offer.quantityAvailable)}</span></p>
                        <p className="text-sm text-gray-600 flex items-center"><NioIcon name="money" className="mr-2 text-indigo-600" size="sm" /><span><strong>Prix:</strong> {formatPrice(offer.pricePerUnit)}</span></p>
                        <p className="text-sm text-gray-600 flex items-center"><NioIcon name="map-pin" className="mr-2 text-indigo-600" size="sm" /><span><strong>Destination:</strong> {offer.destination || 'N/A'}</span></p>
                      </div>
                      <div className="border-t pt-4 flex items-center justify-between"> {/* Reverted padding-top to pt-4 */}
                        <div className="flex items-center">
                          <img src={USER_PROFILE_URL} alt="User" className="w-8 h-8 rounded-full" />
                          <div className="ml-3"> {/* Reverted margin-left to ml-3 */}
                            <span className="text-sm font-medium text-gray-800">{offer.contactName || 'N/A'}</span>
                            <p className="text-xs text-gray-500">Expire: {formatDate(offer.availabilityEndDate)}</p>
                          </div>
                        </div>
                        <NioButton
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                          label="Afficher les recommandations"
                          icon={expandedOffer === offer._id ? 'chevron-up' : 'chevron-down'}
                          onClick={() => toggleRecommendations(offer._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {expandedOffer && recommendations[expandedOffer] && recommendations[expandedOffer].length > 0 && (
                  <div className="recommendations-section w-full">
                    <h4 className="text-md font-semibold mb-4 text-indigo-800 flex items-center">
                      <NioIcon name="star" className="mr-2 text-yellow-500" size="sm" />
                      Correspondances recommandées ({recommendations[expandedOffer].length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendations[expandedOffer].map((rec, index) => renderRecommendationCard(rec, index, expandedOffer))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </NioSection.Content>
        </NioSection>

        <NioSection className="py-16 cta-section">
          <NioSection.Content>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center rounded-2xl overflow-hidden bg-white shadow-2xl">
              <div className="p-8 md:p-12 md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Développez votre portée</h2>
                <p className="text-gray-600 mb-6">Lancez de nouvelles offres pour vous connecter avec des acheteurs dans le monde entier et développer votre entreprise agricole.</p>
                <div className="flex space-x-4">
                  <NioButton as={Link} to="/farmer-form" className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition" label="Créer une offre" />
                  <NioButton href="/about" className="px-6 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white/10 transition" label="En savoir plus" />
                </div>
              </div>
              <div className="md:w-1/2">
                <img src="/images/thumb/farmer.png" alt="Farmer" className="w-full h-64 md:h-full object-cover" />
              </div>
            </div>
          </NioSection.Content>
        </NioSection>

        {selectedRecommendation && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="text-lg font-semibold mb-4">Détails complets de la recommandation ({selectedRecommendation.type === 'farmer_form' ? 'Offre Agriculteur' : 'Offre Externe'})</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600"><strong>Titre:</strong> {selectedRecommendation.item.title || 'N/A'}</p>
                <p className="text-sm text-gray-600"><strong>Quantité:</strong> {formatQuantity(selectedRecommendation.item.quantity)}</p>
                <p className="text-sm text-gray-600"><strong>Prix:</strong> {formatPrice(selectedRecommendation.item.price)}</p>
                <p className="text-sm text-gray-600"><strong>Pays:</strong> {selectedRecommendation.item.country || 'N/A'}</p>
                <p className="text-sm text-gray-600"><strong>Similitude:</strong> {(selectedRecommendation.similarity * 100).toFixed(2)}%</p>
                <p className="text-sm text-gray-600"><strong>Raison:</strong> {selectedRecommendation.reason || 'Aucune raison fournie'}</p>
              </div>
              <NioButton className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700" label="Fermer" onClick={() => setSelectedRecommendation(null)} />
            </div>
          </div>
        )}
      </>
    </AppLayout>
  );
}

export default MyOffers;