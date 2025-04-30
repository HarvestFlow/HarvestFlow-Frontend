import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard, NioSubscribeField } from '../../../components';

// section content
import BlogsContent from '../../../components/PageComponents/InnerPages/Blogs/BlogsContent/BlogsContent';

const API_URL = 'http://localhost:5000';
const WHEAT_IMAGE_URL = 'https://www.800wheatgrass.com/wp/wp-content/uploads/2019/06/wheat-seeds-500x500.jpg'; // Local optimized image for farmer cards
const DEFAULT_ALIBABA_IMAGE_URL = 'https://www.800wheatgrass.com/wp/wp-content/uploads/2019/06/wheat-seeds-500x500.jpg'; // Default for Alibaba cards
const USER_AVATAR_URL = '/images/avatar/user.png'; // Standard user avatar
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all farmer offers
  useEffect(() => {
    const fetchFarmerOffers = async () => {
      setIsLoadingFarmer(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform`);
        setFarmerOffers(response.data);
      } catch (error) {
        setErrorFarmer(error.response?.data?.error || 'Failed to fetch farmer offers.');
      } finally {
        setIsLoadingFarmer(false);
      }
    };
    fetchFarmerOffers();
  }, []);

  // Fetch paginated Alibaba wheat offers
  useEffect(() => {
    const fetchAlibabaOffers = async () => {
      setIsLoadingAlibaba(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/getAlibabaWheatOffers`, {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          },
        });
        setAlibabaOffers(response.data.offers);
        setTotalOffers(response.data.totalOffers);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setErrorAlibaba(error.response?.data?.error || 'Failed to fetch Alibaba wheat offers.');
      } finally {
        setIsLoadingAlibaba(false);
      }
    };
    fetchAlibabaOffers();
  }, [currentPage]);

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
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Check if farmer offer is active
  const isFarmerOfferActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  return (
    <AppLayout title="Farmer Offers" rootClass="layout-1">
      {/* Resource Section Start */}
      <NioSection className="overflow-hidden pt-120 pt-lg-160" masks={["blur-1 left center"]}>
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8} xl={6}>
              <div className="nk-section-head">
                <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">Farmer Marketplace</span>
                <h2>Explore Farmer Offers</h2>
                <p className="fs-20">Discover a wide range of agricultural offers from farmers worldwide, connecting suppliers and buyers seamlessly.</p>
              </div>
            </Col>
            <Col lg={8}>
              <div className="nk-filter-wrap pb-5 pb-md-7">
                <div>
                  <NioField.Input icon="search before z-1" placeholder="Search for offers" />
                </div>
                <ul className="nk-tag justify-content-center pt-4">
                  <li>
                    <Link to="#" className="nk-tag-item">All</Link>
                  </li>
                  <li>
                    <Link to="#" className="nk-tag-item">Wheat</Link>
                  </li>
                  <li>
                    <Link to="#" className="nk-tag-item">Corn</Link>
                  </li>
                  <li>
                    <Link to="#" className="nk-tag-item">Rice</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={8}>
              <BlogsContent />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Resource Section End */}

      {/* Latest Farmer Offers Section Start */}
      <NioSection className="nk-offer-section" masks={["blur-1 right bottom"]}>
        <NioSection.Head className="pb-5" space={false}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Latest Farmer Offers</h2>
            <NioButton
              href="/farmingform"
              className="btn-primary"
              label="Create New Offer"
              icon="plus before"
            />
          </div>
        </NioSection.Head>
        <NioSection.Content>
          {errorFarmer && (
            <div className="text-center text-danger mb-4">
              <p>{errorFarmer}</p>
            </div>
          )}
          {isLoadingFarmer ? (
            <div className="text-center text-primary">Loading farmer offers...</div>
          ) : farmerOffers.length === 0 ? (
            <div className="text-center text-muted">
              No farmer offers found. Be the first to create one!
            </div>
          ) : (
            <Row className="gy-5">
              {farmerOffers.map((offer) => (
                <Col md={6} lg={4} key={offer._id}>
                  <NioCard>
                    <NioCard.Body>
                      <div className="card-image">
                        <img
                          src={WHEAT_IMAGE_URL}
                          alt="wheat-offer"
                          className="card-img"
                          style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                      </div>
                      <div className="card-content pt-4">
                        <NioBadge
                          rounded
                          className={`text-bg-${offer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft mb-2 mb-md-3`}
                          label={offer.verifiedStatus}
                        />
                        <h5 className="text-capitalize m-0 fs-18 fw-bold">
                          <span
                            className="text-dark cursor-pointer"
                            style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            onClick={() => handleShowFarmerModal(offer)}
                          >
                            {offer.title}
                          </span>
                        </h5>
                        <div className="pt-3">
                          <p className="fs-14 text-gray-700 d-flex align-items-center">
                            <NioIcon name="map-pin" className="me-1 text-primary" />
                            <strong>Country:</strong> <span className="text-gray-900 ms-1">{offer.country}</span>
                          </p>
                          <p className="fs-14 text-gray-700 d-flex align-items-center">
                            <NioIcon name="package" className="me-1 text-primary" />
                            <strong>Quantity:</strong> <span className="text-gray-900 ms-1">{offer.quantityRequired}</span>
                          </p>
                          <p className="fs-14 text-gray-700 d-flex align-items-center">
                            <NioIcon name="leaf" className="me-1 text-primary" />
                            <strong>Product:</strong> <span className="text-gray-900 ms-1">{offer.productDescription.split('\n')[0].replace('Product: ', '')}</span>
                          </p>
                        </div>
                        <div className="media-group pt-4 align-items-center">
                          <NioMedia size="md" rounded img={USER_AVATAR_URL} />
                          <div className="media-text">
                            <span className="lead-text fw-normal">{offer.contactName}</span>
                            <ul className="nk-list-meta smaller">
                              <li>{new Date(offer.createdAt).toLocaleDateString()}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7">
            <div className="nk-pagination-col">
              <p>Showing: <span>{farmerOffers.length} of {farmerOffers.length} Offers</span></p>
            </div>
            <div className="nk-pagination-col">
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-s1">
                  <li className="page-item active">
                    <Link className="page-link" to="#">1</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      <span className="d-none d-sm-inline-block">Next</span>
                      <NioIcon name="chevron-right" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
      {/* Latest Farmer Offers Section End */}

      {/* Latest Alibaba Wheat Offers Section Start */}
      <NioSection className="nk-offer-section pt-7 pt-lg-120" masks={["blur-1 left top"]}>
        <NioSection.Head className="pb-5" space={false}>
          <h2 className="mb-0">Latest Alibaba Wheat Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorAlibaba && (
            <div className="text-center text-danger mb-4">
              <p>{errorAlibaba}</p>
            </div>
          )}
          {isLoadingAlibaba ? (
            <div className="text-center text-primary">Loading Alibaba wheat offers...</div>
          ) : alibabaOffers.length === 0 ? (
            <div className="text-center text-muted">
              No Alibaba wheat offers found.
            </div>
          ) : (
            <>
              <Row className="gy-5">
                {alibabaOffers.map((offer, index) => (
                  <Col md={6} lg={4} key={index}>
                    <NioCard>
                      <NioCard.Body>
                        <div className="card-image">
                          <img
                            src={offer['Image URL'] !== 'N/A' ? offer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                            alt="alibaba-wheat-offer"
                            className="card-img"
                            style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                            onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                          />
                        </div>
                        <div className="card-content pt-4">
                          <NioBadge
                            rounded
                            className="text-bg-primary-soft mb-2 mb-md-3"
                            label="Alibaba"
                          />
                          <h5 className="text-capitalize m-0 fs-18 fw-bold">
                            <span
                              className="text-dark cursor-pointer"
                              style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                              onClick={() => handleShowAlibabaModal(offer)}
                            >
                              {offer.Title}
                            </span>
                          </h5>
                          <div className="pt-3">
                            <p className="fs-14 text-gray-700 d-flex align-items-center">
                              <NioIcon name="dollar" className="me-1 text-primary" />
                              <strong>Price:</strong> <span className="text-primary ms-1">{offer.Price}</span>
                            </p>
                            <p className="fs-14 text-gray-700 d-flex align-items-center">
                              <NioIcon name="user-alt" className="me-1 text-primary" />
                              <strong>Supplier:</strong> <span className="text-gray-900 ms-1 font-italic">{offer.Supplier}</span>
                            </p>
                            <p className="fs-12 text-gray-700 d-flex align-items-center bg-light p-2 rounded">
                              <NioIcon name="info" className="me-1 text-primary" />
                              <strong>Info:</strong> <span className="ms-1">{offer['Supplier Info (Years & Location)']}</span>
                            </p>
                          </div>
                         
                        </div>
                      </NioCard.Body>
                    </NioCard>
                  </Col>
                ))}
              </Row>
              {/* Pagination */}
              <div className="nk-pagination-wrap d-flex flex-wrap flex-sm-nowrap align-items-center gap g-3 justify-content-center justify-content-md-between pt-5 pt-lg-7">
                <div className="nk-pagination-col">
                  <p>Showing: <span>{alibabaOffers.length} of {totalOffers} Offers</span></p>
                </div>
                <div className="nk-pagination-col">
                  <nav aria-label="Alibaba offers pagination">
                    <ul className="pagination pagination-s1">
                      <li className="page-item active">
                        <button className="page-link" disabled>
                          {currentPage}
                        </button>
                      </li>
                      <li className="page-item">
                        <span className="page-link">...</span>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <span className="d-none d-sm-inline-block">Next</span>
                          <NioIcon name="chevron-right" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </>
          )}
        </NioSection.Content>
      </NioSection>
      {/* Latest Alibaba Wheat Offers Section End */}

      {/* Farmer Offer Details Modal */}
      <Modal show={showFarmerModal} onHide={handleCloseFarmerModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedFarmerOffer?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFarmerOffer && (
            <Row>
              <Col md={6}>
                <img
                  src={WHEAT_IMAGE_URL}
                  alt="wheat-offer"
                  className="img-fluid rounded mb-4"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                  onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                />
              </Col>
              <Col md={6}>
                <h5 className="text-primary mb-3">Offer Details</h5>
                <p><strong>Country:</strong> {selectedFarmerOffer.country}</p>
                <p><strong>Quantity Required:</strong> {selectedFarmerOffer.quantityRequired}</p>
                <p><strong>Destination:</strong> {selectedFarmerOffer.destination}</p>
                <p><strong>Suppliers From:</strong> {selectedFarmerOffer.lookingForSuppliersFrom}</p>
                <p><strong>Payment Terms:</strong> {selectedFarmerOffer.paymentTerms}</p>
                <p><strong>Availability End Date:</strong> {selectedFarmerOffer.availabilityEndDate ? new Date(selectedFarmerOffer.availabilityEndDate).toLocaleDateString() : 'No expiration'}</p>
                <p><strong>Status:</strong> {isFarmerOfferActive(selectedFarmerOffer.availabilityEndDate) ? 'Active' : 'Expired'}</p>
              </Col>
              <Col xs={12}>
                <h5 className="text-primary mt-4 mb-3">Product Description</h5>
                <pre className="fs-14 text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedFarmerOffer.productDescription}
                </pre>
              </Col>
              <Col xs={12}>
                <h5 className="text-primary mt-4 mb-3">Contact Information</h5>
                <p><strong>Contact Name:</strong> {selectedFarmerOffer.contactName}</p>
                <p><strong>Verified Status:</strong> {selectedFarmerOffer.verifiedStatus}</p>
                <p><strong>Posted On:</strong> {new Date(selectedFarmerOffer.createdAt).toLocaleDateString()}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFarmerModal}>
            Close
          </Button>
          <NioButton
            href="/farmingform"
            className="btn-primary"
            label="Create Similar Offer"
            icon="plus before"
          />
        </Modal.Footer>
      </Modal>
      {/* Farmer Offer Details Modal End */}

      {/* Alibaba Offer Details Modal */}
      <Modal show={showAlibabaModal} onHide={handleCloseAlibabaModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedAlibabaOffer?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlibabaOffer && (
            <Row>
              <Col md={6}>
                <img
                  src={selectedAlibabaOffer['Image URL'] !== 'N/A' ? selectedAlibabaOffer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                  alt="alibaba-wheat-offer"
                  className="img-fluid rounded mb-4"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                  onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                />
              </Col>
              <Col md={6}>
                <h5 className="text-primary mb-3">Offer Details</h5>
                <p><strong>Price:</strong> {selectedAlibabaOffer.Price}</p>
                <p><strong>Supplier:</strong> {selectedAlibabaOffer.Supplier}</p>
                <p><strong>Supplier Info:</strong> {selectedAlibabaOffer['Supplier Info (Years & Location)']}</p>
              </Col>
              <Col xs={12}>
                <h5 className="text-primary mt-4 mb-3">Contact Information</h5>
                <p><strong>Contact Name:</strong> {selectedAlibabaOffer['Contact Name'] !== 'N/A' ? selectedAlibabaOffer['Contact Name'] : 'Not Available'}</p>
                <p><strong>Email:</strong> {selectedAlibabaOffer.Email !== 'N/A' ? selectedAlibabaOffer.Email : 'Not Available'}</p>
                <p><strong>Phone:</strong> {selectedAlibabaOffer.Phone !== 'N/A' ? selectedAlibabaOffer.Phone : 'Not Available'}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlibabaModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Alibaba Offer Details Modal End */}

      {/* CTA Section Start */}
      <NioSection>
        <NioSection.Content>
          <div className="nk-cta-wrap nk-cta-card bg-primary-gradient rounded-3 is-theme position-relative overflow-hidden">
            <Row className="g-0 align-items-center overflow-hidden">
              <Col xs={{ order: 2 }} lg={{ span: 7, order: 0 }}>
                <div className="nk-block-head-content mb-0">
                  <h2 className="newsletter-heading text-capitalize h1 m-0 mb-4 mb-lg-7">
                    Join the global farmer marketplace today
                  </h2>
                  <ul className="nk-btn-group flex-wrap ps-1">
                    <li>
                      <NioButton href="/farmingform" className="btn-lg btn-white text-dark" label="Create an Offer" />
                    </li>
                    <li>
                      <NioButton href="/pricing" className="btn-lg btn-outline-white" label="Pricing & Plans" />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={{ order: 1 }} lg={{ span: 5, order: 0 }}>
                <div className="nk-cta-img-wrap text-end ps-5 pt-7 pt-lg-0 ps-sm-6 ps-lg-0">
                  <img src="images/thumb/farmer.png" alt="farmer-offer-thumb" className="me-n1" />
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/* CTA Section End */}

      {/* Newsletter Section Start */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join thousands of farmers and suppliers using our platform.</p>
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