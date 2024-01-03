import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const CommonNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Vaccine Portal
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/Login">
              Login
            </Link>
          </li>
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/RegisterPage">
              Registration
            </Link>
            
          </li>
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
            
          </li>
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/about">
              About
            </Link>
            
          </li>
        </ul>
      </div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/"></Link>
        </li>
      </ul>
    </nav>
  );
};

export default CommonNavbar;
