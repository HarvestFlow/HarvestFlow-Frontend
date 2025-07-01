import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import debounce from 'lodash/debounce';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard, NioSubscribeField } from '../../../components';

// Helper function to get country name from code
const getCountryName = (code) => {
  const countryMap = {
    'TH': 'Turkey',
    'FR': 'France',
    'KZ': 'Tunisia',
    'CA': 'Canada',
    'UA': 'Ukraine',
    'TN': 'Tunisia',
  };
  return countryMap[code?.toUpperCase()] || 'Unknown';
};

// Constants
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
  const [showExpired, setShowExpired] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [countryFilter, setCountryFilter] = useState('All');
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isContactLoading, setIsContactLoading] = useState(false);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Check if farmer offer is active
  const isFarmerOfferActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  // Check if offer is recommended
  const isRecommended = (offer) => {
    const isActive = isFarmerOfferActive(offer.availabilityEndDate);
    const isVerified = offer.verifiedStatus === 'VERIFIED';
    const createdAt = new Date(offer.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const isRecent = createdAt >= sevenDaysAgo;
    return isActive && isVerified && isRecent;
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setUserProfile({ firstname: 'Anonymous', email: 'N/A', company: 'N/A' });
        setContactError('Failed to fetch user profile. Please log in again.');
      }
    };
    fetchUserProfile();
  }, []);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setSearchSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/farmerform/search-suggestions`, {
          params: { query },
          withCredentials: true,
        });
        setSearchSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error('Search Suggestions Error:', error);
        setSearchSuggestions([]);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle filter chip addition/removal
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Apply filters to offers
  const filteredFarmerOffers = Array.isArray(farmerOffers)
    ? farmerOffers.filter((offer) => {
        const matchesSearch = (offer.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || (offer.productOffered || '').toLowerCase().includes(filterCategory.toLowerCase());
        const matchesExpired = showExpired || isFarmerOfferActive(offer.availabilityEndDate);
        const matchesPrice = (offer.pricePerUnit?.value || 0) >= priceRange[0] && (offer.pricePerUnit?.value || 0) <= priceRange[1];
        const matchesCountry = countryFilter === 'All' || (offer.company?.address?.country || '').toLowerCase() === countryFilter.toLowerCase();
        return matchesSearch && matchesCategory && matchesExpired && matchesPrice && matchesCountry;
      })
    : [];

  const filteredAlibabaOffers = Array.isArray(alibabaOffers)
    ? alibabaOffers.filter((offer) => (offer.Title || '').toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Fetch farmer offers
  useEffect(() => {
    const fetchFarmerOffers = async () => {
      setIsLoadingFarmer(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/farmer`, {
          params: { page: currentPageFarmer, limit: ITEMS_PER_PAGE },
          withCredentials: true,
        });
        const offers = Array.isArray(response.data.offers) ? response.data.offers : [];
        offers.sort((a, b) => {
          const isActiveA = isFarmerOfferActive(a.availabilityEndDate) ? 0 : 1;
          const isActiveB = isFarmerOfferActive(b.availabilityEndDate) ? 0 : 1;
          if (isActiveA !== isActiveB) return isActiveA - isActiveB;
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          if (dateB !== dateA) return dateB - dateA;
          return (a.pricePerUnit?.value || Infinity) - (b.pricePerUnit?.value || Infinity);
        });
        setFarmerOffers(offers);
        setTotalFarmerOffers(response.data.totalOffers || 0);
        setTotalFarmerPages(response.data.totalPages || 1);
        if (offers.length === 0 && response.data.totalOffers === 0) {
          setErrorFarmer('No offers available in the database.');
        } else {
          setErrorFarmer('');
        }
      } catch (error) {
        setErrorFarmer(error.response?.data?.error || 'Failed to fetch farmer offers.');
        setFarmerOffers([]);
        setTotalFarmerOffers(0);
        setTotalFarmerPages(1);
      } finally {
        setIsLoadingFarmer(false);
      }
    };
    fetchFarmerOffers();
  }, [currentPageFarmer]);

  // Fetch Alibaba offers
  useEffect(() => {
    const fetchAlibabaOffers = async () => {
      setIsLoadingAlibaba(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/getAlibabaWheatOffers`, {
          params: { page: currentPageAlibaba, limit: ITEMS_PER_PAGE },
          withCredentials: true,
        });
        const offers = Array.isArray(response.data.offers) ? response.data.offers : [];
        setAlibabaOffers(offers);
        setTotalAlibabaOffers(response.data.totalOffers || 0);
        setTotalAlibabaPages(response.data.totalPages || 1);
      } catch (error) {
        setErrorAlibaba(error.response?.data?.error || 'Failed to fetch Alibaba wheat offers.');
        setAlibabaOffers([]);
        setTotalAlibabaOffers(0);
        setTotalAlibabaPages(1);
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
    setContactError('');
    setContactSuccess('');
  };

  const handleCloseFarmerModal = () => {
    setShowFarmerModal(false);
    setSelectedFarmerOffer(null);
    setContactError('');
    setContactSuccess('');
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

  // Handle contact supplier
  const handleContactSupplier = async () => {
    if (!selectedFarmerOffer?.company?.contactEmail) {
      setContactError('No contact email available for this offer.');
      return;
    }

    if (!userProfile?.firstname || !userProfile?.email) {
      setContactError('Please complete your profile (name, email, company) to contact the supplier.');
      return;
    }

    setIsContactLoading(true);
    setContactError('');
    setContactSuccess('');

    try {
      const response = await axios.post(
        `${API_URL}/user/api/contact-offer`,
        {
          firstname: userProfile.firstname,
          email: userProfile.email,
          company: userProfile.company,
          toEmail: selectedFarmerOffer.company.contactEmail,
          offerTitle: selectedFarmerOffer.title,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setContactSuccess('Your interest has been sent successfully!');
        setTimeout(() => {
          setContactSuccess('');
          setShowFarmerModal(false);
          setIsContactLoading(false);
        }, 5000); // Increased to 5 seconds for better readability
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send message. Please try again.';
      setContactError(errorMessage);
      setIsContactLoading(false);
    }
  };

  // Handle page change for Farmer Offers
  const handleFarmerPageChange = (page) => {
    if (page >= 1 && page <= totalFarmerPages) {
      setCurrentPageFarmer(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle page change for Alibaba Offers
  const handleAlibabaPageChange = (page) => {
    if (page >= 1 && page <= totalAlibabaPages) {
      setCurrentPageAlibaba(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate pagination items with ellipsis
  const getPaginationItems = (currentPage, totalPages) => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');
    if (totalPages > 1) range.unshift(1);
    if (totalPages > 2) range.push(totalPages);
    return range;
  };

  // Calculate pagination display range
  const farmerStartIndex = (currentPageFarmer - 1) * ITEMS_PER_PAGE + 1;
  const farmerEndIndex = Math.min(currentPageFarmer * ITEMS_PER_PAGE, totalFarmerOffers);
  const alibabaStartIndex = (currentPageAlibaba - 1) * ITEMS_PER_PAGE + 1;
  const alibabaEndIndex = Math.min(currentPageAlibaba * ITEMS_PER_PAGE, totalAlibabaOffers);

  // Skeleton loader component
  const SkeletonCard = () => (
    <Col xs={12} sm={6} lg={4}>
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-44 w-full mb-4"></div>
        <div className="space-y-2 p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </Col>
  );

  return (
    <AppLayout title="Farmer Offers" rootClass="layout-1">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <style>
        {`
          .filter-float {
            position: fixed;
            top: 150px;
            right: 20px;
            z-index: 1000;
            width: 300px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            max-height: calc(100vh - 170px);
            overflow-y: auto;
          }
          .filter-float.collapsed {
            width: 60px;
            height: 60px;
            padding: 0;
            overflow: hidden;
          }
          .filter-toggle-btn {
            background: #4CAF50;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 10px;
            left: 5px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
          }
          .filter-toggle-btn:hover {
            transform: scale(1.1);
          }
          .filter-chip {
            background: #e6f3e6;
            color: #2e7d32;
            border-radius: 16px;
            padding: 6px 12px;
            margin: 4px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .filter-chip:hover {
            background: #d0e8d0;
          }
          .filter-chip .remove {
            font-size: 12px;
            color: #e65100;
          }
          .suggestion-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background 0.2s ease;
          }
          .suggestion-item:hover {
            background: #f5f5f5;
          }
          .price-range {
            padding: 0 10px;
          }
          .price-range input {
            width: 100%;
          }
          .fade-in {
            animation: fadeIn 0.3s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .btn-farmer {
            background-color: #4CAF50;
            border: none;
            border-radius: 8px;
            color: white;
            transition: all 0.3s ease;
          }
          .btn-farmer:hover {
            background-color: #2E7D32;
            transform: scale(1.05);
          }
          .btn-alibaba {
            background-color: #FF6200;
            border: none;
            border-radius: 8px;
            color: white;
            transition: all 0.3s ease;
          }
          .btn-alibaba:hover {
            background-color: #E65100;
            transform: scale(1.05);
          }
          .card-shadow {
            transition: all 0.3s ease-in-out;
          }
          .card-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
          .gradient-overlay {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          }
          .recommended-badge {
            background-color: #28a745;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 12px;
          }
          .tooltip {
            position: relative;
          }
          .tooltip:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 20;
          }
          .contact-info:hover {
            text-decoration: underline;
            color: #4CAF50;
          }
        `}
      </style>

      {/* Hero Section */}
      <NioSection className="bg-gradient-to-b from-green-50 to-white pt-20 pb-10 mt-20">
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 animate-fade-in">
                Harvest Flow Offers
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Connect with farmers and suppliers worldwide to discover premium agricultural offers.
              </p>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/* Floating Filter Section */}
      <div className={`filter-float ${isFilterOpen ? 'fade-in' : 'collapsed'}`} style={{ top: '150px' }}>
        <div
          className="filter-toggle-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          title={isFilterOpen ? 'Collapse Filters' : 'Open Filters'}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5281/5281558.png"
            alt="Filter Toggle"
            className="w-8 h-8"
          />
        </div>
        {isFilterOpen && (
          <div className="p-4">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Filters</h4>
            <div className="relative mb-4">
              <NioField.Input
                icon="search before z-1"
                placeholder="Search offers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              />
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-20">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setSearchSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedFilters.map((filter) => (
                  <div key={filter} className="filter-chip">
                    {filter}
                    <span className="remove" onClick={() => toggleFilter(filter)}>✕</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">Category</h5>
              <div className="flex flex-wrap gap-2">
                {['All', 'Wheat', 'Corn', 'Barley'].map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filterCategory === category
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    }`}
                    onClick={() => {
                      setFilterCategory(category);
                      toggleFilter(category);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">Country</h5>
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  toggleFilter(e.target.value);
                }}
                className="w-full p-2 rounded-lg border border-gray-300"
              >
                <option value="All">All Countries</option>
                {Object.values(getCountryName).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">Price Range ($)</h5>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="mb-2"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showExpired}
                  onChange={(e) => {
                    setShowExpired(e.target.checked);
                    toggleFilter('Show Expired');
                  }}
                  className="mr-2"
                />
                Show expired offers
              </label>
            </div>
            <NioButton
              className="btn-farmer w-full mt-4"
              label="Clear Filters"
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('All');
                setShowExpired(false);
                setPriceRange([0, 1000]);
                setCountryFilter('All');
                setSelectedFilters([]);
              }}
            />
          </div>
        )}
      </div>

      {/* Latest Farmer Offers Section */}
      <NioSection className="py-10 bg-gray-50">
        <NioSection.Head className="pb-6">
          <h2 className="text-3xl font-bold text-green-800">Latest Farmer Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorFarmer && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorFarmer}
            </div>
          )}
          {isLoadingFarmer ? (
            <Row className="gy-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : filteredFarmerOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No farmer offers found.</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {filteredFarmerOffers.map((offer) => (
                <Col xs={12} sm={6} lg={4} key={offer._id}>
                  <NioCard className="border-0 rounded-xl bg-white card-shadow overflow-hidden transform transition-all hover:scale-105">
                    <div className="relative">
                      <img
                        src={WHEAT_IMAGE_URL}
                        alt={offer.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                      />
                      <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2">
                        {isRecommended(offer) && (
                          <NioBadge
                            rounded
                            className="recommended-badge tooltip"
                            data-tooltip="Recommended: Active, verified, and recent"
                            label={<><NioIcon name="star" size="xs" /> Recommandé</>}
                          />
                        )}
                        <NioBadge
                          rounded
                          className={`text-bg-${isFarmerOfferActive(offer.availabilityEndDate) ? 'success' : 'danger'}-soft text-xs tooltip`}
                          data-tooltip={isFarmerOfferActive(offer.availabilityEndDate) ? 'Active offer' : 'Expired offer'}
                          label={isFarmerOfferActive(offer.availabilityEndDate) ? 'Active' : 'Expired'}
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
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <NioIcon name="map-pin" className="text-green-500" size="sm" />
                            {truncateText(offer.company?.address?.country, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="package" className="text-green-500" size="sm" />
                            {`${offer.quantityAvailable?.value || 'N/A'} ${offer.quantityAvailable?.unit || ''}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <NioIcon name="clock" className="text-blue-500" size="sm" />
                            {truncateText(offer.destination, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                            {truncateText(offer.paymentTerms, 12)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4 flex-grow">{truncateText(offer.productDescription, 50)}</p>
                      <div className="flex justify-between items-center">
                        <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                        <NioButton
                          className="btn-farmer text-sm px-4 py-2"
                          label="Details"
                          onClick={() => handleShowFarmerModal(offer)}
                          icon="arrow-right after"
                        />
                      </div>
                    </div>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingFarmer && totalFarmerOffers > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {farmerStartIndex}-{farmerEndIndex} of {totalFarmerOffers} Farmer Offers
              </p>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Button
                      className={`btn-farmer px-3 py-1 text-sm ${currentPageFarmer === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageFarmer === 1}
                      onClick={() => handleFarmerPageChange(currentPageFarmer - 1)}
                    >
                      Prev
                    </Button>
                  </li>
                  {getPaginationItems(currentPageFarmer, totalFarmerPages).map((item, i) => (
                    <li key={i}>
                      {item === '...' ? (
                        <span className="px-3 py-1 text-sm">...</span>
                      ) : (
                        <Button
                          className={`px-3 py-1 text-sm ${
                            currentPageFarmer === item ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                          }`}
                          onClick={() => handleFarmerPageChange(item)}
                        >
                          {item}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button
                      className={`btn-farmer px-3 py-1 text-sm ${currentPageFarmer === totalFarmerPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageFarmer === totalFarmerPages}
                      onClick={() => handleFarmerPageChange(currentPageFarmer + 1)}
                    >
                      Next
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </NioSection.Content>
      </NioSection>

      {/* Latest Alibaba Wheat Offers Section */}
      <NioSection className="py-10">
        <NioSection.Head className="pb-6">
          <h2 className="text-3xl font-bold text-orange-800">Latest Alibaba Wheat Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorAlibaba && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorAlibaba}
            </div>
          )}
          {isLoadingAlibaba ? (
            <Row className="gy-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : filteredAlibabaOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No Alibaba wheat offers found.</p>
              <p className="text-sm text-gray-500">Try adjusting your search.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {filteredAlibabaOffers.map((offer, index) => (
                <Col xs={6} key={index}>
                  <NioCard className="border-0 rounded-xl bg-white card-shadow-zero overflow-hidden transform transition-all">
                    <div className="relative">
                      <img
                        src={offer['Image URL'] !== 'N/A' ? offer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                        alt={offer.Title}
                        className="w-full h-48 object-cover"
                        onError={(e) => (e.target.src = WHEAT_IMAGE_URL)}
                      />
                      <div className="absolute top-2 left-2">
                        <NioBadge rounded className="text-bg-orange-500 text-xs" label="Alibaba" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-4">
                        <h5 className="text-white text-lg font-bold">{truncateText(offer.Title, 20)}</h5>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-base font-semibold text-gray-800">{truncateText(offer.Title, 20)}</h5>
                          <NioBadge rounded className="text-bg-success text-xs" label={truncateText(offer.Price, 15)} />
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className={`flag-icon flag-icon-${offer['Supplier Info (Years & Location)']?.slice(-2).toLowerCase() || 'unknown'}`}></span>
                            {getCountryName(offer['Supplier Info (Years & Location)']?.slice(-2))}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <NioIcon name="user-alt" className="text-orange-500" size="sm" />
                            {truncateText(offer.Supplier, 15)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <NioButton
                          className="btn-alibaba text-sm px-4 py-2"
                          label="Details"
                          onClick={() => handleShowAlibabaModal(offer)}
                          icon="arrow-right after"
                        />
                      </div>
                    </div>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingAlibaba && totalAlibabaOffers > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {alibabaStartIndex}-{alibabaEndIndex} of {totalAlibabaOffers} Alibaba Offers
              </p>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Button
                      className={`btn-alibaba px-3 py-1 text-sm ${currentPageAlibaba === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageAlibaba === 1}
                      onClick={() => handleAlibabaPageChange(currentPageAlibaba - 1)}
                    >
                      Prev
                    </Button>
                  </li>
                  {getPaginationItems(currentPageAlibaba, totalAlibabaPages).map((item, i) => (
                    <li key={i}>
                      {item === '...' ? (
                        <span className="px-3 py-1 text-sm">...</span>
                      ) : (
                        <Button
                          className={`px-3 py-1 text-sm ${
                            currentPageAlibaba === item ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                          }`}
                          onClick={() => handleAlibabaPageChange(item)}
                        >
                          {item}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button
                      className={`btn-alibaba px-3 py-1 text-sm ${currentPageAlibaba === totalAlibabaPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageAlibaba === totalAlibabaPages}
                      onClick={() => handleAlibabaPageChange(currentPageAlibaba + 1)}
                    >
                      Next
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </NioSection.Content>
      </NioSection>

      {/* Farmer Offer Details Modal */}
      <Modal show={showFarmerModal} onHide={handleCloseFarmerModal} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-xl font-bold text-green-800">
            {selectedFarmerOffer?.title || 'Untitled Offer'}
            <NioBadge
              className={`ml-2 text-bg-${isFarmerOfferActive(selectedFarmerOffer?.availabilityEndDate) ? 'success' : 'danger'}-soft text-xs`}
              label={isFarmerOfferActive(selectedFarmerOffer?.availabilityEndDate) ? 'Active' : 'Expired'}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedFarmerOffer && (
            <Row className="g-4">
              <Col md={6}>
                <img
                  src={WHEAT_IMAGE_URL}
                  alt={selectedFarmerOffer.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-green-800 mb-3">Contact Supplier</h5>
                  {contactError && (
                    <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-3">
                      {contactError}
                    </div>
                  )}
                  {contactSuccess && (
                    <div className="bg-green-100 text-green-700 p-2 rounded-lg mb-3">
                      {contactSuccess}
                    </div>
                  )}
                  <div className="flex items-center mb-3">
                    <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{selectedFarmerOffer.contactName || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">
                        <a href={`mailto:${selectedFarmerOffer.company?.contactEmail}`} className="contact-info">
                          {selectedFarmerOffer.company?.contactEmail || 'N/A'}
                        </a>
                      </p>
                      <p className="text-xs text-gray-500">
                        <a href={`tel:${selectedFarmerOffer.company?.contactPhone}`} className="contact-info">
                          {selectedFarmerOffer.company?.contactPhone || 'N/A'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <NioButton
                    className="btn-farmer w-full"
                    label={isContactLoading ? 'Sending...' : 'Send Interest'}
                    onClick={handleContactSupplier}
                    disabled={isContactLoading}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-lg font-semibold text-green-800 mb-3">Offer Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Company</p>
                    <p className="text-sm">{selectedFarmerOffer.company?.name || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Country</p>
                    <p className="text-sm">{selectedFarmerOffer.company?.address?.country || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Product</p>
                    <p className="text-sm">{selectedFarmerOffer.productOffered || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Quantity</p>
                    <p className="text-sm">{`${selectedFarmerOffer.quantityAvailable?.value || 'N/A'} ${selectedFarmerOffer.quantityAvailable?.unit || ''}`}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Price</p>
                    <p className="text-sm">{`${selectedFarmerOffer.pricePerUnit?.value || 'N/A'} ${selectedFarmerOffer.pricePerUnit?.currency || ''}`}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Payment Terms</p>
                    <p className="text-sm">{selectedFarmerOffer.paymentTerms || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Destination</p>
                    <p className="text-sm">{selectedFarmerOffer.destination || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Buyers</p>
                    <p className="text-sm">{selectedFarmerOffer.lookingForBuyersFrom?.join(', ') || 'Any'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Email</p>
                    <p className="text-sm">{selectedFarmerOffer.company?.contactEmail || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Phone</p>
                    <p className="text-sm">{selectedFarmerOffer.company?.contactPhone || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Registration</p>
                    <p className="text-sm">{selectedFarmerOffer.company?.registrationNumber || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Category</p>
                    <p className="text-sm">{selectedFarmerOffer.productCategory || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-green-800 mb-3">Description</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {selectedFarmerOffer.productDescription || 'No description provided'}
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={handleCloseFarmerModal} disabled={isContactLoading}>
            Close
          </Button>
          <NioButton
            href="/farmingform"
            className="btn-farmer"
            label="Create Similar Offer"
            icon="plus before"
            disabled={isContactLoading}
          />
        </Modal.Footer>
      </Modal>

      {/* Alibaba Offer Details Modal */}
      <Modal show={showAlibabaModal} onHide={handleCloseAlibabaModal} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-xl font-bold text-orange-800">
            {selectedAlibabaOffer?.Title || 'Untitled Offer'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedAlibabaOffer && (
            <Row className="g-4">
              <Col md={6}>
                <img
                  src={selectedAlibabaOffer['Image URL'] !== 'N/A' ? selectedAlibabaOffer['Image URL'] : DEFAULT_ALIBABA_IMAGE_URL}
                  alt={selectedAlibabaOffer.Title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-orange-800 mb-3">Supplier Info</h5>
                  <p className="text-sm">{selectedAlibabaOffer.Supplier || 'Unknown'}</p>
                  <p className="text-xs text-gray-500">{selectedAlibabaOffer['Supplier Info (Years & Location)'] || 'N/A'}</p>
                  <NioButton
                    className="btn-alibaba w-full mt-3"
                    label="Contact Supplier"
                    onClick={() => alert('Contact feature coming soon!')}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-lg font-semibold text-orange-800 mb-3">Contact Details</h5>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  {selectedAlibabaOffer['Contact Name'] !== 'N/A' && (
                    <p className="text-sm mb-2"><strong>Name:</strong> {selectedAlibabaOffer['Contact Name']}</p>
                  )}
                  {selectedAlibabaOffer.Email !== 'N/A' && (
                    <p className="text-sm mb-2"><strong>Email:</strong> {selectedAlibabaOffer.Email}</p>
                  )}
                  {selectedAlibabaOffer.Phone !== 'N/A' && (
                    <p className="text-sm"><strong>Phone:</strong> {selectedAlibabaOffer.Phone}</p>
                  )}
                  {!selectedAlibabaOffer['Contact Name'] && !selectedAlibabaOffer.Email && !selectedAlibabaOffer.Phone && (
                    <p className="text-sm text-gray-500">No contact info available.</p>
                  )}
                </div>
                <h5 className="text-lg font-semibold text-orange-800 mb-3">Product Info</h5>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm mb-2"><strong>Price:</strong> {selectedAlibabaOffer.Price || 'N/A'}</p>
                  <NioButton
                    className="btn-alibaba w-full"
                    label="View on Alibaba"
                    onClick={() => alert('Redirecting to Alibaba!')}
                  />
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={handleCloseAlibabaModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CTA Section */}
      <NioSection className="py-10 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <NioSection.Content>
          <Row className="items-center">
            <Col lg={6}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Global Agricultural Market</h2>
              <p className="text-lg mb-6">
                Connect with farmers and suppliers to grow your business and access new opportunities.
              </p>
              <div className="flex gap-4">
                <NioButton href="/pricing" className="btn-farmer px-6 py-3" label="Sign Up" />
                <NioButton href="/about" className="btn-outline-white px-6 py-3" label="Learn More" />
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src="/images/thumb/farmer.png"
                alt="farmer"
                className="max-w-full h-auto animate-pulse"
              />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/* Newsletter Section */}
      <NioSection className="py-10 bg-gray-50">
        <NioSection.Content>
          <Row className="justify-content-between align-items-center">
            <Col lg={5}>
              <h4 className="text-2xl font-bold text-green-800 mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-sm text-gray-600">Get the latest agricultural offers and updates.</p>
            </Col>
            <Col lg={5}>
              <NioSubscribeField variant="one" />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
    </AppLayout>
  );
}

export default Index;