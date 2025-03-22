import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faMapMarked,
  faInfoCircle,
  faSignOutAlt,
  faBars,
  faUser,
  faTachometerAlt,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faBell,
  faExclamationTriangle,
  faCog,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import NioBrand from "../NioBrand/NioBrand";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./SideNavBar.css";
import Observations from "../FarmerDashboard/ParcelInfo/Observations";
import ParcelInfo from "../FarmerDashboard/ParcelInfo/ParcelInfo";
import MapWithComments from "../FarmerDashboard/LeafletCard/LeafletCard";
import AddObservation from "../FarmerDashboard/ParcelInfo/AddObservation";
import AdminDashboard from "../FarmerDashboard/charte/charte";


function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileCollapsed(false);
        setIsMenuOpen(false);
      } else {
        setIsMobileCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileCollapsed(!isMobileCollapsed);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Recherche:", e.target.value);
  };

  const handleNavigation = (path) => {
    navigate(`/dashboard${path}`); // Préfixe avec /dashboard
    if (isMobile) setIsMobileCollapsed(false);
  };

  const menuItems = [
    { name: "Parcel Info", icon: faInfoCircle, path: "/parcelinfo" },
    { name: "Observations", icon: faInfoCircle, path: "/observations/:shapeId" },
    { name: "AdminDashboard", icon: faInfoCircle, path: "/AdminDashboard" },

  ];

  const toolbarItems = [
    { name: "Dashboard", icon: faHome, path: "/parcelinfo" },
    { name: "Profile", icon: faUser, path: "/UpdateFarmerProfile" },
    { name: "Settings", icon: faCog, path: "/gestionUser" },
  ];

  const notifications = [
    { id: 1, text: "Température élevée détectée", icon: faExclamationTriangle },
    { id: 2, text: "Nouvelle mise à jour disponible", icon: faBell },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          isMobile
            ? isMobileCollapsed
              ? "mobile-collapsed"
              : ""
            : isCollapsed
            ? "collapsed"
            : ""
        }`}
      >
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo-card">
                <NioBrand
                  logo="s1"
                  variant="dark"
                  imageRoot="../images/"
                  size="300px"
                />
              </div>
            </div>
            <button className="toggle-btn" onClick={toggleSidebar}>
              <FontAwesomeIcon
                icon={isCollapsed || !isMobileCollapsed ? faChevronRight : faChevronLeft}
              />
            </button>
          </div>

          {!isCollapsed && (
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          )}

          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li className="sidebar-item" key={item.name}>
                <a
                  className="sidebar-link"
                  onClick={() => handleNavigation(item.path)}
                >
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  <span className="sidebar-text">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {!isCollapsed && (
            <div className="notifications-container">
              {notifications.map((notif) => (
                <div className="notification-item" key={notif.id}>
                  <span className="notification-dot"></span>
                  <FontAwesomeIcon
                    icon={notif.icon}
                    className="notification-icon"
                  />
                  <span>{notif.text}</span>
                </div>
              ))}
            </div>
          )}

          <div className="sidebar-footer">
            <button className="logout-button" onClick={() => console.log("Logout")}>
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
              <span className="sidebar-text">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div
        className={`floating-toolbar ${isCollapsed && !isMobile ? "shifted" : ""}`}
      >
        <div className="toolbar-content">
          <button className="toolbar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="toolbar-items">
            {toolbarItems.map((item) => (
              <div className="toolbar-item" key={item.name}>
                <button
                  className="toolbar-button"
                  onClick={() => handleNavigation(item.path)}
                  title={item.name}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </button>
                {isMenuOpen && <span className="toolbar-tooltip">{item.name}</span>}
              </div>
            ))}
          </div>

          <div className="toolbar-user">
            <button
              className="toolbar-button logout-btn"
              onClick={() => console.log("Logout")}
              title="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>

      {/* Zone de contenu avec routage */}
      <div
        className={`main-content ${
          isCollapsed && !isMobile ? "collapsed" : ""
        } ${isMobile && !isMobileCollapsed ? "mobile-expanded" : ""}`}
      >
        <Routes>
          <Route path="/parcelinfo" element={<ParcelInfo />} />
          <Route path="/observations/:shapeId" element={<Observations />} />
          <Route path='/MapSelector' element={<MapWithComments />} />
          <Route path="/observations/add/:shapeId" element={<AddObservation />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />

          <Route path="*" element={<div>Dashboard Page non trouvée</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;