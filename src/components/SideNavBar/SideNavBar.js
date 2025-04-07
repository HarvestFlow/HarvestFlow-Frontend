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
  faTimes,
  faTrademark,
  faListCheck,
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
import TradeDataManager from "../FarmerDashboard/dataUpload/TradeDataManager";
import FileDataManager from "../FarmerDashboard/dataUpload/FileDataManager";

import { useNotifications } from "../Notification/NotificationContext";
import RecommendationsSelector from "../FarmerDashboard/recommendation/RecommendationsSelector";
import Recommendations from "../FarmerDashboard/recommendation/recommendationUtils";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const { notifications, userId } = useNotifications(); // userId est déjà disponible ici
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, {
          withCredentials: true,
          timeout: 5000,
        });
        setIsAdmin(response.data.role === "admin");
        console.log("Profile response:", response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        navigate("/404");
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
  }, [navigate]);

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
    // Passer userId dans le state pour Recommendations
    if (path === "/recommendations") {
      navigate(`/dashboard${path}`, { state: { userId } });
    } else {
      navigate(`/dashboard${path}`);
    }
    if (isMobile) setIsMobileCollapsed(false);
  };

  const handleRemoveNotification = async (id) => {
    try {
      await axios.put(`${API_URL}/api/notifications/${id}/read`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Erreur lors de la suppression de la notification:", error);
    }
  };

  const menuItems = [
    { name: "Parcel Info", icon: faInfoCircle, path: "/parcelinfo" },
    { name: "Map", icon: faMapMarkedAlt, path: "/MapSelector" },
    { name: "AdminDashboard", icon: faTachometerAlt, path: "/AdminDashboard" },
    { name: "StockManagement", icon: faBoxes, path: "/StockManagement" },
    { name: "WheatPrediction", icon: faMoneyBillWheat, path: "/WheatPrediction" },
    { name: "CountryStats", icon: faCalculator, path: "/CountryStats" },
    { name: "Trading", icon: faTrademark, path: "/trade" },
    { name: "Recommendations", icon: faListCheck, path: "/recommendations" },
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
                <div className="notification-item" key={notif._id}>
                  <span className="notification-dot"></span>
                  <FontAwesomeIcon
                    icon={notif.condition?.includes("temperature") ? faTemperatureHigh : faBell}
                    className="notification-icon"
                  />
                  <span>{notif.message}</span>
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

            <div className="toolbar-item">
              <button
                className="toolbar-button"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <FontAwesomeIcon icon={faBell} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div className="notification-item" key={notif._id}>
                        <FontAwesomeIcon
                          icon={notif.condition?.includes("temperature") ? faTemperatureHigh : faBell}
                          className="notification-icon"
                        />
                        <span>{notif.message}</span>
                        <button
                          className="remove-notification"
                          onClick={() => handleRemoveNotification(notif._id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="notification-item">Aucune notification</div>
                  )}
                </div>
              )}
            </div>
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
          <Route path="/trade" element={<TradeDataManager />} />
          <Route path="/trade-data/:fileId" element={<FileDataManager />} />
          <Route path="/recommendations" element={<RecommendationsSelector />} />
          <Route path="/recommendations/:shapeId" element={<Recommendations />} />
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