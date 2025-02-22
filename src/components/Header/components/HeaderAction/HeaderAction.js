// context
import { useLayoutUpdate,useLayout } from '../../../../context/LayoutProvider/LayoutProvider';
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP
import ReactFlagsSelect from 'react-flags-select';
// components
import NioButton from '../../../NioButton/NioButton';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function HeaderAction({ className, nioBtnClasses, nioToggleClasses }) {
  const layoutUpdate = useLayoutUpdate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [userData, setUserData] = useState({
    imageUser: 'images/no_pdp.jpg',
    firstname: ""
  });
  const [isLoading, setIsLoading] = useState(true); // State to track whether user data is being fetched

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States

  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };
  const allowedCountries = ['FR', 'TN', 'US', 'PT', 'ES']; // Liste des codes de pays autorisés

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) { // Check if token exists
          const response = await axios.get(`http://localhost:9091/user/getProfile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const userDataResponse = response.data;
          setUserData({
            imageUser: userDataResponse.imageUser || 'images/no_pdp.jpg', // If imageUser is empty, use default image
            firstname: userDataResponse.firstname || "Unknown", // If firstname is empty, use "Unknown"
          });
          setIsLoggedIn(true); // Set isLoggedIn to true if user data is successfully fetched
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false regardless of success or failure
      }
    };
    fetchUserData();
  }, [setUserData]); // Ajoutez setUserData comme dépendance pour mettre à jour lorsque le contexte change

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    handleClose(); // Close the menu after logout
  };

  const [notifications, setNotifications] = useState([]);

  
    
     const [anchorE2, setAnchorE2] = useState(null);
  
     const handleOpenMenu = (event) => {
       setAnchorE2(event.currentTarget);
     };
  
     const handleCloseMenu = () => {
      setAnchorE2(null);
     };
     const [notificationsInvi, setNotificationsInvi] = useState([]);
     const [anchorE3, setAnchorE3] = useState(null);
  
     const handleOpenMenu2 = (event) => {
       setAnchorE3(event.currentTarget);
     };
  
     const handleCloseMenu2 = () => {
      setAnchorE3(null);
     };

     
  
    // Utilisez useEffect pour charger les notifications une fois que le composant est monté
    

     const navigate = useNavigate();

const discussionClick = async (sender) => {
  navigate(`/discussion/${sender._id}`)}


  
  // Return loading indicator if user data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const isChallengedOrCompanyHomePage = () => {
    return (
      location.pathname === '/index-challenged-home-page' ||
      location.pathname === '/index-company-home-page' ||
      location.pathname === '/index-bs-subscription'

    );
  };

  const mailIconColor = isChallengedOrCompanyHomePage() ? 'white' : 'action';
  const userNameColor = isChallengedOrCompanyHomePage() ? 'white' : 'inherit'; // Change color based on the page
  return (
    <div className={className}>
    <ul className="nk-btn-group sm justify-content-center">
      {isLoggedIn ? (
        <>
 <li>
       

          
    </li>
             

          
      

          <li>
        

          

          </li>
          <li className="d-none d-md-block">
          
            
              
          </li>
        </>
      ) : (
        <li className="d-none d-md-block">
          <Link to="/auth/login">
          <NioButton
  icon="user"
  label="Sign In"
  className={`${nioBtnClasses} bg-green-300 text-white`}
/>

          </Link>
        </li>
      )}
      <li>
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
        <li className="nk-navbar-toggle">
          <NioButton
            icon='menu'
            className={nioToggleClasses}
            onClick={layoutUpdate.headerMobile}
          />
        </li>
      </ul>
    </div>
  );
}