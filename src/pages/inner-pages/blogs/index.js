import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard, NioSubscribeField } from '../../../components';

// Helper function to get country name from code
const getCountryName = (code) => {
  const countryMap = {
    'TH': 'Thailand',
    'FR': 'France',
    'KZ': 'Kazakhstan',
    'CA': 'Canada',
    'UA': 'Ukraine',
  };
  return countryMap[code?.toUpperCase()] || 'Unknown';
};

const API_URL = 'http://localhost:5000';
const WHEAT_IMAGE_URL = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';
const DEFAULT_ALIBABA_IMAGE_URL = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471&auto=format&fit=crop';
const USER_AVATAR_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const ITEMS_PER_PAGE = 6;

function Index() {
  const [farmerOffers, setFarmerOffers] = useState([]);
  const [alibabaOffers, setAlibabaOffers] = useState([]);
  const [isLoadingFarmer, setIsLoadingFarmer] = useState(false);
  const [isLoadingAlibaba, setIsLoadingAlibaba] = useState(false);
  const [errorFarmer, setErrorFarmer] = useState('');
  const [errorAlibaba, setErrorAlibaba] = useState('');
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const [selectedFarmerOffer, setSelectedFarmerOffer] = useState(null);
  const [showAlibabaModal, setShowAlibabaModal] = useState(false);
  const [selectedAlibabaOffer, setSelectedAlibabaOffer] = useState(null);
  const [currentPageFarmer, setCurrentPageFarmer] = useState(1);
  const [currentPageAlibaba, setCurrentPageAlibaba] = useState(1);
  const [totalFarmerOffers, setTotalFarmerOffers] = useState(0);
  const [totalAlibabaOffers, setTotalAlibabaOffers] = useState(0);
  const [totalFarmerPages, setTotalFarmerPages] = useState(1);
  const [totalAlibabaPages, setTotalAlibabaPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Fetch paginated farmer offers
  useEffect(() => {
    const fetchFarmerOffers = async () => {
      setIsLoadingFarmer(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/farmer`, {
          params: { page: currentPageFarmer, limit: ITEMS_PER_PAGE },
        });
        const offers = Array.isArray(response.data.offers) ? response.data.offers : [];
        setFarmerOffers(offers);
        setTotalFarmerOffers(response.data.totalOffers || 0);
        setTotalFarmerPages(response.data.totalPages || 1);
      } catch (error) {
        setErrorFarmer(error.response?.data?.error || 'Failed to fetch farmer offers.');
        setFarmerOffers([]);
      } finally {
        setIsLoadingFarmer(false);
      }
    };
    fetchFarmerOffers();
  }, [currentPageFarmer]);

  // Fetch paginated Alibaba wheat offers
  useEffect(() => {
    const fetchAlibabaOffers = async () => {
      setIsLoadingAlibaba(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/getAlibabaWheatOffers`, {
          params: { page: currentPageAlibaba, limit: ITEMS_PER_PAGE },
        });
        const offers = Array.isArray(response.data.offers) ? response.data.offers : [];
        setAlibabaOffers(offers);
        setTotalAlibabaOffers(response.data.totalOffers || 0);
        setTotalAlibabaPages(response.data.totalPages || 1);
      } catch (error) {
        setErrorAlibaba(error.response?.data?.error || 'Failed to fetch Alibaba wheat offers.');
        setAlibabaOffers([]);
      } finally {
        setIsLoadingAlibaba(false);
      }
    };
    fetchAlibabaOffers();
  }, [currentPageAlibaba]);

  // Handle farmer modal open/close
  const handleShowFarmerModal = (offer) => {
    setSelectedFarmerOffer(offer);
    setShowFarmerModal(true);
  };

  const handleCloseFarmerModal = () => {
    setShowFarmerModal(false);
    setSelectedFarmerOffer(null);
  };

  // Handle Alibaba modal open/close
  const handleShowAlibabaModal = (offer) => {
    setSelectedAlibabaOffer(offer);
    setShowAlibabaModal(true);
  };

  const handleCloseAlibabaModal = () => {
    setShowAlibabaModal(false);
    setSelectedAlibabaOffer(null);
  };

  // Handle page change
  const handleFarmerPageChange = (page) => {
    if (page >= 1 && page <= totalFarmerPages) {
      setCurrentPageFarmer(page);
    }
  };

  const handleAlibabaPageChange = (page) => {
    if (page >= 1 && page <= totalAlibabaPages) {
      setCurrentPageAlibaba(page);
    }
  };

  // Check if farmer offer is active
  const isFarmerOfferActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  // Filter offers with defensive checks
  const filteredFarmerOffers = Array.isArray(farmerOffers)
    ? farmerOffers.filter(
        (offer) =>
          (offer.title || '').toLowerCase().includes(searchQuery.toLowerCase()) &&
          (filterCategory === 'All' || (offer.productOffered || '').toLowerCase().includes(filterCategory.toLowerCase()))
      )
    : [];

  const filteredAlibabaOffers = Array.isArray(alibabaOffers)
    ? alibabaOffers.filter((offer) => (offer.Title || '').toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <AppLayout title="Farmer Offers" rootClass="layout-1">
      <style>
        {`
          .btn-gradient {
            background: linear-gradient(90deg, #4CAF50, #2E7D32);
            border: none;
            transition: all 0.3s ease;
          }
          .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
          }
          .text-shadow {
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .card-shadow {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
          }
          .card-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
          .gradient-overlay {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          }
          .icon-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .card-fixed-height {
            height: 350px;
            display: flex;
            flex-direction: column;
          }
          .card-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .text-truncate {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
        `}
      </style>

      {/* Resource Section Start */}
      <NioSection className="overflow-hidden pt-100 pt-lg-120" masks={["blur-1 left center"]}>
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8} xl={6}>
              <div className="nk-section-head">
                <span className="d-inline-block fs-12 text-uppercase text-primary fw-semibold mb-2">Farmer Nexus Marketplace</span>
                <h2 className="mb-3 fs-4 fw-bold">Explore Farmer Offers</h2>
                <p className="fs-16 text-muted">Discover a wide range of agricultural offers from farmers worldwide, connecting suppliers and buyers seamlessly.</p>
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
                <ul className="nk-tag justify-content-center pt-2 gap-2">
                  {['All', 'Wheat', 'Corn', 'Rice'].map((category) => (
                    <li key={category}>
                      <Link
                        to="#"
                        className={`nk-tag-item px-2 py-1 rounded-2 fs-12 ${filterCategory === category ? 'bg-primary text-white' : 'bg-white text-dark'} hover-bg-primary hover-text-white`}
                        onClick={(e) => {
                          e.preventDefault();
                          setFilterCategory(category);
                        }}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Resource Section End */}

      {/* Latest Farmer Offers Section Start */}
      <NioSection className="nk-offer-section py-4" masks={["blur-1 right bottom"]}>
        <NioSection.Head className="pb-4" space={false}>
          <h2 className="mb-0 fs-5 fw-bold">Latest Farmer Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorFarmer && (
            <div className="text-center text-danger bg-danger-soft p-3 rounded-2 mb-3">
              <p className="fs-14">{errorFarmer}</p>
            </div>
          )}
          {isLoadingFarmer ? (
            <div className="text-center text-primary">
              <NioIcon name="spinner" className="me-2" /> Loading farmer offers...
            </div>
          ) : filteredFarmerOffers.length === 0 ? (
            <div className="text-center text-muted py-8">
              <p className="fs-16">No farmer offers found.</p>
              <p className="fs-14 text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <Row className="gy-3 gx-2">
              {filteredFarmerOffers.map((offer) => (
                <Col xs={12} sm={6} lg={4} key={offer._id}>
                  <NioCard className="border-0 rounded-3 overflow-hidden bg-white card-shadow card-fixed-height position-relative transition-all duration-300 hover:shadow-lg hover:scale-[1.02] mx-auto" style={{ maxWidth: '95%' }}>
                    <NioCard.Body className="p-0 h-100 d-flex flex-column">
                      <div className="card-image position-relative overflow-hidden">
                        <img
                          src={WHEAT_IMAGE_URL}
                          alt={offer.title || 'Farmer Offer'}
                          loading="lazy"
                          className="card-img w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                        <div className="position-absolute top-0 left-0 right-0 p-2 d-flex justify-content-between align-items-center">
                          <NioBadge
                            rounded
                            className={`text-bg-${isFarmerOfferActive(offer.availabilityEndDate) ? 'success' : 'danger'}-soft fs-12 fw-bold`}
                            label={isFarmerOfferActive(offer.availabilityEndDate) ? 'Actif' : 'Expiré'}
                          />
                          <NioBadge
                            rounded
                            className={`text-bg-${offer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft fs-12 fw-bold`}
                            label={offer.verifiedStatus === 'VERIFIED' ? '✓ Vérifié' : '⏱ En attente'}
                          />
                        </div>
                        <div className="position-absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <h5 className="text-white fs-5 fw-bold mb-1 text-shadow">{truncateText(offer.title || 'Untitled Offer', 20)}</h5>
                        </div>
                      </div>
                      <div className="card-content p-3 flex-grow-1 d-flex flex-column justify-content-between">
                        <div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between text-sm text-gray-700">
                              <span className="flex items-center gap-1">
                                <NioIcon name="map-pin" className="text-green-600" size="sm" />
                                {truncateText(offer.company?.address?.country || 'Unknown', 15)}
                              </span>
                              <span className="flex items-center gap-1">
                                <NioIcon name="package" className="text-green-600" size="sm" />
                                {`${offer.quantityAvailable?.value || 'N/A'} ${offer.quantityAvailable?.unit || ''}`}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between text-sm text-gray-700 mt-1">
                              <span className="flex items-center gap-1">
                                <NioIcon name="clock" className="text-blue-500" size="sm" />
                                {truncateText(offer.destination || 'N/A', 15)}
                              </span>
                              <span className="flex items-center gap-1">
                                <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                                {truncateText(offer.paymentTerms || 'N/A', 15)}
                              </span>
                            </div>
                          </div>
                          <p className="fs-12 text-gray-600 mb-3 line-clamp-2">
                            <span className="font-semibold">Détails:</span> {truncateText(offer.productDescription || 'No description', 50)}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex items-center space-x-2">
                            <NioMedia size="xs" rounded img={USER_AVATAR_URL} />
                            <div>
                              <span className="fs-12 fw-medium text-gray-700">{truncateText(offer.contactName || 'Anonymous', 15)}</span>
                              <p className="fs-10 text-gray-500 mb-0">{new Date(offer.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <NioButton
                            className="btn-gradient btn-sm rounded-full px-4 py-2 text-white shadow-md hover:shadow-xl transition-all duration-200"
                            label="Détails"
                            onClick={() => handleShowFarmerModal(offer)}
                            icon="arrow-right after"
                            iconClass="ml-2"
                          />
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingFarmer && filteredFarmerOffers.length > 0 && (
            <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap-2 justify-content-center justify-content-md-between pt-4">
              <div className="nk-pagination-col">
                <p className="fs-12 text-gray-600">
                  Affichage: <span>{Math.min(ITEMS_PER_PAGE, filteredFarmerOffers.length)} de {totalFarmerOffers} Offres</span>
                </p>
              </div>
              <div className="nk-pagination-col">
                <nav aria-label="Farmer offers pagination">
                  <ul className="pagination pagination-s1">
                    <li className={`page-item ${currentPageFarmer === 1 ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPageFarmer === 1}
                        onClick={() => handleFarmerPageChange(currentPageFarmer - 1)}
                      >
                        <NioIcon name="chevron-left" size="sm" />
                        <span className="d-none d-sm-inline-block">Prev</span>
                      </Button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link fs-12">{currentPageFarmer}</span>
                    </li>
                    <li className={`page-item ${currentPageFarmer === totalFarmerPages ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPageFarmer === totalFarmerPages}
                        onClick={() => handleFarmerPageChange(currentPageFarmer + 1)}
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
      {/* Latest Farmer Offers Section End */}

      {/* Latest Alibaba Wheat Offers Section Start */}
      <NioSection className="nk-offer-section pt-5 pt-lg-100" masks={["blur-1 left top"]}>
        <NioSection.Head className="pb-4" space={false}>
          <h2 className="mb-0 fs-5 fw-bold">Latest Alibaba Wheat Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorAlibaba && (
            <div className="text-center text-danger bg-danger-soft p-3 rounded-2 mb-3">
              <p className="fs-14">{errorAlibaba}</p>
            </div>
          )}
          {isLoadingAlibaba ? (
            <div className="text-center text-primary">
              <NioIcon name="spinner" className="me-2" /> Loading Alibaba wheat offers...
            </div>
          ) : filteredAlibabaOffers.length === 0 ? (
            <div className="text-center text-muted py-8">
              <p className="fs-16">No Alibaba wheat offers found.</p>
              <p className="fs-14 text-gray-600">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <Row className="gy-3 gx-2">
              {filteredAlibabaOffers.map((offer, index) => (
                <Col xs={12} sm={6} lg={4} key={index}>
                  <NioCard className="border-0 rounded-3 overflow-hidden bg-white card-shadow card-fixed-height position-relative transition-all duration-300 hover:shadow-lg hover:scale-[1.02] mx-auto" style={{ maxWidth: '95%' }}>
                    <NioCard.Body className="p-0 h-100 d-flex flex-column">
                      <div className="card-image position-relative overflow-hidden">
                        <img
                          src={offer['Image URL'] !== 'N/A' ? offer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                          alt={offer.Title || 'Alibaba Offer'}
                          loading="lazy"
                          className="card-img w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                        <div className="position-absolute top-0 left-0 p-2">
                          <NioBadge rounded className="text-bg-primary-soft fs-12 fw-bold" label="Alibaba" />
                        </div>
                        <div className="position-absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <h5 className="text-white fs-5 fw-bold mb-1 text-shadow">{truncateText(offer.Title || 'Untitled Offer', 20)}</h5>
                        </div>
                      </div>
                      <div className="card-content p-3 flex-grow-1 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between items-center mb-2">
                            <h5 className="fs-6 fw-bold text-gray-800 text-truncate">
                              {truncateText(offer.Title || 'Untitled Offer', 20)}
                            </h5>
                            <NioBadge rounded className="text-bg-success-soft fs-12 fw-bold" label={truncateText(offer.Price || 'N/A', 15)} />
                          </div>
                          <div className="icon-wrapper mb-2">
                            <span className={`flag-icon flag-icon-${offer['Supplier Info (Years & Location)']?.slice(-2).toLowerCase() || 'unknown'}`} style={{ marginRight: '0.5rem' }}></span>
                            <span className="fs-12 text-gray-600">
                              <strong>Pays:</strong> {truncateText(getCountryName(offer['Supplier Info (Years & Location)']?.slice(-2)) || 'Unknown', 15)}
                            </span>
                          </div>
                          <div className="icon-wrapper mb-2">
                            <NioIcon name="user-alt" className="text-green-600 me-1" size="sm" />
                            <span className="fs-12 text-gray-600">
                              <strong>Fournisseur:</strong> <i>{truncateText(offer.Supplier || 'Unknown', 15)}</i>
                            </span>
                          </div>
                        </div>
                        <div className="text-end">
                          <NioButton
                            className="btn-gradient btn-sm rounded-full px-4 py-2 text-white shadow-md hover:shadow-xl transition-all duration-200"
                            label="Détails"
                            onClick={() => handleShowAlibabaModal(offer)}
                            icon="arrow-right after"
                            iconClass="ml-2"
                          />
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingAlibaba && filteredAlibabaOffers.length > 0 && (
            <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap-2 justify-content-center justify-content-md-between pt-4">
              <div className="nk-pagination-col">
                <p className="fs-12 text-gray-600">
                  Affichage: <span>{Math.min(ITEMS_PER_PAGE, filteredAlibabaOffers.length)} de {totalAlibabaOffers} Offres</span>
                </p>
              </div>
              <div className="nk-pagination-col">
                <nav aria-label="Alibaba offers pagination">
                  <ul className="pagination pagination-s1">
                    <li className={`page-item ${currentPageAlibaba === 1 ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPageAlibaba === 1}
                        onClick={() => handleAlibabaPageChange(currentPageAlibaba - 1)}
                      >
                        <NioIcon name="chevron-left" size="sm" />
                        <span className="d-none d-sm-inline-block">Prev</span>
                      </Button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link fs-12">{currentPageAlibaba}</span>
                    </li>
                    <li className={`page-item ${currentPageAlibaba === totalAlibabaPages ? 'disabled' : ''}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPageAlibaba === totalAlibabaPages}
                        onClick={() => handleAlibabaPageChange(currentPageAlibaba + 1)}
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
      {/* Latest Alibaba Wheat Offers Section End */}

      {/* Farmer Offer Details Modal */}
      <Modal show={showFarmerModal} onHide={handleCloseFarmerModal} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title className="fs-5 fw-bold d-flex align-items-center">
            {selectedFarmerOffer?.title || 'Untitled Offer'}
            <NioBadge
              className={`ms-2 text-bg-${isFarmerOfferActive(selectedFarmerOffer?.availabilityEndDate) ? 'success' : 'danger'}-soft fs-12`}
              label={isFarmerOfferActive(selectedFarmerOffer?.availabilityEndDate) ? 'Actif' : 'Expiré'}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedFarmerOffer && (
            <Row className="g-3">
              <Col md={6}>
                <div className="rounded-2 overflow-hidden">
                  <img
                    src={WHEAT_IMAGE_URL}
                    alt={selectedFarmerOffer.title || 'Farmer Offer'}
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
                        <p className="fs-14 fw-medium">{selectedFarmerOffer.contactName || 'Anonymous'}</p>
                        <p className="fs-12 text-gray-500 d-flex align-items-center gap-1">
                          <NioBadge
                            className={`text-bg-${selectedFarmerOffer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft fs-12`}
                            label={selectedFarmerOffer.verifiedStatus === 'VERIFIED' ? '✓ Vérifié' : '⏱ En attente'}
                          />
                          <span> • {new Date(selectedFarmerOffer.createdAt).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    <NioButton
                      className="btn-outline-primary w-100 mt-2"
                      label="Contacter"
                      onClick={() => alert('Contact supplier feature coming soon!')}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-primary fs-6 fw-semibold mb-2">Détails de l'offre</h5>
                <div className="row g-2">
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Pays</p>
                    <p className="fs-14">{selectedFarmerOffer.company?.address?.country || 'Unknown'}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Quantité</p>
                    <p className="fs-14">{`${selectedFarmerOffer.quantityAvailable?.value || 'N/A'} ${selectedFarmerOffer.quantityAvailable?.unit || ''}`}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Destination</p>
                    <p className="fs-14">{selectedFarmerOffer.destination || 'N/A'}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Acheteurs</p>
                    <p className="fs-14">{selectedFarmerOffer.lookingForBuyersFrom?.join(', ') || 'Any'}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Paiement</p>
                    <p className="fs-14">{selectedFarmerOffer.paymentTerms || 'N/A'}</p>
                  </div>
                  <div className="col-6 p-2 bg-light rounded-2">
                    <p className="fs-12 fw-medium mb-1">Disponible jusqu'au</p>
                    <p className="fs-14">
                      {selectedFarmerOffer.availabilityEndDate
                        ? new Date(selectedFarmerOffer.availabilityEndDate).toLocaleDateString()
                        : 'Sans expiration'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-primary fs-6 fw-semibold mb-2">Description du produit</h5>
                  <pre
                    className="fs-12 text-gray-600 bg-light p-3 rounded-2"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {selectedFarmerOffer.productDescription || 'No description provided'}
                  </pre>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-2">
          <Button variant="outline-secondary" size="sm" onClick={handleCloseFarmerModal}>
            Fermer
          </Button>
          <NioButton
            href="/farmingform"
            className="btn-primary btn-sm"
            label="Créer une offre similaire"
            icon="plus before"
          />
        </Modal.Footer>
      </Modal>
      {/* Farmer Offer Details Modal End */}

      {/* Alibaba Offer Details Modal */}
      <Modal show={showAlibabaModal} onHide={handleCloseAlibabaModal} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title className="fs-5 fw-bold d-flex align-items-center justify-content-between w-100">
            {selectedAlibabaOffer?.Title || 'Untitled Offer'}
            <NioBadge rounded className="text-bg-success-soft fs-12" label={selectedAlibabaOffer?.Price || 'N/A'} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedAlibabaOffer && (
            <Row className="g-3">
              <Col md={6}>
                <div className="rounded-2 overflow-hidden">
                  <img
                    src={selectedAlibabaOffer['Image URL'] !== 'N/A' ? selectedAlibabaOffer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                    alt={selectedAlibabaOffer.Title || 'Alibaba Offer'}
                    loading="lazy"
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                    onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                  />
                </div>
                <div className="mt-3">
                  <h5 className="text-primary fs-6 fw-semibold mb-2">Informations du fournisseur</h5>
                  <div className="p-3 bg-light rounded-2">
                    <h6 className="fs-14 fw-medium mb-1">{selectedAlibabaOffer.Supplier || 'Unknown'}</h6>
                    <p className="fs-12 text-gray-600">
                      {selectedAlibabaOffer['Supplier Info (Years & Location)'] || 'No info available'}
                    </p>
                    <NioButton
                      className="btn-outline-primary w-100 mt-2"
                      label="Contacter le fournisseur"
                      onClick={() => alert('Contact supplier feature coming soon!')}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-primary fs-6 fw-semibold mb-2">Détails du contact</h5>
                <div className="p-3 bg-light rounded-2 space-y-3">
                  {selectedAlibabaOffer['Contact Name'] !== 'N/A' && (
                    <div>
                      <p className="fs-12 fw-medium mb-1">Nom du contact</p>
                      <p className="fs-14">{selectedAlibabaOffer['Contact Name']}</p>
                    </div>
                  )}
                  {selectedAlibabaOffer.Email !== 'N/A' && (
                    <div>
                      <p className="fs-12 fw-medium mb-1">Email</p>
                      <p className="fs-14">{selectedAlibabaOffer.Email}</p>
                    </div>
                  )}
                  {selectedAlibabaOffer.Phone !== 'N/A' && (
                    <div>
                      <p className="fs-12 fw-medium mb-1">Téléphone</p>
                      <p className="fs-14">{selectedAlibabaOffer.Phone}</p>
                    </div>
                  )}
                  {selectedAlibabaOffer['Contact Name'] === 'N/A' &&
                    selectedAlibabaOffer.Email === 'N/A' &&
                    selectedAlibabaOffer.Phone === 'N/A' && (
                      <div className="text-center py-3">
                        <p className="fs-12 text-gray-500">Aucune information de contact disponible</p>
                        <p className="fs-12 text-gray-500">Veuillez contacter directement via Alibaba</p>
                      </div>
                    )}
                </div>
                <div className="mt-3">
                  <h5 className="text-primary fs-6 fw-semibold mb-2">Informations produit</h5>
                  <div className="p-3 bg-light rounded-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fs-12 fw-medium">Prix:</span>
                      <span className="fs-14 text-success fw-bold">{selectedAlibabaOffer.Price || 'N/A'}</span>
                    </div>
                    <NioButton
                      className="btn-primary w-100 btn-sm"
                      label="Voir sur Alibaba"
                      onClick={() => alert('Redirecting to Alibaba product page!')}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-2">
          <Button variant="outline-secondary" size="sm" onClick={handleCloseAlibabaModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Alibaba Offer Details Modal End */}

      {/* CTA Section Start */}
      <NioSection className="py-4">
        <NioSection.Content>
          <div className="nk-cta-wrap nk-cta-card bg-primary-gradient rounded-2 is-theme position-relative overflow-hidden p-3 p-md-4">
            <Row className="g-0 align-items-center">
              <Col xs={{ order: 2 }} lg={{ span: 7, order: 0 }}>
                <div className="nk-block-head-content mb-0">
                  <h2 className="newsletter-heading text-capitalize fs-3 m-0 mb-3 mb-lg-4">
                    Rejoignez le marché agricole mondial
                  </h2>
                  <p className="fs-16 text-white/80 max-w-lg">
                    Connectez-vous avec des agriculteurs et fournisseurs pour développer votre activité et accéder à de nouvelles opportunités commerciales.
                  </p>
                  <ul className="nk-btn-group flex-wrap ps-1">
                    <li>
                      <NioButton href="/pricing" className="btn-sm btn-outline-white" label="S'inscrire" />
                    </li>
                    <li>
                      <NioButton href="/about" className="btn-sm btn-outline-white" label="En savoir plus" />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={{ order: 1 }} lg={{ span: 5, order: 0 }}>
                <div className="nk-cta-img-wrap text-end ps-4 pt-4 pt-lg-0 ps-sm-5 ps-lg-0">
                  <img src="/images/thumb/farmer.png" alt="farmer-offer-thumb" className="me-n1" style={{ maxWidth: '100%' }} />
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/* CTA Section End */}

      {/* Newsletter Section Start */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-4 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-4 pb-lg-0">
              <h4 className="text-capitalize fs-5 fw-semibold">Abonnez-vous à notre newsletter</h4>
              <p className="fs-14 text-gray-600">Recevez les dernières offres et actualités agricoles.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>
            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection>
      {/* Newsletter Section End */}
    </AppLayout>
  );
}

export default Index;