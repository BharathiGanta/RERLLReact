import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Common/UserContext";

const Adminpage = () => {
  const { setLoginUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginUser(null);
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/admin-dashboard">
        Vaccine portal
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
          <li className="nav-item"style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/admin-dashboard">
              Admin Dashboard
            </Link>
          </li>
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/Add-vaccine">
              AddVaccine
            </Link>
          </li>
          <li className="nav-item" style={{fontWeight:"bold"}}>
            <Link className="nav-link" to="/vaccine-posted">
              Vaccines Posted
            </Link>
          </li>
        </ul>
      </div>
      <ul className="navbar-nav ml-auto" style={{fontWeight:"bold"}}>
        <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Adminpage;
