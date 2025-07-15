import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// context 
import { useData } from '../../context/DataProvider/DataProvider';
import LayoutProvider from '../../context/LayoutProvider/LayoutProvider';

// components 
import { App } from '../../components';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import NioBackTop from '../../components/NioBackTop/NioBackTop';
import NioStickyBadge from '../../components/NioStickyBadge/NioStickyBadge';

const API_URL = 'http://localhost:5000';

function AppLayout({ variant = 2, rootClass, title = 'page title goes here', children }) {
  const data = useData();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch authentication status
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, {
          withCredentials: true,
          timeout: 5000,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching auth status:', error.response || error.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthStatus();
  }, []);

  // Filter navigation.one to show Dashboard and Profile only for authenticated users
  const filteredNavigationOne = {
    menus: isAuthenticated
      ? data.navigation.one.menus
      : data.navigation.one.menus.filter(menu => 
          menu.item.title !== 'Dashboard' && menu.item.title !== 'Profile'
        )
  };

  // Select navigation based on authentication status
  const headerData = isAuthenticated ? data.navigation.two : filteredNavigationOne;

  useEffect(() => {
    document.title = `${title} - NioLand React Template`;
  }, [title]);

  return (
    <LayoutProvider>
      <App rootClass={rootClass}>
        {isLoading ? (
          <div className="text-center py-16">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <Header variant={variant} data={headerData} />
            <App.Main>
              {children}
            </App.Main>
            <Footer variant={variant} />
            <NioBackTop />
            <NioStickyBadge />
          </>
        )}
      </App>
    </LayoutProvider>
  );
}

export default AppLayout;