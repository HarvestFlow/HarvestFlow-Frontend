import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUserShield, faChartBar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FaHistory } from 'react-icons/fa';
import NioBrand from '../NioBrand/NioBrand';
import './SideNavBar.css'; // Add a CSS file for additional custom styles

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <div className="logo-container">
          <NioBrand logo="s2" variant="dark" imageRoot="../images/" size="500px" />
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => { navigate("/App2"); }}>
              <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
              <span className="sidebar-text">Statistics</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => { navigate("/listeUsers"); }}>
              <FontAwesomeIcon icon={faList} className="sidebar-icon" />
              <span className="sidebar-text">List Users</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => { navigate("/ListAdmin"); }}>
              <FontAwesomeIcon icon={faUserShield} className="sidebar-icon" />
              <span className="sidebar-text">Admins</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => { navigate("/SuperAdminHistory"); }}>
              <FaHistory className="sidebar-icon" />
              <span className="sidebar-text">My History</span>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={() => { navigate("/"); }}>
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
            <span className="sidebar-text">FrontOffice</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
