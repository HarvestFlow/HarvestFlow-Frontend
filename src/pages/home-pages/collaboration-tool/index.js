import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { Tilt } from 'react-tilt';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioButton, NioSection, NioCard, NioSubscribeField, NioIcon, NioBadge } from '../../../components';
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';
import {
  MdAgriculture,
  MdInventory,
  MdAttachMoney,
  MdShowChart,
  MdCloudUpload,
  MdMap,
  MdSpeed,
  MdVerifiedUser,
  MdShoppingCart,
} from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)', transition: { duration: 0.3 } },
};

function Index() {
  const [farmerOffers, setFarmerOffers] = useState([]);
  const [buyerRequests, setBuyerRequests] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [isLoadingBuyers, setIsLoadingBuyers] = useState(false);
  const [errorOffers, setErrorOffers] = useState('');
  const [errorBuyers, setErrorBuyers] = useState('');
  const API_URL = 'http://localhost:5000';
  const WHEAT_IMAGE_URL = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1074&auto=format&fit=crop';

  // Truncate text helper
  const truncateText = (text, maxLength) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Check if offer/request is active
  const isActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  // Fetch farmer offers
  useEffect(() => {
    const fetchFarmerOffers = async () => {
      setIsLoadingOffers(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/farmer`, {
          params: { page: 1, limit: 3 },
          withCredentials: true,
        });
        const offers = Array.isArray(response.data.offers) ? response.data.offers.slice(0, 3) : [];
        if (offers.length === 0) {
          setErrorOffers('No farmer offers available.');
          setFarmerOffers([]);
        } else {
          // Sort by active status and creation date
          offers.sort((a, b) => {
            const isActiveA = isActive(a.availabilityEndDate) ? 0 : 1;
            const isActiveB = isActive(b.availabilityEndDate) ? 0 : 1;
            if (isActiveA !== isActiveB) return isActiveA - isActiveB;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setFarmerOffers(offers);
          setErrorOffers('');
        }
      } catch (error) {
        setErrorOffers(error.response?.data?.error || 'Failed to fetch farmer offers.');
        setFarmerOffers([]);
      } finally {
        setIsLoadingOffers(false);
      }
    };
    fetchFarmerOffers();
  }, []);

  // Fetch buyer requests
  useEffect(() => {
    const fetchBuyerRequests = async () => {
      setIsLoadingBuyers(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/buyer`, {
          params: { page: 1, limit: 3 },
          withCredentials: true,
        });
        const requests = Array.isArray(response.data) ? response.data.slice(0, 3) : [];
        if (requests.length === 0) {
          setErrorBuyers('No buyer requests available.');
          setBuyerRequests([]);
        } else {
          // Sort by active status and creation date
          requests.sort((a, b) => {
            const isActiveA = isActive(a.availabilityEndDate) ? 0 : 1;
            const isActiveB = isActive(b.availabilityEndDate) ? 0 : 1;
            if (isActiveA !== isActiveB) return isActiveA - isActiveB;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setBuyerRequests(requests);
          setErrorBuyers('');
        }
      } catch (error) {
        setErrorBuyers(error.response?.data?.error || 'Failed to fetch buyer requests.');
        setBuyerRequests([]);
      } finally {
        setIsLoadingBuyers(false);
      }
    };
    fetchBuyerRequests();
  }, []);

  const tools = [
    {
      icon: MdAgriculture,
      title: 'Crop Management',
      description: 'Orchestrate your crops with precision, monitor harvests effortlessly, and elevate yields to new heights.',
    },
    {
      icon: MdInventory,
      title: 'Inventory Management',
      description: 'Master your inventory with ease, streamline logistics, and optimize shipments flawlessly.',
    },
    {
      icon: MdAttachMoney,
      title: 'Finance & Pricing',
      description: 'Unlock powerful financial insights, manage payments smoothly, and optimize pricing strategies.',
    },
    {
      icon: MdShowChart,
      title: 'Trading & Data',
      description: 'Stay ahead with real-time market data and cutting-edge trading tools for global success.',
    },
    {
      icon: MdCloudUpload,
      title: 'Data Upload',
      description: 'Seamlessly import data, connect systems, and synchronize operations with elegance.',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <Col xs={12} sm={6} lg={4}>
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
        <div className="space-y-2 p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </Col>
  );

  return (
    <AppLayout variant={4} title="Welcome to Harvest Flow" rootClass="layout-3">
      {/* Welcome Section */}
      <section className="nk-banner nk-banner-agri">
        <div className="nk-banner-wrap position-relative bg-green-100">
          <div className="nk-mask"></div>
          <div className="nk-banner-content">
            <Container>
              <Row className="justify-content-center">
                <Col xl={9}>
                  <div className="nk-banner-content text-center">
                    <span className="badge badge-md text-bg-dark rounded-pill text-uppercase mb-3">Welcome Back</span>
                    <h1 className="text-capitalize display-6 mb-2">
                      Explore <span className="text-green-600">Global Opportunities</span> with Harvest Flow
                    </h1>
                    <p className="fs-5 mb-5">
                      Connect with farmers and buyers worldwide to grow your agricultural business.
                    </p>
                    <ul className="nk-btn-group flex-wrap justify-content-center pt-3">
                      <li>
                        <NioButton href="/offers" className="btn-green-600" label="Browse Offers" />
                      </li>
                      <li>
                        <NioButton href="/buyers" className="btn-outline-green-600" label="Find Buyers" />
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>

      {/* Farmer Offers Section */}
      <NioSection className="nk-section-offers bg-olive-50 is-theme">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="pb-5 text-center">
                <h2>Farmers’ <span className="text-green-600">Offers</span></h2>
                <p className="fs-5 mb-4">
                  Discover premium agricultural products from farmers worldwide.
                </p>
                <NioButton href="/offers" className="btn-green-600" label="Browse Offers" />
              </div>
            </Col>
          </Row>
          {errorOffers && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorOffers}
            </div>
          )}
          {isLoadingOffers ? (
            <Row className="gy-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : farmerOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No farmer offers found.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {farmerOffers.map((offer) => (
                <Col key={offer._id} xs={12} sm={6} lg={4}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    <NioCard className="h-100 has-shadow border-0 offer-card bg-white overflow-hidden">
                      <div className="relative">
                        <img
                          src={WHEAT_IMAGE_URL}
                          alt={offer.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2">
                          <NioBadge
                            rounded
                            className={`text-bg-${isActive(offer.availabilityEndDate) ? 'success' : 'danger'}-soft text-xs tooltip`}
                            data-tooltip={isActive(offer.availabilityEndDate) ? 'Active offer' : 'Expired offer'}
                            label={isActive(offer.availabilityEndDate) ? 'Active' : 'Expired'}
                          />
                          <NioBadge
                            rounded
                            className={`text-bg-${offer.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft text-xs tooltip`}
                            data-tooltip={offer.verifiedStatus === 'VERIFIED' ? 'Verified supplier' : 'Pending verification'}
                            label={offer.verifiedStatus === 'VERIFIED' ? '✓ Verified' : '⏱ Pending'}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-4">
                          <h5 className="text-white text-lg font-bold">{truncateText(offer.title, 20)}</h5>
                        </div>
                      </div>
                      <NioCard.Body className="p-4 flex flex-col">
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <NioIcon name="map-pin" className="text-green-500" size="sm" />
                              {truncateText(offer.company?.address?.country || 'N/A', 12)}
                            </span>
                            <span className="flex items-center gap-1">
                              <NioIcon name="package" className="text-green-500" size="sm" />
                              {truncateText(`${offer.quantityAvailable?.value || 'N/A'} ${offer.quantityAvailable?.unit || ''}`, 12)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span className="flex items-center gap-1">
                              <NioIcon name="money" className="text-blue-500" size="sm" />
                              {truncateText(`${offer.pricePerUnit?.value || 'N/A'} ${offer.pricePerUnit?.currency || ''}`, 12)}
                            </span>
                            <span className="flex items-center gap-1">
                              <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                              {truncateText(offer.paymentTerms || 'N/A', 12)}
                            </span>
                          </div>
                        </div>
                      </NioCard.Body>
                    </NioCard>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </NioSection.Content>
      </NioSection>

      {/* Buyer Requests Section */}
      <NioSection className="nk-section-buyers bg-green-50 is-theme">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="pb-5 text-center">
                <h2>Buyers’ <span className="text-green-600">Requests</span></h2>
                <p className="fs-5 mb-4">
                  Connect with buyers seeking high-quality agricultural products.
                </p>
                <NioButton href="/buyers" className="btn-outline-green-600" label="Find Buyers" />
              </div>
            </Col>
          </Row>
          {errorBuyers && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorBuyers}
            </div>
          )}
          {isLoadingBuyers ? (
            <Row className="gy-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : buyerRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No buyer requests found.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {buyerRequests.map((request) => (
                <Col key={request._id} xs={12} sm={6} lg={4}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    <NioCard className="h-100 has-shadow border-0 offer-card bg-white overflow-hidden">
                      <div className="relative">
                        <img
                          src={WHEAT_IMAGE_URL}
                          alt={request.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                        />
                        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2">
                          <NioBadge
                            rounded
                            className={`text-bg-${isActive(request.availabilityEndDate) ? 'success' : 'danger'}-soft text-xs tooltip`}
                            data-tooltip={isActive(request.availabilityEndDate) ? 'Active request' : 'Expired request'}
                            label={isActive(request.availabilityEndDate) ? 'Active' : 'Expired'}
                          />
                          <NioBadge
                            rounded
                            className={`text-bg-${request.verifiedStatus === 'VERIFIED' ? 'success' : 'warning'}-soft text-xs tooltip`}
                            data-tooltip={request.verifiedStatus === 'VERIFIED' ? 'Verified buyer' : 'Pending verification'}
                            label={request.verifiedStatus === 'VERIFIED' ? '✓ Verified' : '⏱ Pending'}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-4">
                          <h5 className="text-white text-lg font-bold">{truncateText(request.title, 20)}</h5>
                        </div>
                      </div>
                      <NioCard.Body className="p-4 flex flex-col">
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <NioIcon name="map-pin" className="text-green-500" size="sm" />
                              {truncateText(request.company?.address?.country || 'N/A', 12)}
                            </span>
                            <span className="flex items-center gap-1">
                              <NioIcon name="package" className="text-green-500" size="sm" />
                              {truncateText(`${request.quantityDesired?.value || 'N/A'} ${request.quantityDesired?.unit || ''}`, 12)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span className="flex items-center gap-1">
                              <NioIcon name="money" className="text-blue-500" size="sm" />
                              {truncateText(`${request.pricePerUnit?.value || 'N/A'} ${request.pricePerUnit?.currency || ''}`, 12)}
                            </span>
                            <span className="flex items-center gap-1">
                              <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                              {truncateText(request.paymentTerms || 'N/A', 12)}
                            </span>
                          </div>
                        </div>
                      </NioCard.Body>
                    </NioCard>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </NioSection.Content>
      </NioSection>

      {/* Management Tools Section */}
      <NioSection className="nk-product-section py-5 py-lg-7 bg-agri-gradient">
        <NioSection.Head alignX="center">
          <h2 className="text-capitalize">
            Explore Our <span className="text-green-600">Innovative Tools</span>
          </h2>
          <p className="fs-5 mb-4">Transform your agricultural operations with tools designed for precision and scalability.</p>
          <NioButton href="/backoffice" className="btn-green-600" label="Backoffice" />
        </NioSection.Head>
        <NioSection.Content>
          <Container>
            <Slider {...sliderSettings} className="nk-tool-carousel">
              {tools.map((tool, index) => {
                const ToolIcon = tool.icon;
                return (
                  <div key={index} className="px-3">
                    <Tilt options={{ max: 15, scale: 1.05, speed: 400 }}>
                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                      >
                        <NioCard className="h-100 has-shadow border-0 tool-card bg-white">
                          <NioCard.Body className="p-4 d-flex flex-column align-items-center">
                            <motion.div
                              className="icon-wrapper mb-3"
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ToolIcon className="rounded-circle shadow-sm p-3 bg-green-600 text-white icon-xl" />
                            </motion.div>
                            <h4 className="text-center mb-2">{tool.title}</h4>
                            <div className="description-wrapper bg-white p-3 rounded">
                              <p className="fs-5 text-center mb-0">{tool.description}</p>
                            </div>
                          </NioCard.Body>
                        </NioCard>
                      </motion.div>
                    </Tilt>
                  </div>
                );
              })}
            </Slider>
          </Container>
        </NioSection.Content>
      </NioSection>

      {/* Feature Section */}
      <NioSection className="nk-feature-section bg-green-50 py-5 py-lg-7">
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-green-600">Why Choose</span> Harvest Flow?
          </h2>
          <p className="fs-5 mb-0">A complete platform for modern agriculture, from farm management to global trading.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-4">
            <Col sm={6} lg={3}>
              <div className="text-center">
                <MdMap className="mb-4 rounded-circle shadow-sm p-3 bg-green-600 text-white icon-lg" />
                <h4>Global Connection</h4>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="text-center">
                <MdSpeed className="mb-4 rounded-circle shadow-sm p-3 bg-green-600 text-white icon-lg" />
                <h4>AI Intelligence</h4>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="text-center">
                <MdVerifiedUser className="mb-4 rounded-circle shadow-sm p-3 bg-green-600 text-white icon-lg" />
                <h4>Secure Transactions</h4>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="text-center">
                <MdShoppingCart className="mb-4 rounded-circle shadow-sm p-3 bg-green-600 text-white icon-lg" />
                <h4>Integrated Logistics</h4>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/* Testimonial Section */}
      <NioSection className="nk-section-testimonial py-5 py-lg-7">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 text-center">
              <h2>Hear What <span className="text-green-600">Farmers and Distributors</span> Say</h2>
              <p className="fs-5 mb-0">Global testimonials highlight Harvest Flow’s impact on collaboration, efficiency, and agricultural success.</p>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>

      {/* CTA Section */}
      <section className="py-5 py-lg-7 bg-green-600 is-theme">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center">
                <h2 className="mb-0">Ready to Transform Your Agricultural Business?</h2>
                <ul className="nk-btn-group flex-wrap justify-content-center pt-4">
                  <li>
                    <NioButton href="/offers" className="btn-white text-dark text-green-600" label="Explore Offers" />
                  </li>
                  <li>
                    <NioButton href="/buyers" className="btn-outline-white" label="Find Buyers" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* NewsLetter Section */}
      <NioSection className="nk-section nk-newsletter-section py-5 py-lg-7">
        <Row className="justify-content-center align-items-center">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-5">Join thousands of farmers and distributors using Harvest Flow.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={4}>
            <NioSubscribeField variant="three" />
          </Col>
        </Row>
      </NioSection>
    </AppLayout>
  );
}

export default Index;