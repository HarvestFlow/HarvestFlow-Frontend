import React, { useState, useEffect } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../../components';

const API_URL = 'http://localhost:5000';
const WHEAT_IMAGE_URL = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';
const USER_AVATAR_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const ITEMS_PER_PAGE = 6;

function Marketplace() {
  const [marketplaceOffers, setMarketplaceOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All'); // Buyer, Farmer, All
  const [sortOption, setSortOption] = useState('newest'); // newest, priceLow, priceHigh

  // Fetch marketplace offers (buyers and farmers)
  useEffect(() => {
    const fetchMarketplaceOffers = async () => {
      setIsLoading(true);
      try {
        const [buyerResponse, farmerResponse] = await Promise.all([
          axios.get(`${API_URL}/farmerform/buyer`, {
            params: { page: currentPage, limit: ITEMS_PER_PAGE },
          }),
          axios.get(`${API_URL}/farmerform/farmer`, {
            params: { page: currentPage, limit: ITEMS_PER_PAGE },
          }),
        ]);

        console.log('Buyer Response:', buyerResponse.data); // Debug log
        console.log('Farmer Response:', farmerResponse.data); // Debug log

        // Normalize and combine offers
        const buyerOffers = Array.isArray(buyerResponse.data.offers)
          ? buyerResponse.data.offers.map((offer) => ({
              _id: offer._id,
              type: 'Buyer',
              title: offer.title || 'Untitled Buyer Offer',
              country: offer.company?.address?.country || 'Unknown',
              quantity: `${offer.quantityDesired?.value || 'N/A'} ${offer.quantityDesired?.unit || ''}`,
              product: offer.productNeeded || 'N/A',
              description: offer.productSpecifications || 'No description provided',
              contactName: offer.contactName || 'Anonymous',
              verifiedStatus: offer.verifiedStatus || 'PENDING',
              endDate: offer.offerEndDate,
              createdAt: offer.createdAt,
              destination: offer.deliveryLocation || 'N/A',
              paymentTerms: offer.paymentTerms || 'N/A',
              lookingFor: offer.preferredSuppliersFrom?.join(', ') || 'Any',
              price: `${offer.pricePerUnit?.value || 'N/A'} ${offer.pricePerUnit?.currency || ''}`,
            }))
          : [];

        const farmerOffers = Array.isArray(farmerResponse.data.offers)
          ? farmerResponse.data.offers.map((offer) => ({
              _id: offer._id,
              type: 'Farmer',
              title: offer.title || 'Untitled Farmer Offer',
              country: offer.company?.address?.country || 'Unknown',
              quantity: `${offer.quantityAvailable?.value || 'N/A'} ${offer.quantityAvailable?.unit || ''}`,
              product: offer.productOffered || 'N/A',
              description: offer.productDescription || 'No description provided',
              contactName: offer.contactName || 'Anonymous',
              verifiedStatus: offer.verifiedStatus || 'PENDING',
              endDate: offer.availabilityEndDate,
              createdAt: offer.createdAt,
              destination: offer.destination || 'N/A',
              paymentTerms: offer.paymentTerms || 'N/A',
              lookingFor: offer.lookingForBuyersFrom?.join(', ') || 'Any',
              price: `${offer.pricePerUnit?.value || 'N/A'} ${offer.pricePerUnit?.currency || ''}`,
            }))
          : [];

        // Combine and sort offers
        const combinedOffers = [...buyerOffers, ...farmerOffers].sort((a, b) => {
          if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
          if (sortOption === 'priceLow') {
            const priceA = parseFloat(a.price) || Infinity;
            const priceB = parseFloat(b.price) || Infinity;
            return priceA - priceB;
          }
          if (sortOption === 'priceHigh') {
            const priceA = parseFloat(a.price) || -Infinity;
            const priceB = parseFloat(b.price) || -Infinity;
            return priceB - priceA;
          }
          return 0;
        });

        setMarketplaceOffers(combinedOffers);
        setTotalOffers((buyerResponse.data.totalOffers || 0) + (farmerResponse.data.totalOffers || 0));
        setTotalPages(Math.ceil(((buyerResponse.data.totalOffers || 0) + (farmerResponse.data.totalOffers || 0)) / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Marketplace Offers Error:', error); // Debug log
        setError(error.response?.data?.error || 'Failed to fetch marketplace offers.');
        setMarketplaceOffers([]); // Ensure array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarketplaceOffers();
  }, [currentPage, sortOption]);

  // Handle modal open/close
  const handleShowModal = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Check if offer is active
  const isOfferActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  // Filter offers
  const filteredMarketplaceOffers = Array.isArray(marketplaceOffers)
    ? marketplaceOffers.filter(
        (offer) =>
          (offer.title || '').toLowerCase().includes(searchQuery.toLowerCase()) &&
          (filterCategory === 'All' || (offer.product || '').toLowerCase().includes(filterCategory.toLowerCase())) &&
          (filterType === 'All' || offer.type === filterType)
      )
    : [];

  return (
    <AppLayout title="Marketplace Offers" rootClass="layout-1">
      {/* Resource Section Start */}
      <NioSection className="overflow-hidden pt-100 pt-lg-120" masks={["blur-1 left center"]}>
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8} xl={6}>
              <div className="nk-section-head">
                <span className="d-inline-block fs-12 text-uppercase text-primary fw-semibold mb-2">Farmer Nexus Marketplace</span>
                <h2 className="mb-3 fs-4 fw-bold">Explore All Offers</h2>
                <p className="fs-16 text-muted">Connect with farmers and buyers worldwide, exploring a diverse range of agricultural offers in one place.</p>
              </div>
            </Col>
            <Col lg={8}>
              <div className="nk-filter-wrap pb-4 pb-md-6">
                <div className="position-relative mb-3">
                  <NioField.Input
                    icon="search before z-1"
                    placeholder="Search for offers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search offers"
                    className="ps-5 py-2"
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                  <NioField.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-200px"
                    aria-label="Filter by product"
                  >
                    <option value="All">All Products</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Corn">Corn</option>
                    <option value="Rice">Rice</option>
                    <option value="Barley">Barley</option>
                  </NioField.Select>
                  <NioField.Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-200px"
                    aria-label="Filter by type"
                  >
                    <option value="All">All Types</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Farmer">Farmer</option>
                  </NioField.Select>
                  <NioField.Select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-200px"
                    aria-label="Sort offers"
                  >
                    <option value="newest">Newest First</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </NioField.Select>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Resource Section End */}

      {/* Marketplace Offers Section Start */}
      <NioSection className="nk-offer-section py-4" masks={["blur-1 right bottom"]}>
        <NioSection.Head className="pb-4" space={false}>
          <h2 className="mb-0 fs-5 fw-bold">Marketplace Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {error && (
            <div className="text-center text-danger bg-danger-soft p-3 rounded-2 mb-3">
              <p className="fs-14">{error}</p>
            </div>
          )}
          {isLoading ? (
            <div className="text-center text-primary">
              <NioIcon name="spinner" className="me-2" /> Loading marketplace offers...
            </div>
          ) : filteredMarketplaceOffers.length === 0 ? (
            <div className="text-center text-muted py-8">
              <p className="fs-16">No marketplace offers found.</p>
              <p className="fs-14 text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <Row className="gy-3 gx-2">
              {filteredMarketplaceOffers.map((offer) => (
                <Col xs={12} sm={6} lg={4} key={offer._id}>
                  <NioCard className="border-0 shadow-md transition-all duration-300 hover:shadow-lg rounded-2 overflow-hidden bg-white">
                    <NioCard.Body className="p-0">
                      <div className="card-image position-relative overflow-hidden">
                        <img
                          src={WHEAT_IMAGE_URL}
                          alt={offer.title}
                          loading="lazy"
                          className="card-img w-100 h-200"
                          style={{ height: '120px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                        <div className="position-absolute top-0 start-0 p-1">
                          <NioBadge
                            rounded
                            className={`text-bg-${isOfferActive(offer.endDate) ? 'success' : 'danger'}-soft fs-12`}
                            label={isOfferActive(offer.endDate) ? 'Actif' : 'Expiré'}
                          />
                        </div>
                        <div className="position-absolute top-0 end-0 p-1">
                          <NioBadge
                            rounded
                            className={`text-bg-${offer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft fs-12`}
                            label={offer.verifiedStatus === 'VERIFIED' ? '✓ Vérifié' : '⏱ En attente'}
                          />
                        </div>
                        <div className="position-absolute top-0 start-50 translate-middle-x p-1">
                          <NioBadge
                            rounded
                            className="text-bg-primary-soft fs-12"
                            label={offer.type}
                          />
                        </div>
                        <div className="position-absolute bottom-0 start-0 end-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fs-6 fw-bold truncate">{offer.title}</h5>
                            <NioBadge rounded className="text-bg-success-soft fs-12" label={offer.price} />
                          </div>
                        </div>
                      </div>
                      <div className="card-content p-3">
                        <div className="mb-2">
                          <p className="fs-12 text-gray-600 d-flex align-items-center mb-1">
                            <NioIcon name="map-pin" className="me-1 text-primary" size="sm" />
                            <span><strong>Pays:</strong> {offer.country}</span>
                          </p>
                          <p className="fs-12 text-gray-600 d-flex align-items-center mb-1">
                            <NioIcon name="package" className="me-1 text-primary" size="sm" />
                            <span><strong>Quantité:</strong> {offer.quantity}</span>
                          </p>
                          <p className="fs-12 text-gray-600 d-flex align-items-center mb-1">
                            <NioIcon name="leaf" className="me-1 text-primary" size="sm" />
                            <span><strong>Produit:</strong> {offer.product}</span>
                          </p>
                        </div>
                        <div className="border-top pt-2 d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <NioMedia size="xs" rounded img={USER_AVATAR_URL} />
                            <div className="ms-2">
                              <span className="fs-12 fw-medium">{offer.contactName}</span>
                              <p className="fs-10 text-gray-500 mb-0">{new Date(offer.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <NioButton
                            className="btn-primary btn-sm"
                            label="Détails"
                            onClick={() => handleShowModal(offer)}
                            aria-label={`View details for ${offer.title}`}
                          />
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoading && filteredMarketplaceOffers.length > 0 && (
            <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap-2 justify-content-center justify-content-md-between pt-4">
              <div className="nk-pagination-col">
                <p className="fs-12 text-gray-600">
                  Affichage: <span>{Math.min(ITEMS_PER_PAGE, filteredMarketplaceOffers.length)} de {totalOffers} Offres</span>
                </p>
              </div>
              <div className="nk-pagination-col">
                <nav aria-label="Marketplace offers pagination">
                  <ul className="pagination pagination-s1">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <NioIcon name="chevron-left" size="sm" />
                        <span className="d-none d-sm-inline-block">Prev</span>
                      </Button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link fs-12">{currentPage}</span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <span className="d-none d-sm-inline-block">Next</span>
                        <NioIcon name="chevron-right" size="sm" />
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </NioSection.Content>
      </NioSection>
      {/* Marketplace Offers Section End */}

      {/* Marketplace Offer Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title className="fs-5 fw-bold d-flex align-items-center">
            {selectedOffer?.title}
            <NioBadge
              className={`ms-2 text-bg-${isOfferActive(selectedOffer?.endDate) ? 'success' : 'danger'}-soft fs-12`}
              label={isOfferActive(selectedOffer?.endDate) ? 'Actif' : 'Expiré'}
            />
            <NioBadge
              className="ms-2 text-bg-primary-soft fs-12"
              label={selectedOffer?.type}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedOffer && (
            <Row className="g-3">
              <Col md={6}>
                <div className="rounded-2 overflow-hidden">
                  <img
                    src={WHEAT_IMAGE_URL}
                    alt={selectedOffer.title}
                    loading="lazy"
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                    onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                  />
                </div>
                <div className="mt-3">
                  <h5 className="text-primary fs-6 fw-semibold mb-2">Contact</h5>
                  <div className="p-3 bg-light rounded-2">
                    <div className="d-flex align-items-center">
                      <NioMedia size="xs" rounded img={USER_AVATAR_URL} />
                      <div className="ms-2">
                        <p className="fs-14 fw-medium">{selectedOffer.contactName}</p>
                        <p className="fs-12 text-gray-500 d-flex align-items-center gap-1">
                          <NioBadge
                            className={`text-bg-${selectedOffer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft fs-12`}
                            label={selectedOffer.verifiedStatus === 'VERIFIED' ? '✓ Vérifié' : '⏱ En attente'}
                          />
                          <span> • {new Date(selectedOffer.createdAt).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    <NioButton
                      className="btn-outline-primary w-100 mt-2"
                      label="Contacter"
                      onClick={() => alert('Contact feature coming soon!')}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-primary fs-6 fw-semibold mb-2">Détails de l'offre</h5>
                <div className="row g-2">
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Pays</p>
                    <p className="fs-14">{selectedOffer.country}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Quantité</p>
                    <p className="fs-14">{selectedOffer.quantity}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Destination</p>
                    <p className="fs-14">{selectedOffer.destination}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">{selectedOffer.type === 'Buyer' ? 'Fournisseurs' : 'Acheteurs'}</p>
                    <p className="fs-14">{selectedOffer.lookingFor}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Paiement</p>
                    <p className="fs-14">{selectedOffer.paymentTerms}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Disponible jusqu'au</p>
                    <p className="fs-14">
                      {selectedOffer.endDate ? new Date(selectedOffer.endDate).toLocaleDateString() : 'Sans expiration'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-primary fs-6 fw-semibold mb-2">Description du produit</h5>
                  <pre className="fs-12 text-gray-600 bg-light p-3 rounded-2" style={{ whiteSpace: 'pre-wrap' }}>
                    {selectedOffer.description}
                  </pre>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-2">
          <Button variant="outline-secondary" size="sm" onClick={handleCloseModal}>
            Fermer
          </Button>
          <NioButton
            href={selectedOffer?.type === 'Buyer' ? '/buyerform' : '/farmingform'}
            className="btn-primary btn-sm"
            label="Créer une offre similaire"
            icon="plus before"
          />
        </Modal.Footer>
      </Modal>
      {/* Marketplace Offer Details Modal End */}
    </AppLayout>
  );
}

export default Marketplace;