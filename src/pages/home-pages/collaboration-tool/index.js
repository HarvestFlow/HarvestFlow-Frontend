import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdAgriculture, MdInventory, MdAttachMoney, MdShowChart, MdCloudUpload, MdMap, MdSpeed, MdVerifiedUser, MdShoppingCart } from 'react-icons/md';
import { NioButton, NioSection, NioCard, NioSubscribeField, NioIcon, NioBadge } from '../../../components';
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// Tailwind CSS custom styles
const customStyles = `
  .hero-bg {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://media.smallbiztrends.com/2025/04/professional-woman-farmer-with-digital-tablet-works-in-field-agricultural-business-concept.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  .custom-slick-arrow {
    font-size: 24px;
    color: #34d399;
    z-index: 10;
  }
  .custom-slick-arrow:hover {
    color: #15803d;
  }
  .slick-prev {
    left: -40px;
  }
  .slick-next {
    right: -40px;
  }
  html {
    scroll-behavior: smooth;
  }
`;

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)', transition: { duration: 0.3 } },
};

const heroVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
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

  // Handle scroll to section and update URL
  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL with anchor
      window.history.pushState(null, '', `/index-collaboration-tool#${sectionId}`);
    }
  };

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
      description: 'Monitor and optimize crop growth with real-time data and predictive analytics.',
    },
    {
      icon: MdInventory,
      title: 'Inventory Tracking',
      description: 'Streamline inventory with automated tracking and logistics integration.',
    },
    {
      icon: MdAttachMoney,
      title: 'Financial Insights',
      description: 'Manage budgets, pricing, and payments with powerful financial tools.',
    },
    {
      icon: MdShowChart,
      title: 'Market Analytics',
      description: 'Access real-time market trends to make informed trading decisions.',
    },
    {
      icon: MdCloudUpload,
      title: 'Data Integration',
      description: 'Seamlessly sync data across platforms for efficient operations.',
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
    prevArrow: <div className="custom-slick-arrow slick-prev">←</div>,
    nextArrow: <div className="custom-slick-arrow slick-next">→</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="p-4">
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout variant={4} title="Welcome to Harvest Flow" rootClass="layout-3">
      <style>{customStyles}</style>

      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={heroVariants} initial="hidden" animate="visible">
            <span className="inline-block bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-full mb-4">
              Welcome to Harvest Flow
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white">
              Transform Your <span className="text-green-300">Agricultural Business</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
              Connect with global farmers and buyers while optimizing operations with our Management Suite.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <NioButton
                onClick={() => handleScroll('offers')}
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                label="Explore Marketplace"
              />
              <NioButton
                onClick={() => handleScroll('management-suite')}
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700"
                label="Discover Management Suite"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Management Suite Spotlight Section */}
      <NioSection id="management-suite" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Optimize with Our <span className="text-green-600">Management Suite</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Streamline every aspect of your agricultural business with our advanced management tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="visible"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="glass-card p-6 rounded-lg text-center"
              >
                <div className="mb-4">
                  <tool.icon className="text-5xl text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{tool.title}</h3>
                <motion.p
                  variants={textVariants}
                  initial="visible"
                  whileHover="visible"
                  className="text-base text-gray-700 font-medium"
                >
                  {tool.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <NioButton href="/management-suite" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" label="Explore Management Suite" />
          </div>
        </div>
      </NioSection>

      {/* Farmer Offers Section */}
      <NioSection id="offers" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Farmers’ <span className="text-green-600">Offers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Discover premium agricultural products from farmers worldwide.
            </p>
          </div>
          {errorOffers && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">{errorOffers}</div>
          )}
          {isLoadingOffers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : farmerOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No farmer offers found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerOffers.map((offer) => (
                <motion.div
                  key={offer._id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <NioCard className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                          className={`text-${isActive(offer.availabilityEndDate) ? 'green' : 'red'}-600 bg-${isActive(offer.availabilityEndDate) ? 'green' : 'red'}-100 text-xs px-2 py-1 rounded-full`}
                          label={isActive(offer.availabilityEndDate) ? 'Active' : 'Expired'}
                        />
                        <NioBadge
                          rounded
                          className={`text-${offer.verifiedStatus === 'VERIFIED' ? 'green' : 'yellow'}-600 bg-${offer.verifiedStatus === 'VERIFIED' ? 'green' : 'yellow'}-100 text-xs px-2 py-1 rounded-full`}
                          label={offer.verifiedStatus === 'VERIFIED' ? '✓ Verified' : '⏱ Pending'}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h5 className="text-white text-lg font-bold">{truncateText(offer.title, 20)}</h5>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <NioIcon name="map-pin" className="text-green-600" size="sm" />
                          {truncateText(offer.company?.address?.country || 'N/A', 12)}
                        </span>
                        <span className="flex items-center gap-1">
                          <NioIcon name="package" className="text-green-600" size="sm" />
                          {truncateText(`${offer.quantityAvailable?.value || 'N/A'} ${offer.quantityAvailable?.unit || ''}`, 12)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <NioIcon name="money" className="text-blue-600" size="sm" />
                          {truncateText(`${offer.pricePerUnit?.value || 'N/A'} ${offer.pricePerUnit?.currency || ''}`, 12)}
                        </span>
                        <span className="flex items-center gap-1">
                          <NioIcon name="trending-up" className="text-blue-600" size="sm" />
                          {truncateText(offer.paymentTerms || 'N/A', 12)}
                        </span>
                      </div>
                    </div>
                  </NioCard>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <NioButton href="/offers" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" label="Browse All Offers" />
          </div>
        </div>
      </NioSection>

      {/* Buyer Requests Section */}
      <NioSection className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Buyers’ <span className="text-green-600">Requests</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Connect with buyers seeking high-quality agricultural products.
            </p>
          </div>
          {errorBuyers && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">{errorBuyers}</div>
          )}
          {isLoadingBuyers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : buyerRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No buyer requests found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyerRequests.map((request) => (
                <motion.div
                  key={request._id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <NioCard className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                          className={`text-${isActive(request.availabilityEndDate) ? 'green' : 'red'}-600 bg-${isActive(request.availabilityEndDate) ? 'green' : 'red'}-100 text-xs px-2 py-1 rounded-full`}
                          label={isActive(request.availabilityEndDate) ? 'Active' : 'Expired'}
                        />
                        <NioBadge
                          rounded
                          className={`text-${request.verifiedStatus === 'VERIFIED' ? 'green' : 'yellow'}-600 bg-${request.verifiedStatus === 'VERIFIED' ? 'green' : 'yellow'}-100 text-xs px-2 py-1 rounded-full`}
                          label={request.verifiedStatus === 'VERIFIED' ? '✓ Verified' : '⏱ Pending'}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h5 className="text-white text-lg font-bold">{truncateText(request.title, 20)}</h5>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <NioIcon name="map-pin" className="text-green-600" size="sm" />
                          {truncateText(request.company?.address?.country || 'N/A', 12)}
                        </span>
                        <span className="flex items-center gap-1">
                          <NioIcon name="package" className="text-green-600" size="sm" />
                          {truncateText(`${request.quantityDesired?.value || 'N/A'} ${request.quantityDesired?.unit || ''}`, 12)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <NioIcon name="money" className="text-blue-600" size="sm" />
                          {truncateText(`${request.pricePerUnit?.value || 'N/A'} ${request.pricePerUnit?.currency || ''}`, 12)}
                        </span>
                        <span className="flex items-center gap-1">
                          <NioIcon name="trending-up" className="text-blue-600" size="sm" />
                          {truncateText(request.paymentTerms || 'N/A', 12)}
                        </span>
                      </div>
                    </div>
                  </NioCard>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <NioButton href="/buyers" className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white" label="Find More Buyers" />
          </div>
        </div>
      </NioSection>

      {/* Features Section */}
      <NioSection className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose <span className="text-green-600">Harvest Flow</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              A complete platform for modern agriculture, from farm management to global trading.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <MdMap className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Global Connection</h4>
            </div>
            <div className="text-center">
              <MdSpeed className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">AI Intelligence</h4>
            </div>
            <div className="text-center">
              <MdVerifiedUser className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Secure Transactions</h4>
            </div>
            <div className="text-center">
              <MdShoppingCart className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Integrated Logistics</h4>
            </div>
          </div>
        </div>
      </NioSection>

      {/* Testimonial Section */}
      <NioSection className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Hear From <span className="text-green-600">Farmers & Distributors</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Global testimonials highlight Harvest Flow’s impact on collaboration and success.
            </p>
          </div>
          <TestimonialContent />
        </div>
      </NioSection>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Agricultural Business?</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <NioButton href="/offers" className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100" label="Explore Offers" />
            <NioButton href="/management-suite" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600" label="Discover Management Suite" />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NioSection className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-semibold">Subscribe to Our Newsletter</h4>
              <p className="text-gray-600 mt-2">Join thousands of farmers and distributors using Harvest Flow.</p>
            </div>
            <div className="w-full md:w-1/2">
              <NioSubscribeField variant="three" />
            </div>
          </div>
        </div>
      </NioSection>
    </AppLayout>
  );
}

export default Index;