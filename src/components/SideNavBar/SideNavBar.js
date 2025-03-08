import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faUserShield,
  faChartBar,
  faSignOutAlt,
  faBars,
  faUser,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaHistory } from "react-icons/fa";
import NioBrand from "../NioBrand/NioBrand";
import "./SideNavBar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    console.log("Sidebar toggled:", !isCollapsed); // Débogage
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu toggled:", !isMenuOpen); // Débogage
  };

  return (
    <>
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

      {/* Sidebar Container */}
      <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
          </div>
          <div className="logo-container mt-5">
            <NioBrand
              logo="s1"
              variant="dark"
              imageRoot="../images/"
              size="500px" // Taille conservée pour la sidebar
            />
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/App2")}>
                <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
                <span className="sidebar-text">Statistics</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/listeUsers")}>
                <FontAwesomeIcon icon={faList} className="sidebar-icon" />
                <span className="sidebar-text">List Users</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/ListAdmin")}>
                <FontAwesomeIcon icon={faUserShield} className="sidebar-icon" />
                <span className="sidebar-text">Admins</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => navigate("/SuperAdminHistory")}>
                <FaHistory className="sidebar-icon" />
                <span className="sidebar-text">My History</span>
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
    </>
  );
}

export default Sidebar;