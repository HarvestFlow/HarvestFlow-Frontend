import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "./SideNavBar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const menuItems = [
    { path: "/charte", icon: faTachometerAlt, text: "Dashboard" },
    { path: "/mapselector", icon: faTemperatureHigh, text: "Temperature" },
    { path: "/leaflet", icon: faMapMarked, text: "Farm Map" },
    { path: "/parcelinfo", icon: faInfoCircle, text: "Parcel Info" },
  ];

  const toolbarItems = [
    { path: "/dashboard", icon: faHome, text: "Dashboard" },
    { path: "/profile", icon: faUser, text: "Profile" },
    { path: "/settings", icon: faCog, text: "Settings" },
  ];

  const notifications = [
    { id: 1, text: "Température élevée détectée", icon: faExclamationTriangle },
    { id: 2, text: "Nouvelle mise à jour disponible", icon: faBell },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Recherche:", e.target.value);
  };

  return (
    <>
      {/* Sidebar inchangée */}
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
              <li className="sidebar-item" key={item.path}>
                <a
                  className="sidebar-link"
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setIsMobileCollapsed(false);
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  <span className="sidebar-text">{item.text}</span>
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
            <button className="logout-button" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
              <span className="sidebar-text">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toolbar remplaçant la Navbar */}
      <div
        className={`floating-toolbar ${
          isCollapsed && !isMobile ? "shifted" : ""
        }`}
      >
        <div className="toolbar-content">
          <button className="toolbar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="toolbar-items">
            {toolbarItems.map((item) => (
              <div className="toolbar-item" key={item.path}>
                <button
                  className="toolbar-button"
                  onClick={() => navigate(item.path)}
                  title={item.text}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </button>
                {isMenuOpen && (
                  <span className="toolbar-tooltip">{item.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="toolbar-user">
            <button
              className="toolbar-button logout-btn"
              onClick={() => navigate("/logout")}
              title="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Sidebar;