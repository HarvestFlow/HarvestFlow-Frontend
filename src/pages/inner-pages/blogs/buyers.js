import React, { useState, useEffect, useCallback } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import debounce from 'lodash/debounce';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../../components';

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

// constants
const API_URL = 'http://localhost:5000';
const DEFAULT_IMAGE_URL = 'https://static4.depositphotos.com/1000204/340/i/450/depositphotos_3404731-stock-photo-gold-wheat-field.jpg';
const USER_AVATAR_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const ITEMS_PER_PAGE = 6;

function Buyers() {
  const [buyerForms, setBuyerForms] = useState([]);
  const [wheatBuyers, setWheatBuyers] = useState([]);
  const [isLoadingBuyerForms, setIsLoadingBuyerForms] = useState(false);
  const [isLoadingWheatBuyers, setIsLoadingWheatBuyers] = useState(false);
  const [errorBuyerForms, setErrorBuyerForms] = useState('');
  const [errorWheatBuyers, setErrorWheatBuyers] = useState('');
  const [showBuyerFormModal, setShowBuyerFormModal] = useState(false);
  const [showWheatBuyerModal, setShowWheatBuyerModal] = useState(false);
  const [selectedBuyerForm, setSelectedBuyerForm] = useState(null);
  const [selectedWheatBuyer, setSelectedWheatBuyer] = useState(null);
  const [currentPageBuyerForms, setCurrentPageBuyerForms] = useState(1);
  const [currentPageWheatBuyers, setCurrentPageWheatBuyers] = useState(1);
  const [totalBuyerForms, setTotalBuyerForms] = useState(0);
  const [totalWheatBuyers, setTotalWheatBuyers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showActive, setShowActive] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [countryFilter, setCountryFilter] = useState('All');
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [userProfile, setUserProfile] = useState({ name: '', email: '', company: '' });
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch logged-in user profile
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getProfile`, {
        withCredentials: true,
        timeout: 5000,
      });
      console.log('Authenticated user:', { id: response.data._id, role: response.data.role, email: response.data.email });
      setLoggedInUserId(response.data._id);
      setUserRole(response.data.role);
      setUserProfile({
        name: response.data.firstname || 'Anonymous',
        email: response.data.email || '',
        company: response.data.company || 'N/A',
      });
    } catch (error) {
      console.error('Error fetching user profile:', error.response || error.message);
      setContactError('Failed to fetch user profile. Please log in again.');
    }
  };

  // Fetch user profile on mount
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Check if buyer form is active
  const isBuyerFormActive = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setSearchSuggestions([]);
        return;
      }
      try {
        // Mock API call for suggestions (replace with real endpoint if available)
        const response = await axios.get(`${API_URL}/farmerform/search-suggestions`, {
          params: { query },
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

  // Handle contact buyer
  const handleContactBuyer = async () => {
    if (!userProfile.email) {
      setContactError('User email not available. Please log in again.');
      return;
    }
    if (!selectedBuyerForm?.company?.contactEmail) {
      setContactError('No contact email available for this buyer.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/user/api/contact-offer`,
        {
          firstname: userProfile.name,
          email: userProfile.email,
          company: userProfile.company,
          toEmail: selectedBuyerForm.company.contactEmail,
          offerTitle: selectedBuyerForm.title,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setContactSuccess('Your interest has been sent successfully!');
        setContactError('');
        setTimeout(() => {
          setContactSuccess('');
          setShowBuyerFormModal(false);
        }, 3000);
      }
    } catch (error) {
      setContactError(error.response?.data?.error || 'Failed to send message. Please try again.');
      setContactSuccess('');
    }
  };

  // Fetch paginated Buyer Forms
  useEffect(() => {
    const fetchBuyerForms = async () => {
      setIsLoadingBuyerForms(true);
      try {
        const response = await axios.get(`${API_URL}/farmerform/buyer`);
        console.log('Buyer Forms API Response:', response.data);
        const forms = Array.isArray(response.data) ? response.data : [];
        forms.sort((a, b) => {
          const isActiveA = isBuyerFormActive(a.offerEndDate) ? 0 : 1;
          const isActiveB = isBuyerFormActive(b.offerEndDate) ? 0 : 1;
          if (isActiveA !== isActiveB) return isActiveA - isActiveB;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setBuyerForms(forms);
        setTotalBuyerForms(forms.length);
        setErrorBuyerForms(forms.length === 0 ? 'No buyer forms available.' : '');
      } catch (error) {
        console.error('Buyer Forms Error:', error.response || error.message);
        setErrorBuyerForms(error.response?.data?.error || 'Failed to fetch buyer forms.');
        setBuyerForms([]);
        setTotalBuyerForms(0);
      } finally {
        setIsLoadingBuyerForms(false);
      }
    };
    fetchBuyerForms();
  }, []);

  // Fetch paginated Wheat Buyers
  useEffect(() => {
    const fetchWheatBuyers = async () => {
      setIsLoadingWheatBuyers(true);
      try {
        const response = await axios.get(`${API_URL}/api/buyers`);
        console.log('Wheat Buyers API Response:', response.data);
        const buyers = Array.isArray(response.data.data) ? response.data.data : [];
        setWheatBuyers(buyers);
        setTotalWheatBuyers(buyers.length);
        setErrorWheatBuyers(buyers.length === 0 ? 'No wheat buyers available.' : '');
      } catch (error) {
        console.error('Wheat Buyers Error:', error.response || error.message);
        setErrorWheatBuyers(error.response?.data?.error || 'Failed to fetch wheat buyers.');
        setWheatBuyers([]);
        setTotalWheatBuyers(0);
      } finally {
        setIsLoadingWheatBuyers(false);
      }
    };
    fetchWheatBuyers();
  }, []);

  // Handle modals
  const handleShowBuyerFormModal = (form) => {
    setSelectedBuyerForm(form);
    setShowBuyerFormModal(true);
    setContactError('');
    setContactSuccess('');
  };

  const handleCloseBuyerFormModal = () => {
    setShowBuyerFormModal(false);
    setSelectedBuyerForm(null);
    setContactError('');
    setContactSuccess('');
  };

  const handleShowWheatBuyerModal = (buyer) => {
    setSelectedWheatBuyer(buyer);
    setShowWheatBuyerModal(true);
  };

  const handleCloseWheatBuyerModal = () => {
    setShowWheatBuyerModal(false);
    setSelectedWheatBuyer(null);
  };

  // Handle pagination
  const handleBuyerFormPageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalBuyerForms / ITEMS_PER_PAGE)) {
      setCurrentPageBuyerForms(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWheatBuyerPageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalWheatBuyers / ITEMS_PER_PAGE)) {
      setCurrentPageWheatBuyers(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate pagination items
  const getPaginationItems = (currentPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
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

  // Filter offers
  const filteredBuyerForms = Array.isArray(buyerForms)
    ? buyerForms.filter((form) => {
        const matchesSearch = (form.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || (form.productCategory || '').toLowerCase().includes(filterCategory.toLowerCase());
        const matchesActive = showActive || isBuyerFormActive(form.offerEndDate);
        const matchesPrice = (form.pricePerUnit?.value || 0) >= priceRange[0] && (form.pricePerUnit?.value || 0) <= priceRange[1];
        const matchesCountry = countryFilter === 'All' || (form.company?.address?.country || '').toLowerCase() === countryFilter.toLowerCase();
        return matchesSearch && matchesCategory && matchesActive && matchesPrice && matchesCountry;
      })
    : [];

  const filteredWheatBuyers = Array.isArray(wheatBuyers)
    ? wheatBuyers.filter((buyer) => {
        const matchesSearch = (buyer.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || (buyer.cereal_type || '').toLowerCase().includes(filterCategory.toLowerCase());
        const matchesActive = showActive || !buyer.is_active;
        const matchesPrice = (buyer.price || 0) >= priceRange[0] && (buyer.price || 0) <= priceRange[1];
        const matchesCountry = countryFilter === 'All' || (buyer.country || '').toLowerCase() === countryFilter.toLowerCase();
        return matchesSearch && matchesCategory && matchesActive && matchesPrice && matchesCountry;
      })
    : [];

  // Pagination slices
  const buyerFormStartIndex = (currentPageBuyerForms - 1) * ITEMS_PER_PAGE;
  const buyerFormEndIndex = buyerFormStartIndex + ITEMS_PER_PAGE;
  const wheatBuyerStartIndex = (currentPageWheatBuyers - 1) * ITEMS_PER_PAGE;
  const wheatBuyerEndIndex = wheatBuyerStartIndex + ITEMS_PER_PAGE;

  const paginatedBuyerForms = filteredBuyerForms.slice(buyerFormStartIndex, buyerFormEndIndex);
  const paginatedWheatBuyers = filteredWheatBuyers.slice(wheatBuyerStartIndex, wheatBuyerEndIndex);

  // Skeleton loader
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
    <AppLayout title="Buyer Offers" rootClass="layout-1">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
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
            background: #008080;
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
          .btn-buyer {
            background-color: #008080;
            border: none;
            border-radius: 8px;
            color: white;
            transition: all 0.3s ease;
          }
          .btn-buyer:hover {
            background-color: #006666;
            transform: scale(1.05);
          }
          .card-tilt {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-style: preserve-3d;
          }
          .card-tilt:hover {
            transform: perspective(1000px) rotateX(2deg) rotateY(2deg);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }
          .gradient-overlay {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          }
          .badge-pulse {
            animation: pulse 2s infinite;
          }
          .contact-info:hover {
            text-decoration: underline;
            color: #008080;
          }
        `}
      </style>

      {/* Hero Section */}
      <NioSection className="bg-gradient-to-b from-teal-50 to-white pt-20 pb-10 mt-20">
        <NioSection.Content>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 animate__animated animate__fadeIn">
                Harvest Flow Buyers
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover buyer offers and connect with global agricultural buyers seeking premium products.
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
            <h4 className="text-lg font-semibold text-teal-800 mb-3">Filters</h4>

            {/* Search Input with Suggestions */}
            <div className="relative mb-4">
              <NioField.Input
                icon="search before z-1"
                placeholder="Search buyer offers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
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

            {/* Selected Filter Chips */}
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

            {/* Category Filter */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">Category</h5>
              <div className="flex flex-wrap gap-2">
                {['All', 'Wheat', 'Barley'].map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filterCategory === category
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-teal-100'
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

            {/* Country Filter */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">Country</h5>
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  toggleFilter(e.target.value);
                }}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Countries</option>
                {Object.values(getCountryName).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
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

            {/* Show Active Toggle */}
            <div className="mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showActive}
                  onChange={(e) => {
                    setShowActive(e.target.checked);
                    toggleFilter('Show Active');
                  }}
                  className="mr-2"
                />
                Show active offers
              </label>
            </div>

            {/* Clear Filters Button */}
            <NioButton
              className="btn-buyer w-full mt-4"
              label="Clear Filters"
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('All');
                setShowActive(true);
                setPriceRange([0, 1000]);
                setCountryFilter('All');
                setSelectedFilters([]);
              }}
            />
          </div>
        )}
      </div>

      {/* Buyer Forms Section */}
      <NioSection className="py-10 bg-gray-50">
        <NioSection.Head className="pb-6">
          <h2 className="text-3xl font-bold text-teal-800">Buyer Form Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorBuyerForms && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorBuyerForms}
            </div>
          )}
          {isLoadingBuyerForms ? (
            <Row className="gy-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : paginatedBuyerForms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No buyer form offers found.</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {paginatedBuyerForms.map((form) => (
                <Col xs={12} sm={6} lg={4} key={form._id}>
                  <NioCard className="border-0 rounded-xl bg-white card-tilt overflow-hidden animate__animated animate__fadeInUp">
                    <div className="relative">
                      <img
                        src={DEFAULT_IMAGE_URL}
                        alt={form.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2">
                        <NioBadge
                          rounded
                          className={`text-bg-${form.verifiedStatus === 'VERIFIED' ? 'success' : form.verifiedStatus === 'PENDING' ? 'warning' : 'secondary'}-soft text-xs badge-pulse`}
                          label={form.verifiedStatus.replace('_', ' ')}
                        />
                        <NioBadge
                          rounded
                          className={`text-bg-${isBuyerFormActive(form.offerEndDate) ? 'success' : 'danger'}-soft text-xs`}
                          label={isBuyerFormActive(form.offerEndDate) ? 'Active' : 'Expired'}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-4">
                        <h5 className="text-white text-lg font-bold">{truncateText(form.title, 20)}</h5>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <NioIcon name="map-pin" className="text-teal-500" size="sm" />
                            {truncateText(form.company?.address?.country, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="package" className="text-teal-500" size="sm" />
                            {`${form.quantityDesired?.value || 'N/A'} ${form.quantityDesired?.unit || ''}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <NioIcon name="clock" className="text-blue-500" size="sm" />
                            {truncateText(form.deliveryLocation, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                            {truncateText(form.paymentTerms, 12)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1 contact-info">
                            <NioIcon name="mail" className="text-teal-500" size="sm" />
                            {truncateText(form.company?.contactEmail, 15)}
                          </span>
                          <span className="flex items-center gap-1 contact-info">
                            <NioIcon name="call" className="text-teal-500" size="sm" />
                            {truncateText(form.company?.contactPhone, 15)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4 flex-grow">{truncateText(form.productSpecifications, 50)}</p>
                      <div className="flex justify-between items-center">
                        <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                        <NioButton
                          className="btn-buyer text-sm px-4 py-2"
                          label="Details"
                          onClick={() => handleShowBuyerFormModal(form)}
                          icon="arrow-right after"
                        />
                      </div>
                    </div>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingBuyerForms && totalBuyerForms > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {buyerFormStartIndex + 1}-{Math.min(buyerFormEndIndex, totalBuyerForms)} of {totalBuyerForms} Buyer Forms
              </p>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Button
                      className={`btn-buyer px-3 py-1 text-sm ${currentPageBuyerForms === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageBuyerForms === 1}
                      onClick={() => handleBuyerFormPageChange(currentPageBuyerForms - 1)}
                    >
                      Prev
                    </Button>
                  </li>
                  {getPaginationItems(currentPageBuyerForms, totalBuyerForms).map((item, i) => (
                    <li key={i}>
                      {item === '...' ? (
                        <span className="px-3 py-1 text-sm">...</span>
                      ) : (
                        <Button
                          className={`px-3 py-1 text-sm ${
                            currentPageBuyerForms === item ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-teal-100'
                          }`}
                          onClick={() => handleBuyerFormPageChange(item)}
                        >
                          {item}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button
                      className={`btn-buyer px-3 py-1 text-sm ${currentPageBuyerForms === Math.ceil(totalBuyerForms / ITEMS_PER_PAGE) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageBuyerForms === Math.ceil(totalBuyerForms / ITEMS_PER_PAGE)}
                      onClick={() => handleBuyerFormPageChange(currentPageBuyerForms + 1)}
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

      {/* Wheat Buyers Section */}
      <NioSection className="py-10">
        <NioSection.Head className="pb-6">
          <h2 className="text-3xl font-bold text-teal-800">Wheat Buyer Offers</h2>
        </NioSection.Head>
        <NioSection.Content>
          {errorWheatBuyers && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
              {errorWheatBuyers}
            </div>
          )}
          {isLoadingWheatBuyers ? (
            <Row className="gy-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </Row>
          ) : paginatedWheatBuyers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No wheat buyer offers found.</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <Row className="gy-4">
              {paginatedWheatBuyers.map((buyer) => (
                <Col xs={12} sm={6} lg={4} key={buyer.buyer_id}>
                  <NioCard className="border-0 rounded-xl bg-white card-tilt overflow-hidden animate__animated animate__fadeInUp">
                    <div className="relative">
                      <img
                        src={DEFAULT_IMAGE_URL}
                        alt={buyer.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2">
                        <NioBadge
                          rounded
                          className={`text-bg-${buyer.verified_status === 'VERIFIED' ? 'success' : 'warning'}-soft text-xs badge-pulse`}
                          label={buyer.verified_status || 'N/A'}
                        />
                        <NioBadge
                          rounded
                          className={`text-bg-${buyer.is_active ? 'success' : 'danger'}-soft text-xs`}
                          label={buyer.is_active ? 'Active' : 'Inactive'}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-4">
                        <h5 className="text-white text-lg font-bold">{truncateText(buyer.title, 20)}</h5>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <NioIcon name="map-pin" className="text-teal-500" size="sm" />
                            {truncateText(buyer.country, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="package" className="text-teal-500" size="sm" />
                            {truncateText(buyer.quantity_required, 12)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <NioIcon name="clock" className="text-blue-500" size="sm" />
                            {truncateText(buyer.destination, 12)}
                          </span>
                          <span className="flex items-center gap-1">
                            <NioIcon name="trending-up" className="text-blue-500" size="sm" />
                            {truncateText(buyer.payment_terms, 12)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4 flex-grow">{truncateText(buyer.product_description, 50)}</p>
                      <div className="flex justify-between items-center">
                        <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                        <NioButton
                          className="btn-buyer text-sm px-4 py-2"
                          label="Details"
                          onClick={() => handleShowWheatBuyerModal(buyer)}
                          icon="arrow-right after"
                        />
                      </div>
                    </div>
                  </NioCard>
                </Col>
              ))}
            </Row>
          )}
          {!isLoadingWheatBuyers && totalWheatBuyers > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {wheatBuyerStartIndex + 1}-{Math.min(wheatBuyerEndIndex, totalWheatBuyers)} of {totalWheatBuyers} Wheat Buyers
              </p>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Button
                      className={`btn-buyer px-3 py-1 text-sm ${currentPageWheatBuyers === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageWheatBuyers === 1}
                      onClick={() => handleWheatBuyerPageChange(currentPageWheatBuyers - 1)}
                    >
                      Prev
                    </Button>
                  </li>
                  {getPaginationItems(currentPageWheatBuyers, totalWheatBuyers).map((item, i) => (
                    <li key={i}>
                      {item === '...' ? (
                        <span className="px-3 py-1 text-sm">...</span>
                      ) : (
                        <Button
                          className={`px-3 py-1 text-sm ${
                            currentPageWheatBuyers === item ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-teal-100'
                          }`}
                          onClick={() => handleWheatBuyerPageChange(item)}
                        >
                          {item}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button
                      className={`btn-buyer px-3 py-1 text-sm ${currentPageWheatBuyers === Math.ceil(totalWheatBuyers / ITEMS_PER_PAGE) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageWheatBuyers === Math.ceil(totalWheatBuyers / ITEMS_PER_PAGE)}
                      onClick={() => handleWheatBuyerPageChange(currentPageWheatBuyers + 1)}
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

      {/* Buyer Form Modal */}
      <Modal show={showBuyerFormModal} onHide={handleCloseBuyerFormModal} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-xl font-bold text-teal-800">
            {selectedBuyerForm?.title || 'Untitled Offer'}
            <NioBadge
              className={`ml-2 text-bg-${isBuyerFormActive(selectedBuyerForm?.offerEndDate) ? 'success' : 'danger'}-soft text-xs`}
              label={isBuyerFormActive(selectedBuyerForm?.offerEndDate) ? 'Active' : 'Expired'}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedBuyerForm && (
            <Row className="g-4">
              <Col md={6}>
                <img
                  src={DEFAULT_IMAGE_URL}
                  alt={selectedBuyerForm.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-teal-800 mb-3">Contact Buyer</h5>
                  {contactError && (
                    <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-3">
                      {contactError}
                    </div>
                  )}
                  {contactSuccess && (
                    <div className="bg-teal-100 text-teal-700 p-2 rounded-lg mb-3">
                      {contactSuccess}
                    </div>
                  )}
                  <div className="mb-3">
                    <p className="text-sm font-medium">Your Details:</p>
                    <p className="text-sm text-gray-600">Name: {userProfile.name}</p>
                    <p className="text-sm text-gray-600">Email: {userProfile.email}</p>
                    <p className="text-sm text-gray-600">Company: {userProfile.company}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{selectedBuyerForm.contactName || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">
                        <a href={`mailto:${selectedBuyerForm.company?.contactEmail}`} className="contact-info">
                          {selectedBuyerForm.company?.contactEmail || 'N/A'}
                        </a>
                      </p>
                      <p className="text-xs text-gray-500">
                        <a href={`tel:${selectedBuyerForm.company?.contactPhone}`} className="contact-info">
                          {selectedBuyerForm.company?.contactPhone || 'N/A'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <NioButton
                    className="btn-buyer w-full"
                    label="Send Interest"
                    onClick={handleContactBuyer}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-lg font-semibold text-teal-800 mb-3">Offer Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Company</p>
                    <p className="text-sm">{selectedBuyerForm.company?.name || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Country</p>
                    <p className="text-sm">{selectedBuyerForm.company?.address?.country || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Product</p>
                    <p className="text-sm">{selectedBuyerForm.productNeeded || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Quantity</p>
                    <p className="text-sm">{`${selectedBuyerForm.quantityDesired?.value || 'N/A'} ${selectedBuyerForm.quantityDesired?.unit || ''}`}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Price</p>
                    <p className="text-sm">{`${selectedBuyerForm.pricePerUnit?.value || 'N/A'} ${selectedBuyerForm.pricePerUnit?.currency || ''}`}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Payment Terms</p>
                    <p className="text-sm">{selectedBuyerForm.paymentTerms || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Delivery Location</p>
                    <p className="text-sm">{selectedBuyerForm.deliveryLocation || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Suppliers</p>
                    <p className="text-sm">{selectedBuyerForm.preferredSuppliersFrom?.join(', ') || 'Any'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Email</p>
                    <p className="text-sm">{selectedBuyerForm.company?.contactEmail || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Phone</p>
                    <p className="text-sm">{selectedBuyerForm.company?.contactPhone || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Registration</p>
                    <p className="text-sm">{selectedBuyerForm.company?.registrationNumber || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Category</p>
                    <p className="text-sm">{selectedBuyerForm.productCategory || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-teal-800 mb-3">Specifications</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {selectedBuyerForm.productSpecifications || 'No specifications provided'}
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={handleCloseBuyerFormModal}>
            Close
          </Button>
          <NioButton
            href="/buyerform"
            className="btn-buyer"
            label="Create Similar Offer"
            icon="plus before"
          />
        </Modal.Footer>
      </Modal>

      {/* Wheat Buyer Modal */}
      <Modal show={showWheatBuyerModal} onHide={handleCloseWheatBuyerModal} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-xl font-bold text-teal-800">
            {selectedWheatBuyer?.title || 'Untitled Offer'}
            <NioBadge
              className={`ml-2 text-bg-${selectedWheatBuyer?.is_active ? 'success' : 'danger'}-soft text-xs`}
              label={selectedWheatBuyer?.is_active ? 'Active' : 'Inactive'}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedWheatBuyer && (
            <Row className="g-4">
              <Col md={6}>
                <img
                  src={DEFAULT_IMAGE_URL}
                  alt={selectedWheatBuyer.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-teal-800 mb-3">Contact</h5>
                  <div className="flex items-center mb-3">
                    <NioMedia size="sm" rounded img={USER_AVATAR_URL} />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{selectedWheatBuyer.contact_name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">{selectedWheatBuyer.date || 'N/A'}</p>
                    </div>
                  </div>
                  <NioButton
                    className="btn-buyer w-full"
                    label="Contact Buyer"
                    onClick={() => alert('Contact feature coming soon!')}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h5 className="text-lg font-semibold text-teal-800 mb-3">Offer Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Country</p>
                    <p className="text-sm">{selectedWheatBuyer.country || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Quantity</p>
                    <p className="text-sm">{selectedWheatBuyer.quantity_required || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Destination</p>
                    <p className="text-sm">{selectedWheatBuyer.destination || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Suppliers</p>
                    <p className="text-sm">{selectedWheatBuyer.supplier_regions || 'Any'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Payment</p>
                    <p className="text-sm">{selectedWheatBuyer.payment_terms || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Cereal Type</p>
                    <p className="text-sm">{selectedWheatBuyer.cereal_type || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-teal-800 mb-3">Description</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {selectedWheatBuyer.product_description || 'No description provided'}
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={handleCloseWheatBuyerModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </AppLayout>
  );
}

export default Buyers;