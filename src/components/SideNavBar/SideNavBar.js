import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faMapMarked,
  faInfoCircle,
  faSignOutAlt,
  faBars,
  faUser,
  faChevronLeft,
  faChevronRight,
  faTachometerAlt, // Added for Dashboard
} from "@fortawesome/free-solid-svg-icons";
import NioBrand from "../NioBrand/NioBrand";
import "./SideNavBar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    console.log("Sidebar toggled:", !isCollapsed);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu toggled:", !isMenuOpen);
  };

  return (
    <>
      {/* Sidebar Container */}
      <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isCollapsed ? faChevronLeft : faChevronRight} />
          </div>
          <div className="logo-container mt-5">
            <div className="logo-card">
              <NioBrand
                logo="s1"
                variant="dark"
                imageRoot="../images/"
                size="300px"
              />
            </div>
          </div>
          
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/charte")}>
                <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
                <span className="sidebar-text">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/mapselector")}>
                <FontAwesomeIcon icon={faTemperatureHigh} className="sidebar-icon" />
                <span className="sidebar-text">Temperature</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/leaflet")}>
                <FontAwesomeIcon icon={faMapMarked} className="sidebar-icon" />
                <span className="sidebar-text">Farm Map</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/parcelinfo")}>
                <FontAwesomeIcon icon={faInfoCircle} className="sidebar-icon" />
                <span className="sidebar-text">Parcel Info</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <button className="logout-button" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
              <span className="sidebar-text">FrontOffice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Container */}
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
            <li className="navbar-item">
              <a className="navbar-link" onClick={() => navigate("/dashboard")}>
                Dashboard
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" onClick={() => navigate("/profile")}>
                Profile
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" onClick={() => navigate("/settings")}>
                Settings
              </a>
            </li>
          </ul>
          <div className="navbar-user">
            <button className="navbar-button" onClick={() => navigate("/logout")}>
              <FontAwesomeIcon icon={faUser} className="navbar-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;