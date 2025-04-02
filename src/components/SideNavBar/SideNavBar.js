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
  faMapMarkedAlt,
  faBoxes,
  faMoneyBillWheat,
  faHome,
  faCalculator,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import NioBrand from "../NioBrand/NioBrand";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SideNavBar.css";
import Observations from "../FarmerDashboard/ParcelInfo/Observations";
import ParcelInfo from "../FarmerDashboard/ParcelInfo/ParcelInfo";
import MapWithComments from "../FarmerDashboard/LeafletCard/LeafletCard";
import AddObservation from "../FarmerDashboard/ParcelInfo/AddObservation";
import AdminDashboard from "../FarmerDashboard/charte/charte";
import StockManagement from "../FarmerDashboard/StockManagement/StockManagement";
import WheatPrediction from "../FarmerDashboard/cropYield/WheatPrediction";
import CountryStats from "../FarmerDashboard/cropYield/statistics";
import GestionUser from "../AdminBackoffice/GestionUser";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", {
          withCredentials: true,
          timeout: 5000,
        });
        // Assuming the profile endpoint returns a role field
        setIsAdmin(response.data.role === "admin"); // Adjust based on actual response structure
        console.log("Profile response:", response.data); // Debug log
      } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (path) => {
    if (path === "/gestionUser" && !isAdmin) {
      alert("Accès réservé aux administrateurs.");
      return;
    }
    navigate(`/dashboard${path}`);
    if (isMobile) setIsMobileCollapsed(false);
  };

  const menuItems = [
    { name: "Parcel Info", icon: faInfoCircle, path: "/parcelinfo" },
    { name: "Map", icon: faMapMarkedAlt, path: "/MapSelector" },
    { name: "AdminDashboard", icon: faTachometerAlt, path: "/AdminDashboard" },
    { name: "StockManagement", icon: faBoxes, path: "/StockManagement" },
    { name: "WheatPrediction", icon: faMoneyBillWheat, path: "/WheatPrediction" },
    { name: "CountryStats", icon: faCalculator, path: "/CountryStats" },
    ...(isAdmin
      ? [{ name: "Gestion User", icon: faUserCheck, path: "/gestionUser" }]
      : []),
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toolbarItems = [
    { name: "Dashboard", icon: faHome, path: "/parcelinfo" },
    { name: "Profile", icon: faUser, path: "/UpdateFarmerProfile" },
    { name: "Settings", icon: faCog, path: "/gestionUser" },
  ];

  const notifications = [
    { id: 1, text: "Température élevée détectée", icon: faExclamationTriangle },
    { id: 2, text: "Nouvelle mise à jour disponible", icon: faBell },
  ];

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="app-container">
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
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <li className="sidebar-item" key={item.name}>
                  <a
                    className="sidebar-link"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                    <span className="sidebar-text">{item.name}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sidebar-item">
                <span className="sidebar-text">Aucun résultat trouvé</span>
              </li>
            )}
          </ul>

          {!isCollapsed && (
            <div className="notifications">
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

      <div
        className={`main-content ${
          isCollapsed && !isMobile ? "collapsed" : ""
        } ${isMobile && !isMobileCollapsed ? "mobile-expanded" : ""}`}
      >
        <Routes>
          <Route path="/parcelinfo" element={<ParcelInfo />} />
          <Route path="/observations/:shapeId" element={<Observations />} />
          <Route path="/MapSelector" element={<MapWithComments />} />
          <Route path="/observations/add/:shapeId" element={<AddObservation />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/StockManagement" element={<StockManagement />} />
          <Route path="/WheatPrediction" element={<WheatPrediction />} />
          <Route path="/CountryStats" element={<CountryStats />} />
          <Route
            path="/gestionUser"
            element={isAdmin ? <GestionUser /> : <div>Accès réservé aux administrateurs</div>}
          />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;