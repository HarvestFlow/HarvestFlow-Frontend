import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faMapMarked,
  faInfoCircle,
  faSignOutAlt,
  faBars,
  faUser,
  faTachometerAlt,
  faSearch,
  faBell,
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
  faFileWaveform,
  faChartLine,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import NioBrand from "../NioBrand/NioBrand";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; // Add useLocation
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
import FarmerOffers from "../FarmerDashboard/farmerform/farmeroffers";
import BuyerForm from "../FarmerDashboard/buyerform/BuyerForm";
import BuyerOffers from "../FarmerDashboard/buyerform/BuyerOffers";
import DynamicChartPage from "../FarmerDashboard/dataUpload/DynamicChartPage";
import TradeChartPage from "../FarmerDashboard/IAanalyst/TradeChartPage";
import TradeAiReportPage from "../FarmerDashboard/IAanalyst/TradeAiReportPage";
import { TradeDataProvider } from "../FarmerDashboard/IAanalyst/TradeDataContext";
import TradingSelectionPage from "../FarmerDashboard/IAanalyst/TradingSelectionPage";
import AdminScrapper from "../adminscrapper/adminscrapper";
import FinanceDashboard from "../financialManagement/FinanceDashboard";
import StockDashboard from "../stockManagement/StockDashboard";
import AdminContactDashboard from "../AdminBackoffice/AdminContactDashboard";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Add useLocation to track current path
  const sidebarRef = useRef(null);
  const { notifications, userId } = useNotifications();
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, {
          withCredentials: true,
          timeout: 5000,
        });
        setUserRole(response.data.role);
      } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        navigate("/login"); // Redirect to login if profile fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileCollapsed(true);
        setIsMenuOpen(false);
      } else {
        setIsMobileCollapsed(false);
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  useEffect(() => {
  console.log("Redirection useEffect triggered:", {
    userRole,
    loading,
    pathname: location.pathname,
  });

  if (!loading && userRole && location.pathname.toLowerCase() === "/dashboard") {
    console.log(`Redirecting ${userRole} to appropriate dashboard...`);
    switch (userRole) {
      case "farmer":
        navigate("/dashboard/parcelinfo");
        break;
      case "distributor":
        navigate("/dashboard/BuyerOffers");
        break;
      case "transporter":
        navigate("/dashboard/trade-wizard");
        break;
      case "admin":
        navigate("/dashboard/gestionUser");
        break;
      default:
        console.log("Unknown role, redirecting to /login");
        navigate("/login");
    }
  }
}, [userRole, loading, location.pathname, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        !isMobileCollapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMobileCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isMobileCollapsed]);

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

  const handleNavigation = (path, allowedRoles) => {
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      alert(`Accès réservé aux rôles: ${allowedRoles.join(", ")}.`);
      return;
    }
    if (path === "/recommendations") {
      navigate(`/dashboard${path}`, { state: { userId } });
    } else {
      navigate(`/dashboard${path}`);
    }
    if (isMobile) setIsMobileCollapsed(true);
  };

  const handleRemoveNotification = async (id) => {
    try {
      await axios.put(`${API_URL}/api/notifications/${id}/read`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Erreur lors de la suppression de la notification:", error);
    }
  };

  const menuItems = [
    ...(userRole === "farmer"
      ? [
          { name: "Parcel Info", icon: faInfoCircle, path: "/parcelinfo", roles: ["farmer"] },
          { name: "Map", icon: faMapMarkedAlt, path: "/MapSelector", roles: ["farmer"] },
          { name: "StockManagement", icon: faBoxes, path: "/StockManagement", roles: ["farmer"] },
          { name: "WheatPrediction", icon: faMoneyBillWheat, path: "/WheatPrediction", roles: ["farmer"] },
          { name: "FarmerOffers", icon: faFileWaveform, path: "/FarmerOffers", roles: ["farmer"] },
          { name: "Recommendations", icon: faListCheck, path: "/recommendations", roles: ["farmer"] },
          { name: "Trade Data", icon: faTrademark, path: "/trade", roles: ["farmer"] },
          { name: "CountryStats", icon: faCalculator, path: "/CountryStats", roles: ["farmer"] },
          { name: "Trade Wizard", icon: faChartLine, path: "/trade-wizard", roles: ["farmer"] },
          { name: "Finance Dashboard", icon: faCalculator, path: "/financialManagment", roles: ["farmer"] },
          { name: "Stock", icon: faCalculator, path: "/Stock", roles: ["farmer"] },
        ]
      : []),
    ...(userRole === "distributor"
      ? [
          { name: "BuyerOffers", icon: faShoppingCart, path: "/BuyerOffers", roles: ["distributor"] },
          { name: "Trade Data", icon: faTrademark, path: "/trade", roles: ["distributor"] },
          { name: "CountryStats", icon: faCalculator, path: "/CountryStats", roles: ["distributor"] },
          { name: "Trade Wizard", icon: faChartLine, path: "/trade-wizard", roles: ["distributor"] },
          { name: "Finance Dashboard", icon: faCalculator, path: "/financialManagment", roles: ["distributor"] },
        ]
      : []),
    ...(userRole === "transporter"
      ? [
          { name: "Trade Wizard", icon: faChartLine, path: "/trade-wizard", roles: ["transporter"] },
          { name: "Finance Dashboard", icon: faCalculator, path: "/financialManagment", roles: ["transporter"] },
        ]
      : []),
    ...(userRole === "admin"
      ? [
          { name: "Gestion User", icon: faUserCheck, path: "/gestionUser", roles: ["admin"] },
          { name: "AdminScrapper", icon: faListCheck, path: "/AdminScrapper", roles: ["admin"] },
          { name: "AdminContactDashboard", icon: faListCheck, path: "/AdminContactDashboard", roles: ["admin"] },
        ]
      : []),
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toolbarItems = [
    { name: "Dashboard", icon: faHome, path: "/parcelinfo", roles: ["farmer", "admin"] },
    { name: "Profile", icon: faUser, path: "/UpdateFarmerProfile", roles: ["farmer", "distributor", "transporter", "admin"] },
    { name: "Settings", icon: faCog, path: "/gestionUser", roles: ["admin"] },
  ].filter((item) => item.roles.includes(userRole));

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="app-container">
      <div
        ref={sidebarRef}
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
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <li className="sidebar-item" key={item.name}>
                  <a
                    className="sidebar-link"
                    onClick={() => handleNavigation(item.path, item.roles)}
                  >
                    <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                    <span className="sidebar-text">{item.name}</span>
                    {isCollapsed && !isMobile && (
                      <span className="sidebar-tooltip">{item.name}</span>
                    )}
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
            <button
              className="logout-button"
              onClick={() => console.log("Logout")}
              aria-label="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
              <span className="sidebar-text">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isMobile && !isMobileCollapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileCollapsed(true)}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsMobileCollapsed(true)}
        />
      )}

      <div
        className={`floating-toolbar ${isCollapsed && !isMobile ? "shifted" : ""}`}
      >
        <div className="toolbar-content">
          <button
            className="toolbar-toggle"
            onClick={toggleSidebar}
            aria-label={isMobileCollapsed ? "Open sidebar" : "Close sidebar"}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="toolbar-items">
            {toolbarItems.map((item) => (
              <div className="toolbar-item" key={item.name}>
                <button
                  className="toolbar-button"
                  onClick={() => handleNavigation(item.path, item.roles)}
                  title={item.name}
                  aria-label={item.name}
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
                aria-label="Toggle notifications"
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
                          aria-label="Remove notification"
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
              aria-label="Logout"
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
          {userRole === "farmer" && (
            <>
              <Route path="/parcelinfo" element={<ParcelInfo />} />
              <Route path="/observations/:shapeId" element={<Observations />} />
              <Route path="/MapSelector" element={<MapWithComments />} />
              <Route path="/observations/add/:shapeId" element={<AddObservation />} />
              <Route path="/StockManagement" element={<StockManagement />} />
              <Route path="/WheatPrediction" element={<WheatPrediction />} />
              <Route path="/FarmerOffers" element={<FarmerOffers />} />
              <Route path="/recommendations" element={<RecommendationsSelector />} />
              <Route path="/recommendations/:shapeId" element={<Recommendations />} />
              <Route path="/trade" element={<TradeDataManager />} />
              <Route path="/trade-data/:fileId" element={<FileDataManager />} />
              <Route path="/trade-data/:fileId/charts" element={<DynamicChartPage />} />
              <Route path="/CountryStats" element={<CountryStats />} />
              <Route
                path="/trade-wizard/*"
                element={
                  <TradeDataProvider>
                    <Routes>
                      <Route path="/" element={<TradingSelectionPage />} />
                      <Route path="/chart" element={<TradeChartPage />} />
                      <Route path="/report" element={<TradeAiReportPage />} />
                    </Routes>
                  </TradeDataProvider>
                }
              />
              <Route path="/financialManagment" element={<FinanceDashboard />} />
              <Route path="/stock" element={<StockDashboard />} />
            </>
          )}
          {userRole === "distributor" && (
            <>
              <Route path="/BuyerOffers" element={<BuyerOffers />} />
              <Route path="/BuyerForm" element={<BuyerForm />} />
              <Route path="/trade" element={<TradeDataManager />} />
              <Route path="/trade-data/:fileId" element={<FileDataManager />} />
              <Route path="/trade-data/:fileId/charts" element={<DynamicChartPage />} />
              <Route path="/CountryStats" element={<CountryStats />} />
              <Route
                path="/trade-wizard/*"
                element={
                  <TradeDataProvider>
                    <Routes>
                      <Route path="/" element={<TradingSelectionPage />} />
                      <Route path="/chart" element={<TradeChartPage />} />
                      <Route path="/report" element={<TradeAiReportPage />} />
                    </Routes>
                  </TradeDataProvider>
                }
              />
              <Route path="/financialManagment" element={<FinanceDashboard />} />
            </>
          )}
          {userRole === "transporter" && (
            <>
              <Route
                path="/trade-wizard/*"
                element={
                  <TradeDataProvider>
                    <Routes>
                      <Route path="/" element={<TradingSelectionPage />} />
                      <Route path="/chart" element={<TradeChartPage />} />
                      <Route path="/report" element={<TradeAiReportPage />} />
                    </Routes>
                  </TradeDataProvider>
                }
              />
              <Route path="/financialManagment" element={<FinanceDashboard />} />
            </>
          )}
          {userRole === "admin" && (
            <>
              <Route path="/gestionUser" element={<GestionUser />} />
              <Route path="/AdminScrapper" element={<AdminScrapper />} />
              <Route path="/AdminContactDashboard" element={<AdminContactDashboard />} />
            </>
          )}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;