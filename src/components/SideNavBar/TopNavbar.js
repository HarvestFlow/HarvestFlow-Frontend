// TopNavbar.js
import React from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import "./TopNavbar.css";

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div className="top-navbar-left">
        <button className="menu-toggle">
          <span className="menu-icon"></span>
        </button>
        <h1 className="top-navbar-title"></h1>
      </div>
      <div className="top-navbar-right">
        <div className="top-navbar-icons">
          <FaSearch className="top-navbar-icon" />
          <FaBell className="top-navbar-icon" />
          <FaUser className="top-navbar-icon" />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
