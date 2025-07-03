import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { NioSection, NioCard, NioButton, NioIcon } from '../../components';

// Constants
const API_URL = 'http://localhost:5000';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';

// Static fallback offers
const STATIC_OFFERS = [
  {
    type: 'farmer',
    title: 'Tomates Bio Premium',
    company: { name: 'Ferme Martin', address: { country: 'Provence, France' } },
    productOffered: 'Tomates',
    quantityAvailable: { value: 2, unit: 'tonnes' },
    pricePerUnit: { value: 3.50, currency: '€/kg' },
    quality: 'Bio certifié',
    availabilityEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    type: 'farmer',
    title: 'Pommes de terre nouvelles',
    company: { name: 'AgriCorp Bretagne', address: { country: 'Bretagne, France' } },
    productOffered: 'Pommes de terre',
    quantityAvailable: { value: 10, unit: 'tonnes' },
    pricePerUnit: { value: 1.20, currency: '€/kg' },
    quality: 'Grade A',
    availabilityEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    type: 'buyer',
    title: 'Distribution urbaine Paris',
    company: { name: 'LogiDistrib', address: { country: 'Île-de-France' } },
    productWanted: 'Service complet',
    quantityDesired: { value: null, unit: '' },
    pricePerUnit: { value: 'Sur devis', currency: '' },
    quality: 'Réseau 50+ points',
    availabilityEndDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    type: 'farmer',
    title: 'Légumes de saison mixtes',
    company: { name: 'Coopérative du Sud', address: { country: 'Occitanie, France' } },
    productOffered: 'Légumes mixtes',
    quantityAvailable: { value: 5, unit: 'tonnes' },
    pricePerUnit: { value: 2.80, currency: '€/kg' },
    quality: 'Fraîcheur garantie',
    availabilityEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

function LandingPages() {
  const [offers, setOffers] = useState(STATIC_OFFERS);
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch offers
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API_URL}/farmerform/farmer`, { params: { page: 1, limit: 3 }, withCredentials: true }),
      axios.get(`${API_URL}/farmerform/buyer`, { params: { page: 1, limit: 1 }, withCredentials: true }),
    ])
      .then(([farmerRes, buyerRes]) => {
        const farmer = (farmerRes.data.offers || []).map(o => ({ ...o, type: 'farmer' }));
        const buyer = (buyerRes.data.offers || []).map(o => ({ ...o, type: 'buyer' }));
        const combined = [...farmer, ...buyer].slice(0, 4);
        setOffers(combined.length > 0 ? combined : STATIC_OFFERS);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
        setOffers(STATIC_OFFERS);
      })
      .finally(() => setLoading(false));
  }, []);

  // Helper to calculate remaining days
  const getRemainingDays = (endDate) => {
    if (!endDate) return 'Permanent';
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 3600 * 24));
    return days > 0 ? `${days} jours` : 'Expiré';
  };

  // Check if offer is new (posted within 7 days)
  const isNewOffer = (createdAt) => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdDate >= sevenDaysAgo;
  };

  // Handle modal open/close
  const handleShowModal = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="offer-card">
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-24 w-full mb-2"></div>
        <div className="space-y-1 p-2">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <style>
        {`
          .landing-section {
            animation: fadeIn 0.6s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hero-section {
            background: linear-gradient(to right, #ecfdf5, #ffedd5);
            padding: 4rem 1rem;
            text-align: center;
          }
          .scroll-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 8px 0;
            gap: 12px;
          }
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .offer-card {
            width: 240px;
            flex-shrink: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
            padding: 12px;
            scroll-snap-align: start;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .offer-card:hover {
            transform: translateY(-4px) rotate(2deg);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .offer-image {
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
          }
          .badge-role {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.65rem;
            font-weight: 600;
            border-radius: 12px;
            padding: 2px 8px;
            animation: bounce 0.5s ease;
          }
          .badge-role.farmer {
            background-color: #d4f4e2;
            color: #065f46;
          }
          .badge-role.buyer {
            background-color: #ffedd5;
            color: #c2410c;
          }
          .badge-quality {
            font-size: 0.65rem;
            background-color: #ecfdf5;
            color: #065f46;
            border-radius: 4px;
            padding: 2px 6px;
          }
          .badge-new {
            font-size: 0.65rem;
            background-color: #fefce8;
            color: #ca8a04;
            border-radius: 4px;
            padding: 2px 6px;
            animation: pulse 1.5s infinite;
          }
          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #065f46;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .cta-button {
            background: linear-gradient(90deg, #34d399, #6ee7b7);
            border-radius: 6px;
            padding: 8px 16px;
            font-size: 0.875rem;
            font-weight: 600;
            color: white;
            transition: all 0.3s ease;
          }
          .cta-button:hover {
            background: linear-gradient(90deg, #059669, #34d399);
            transform: scale(1.05);
          }
          .cta-button.secondary {
            background: transparent;
            border: 2px solid #34d399;
            color: #34d399;
          }
          .cta-button.secondary:hover {
            background: #34d399;
            color: white;
          }
          .drag-indicator {
            display: none;
            font-size: 0.75rem;
            color: #6b7280;
            text-align: center;
            margin-top: 8px;
          }
          .modal-container {
            animation: modalFadeIn 0.4s ease-in-out;
          }
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .modal-section {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .stats-card, .feature-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            text-align: center;
            transition: transform 0.3s ease;
          }
          .stats-card:hover, .feature-card:hover {
            transform: translateY(-4px);
          }
          .why-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            transition: transform 0.3s ease;
          }
          .why-card:hover {
            transform: scale(1.05);
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          @media (max-width: 576px) {
            .hero-section {
              padding: 2rem 1rem;
            }
            .offer-card, .stats-card, .feature-card, .why-card {
              width: 200px;
              padding: 10px;
            }
            .offer-image {
              height: 60px;
            }
            .section-title {
              font-size: 1.25rem;
            }
            .scroll-container {
              padding: 6px 0;
              gap: 8px;
            }
            .drag-indicator {
              display: block;
            }
            .modal-section {
              padding: 0.75rem;
            }
            .modal-title {
              font-size: 0.875rem;
            }
            .stats-card, .feature-card, .why-card {
              margin-bottom: 1rem;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section landing-section">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-green-600 flex items-center justify-center gap-2 mb-2">
            <NioIcon name="leaf" size="sm" /> Agriculture • Distribution • Innovation
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Harvest Flow
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            La plateforme qui connecte agriculteurs et distributeurs pour optimiser la chaîne d'approvisionnement alimentaire mondiale
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <NioButton
              href="/signup?role=farmer"
              className="cta-button"
              label="🚜 Je suis Agriculteur"
            />
            <NioButton
              href="/signup?role=distributor"
              className="cta-button secondary"
              label="🏪 Je suis Distributeur"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <NioSection className="py-8 bg-white landing-section">
        <NioSection.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="stats-card">
              <NioIcon name="users" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-xl font-bold text-gray-800">1000+</h3>
              <p className="text-sm text-gray-600">Agriculteurs connectés</p>
            </div>
            <div className="stats-card">
              <NioIcon name="shop" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-xl font-bold text-gray-800">500+</h3>
              <p className="text-sm text-gray-600">Distributeurs actifs</p>
            </div>
            <div className="stats-card">
              <NioIcon name="globe" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-xl font-bold text-gray-800">24/7</h3>
              <p className="text-sm text-gray-600">Trading global</p>
            </div>
          </div>
        </NioSection.Content>
      </NioSection>

      {/* Offers Section */}
      <NioSection className="py-8 bg-gradient-to-r from-green-100 to-peach-100 landing-section">
        <NioSection.Content>
          <div className="text-center mb-4">
            <h2 className="section-title">Offres disponibles sur la plateforme</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Découvrez un aperçu de nos offres internes. Connectez-vous pour accéder aux milliers d'offres externes mondiales !
            </p>
          </div>
          {loading ? (
            <div className="scroll-container">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600">Aucune offre disponible.</p>
            </div>
          ) : (
            <>
              <div className="scroll-container">
                {offers.map((offer, i) => (
                  <div key={i} className="offer-card">
                    <img
                      src={DEFAULT_IMAGE}
                      alt={offer.title}
                      className="offer-image"
                      onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                    />
                    <div className="flex justify-between mb-2">
                      <div className={`badge-role ${offer.type === 'farmer' ? 'farmer' : 'buyer'}`}>
                        <NioIcon name={offer.type === 'farmer' ? 'wheat' : 'truck'} size="xs" />
                        {offer.type === 'farmer' ? 'Farmer' : 'Distributor'}
                      </div>
                      <span className="text-xs text-gray-500">{getRemainingDays(offer.availabilityEndDate)}</span>
                    </div>
                    <div className="mb-2">
                      <h5 className="text-sm font-semibold text-gray-800">{offer.title?.slice(0, 15) || 'N/A'}</h5>
                      <p className="text-xs text-gray-600">
                        Vendeur: {offer.company?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600">
                        Localisation: {offer.company?.address?.country || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600">
                        Quantité: {offer.quantityAvailable?.value || offer.quantityDesired?.value || 'N/A'} {offer.quantityAvailable?.unit || offer.quantityDesired?.unit || ''}
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        Prix: {offer.pricePerUnit?.value || 'Sur devis'} {offer.pricePerUnit?.currency || ''}
                      </p>
                      <div className="mt-1 flex gap-1">
                        <span className="badge-quality">{offer.quality || 'Standard'}</span>
                        {isNewOffer(offer.createdAt) && <span className="badge-new">Nouveau</span>}
                      </div>
                    </div>
                    <NioButton
                      label="Détails"
                      className={`cta-button w-full text-xs ${offer.type === 'farmer' ? '' : 'secondary'}`}
                      icon="arrow-right after"
                      onClick={() => handleShowModal(offer)}
                    />
                  </div>
                ))}
              </div>
              <div className="drag-indicator">Swipez pour voir plus</div>
            </>
          )}
        </NioSection.Content>
      </NioSection>

      {/* Global CTA Section */}
      <NioSection className="py-8 bg-white landing-section">
        <NioSection.Content>
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center justify-center">
              <NioIcon name="globe" size="sm" className="mr-2 text-green-600" />
              Débloquez les offres externes mondiales
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
              Accédez à des milliers d'offres internationales, des outils de gestion avancés et notre réseau mondial d'agriculteurs et distributeurs.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <NioButton
                href="/signup"
                className="cta-button text-sm"
                label="Créer mon compte gratuitement"
              />
              <NioButton
                href="/about"
                className="cta-button secondary text-sm"
                label="En savoir plus"
              />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>

      {/* Features Section */}
      <NioSection className="py-8 bg-gradient-to-r from-green-50 to-peach-50 landing-section">
        <NioSection.Content>
          <div className="text-center mb-6">
            <h2 className="section-title">Une plateforme complète pour l'agriculture moderne</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              De la gestion agricole au trading mondial, Harvest Flow vous accompagne à chaque étape
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="feature-card">
              <NioIcon name="leaf" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Gestion Agricole</h3>
              <p className="text-xs text-gray-600">
                Suivez vos cultures, planifiez vos récoltes et optimisez vos rendements avec nos outils intelligents
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Planning des cultures</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Suivi météo</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Optimisation rendements</li>
              </ul>
            </div>
            <div className="feature-card">
              <NioIcon name="package" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Gestion de Stock</h3>
              <p className="text-xs text-gray-600">
                Gérez vos inventaires en temps réel, suivez la fraîcheur et minimisez les pertes
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Inventaire temps réel</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Traçabilité complète</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Alertes fraîcheur</li>
              </ul>
            </div>
            <div className="feature-card">
              <NioIcon name="money" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Finance & Analytics</h3>
              <p className="text-xs text-gray-600">
                Analysez vos performances, gérez votre trésorerie et optimisez votre rentabilité
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Tableaux de bord</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Prévisions financières</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Analytics avancés</li>
              </ul>
            </div>
            <div className="feature-card">
              <NioIcon name="truck" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Trade & Distribution</h3>
              <p className="text-xs text-gray-600">
                Connectez-vous au réseau mondial, négociez en temps réel et gérez vos livraisons
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Réseau mondial</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Trading en temps réel</li>
                <li className="flex items-center"><NioIcon name="check" size="xs" className="mr-1 text-green-600" /> Logistique intégrée</li>
              </ul>
            </div>
          </div>
        </NioSection.Content>
      </NioSection>

      {/* Why Choose Harvest Flow Section */}
      <NioSection className="py-8 bg-white landing-section">
        <NioSection.Content>
          <div className="text-center mb-6">
            <h2 className="section-title">Pourquoi choisir Harvest Flow ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="why-card">
              <NioIcon name="globe" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Connexion Globale</h3>
              <p className="text-xs text-gray-600">
                Accès au marché mondial agricole 24/7
              </p>
            </div>
            <div className="why-card">
              <NioIcon name="cpu" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Intelligence IA</h3>
              <p className="text-xs text-gray-600">
                Recommandations personnalisées et prédictions
              </p>
            </div>
            <div className="why-card">
              <NioIcon name="shield" className="text-green-600 mb-2" size="lg" />
              <h3 className="text-base font-semibold text-gray-800">Sécurité</h3>
              <p className="text-xs text-gray-600">
                Transactions sécurisées et vérifiées
              </p>
            </div>
          </div>
        </NioSection.Content>
      </NioSection>

      {/* Offer Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="sm" centered className="modal-container">
        <Modal.Header className={`bg-gradient-to-r ${selectedOffer?.type === 'farmer' ? 'from-green-100 to-green-200' : 'from-peach-100 to-peach-200'} border-0`}>
          <Modal.Title className="text-sm font-bold text-gray-800">
            {selectedOffer?.title?.slice(0, 20) || 'Untitled Offer'}
            <span className={`badge-role ${selectedOffer?.type === 'farmer' ? 'farmer' : 'buyer'} ml-2`}>
              {selectedOffer?.type === 'farmer' ? 'Farmer' : 'Distributor'}
            </span>
          </Modal.Title>
          <Button
            variant="link"
            className="text-gray-600"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <NioIcon name="cross" size="md" />
          </Button>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="modal-section">
            <div className="space-y-2">
              <p className="text-xs">
                <strong>{selectedOffer?.type === 'farmer' ? 'Produit' : 'Recherché'}:</strong> {selectedOffer?.productOffered || selectedOffer?.productWanted || 'N/A'}
              </p>
              <p className="text-xs">
                <strong>Quantité:</strong> {selectedOffer?.quantityAvailable?.value || selectedOffer?.quantityDesired?.value || 'N/A'} {selectedOffer?.quantityAvailable?.unit || selectedOffer?.quantityDesired?.unit || ''}
              </p>
              <p className="text-xs">
                <strong>Prix:</strong> {selectedOffer?.pricePerUnit?.value || 'Sur devis'} {selectedOffer?.pricePerUnit?.currency || ''}
              </p>
              <p className="text-xs">
                <strong>Pays:</strong> {selectedOffer?.company?.address?.country || 'N/A'}
              </p>
              <p className="text-xs">
                <strong>Qualité:</strong> {selectedOffer?.quality || 'Standard'}
              </p>
              {isNewOffer(selectedOffer?.createdAt) && (
                <span className="badge-new">Nouveau</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 p-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleCloseModal}
            className="text-xs px-3 py-1"
          >
            Fermer
          </Button>
          <NioButton
            href="/signup"
            className={`cta-button text-xs px-3 py-1 ${selectedOffer?.type === 'farmer' ? '' : 'secondary'}`}
            label="S'inscrire"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LandingPages;