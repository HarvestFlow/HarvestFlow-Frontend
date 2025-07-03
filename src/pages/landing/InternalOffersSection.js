import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { NioSection, NioCard, NioButton, NioIcon } from '../../components';

const API_URL = 'http://localhost:5000';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';

function InternalOffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API_URL}/farmerform/farmer`, { params: { page: 1, limit: 3 }, withCredentials: true }),
      axios.get(`${API_URL}/farmerform/buyer`, { params: { page: 1, limit: 1 }, withCredentials: true }),
    ])
      .then(([farmerRes, buyerRes]) => {
        const farmer = (farmerRes.data.offers || []).map(o => ({ ...o, type: 'farmer' }));
        const buyer = (buyerRes.data.offers || []).map(o => ({ ...o, type: 'buyer' }));
        setOffers([...farmer, ...buyer].slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getRemainingDays = (endDate) => {
    if (!endDate) return 'Permanent';
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 3600 * 24));
    return `${days} jours`;
  };

  const handleShowModal = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  return (
    <NioSection className="py-12 bg-white">
      <style>
        {`
        .offer-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          width: 250px;
          padding: 16px;
          margin: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .badge-role {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.65rem;
          font-weight: 600;
          border-radius: 9999px;
          padding: 2px 8px;
        }
        .badge-role.farmer { background-color: #16a34a; color: white; }
        .badge-role.buyer { background-color: #6b7280; color: white; }
        .badge-quality {
          font-size: 0.65rem;
          color: #166534;
          background-color: #d1fae5;
          border-radius: 0.25rem;
          padding: 2px 6px;
          display: inline-block;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #065f46;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        `}
      </style>

      <div className="text-center mb-6">
        <h2 className="section-title">Offres disponibles sur la plateforme</h2>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Découvrez un aperçu de nos offres internes. Connectez-vous pour accéder aux milliers d'offres externes mondiales !
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Chargement...</p>
        ) : offers.length === 0 ? (
          <p className="text-sm text-gray-600">Aucune offre disponible.</p>
        ) : (
          offers.map((offer, i) => (
            <div key={i} className="offer-card">
              <div className="flex justify-between mb-2">
                <div className={`badge-role ${offer.type === 'farmer' ? 'farmer' : 'buyer'}`}>
                  <NioIcon name={offer.type === 'farmer' ? 'wheat' : 'truck'} size="xs" />
                  {offer.type === 'farmer' ? 'Farmer' : 'Distributor'}
                </div>
                <span className="text-xs text-gray-500">{getRemainingDays(offer.availabilityEndDate)}</span>
              </div>
              <div className="mb-2">
                <h5 className="text-sm font-semibold text-gray-800">{offer.title}</h5>
                <p className="text-xs text-gray-600">Vendeur: {offer.company?.name || 'N/A'}</p>
                <p className="text-xs text-gray-600">Localisation: {offer.company?.address?.country || 'N/A'}</p>
                <p className="text-xs text-gray-600">
                  Quantité: {offer.quantityAvailable?.value || offer.quantityDesired?.value || 'N/A'} {offer.quantityAvailable?.unit || offer.quantityDesired?.unit || ''}
                </p>
                <p className="text-xs text-green-700 font-semibold">
                  Prix: {offer.pricePerUnit?.value || 'Sur devis'} {offer.pricePerUnit?.currency || ''}
                </p>
                <div className="mt-1">
                  <span className="badge-quality">
                    {offer.quality || 'Standard'}
                  </span>
                </div>
              </div>
              <NioButton
                label="Détails"
                className="cta-button w-full text-xs mt-2"
                icon="arrow-right after"
                onClick={() => handleShowModal(offer)}
              />
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-10 px-4">
        <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center justify-center">
          <NioIcon name="globe" size="sm" className="mr-2" />
          Débloquez les offres externes mondiales
        </h3>
        <p className="text-sm text-gray-700 max-w-md mx-auto mb-4">
          Accédez à des milliers d'offres internationales, des outils de gestion avancés et notre réseau mondial d'agriculteurs et distributeurs.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <NioButton
            href="/signup"
            className="cta-button text-[0.75rem]"
            label="Créer mon compte gratuitement"
          />
          <NioButton
            href="/about"
            className="cta-button secondary text-[0.75rem]"
            label="En savoir plus"
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-sm">{selectedOffer?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-xs">Type: {selectedOffer?.type}</p>
          <p className="text-xs">Vendeur: {selectedOffer?.company?.name}</p>
          <p className="text-xs">Produit: {selectedOffer?.productOffered || selectedOffer?.productWanted}</p>
          <p className="text-xs">Quantité: {selectedOffer?.quantityAvailable?.value || selectedOffer?.quantityDesired?.value}</p>
          <p className="text-xs">Pays: {selectedOffer?.company?.address?.country}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>Fermer</Button>
          <NioButton label="S'inscrire" href="/signup" className="cta-button text-xs" />
        </Modal.Footer>
      </Modal>
    </NioSection>
  );
}

export default InternalOffersSection;
