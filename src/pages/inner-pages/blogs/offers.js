import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NioSection, NioButton, NioIcon } from '../../../components';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const API_URL = 'http://localhost:5000';
const WHEAT_IMAGE_URL = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';
const LOCAL_PLACEHOLDER_URL = 'https://via.placeholder.com/380x192';
const USER_PROFILE_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const HEADER_IMAGE_URL = 'https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1920&auto=format&fit=crop';

function MyOffers() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [farmerOffers, setFarmerOffers] = useState([]);
  const [buyerOffers, setBuyerOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [filter, setFilter] = useState('all');
  const [recommendations, setRecommendations] = useState({});
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendationError, setRecommendationError] = useState('');
  const [offerType, setOfferType] = useState('farmer');
  const [sortBy, setSortBy] = useState('similarity');
  const [expandedDetails, setExpandedDetails] = useState({});
  const [userProfile, setUserProfile] = useState({ name: '', email: '', company: '' });
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingRecommendation, setPendingRecommendation] = useState(null);
  const [contactAttemptsLeft, setContactAttemptsLeft] = useState(3);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isFetchingAttempts, setIsFetchingAttempts] = useState(false);

  // Fetch logged-in user profile and contact attempts
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getProfile`, {
        withCredentials: true,
        timeout: 5000,
      });
      setIsAuthenticated(true);
      setUserId(response.data._id);
      setUserProfile({
        name: response.data.firstname || 'Anonymous',
        email: response.data.email || '',
        company: response.data.company || 'N/A',
      });

      // Fetch contact attempts
      if (response.data._id) {
        setIsFetchingAttempts(true);
        const attemptsResponse = await axios.get(`${API_URL}/user/contact-attempts`, {
          params: { userId: response.data._id },
          withCredentials: true,
        });
        setContactAttemptsLeft(attemptsResponse.data.attemptsLeft);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.response || error.message);
      setIsAuthenticated(false);
      setUserId(null);
      setContactError('Failed to fetch user profile. Please log in again.');
      setContactAttemptsLeft(0);
      navigate('/login');
    } finally {
      setIsFetchingAttempts(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const farmerUrl = `${API_URL}/farmerform/farmer/${userId}`;
        const farmerResponse = await axios.get(farmerUrl, { withCredentials: true });
        setFarmerOffers(farmerResponse.data.filter(offer => offer && offer.quantityAvailable?.value != null && offer.pricePerUnit?.value != null));

        const buyerUrl = `${API_URL}/farmerform/buyer/${userId}`;
        const buyerResponse = await axios.get(buyerUrl, { withCredentials: true });
        setBuyerOffers(buyerResponse.data.filter(offer => offer && (offer.quantityDesired?.value != null || offer.quantityDesired) && (offer.pricePerUnit?.value != null || offer.pricePerUnit)));

        if (farmerResponse.data.length > farmerOffers.length || buyerResponse.data.length > buyerOffers.length) {
          setError('Some offers were excluded due to missing data.');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch offers.');
        setFarmerOffers([]);
        setBuyerOffers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, [isAuthenticated, userId]);

  const fetchRecommendations = async (offerId, type) => {
    try {
      setRecommendationError('');
      const url = type === 'farmer'
        ? `${API_URL}/farmerform/recommendations/${offerId}`
        : `${API_URL}/farmerform/buyer/recommendations/${offerId}`;
      const response = await axios.get(url, { withCredentials: true });
      setRecommendations(prev => ({
        ...prev,
        [offerId]: response.data.sort((a, b) => b.similarity - a.similarity),
      }));
    } catch (err) {
      setRecommendationError(err.response?.data?.details || 'Failed to load recommendations.');
      setRecommendations(prev => ({ ...prev, [offerId]: [] }));
    }
  };

  const toggleRecommendations = (offerId, type) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    if (expandedOffer === offerId) {
      setExpandedOffer(null);
    } else {
      setExpandedOffer(offerId);
      if (!recommendations[offerId]) fetchRecommendations(offerId, type);
    }
  };

  const toggleDetails = (offerId) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    setExpandedDetails(prev => ({ ...prev, [offerId]: !prev[offerId] }));
  };

  const filteredOffers = useMemo(() => {
    return (offerType === 'farmer' ? farmerOffers : buyerOffers).filter(offer => {
      const endDate = offerType === 'farmer' ? offer.availabilityEndDate : offer.offerEndDate;
      if (filter === 'active') return !endDate || new Date(endDate) >= new Date();
      if (filter === 'expired') return endDate && new Date(endDate) < new Date();
      return true;
    });
  }, [farmerOffers, buyerOffers, offerType, filter]);

  const formatQuantity = (quantity) => {
    if (quantity?.value) return `${quantity.value} ${quantity.unit || 'tonnes'}`;
    if (typeof quantity === 'string') return quantity || 'N/A';
    if (typeof quantity === 'number') return `${quantity} tonnes`;
    return 'N/A';
  };

  const formatPrice = (price) => {
    if (price?.value) return `${price.value} ${price.currency || '€'}/tonne`;
    if (typeof price === 'string') return price || 'N/A';
    if (typeof price === 'number') return `${price} €/tonne`;
    return 'N/A';
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

  const calculateExpiryProgress = (endDate) => {
    if (!endDate) return 100;
    const now = new Date();
    const expiry = new Date(endDate);
    const total = expiry - now;
    const elapsed = total - (expiry - now);
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copié dans le presse-papiers !');
  };

  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const lowerEmail = email.toLowerCase();
    if (lowerEmail === 'n/a' || lowerEmail === 'na' || lowerEmail.trim() === '') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContactRecommendation = async (recommendation) => {
    if (!isAuthenticated || !userId) {
      setShowSignInPrompt(true);
      return;
    }
    if (!userProfile.email) {
      setContactError('Votre email n’est pas disponible. Veuillez vous reconnecter.');
      return;
    }
    const contactEmail = recommendation.item.company?.contactEmail || recommendation.item.email;
    if (!isValidEmail(contactEmail)) {
      setContactError('Aucun email de contact valide disponible pour cette recommandation.');
      return;
    }
    if (contactAttemptsLeft <= 0) {
      setContactError('Vous avez atteint la limite quotidienne de 3 tentatives de contact.');
      return;
    }

    setIsContactLoading(true);
    setContactError('');
    setContactSuccess('');
    try {
      const response = await axios.post(
        `${API_URL}/user/api/contact-offer`,
        {
          firstname: userProfile.name,
          email: userProfile.email,
          company: userProfile.company,
          toEmail: contactEmail,
          offerTitle: recommendation.item.title || 'Offre sans titre',
          userId: userId,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setContactSuccess('Votre intérêt a été envoyé avec succès !');
        setContactAttemptsLeft(response.data.attemptsLeft);
        setTimeout(() => {
          setContactSuccess('');
          setSelectedRecommendation(null);
          setIsContactLoading(false);
        }, 3000);
      }
    } catch (error) {
      setContactError(error.response?.data?.error || 'Échec de l’envoi. Veuillez réessayer.');
      setContactSuccess('');
      setIsContactLoading(false);
    }
  };

  const promptContactConfirmation = (recommendation) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    setPendingRecommendation(recommendation);
    setShowConfirmDialog(true);
  };

  const confirmContact = () => {
    if (pendingRecommendation) {
      handleContactRecommendation(pendingRecommendation);
    }
    setShowConfirmDialog(false);
    setPendingRecommendation(null);
  };

  const renderOfferCard = (offer) => {
    const isActive = !offer[offerType === 'farmer' ? 'availabilityEndDate' : 'offerEndDate'] || new Date(offer[offerType === 'farmer' ? 'availabilityEndDate' : 'offerEndDate']) >= new Date();
    const expiryProgress = calculateExpiryProgress(offer[offerType === 'farmer' ? 'availabilityEndDate' : 'offerEndDate']);
    const isExpanded = expandedDetails[offer._id];

    const handleImageError = (e) => {
      try {
        console.log('Image load failed for src:', e.target.src, 'Falling back to:', LOCAL_PLACEHOLDER_URL);
        e.target.src = LOCAL_PLACEHOLDER_URL;
        e.target.parentElement.style.backgroundColor = '#e5e7eb';
        e.target.nextSibling.style.display = 'block';
      } catch (error) {
        console.error('Error in handleImageError:', error);
      }
    };

    return (
      <div className="offer-card bg-white rounded-2xl shadow-md p-4 border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg max-w-[380px] mx-auto relative overflow-hidden">
        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
          <img
            loading="lazy"
            src={offer.photo || WHEAT_IMAGE_URL}
            alt={offer.title || 'Offer'}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={handleImageError}
            onLoad={(e) => console.log('Image loaded successfully:', e.target.src)}
          />
          <span className="absolute text-gray-500 text-center z-10" style={{ display: 'none' }}>Image non disponible</span>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{offer.title || 'Offre sans titre'}</h3>
          <div className="text-sm text-gray-600 mb-2 grid grid-cols-2 gap-1">
            <p className="flex items-center"><NioIcon name="tag" className="mr-1 text-green-500" /> {offer.productCategory || 'N/A'}</p>
            <p className="flex items-center"><NioIcon name="box" className="mr-1 text-green-500" /> {offerType === 'farmer' ? offer.productOffered : offer.productNeeded || 'N/A'}</p>
            <p className="flex items-center"><NioIcon name="package" className="mr-1 text-green-500" /> {formatQuantity(offerType === 'farmer' ? offer.quantityAvailable : offer.quantityDesired)}</p>
            <p className="flex items-center"><NioIcon name="money" className="mr-1 text-green-500" /> {formatPrice(offer.pricePerUnit)}</p>
            <p className="flex items-center"><NioIcon name="map-pin" className="mr-1 text-green-500" /> {offerType === 'farmer' ? offer.destination : offer.deliveryLocation || 'N/A'}</p>
            <p className="flex items-center"><NioIcon name="credit-card" className="mr-1 text-green-500" /> {offer.paymentTerms || 'N/A'}</p>
          </div>
          <div className="relative mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${100 - expiryProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Expire le: {formatDate(offerType === 'farmer' ? offer.availabilityEndDate : offer.offerEndDate)}</p>
          </div>
          <button onClick={() => toggleDetails(offer._id)} className="text-sm text-green-600 hover:underline flex items-center mb-2">
            {isExpanded ? 'Masquer les détails' : 'Voir plus de détails'} <NioIcon name={isExpanded ? 'chevron-up' : 'chevron-down'} className="ml-1" />
          </button>
          {isExpanded && (
            <div className="text-sm text-gray-600 mb-2 animate-slide-down">
              <p className="mb-1"><strong>Description:</strong> {offer.productDescription || offer.productSpecifications || 'N/A'}</p>
              <p><strong>Préférences régionales:</strong> {(offerType === 'farmer' ? offer.lookingForBuyersFrom : offer.preferredSuppliersFrom)?.join(', ') || 'N/A'}</p>
            </div>
          )}
          <div className="flex items-center mb-2">
            <img loading="lazy" src={USER_PROFILE_URL} alt="User" className="w-8 h-8 rounded-full mr-1 transition-transform hover:scale-110" />
            <div>
              <p className="text-sm font-medium text-gray-800">{offer.contactName || 'N/A'}</p>
              <p className="text-xs text-gray-600">{offer.company?.name || 'N/A'}</p>
              <a href={`mailto:${offer.company?.contactEmail}`} className="text-xs text-green-600 hover:underline">{offer.company?.contactEmail || 'N/A'}</a>
              <a href={`tel:${offer.company?.contactPhone}`} className="text-xs text-green-600 hover:underline block">{offer.company?.contactPhone || 'N/A'}</a>
            </div>
          </div>
          <div className="flex space-x-2">
            <NioButton
              className={`flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm transform hover:scale-105 transition-transform ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
              label="Recommandations"
              icon="users"
              onClick={() => toggleRecommendations(offer._id, offerType)}
              disabled={!isAuthenticated}
            />
            <NioButton
              className={`flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transform hover:scale-105 transition-transform ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
              label="Détails"
              icon="eye"
              onClick={() => setSelectedRecommendation({ item: offer })}
              disabled={!isAuthenticated}
            />
          </div>
        </div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ display: isActive ? 'block' : 'none' }}></div>
      </div>
    );
  };

  const renderRecommendationCard = (rec, index, offerId) => {
    const item = rec.item || {};
    const status = item.verifiedStatus || 'En attente';
    const currentDate = new Date();
    const endDate = item.offerEndDate || item.availabilityEndDate || currentDate.toISOString().split('T')[0];
    const isActive = new Date(endDate) >= currentDate;
    const similarity = rec.similarity || 0.95;
    const expiryProgress = calculateExpiryProgress(endDate);
    const isExpanded = expandedDetails[`${offerId}-rec-${index}`];
    const hasEmail = isValidEmail(item.company?.contactEmail || item.email);

    const formattedItem = {
      title: item.title || 'N/A',
      quantity: formatQuantity(item.quantityDesired || item.quantityAvailable || { value: item.min_quantity, unit: 'tonnes' }) || 'N/A',
      price: formatPrice(item.pricePerUnit || { value: item.price, currency: item.currency || 'USD' }) || 'N/A',
      location: item.deliveryLocation || item.destination || item.country || 'N/A',
      contact: item.contactName || item.contact_name || 'N/A',
      email: item.company?.contactEmail || item.email || 'N/A',
      phone: item.company?.contactPhone || item.phone || 'N/A',
      company: item.company?.name || item.supplier || 'N/A',
      category: item.productCategory || item.crop_type || 'N/A',
      product: item.productNeeded || item.productOffered || item.cereal_type || 'N/A',
      paymentTerms: item.paymentTerms || item.payment_terms || 'N/A',
      description: item.productDescription || item.productSpecifications || item.product_needed || 'N/A',
      id: item._id || item.offer_id || 'N/A',
    };

    return (
      <div key={`${offerId}-rec-${index}`} className="recommendation-card bg-white rounded-2xl shadow-md p-4 border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg max-w-[380px] mx-auto relative overflow-hidden">
        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
          <img
            loading="lazy"
            src={item.photo || item.image_url || WHEAT_IMAGE_URL}
            alt={formattedItem.title}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={(e) => {
              try {
                console.log('Recommendation image load failed for src:', e.target.src, 'Falling back to:', LOCAL_PLACEHOLDER_URL);
                e.target.src = LOCAL_PLACEHOLDER_URL;
                e.target.parentElement.style.backgroundColor = '#e5e7eb';
                e.target.nextSibling.style.display = 'block';
              } catch (error) {
                console.error('Error in handleImageError:', error);
              }
            }}
            onLoad={(e) => console.log('Recommendation image loaded successfully:', e.target.src)}
          />
          <span className="absolute text-gray-500 text-center z-10" style={{ display: 'none' }}>Image non disponible</span>
        </div>
        <div className="mt-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{formattedItem.title}</h4>
          <div className="relative w-16 h-16 mx-auto mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="30" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle cx="32" cy="32" r="30" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - similarity)} />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-green-600">{Math.round(similarity * 100)}%</span>
          </div>
          <div className="text-sm text-gray-600 mb-2 grid grid-cols-2 gap-1">
            <p className="flex items-center"><NioIcon name="tag" className="mr-1 text-green-500" /> {formattedItem.category}</p>
            <p className="flex items-center"><NioIcon name="box" className="mr-1 text-green-500" /> {formattedItem.product}</p>
            <p className="flex items-center"><NioIcon name="package" className="mr-1 text-green-500" /> {formattedItem.quantity}</p>
            <p className="flex items-center"><NioIcon name="money" className="mr-1 text-green-500" /> {formattedItem.price}</p>
            <p className="flex items-center"><NioIcon name="map-pin" className="mr-1 text-green-500" /> {formattedItem.location}</p>
            <p className="flex items-center"><NioIcon name="credit-card" className="mr-1 text-green-500" /> {formattedItem.paymentTerms}</p>
          </div>
          <div className="relative mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${100 - expiryProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Expire le: {formatDate(endDate)}</p>
          </div>
          <button onClick={() => toggleDetails(`${offerId}-rec-${index}`)} className="text-sm text-green-600 hover:underline flex items-center mb-2">
            {isExpanded ? 'Masquer les détails' : 'Voir plus de détails'} <NioIcon name={isExpanded ? 'chevron-up' : 'chevron-down'} className="ml-1" />
          </button>
          {isExpanded && (
            <div className="text-sm text-gray-600 mb-2 animate-slide-down">
              <p className="mb-1"><strong>Description:</strong> {formattedItem.description}</p>
              <p><strong>Raison:</strong> {rec.reason || 'N/A'}</p>
            </div>
          )}
          <div className="flex items-center mb-2">
            <img loading="lazy" src={USER_PROFILE_URL} alt="User" className="w-8 h-8 rounded-full mr-1 transition-transform hover:scale-110" />
            <div>
              <p className="text-sm font-medium text-gray-800">{formattedItem.contact}</p>
              <p className="text-xs text-gray-600">{formattedItem.company}</p>
              <a href={`mailto:${formattedItem.email}`} className="text-xs text-green-600 hover:underline">{formattedItem.email}</a>
              <a href={`tel:${formattedItem.phone}`} className="text-xs text-green-600 hover:underline block">{formattedItem.phone}</a>
            </div>
          </div>
          {!hasEmail && (
            <p className="no-email-message mb-2">Email de contact non disponible</p>
          )}
          {isAuthenticated && !isFetchingAttempts && (
            <div className={`contact-counter ${contactAttemptsLeft <= 1 ? contactAttemptsLeft === 0 ? 'danger' : 'warning' : ''} mb-3`}>
              <NioIcon
                name={contactAttemptsLeft === 0 ? 'block' : 'mail'}
                className={contactAttemptsLeft === 0 ? 'text-red-500' : 'text-green-500'}
              />
              <span>Vous avez {contactAttemptsLeft} opportunité{contactAttemptsLeft === 1 ? '' : 's'} de contact restante{contactAttemptsLeft === 1 ? '' : 's'} aujourd'hui</span>
            </div>
          )}
          <div className="flex space-x-2">
            {hasEmail && (
              <NioButton
                className={`flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm transform hover:scale-105 transition-transform ${!isAuthenticated || contactAttemptsLeft === 0 || isContactLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                label={isContactLoading ? 'Envoi...' : 'Envoyer l’intérêt'}
                icon="mail"
                onClick={() => promptContactConfirmation(rec)}
                disabled={!isAuthenticated || contactAttemptsLeft === 0 || isContactLoading}
              />
            )}
            <NioButton
              className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transform hover:scale-105 transition-transform"
              label="Détails"
              icon="eye"
              onClick={() => setSelectedRecommendation(rec)}
            />
          </div>
        </div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ display: isActive ? 'block' : 'none' }}></div>
      </div>
    );
  };

  return (
    <AppLayout title="Mes Offres" rootClass="layout-1">
      <>
        <style>
          {`
            .offer-card, .recommendation-card {
              max-width: 380px;
              border-radius: 1.5rem;
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .offer-card:hover, .recommendation-card:hover {
              transform: scale(1.05);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            }
            .header-section {
              background: url(${HEADER_IMAGE_URL}) no-repeat center center;
              background-size: cover;
              position: relative;
              overflow: hidden;
              height: 500px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: white;
            }
            .header-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1;
            }
            .header-content {
              position: relative;
              z-index: 2;
              max-width: 800px;
              padding: 2rem;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1rem;
              margin-top: 2rem;
            }
            .stat-item {
              background: rgba(255, 255, 255, 0.2);
              padding: 1rem;
              border-radius: 0.75rem;
              text-align: center;
            }
            .filter-button {
              transition: all 0.2s ease;
              padding: 0.5rem 1rem;
              border-radius: 0.75rem;
              background: #f5f7f6;
              color: #4a5568;
            }
            .filter-button.active {
              background: #10b981;
              color: white;
            }
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.4);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              animation: fadeIn 0.3s ease;
            }
            .modal-content {
              background: rgb(217, 249, 237);
              padding: 2rem;
              border-radius: 1.5rem;
              max-width: 1400px;
              width: 90%;
              max-height: 85vh;
              overflow-y: auto;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              animation: slideUp 0.3s ease;
            }
            .recommendations-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
              padding: 1rem 0;
            }
            .offer-type-toggle {
              background: #f5f7f6;
              border: 1px solid #e2e8f0;
              border-radius: 0.75rem;
              padding: 0.25rem;
              display: inline-flex;
            }
            .offer-type-toggle button {
              padding: 0.5rem 1.25rem;
              border-radius: 0.5rem;
              font-size: 0.875rem;
              color: #4a5568;
            }
            .offer-type-toggle button.active {
              background: #10b981;
              color: white;
            }
            .sort-select {
              padding: 0.5rem 1rem;
              border-radius: 0.75rem;
              border: 1px solid #e2e8f0;
              margin-left: 1rem;
              background: #f5f7f6;
              color: #4a5568;
            }
            .animate-slide-down {
              animation: slideDown 0.3s ease;
            }
            .confirmation-modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.4);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              animation: fadeIn 0.3s ease;
            }
            .confirmation-modal-content {
              max-width: 400px;
              padding: 1.5rem;
              border-radius: 1rem;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
              background: white;
              animation: fadeInScale 0.3s ease;
              text-align: center;
            }
            .confirmation-modal-content p {
              margin-bottom: 1.5rem;
              color: #4a5568;
              font-size: 1rem;
              font-weight: 500;
            }
            .confirmation-modal-content .btn {
              padding: 0.5rem 1.5rem;
              border-radius: 0.5rem;
              transition: transform 0.2s ease, background-color 0.2s ease;
              cursor: pointer;
              font-size: 0.875rem;
              font-weight: 500;
              border: none;
              margin: 0 0.5rem;
            }
            .confirmation-modal-content .btn-confirm {
              background: #10b981;
              color: white;
            }
            .confirmation-modal-content .btn-confirm:hover {
              background: #059669;
              transform: scale(1.05);
            }
            .confirmation-modal-content .btn-cancel {
              background: #6b7280;
              color: white;
            }
            .confirmation-modal-content .btn-cancel:hover {
              background: #4b5563;
              transform: scale(1.05);
            }
            .toast {
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: #10b981;
              color: white;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              z-index: 2000;
              animation: slideInRight 0.3s ease;
            }
            .no-email-message {
              color: #6b7280;
              font-style: italic;
              font-size: 0.75rem;
              text-align: center;
            }
            .sign-in-modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.4);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              animation: fadeIn 0.3s ease;
            }
            .sign-in-modal-content {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              max-width: 400px;
              width: 90%;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
              animation: fadeInScale 0.3s ease;
              text-align: center;
            }
            .sign-in-modal-content h3 {
              font-size: 1.25rem;
              font-weight: bold;
              color: #1a3c34;
              margin-bottom: 1rem;
            }
            .sign-in-modal-content p {
              font-size: 1rem;
              color: #4a5568;
              margin-bottom: 1.5rem;
            }
            .contact-counter {
              display: flex;
              align-items: center;
              gap: 8px;
              background: #e6f3e6;
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 14px;
              color: #2e7d32;
              margin-bottom: 16px;
              animation: pulse 2s infinite;
            }
            .contact-counter.warning {
              background: #fff3e0;
              color: #e65100;
            }
            .contact-counter.danger {
              background: #ffebee;
              color: #d32f2f;
            }
            .contact-counter svg {
              width: 20px;
              height: 20px;
            }
            @keyframes slideDown {
              from { transform: translateY(-10px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideInRight {
              from { transform: translateX(100px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeInScale {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes ping {
              75%, 100% { transform: scale(2); opacity: 0; }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @media (max-width: 1024px) {
              .recommendations-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (max-width: 640px) {
              .offer-card, .recommendation-card {
                max-width: 100%;
              }
              .recommendations-grid {
                grid-template-columns: 1fr;
              }
              .header-section {
                height: 400px;
              }
              .stats-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>

        <header className="header-section">
          <div className="header-content">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Bienvenue sur Farmer Nexus</h1>
            <p className="text-lg mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connectez-vous à un réseau mondial d’agriculteurs et d’acheteurs pour cultiver des opportunités durables et prospères. Découvrez des offres et des demandes adaptées à vos besoins.
            </p>
            {isAuthenticated && !isFetchingAttempts && (
              <div className={`contact-counter ${contactAttemptsLeft <= 1 ? contactAttemptsLeft === 0 ? 'danger' : 'warning' : ''} inline-flex mx-auto`}>
                <NioIcon
                  name={contactAttemptsLeft === 0 ? 'block' : 'mail'}
                  className={contactAttemptsLeft === 0 ? 'text-red-500' : 'text-green-500'}
                />
                <span>Vous avez {contactAttemptsLeft} opportunité{contactAttemptsLeft === 1 ? '' : 's'} de contact restante{contactAttemptsLeft === 1 ? '' : 's'} aujourd'hui</span>
              </div>
            )}
            <div className="stats-grid">
              <div className="stat-item animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-bold">1,200+</h3>
                <p className="text-sm">Offres actives</p>
              </div>
              <div className="stat-item animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-2xl font-bold">850+</h3>
                <p className="text-sm">Agriculteurs connectés</p>
              </div>
              <div className="stat-item animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <h3 className="text-2xl font-bold">30+</h3>
                <p className="text-sm">Pays représentés</p>
              </div>
            </div>
          </div>
        </header>

        <NioSection className="py-12 bg-gradient-to-b from-yellow-50 to-green-50">
          <NioSection.Content>
            <div className="flex justify-center items-center mb-8 space-x-4 flex-wrap gap-2">
              <div className="offer-type-toggle">
                <button
                  onClick={() => setOfferType('farmer')}
                  className={offerType === 'farmer' ? 'filter-button active' : 'filter-button hover:bg-gray-100'}
                >Offres</button>
                <button
                  onClick={() => setOfferType('buyer')}
                  className={offerType === 'buyer' ? 'filter-button active' : 'filter-button hover:bg-gray-100'}
                >Demandes</button>
              </div>
              <div className="flex space-x-2">
                {['all', 'active', 'expired'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={filter === status ? 'filter-button active' : 'filter-button hover:bg-gray-100'}
                    disabled={!isAuthenticated}
                  >{status.charAt(0).toUpperCase() + status.slice(1)}</button>
                ))}
              </div>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} disabled={!isAuthenticated}>
                <option value="similarity">Trier par Similitude</option>
                <option value="quantity">Trier par Quantité</option>
                <option value="price">Trier par Prix</option>
              </select>
            </div>

            {error && <div className="text-center bg-red-100 p-4 rounded-xl mb-6"><p className="text-sm text-red-600">{error}</p></div>}

            {isLoading ? (
              <div className="text-center"><NioIcon name="spinner" className="animate-spin text-green-600 mr-2" /> Chargement...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center py-16">
                <NioIcon name="inbox" className="text-4xl text-gray-400 mb-4" />
                <p className="text-lg text-gray-700">Aucune {offerType === 'farmer' ? 'offre' : 'demande'} trouvée.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map(offer => renderOfferCard(offer))}
              </div>
            )}
          </NioSection.Content>
        </NioSection>

        {expandedOffer && recommendations[expandedOffer] && (
          <div className="modal" onClick={() => setExpandedOffer(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brown-800">Recommandations pour "{filteredOffers.find(o => o._id === expandedOffer)?.title || 'Offre'}"</h2>
                <NioButton icon="cross" className="text-gray-600 hover:text-gray-800" onClick={() => setExpandedOffer(null)} />
              </div>
              {recommendationError ? (
                <div className="text-center bg-red-100 p-4 rounded-xl"><p className="text-sm text-red-600">{recommendationError}</p></div>
              ) : recommendations[expandedOffer].length > 0 ? (
                <div className="recommendations-grid">
                  {recommendations[expandedOffer]
                    .sort((a, b) => {
                      if (sortBy === 'quantity') return (b.item.quantityDesired?.value || b.item.quantityAvailable?.value || b.item.min_quantity || 0) - (a.item.quantityDesired?.value || a.item.quantityAvailable?.value || a.item.min_quantity || 0);
                      if (sortBy === 'price') return (b.item.pricePerUnit?.value || b.item.price || 0) - (a.item.pricePerUnit?.value || a.item.price || 0);
                      return b.similarity - a.similarity;
                    })
                    .map((rec, index) => renderRecommendationCard(rec, index, expandedOffer))}
                </div>
              ) : (
                <p className="text-center text-gray-700">Aucune recommandation disponible.</p>
              )}
            </div>
          </div>
        )}

        {selectedRecommendation && (
          <div className="modal" onClick={() => setSelectedRecommendation(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-brown-800 mb-4">Détails de la Recommandation</h2>
              {contactError && (
                <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-3">
                  {contactError}
                </div>
              )}
              {contactSuccess && (
                <div className="toast">
                  {contactSuccess}
                </div>
              )}
              {isAuthenticated && !isFetchingAttempts && (
                <div className={`contact-counter ${contactAttemptsLeft <= 1 ? contactAttemptsLeft === 0 ? 'danger' : 'warning' : ''} mb-3`}>
                  <NioIcon
                    name={contactAttemptsLeft === 0 ? 'block' : 'mail'}
                    className={contactAttemptsLeft === 0 ? 'text-red-500' : 'text-green-500'}
                  />
                  <span>Vous avez {contactAttemptsLeft} opportunité{contactAttemptsLeft === 1 ? '' : 's'} de contact restante{contactAttemptsLeft === 1 ? '' : 's'} aujourd'hui</span>
                </div>
              )}
              <div className="flex space-x-4 mb-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Général</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300">Produit</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300">Contact</button>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Titre:</strong> {selectedRecommendation.item.title || 'N/A'}</p>
                <p><strong>Entreprise:</strong> {selectedRecommendation.item.company?.name || selectedRecommendation.item.supplier || 'N/A'}</p>
                <p><strong>Catégorie:</strong> {selectedRecommendation.item.productCategory || selectedRecommendation.item.crop_type || 'N/A'}</p>
                <p><strong>Produit:</strong> {selectedRecommendation.item.productNeeded || selectedRecommendation.item.productOffered || selectedRecommendation.item.cereal_type || 'N/A'}</p>
                <p><strong>Quantité:</strong> {formatQuantity(selectedRecommendation.item.quantityDesired || selectedRecommendation.item.quantityAvailable || { value: selectedRecommendation.item.min_quantity, unit: 'tonnes' })}</p>
                <p><strong>Prix:</strong> {formatPrice(selectedRecommendation.item.pricePerUnit || { value: selectedRecommendation.item.price, currency: selectedRecommendation.item.currency || 'USD' })}</p>
                <p><strong>Conditions de paiement:</strong> {selectedRecommendation.item.paymentTerms || selectedRecommendation.item.payment_terms || 'N/A'}</p>
                <p><strong>Destination:</strong> {selectedRecommendation.item.deliveryLocation || selectedRecommendation.item.destination || selectedRecommendation.item.country || 'N/A'}</p>
                <p><strong>Description:</strong> {selectedRecommendation.item.productDescription || selectedRecommendation.item.productSpecifications || selectedRecommendation.item.product_needed || 'N/A'}</p>
                <div className="flex items-center">
                  <p><strong>Email:</strong> {selectedRecommendation.item.company?.contactEmail || selectedRecommendation.item.email || 'N/A'}</p>
                  <NioButton icon="copy" className="ml-2 text-gray-600 hover:text-green-600" onClick={() => copyToClipboard(selectedRecommendation.item.company?.contactEmail || selectedRecommendation.item.email || '')} />
                </div>
                <div className="flex items-center">
                  <p><strong>Téléphone:</strong> {selectedRecommendation.item.company?.contactPhone || selectedRecommendation.item.phone || 'N/A'}</p>
                  <NioButton icon="copy" className="ml-2 text-gray-600 hover:text-green-600" onClick={() => copyToClipboard(selectedRecommendation.item.company?.contactPhone || selectedRecommendation.item.phone || '')} />
                </div>
                <p><strong>Nom du contact:</strong> {selectedRecommendation.item.contactName || selectedRecommendation.item.contact_name || 'N/A'}</p>
                <p><strong>Statut:</strong> {selectedRecommendation.item.verifiedStatus || 'En attente'}</p>
                <p><strong>Similitude:</strong> {(selectedRecommendation.similarity * 100).toFixed(2)}%</p>
                <p><strong>Raison:</strong> {selectedRecommendation.reason || 'N/A'}</p>
                <p><strong>Expire le:</strong> {formatDate(selectedRecommendation.item.offerEndDate || selectedRecommendation.item.availabilityEndDate)}</p>
                <p><strong>Localisation:</strong> <span className="text-gray-500">[Carte à venir]</span></p>
              </div>
              {!isValidEmail(selectedRecommendation.item.company?.contactEmail || selectedRecommendation.item.email) && (
                <p className="no-email-message mt-3">Email de contact non disponible</p>
              )}
              {isValidEmail(selectedRecommendation.item.company?.contactEmail || selectedRecommendation.item.email) && (
                <NioButton
                  className={`mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transform hover:scale-105 transition-transform ${!isAuthenticated || contactAttemptsLeft === 0 || isContactLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  label={isContactLoading ? 'Envoi...' : 'Envoyer l’intérêt'}
                  icon="mail"
                  onClick={() => promptContactConfirmation(selectedRecommendation)}
                  disabled={!isAuthenticated || contactAttemptsLeft === 0 || isContactLoading}
                />
              )}
              <NioButton
                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transform hover:scale-105 transition-transform"
                label="Fermer"
                onClick={() => setSelectedRecommendation(null)}
              />
            </div>
          </div>
        )}

        {showSignInPrompt && (
          <div className="sign-in-modal" onClick={() => setShowSignInPrompt(false)}>
            <div className="sign-in-modal-content" onClick={e => e.stopPropagation()}>
              <h3>Connexion requise</h3>
              <p>Veuillez vous connecter pour interagir avec les offres recommandées.</p>
              <div className="flex justify-center space-x-4">
                <NioButton
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transform hover:scale-105 transition-transform"
                  label="Se connecter"
                  onClick={() => {
                    navigate('/login');
                    setShowSignInPrompt(false);
                  }}
                />
                <NioButton
                  className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transform hover:scale-105 transition-transform"
                  label="Fermer"
                  onClick={() => setShowSignInPrompt(false)}
                />
              </div>
            </div>
          </div>
        )}

        {showConfirmDialog && (
          <div className="confirmation-modal" onClick={() => setShowConfirmDialog(false)}>
            <div className="confirmation-modal-content" onClick={e => e.stopPropagation()}>
              <p>
                Voulez-vous envoyer votre intérêt à{' '}
                <span className="font-bold text-green-600">
                  {pendingRecommendation?.item.company?.contactEmail || pendingRecommendation?.item.email || 'N/A'} ?
                </span>
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className={`btn btn-confirm ${contactAttemptsLeft === 0 || isContactLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={confirmContact}
                  disabled={contactAttemptsLeft === 0 || isContactLoading}
                >
                  Confirmer
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </AppLayout>
  );
}

export default MyOffers;