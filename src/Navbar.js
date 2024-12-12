import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Manish</h2>
      </div>
      <div className="navbar-right">
        <a href="/" className="navbar-link">
          FormData
        </a>
        <a href="/video" className="navbar-link">
          Video Play
        </a>
      </div>
    </div>
  );
};

export default Navbar;
