import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import "./SideNavBar.css";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleSidebar(); // Appelle la fonction de bascule de la sidebar
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Hamburger menu pour mobile */}
        <div className="navbar-toggle" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Logo ou titre */}
        <div className="navbar-brand">
          <span>MyApp</span>
        </div>

        {/* Liens de navigation (visible sur desktop) */}
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

        {/* Bouton utilisateur/déconnexion */}
        <div className="navbar-user">
          <button className="navbar-button" onClick={() => navigate("/logout")}>
            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;