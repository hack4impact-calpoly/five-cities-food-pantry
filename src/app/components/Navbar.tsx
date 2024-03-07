import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-link">
          <img
            src="/logo.png"
            alt="Five Cities Christian Women Food Pantry Logo"
            className="logo"
          />
        </a>
        <div className="navbar-right-links">
          <a href="/clientSearch" className="navbar-link">
            Client Search
          </a>
          <a href="/report" className="navbar-link">
            Generate PDF
          </a>
          <div className="profile-icon">
            <svg className="icon">
              <use href="/user-icons.svg#icon-user-profile" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
