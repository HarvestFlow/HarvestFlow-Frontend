import { useLayoutUpdate } from '../../../../context/LayoutProvider/LayoutProvider';
import axios from 'axios'; // Import axios for HTTP requests
import ReactFlagsSelect from 'react-flags-select';
import NioButton from '../../../NioButton/NioButton';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderAction({ className, nioBtnClasses, nioToggleClasses }) {
  const layoutUpdate = useLayoutUpdate();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('US'); // Default to United States
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state to track authentication
  const allowedCountries = ['FR', 'TN', 'US', 'PT', 'ES']; // Allowed countries

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  // Fetch user profile to check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', {
          withCredentials: true, // Include cookies with request
        });
        if (response.status === 200) {
          setIsAuthenticated(true); // User is authenticated
        }
      } catch (error) {
        setIsAuthenticated(false); // User is not authenticated
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/user/logout', {}, {
        withCredentials: true, // Include cookies with request
      });
      setIsAuthenticated(false); // Set the state to false upon logout
      navigate('/auth/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`${className} `}>
      {/* Wrap buttons and language select in a flex container with justify-between for alignment */}
      <div className="d-flex align-items-center justify-content-between w-100">
        <li className="d-none d-md-block" style={{ listStyleType: 'none' }}>
          {isAuthenticated ? (
            <NioButton
              icon="user"
              label="Sign Out"
              className={`${nioBtnClasses} bg-transparent text-black hover:bg-transparent hover:text-black !bg-transparent !text-black !hover:bg-transparent !hover:text-black`}
              onClick={handleLogout} // Handle logout on button click
            />
          ) : (
            <Link to="/auth/login">
              <NioButton
                icon="user"
                label="Sign In"
                className={`${nioBtnClasses} bg-transparent text-black hover:bg-transparent hover:text-black !bg-transparent !text-black !hover:bg-transparent !hover:text-black`}
                style={{ alignSelf: 'flex-start' }} // Align "Sign In" button a little higher
              />
            </Link>
          )}
        </li>

        {/* Align language selector with some margin */}
        <li className="ml-3" style={{ listStyleType: 'none' }}>
          <ReactFlagsSelect
            countries={allowedCountries}
            customLabels={{
              FR: 'French',
              TN: 'Arabic',
              US: 'English',
              PT: 'Portuguese',
              ES: 'Spanish',
            }}
            selectedSize={16}
            optionsSize={15}
            onSelect={handleChangeCountry}
            selected={selectedCountry}
            placeholder="Language"
          />
        </li>
      </div>

      {/* Navbar toggle for mobile */}
      <li className="nk-navbar-toggle" style={{ listStyleType: 'none' }}>
        <NioButton
          icon="menu"
          className={nioToggleClasses}
          onClick={layoutUpdate.headerMobile}
        />
      </li>
    </div>
  );
}
