import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Common/UserContext";

const UserNavbar = () => {
  const { setLoginUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginUser(null);
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/UserHome">
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
          <li className="nav-item">
            <Link className="nav-link" to="/bookslot" style={{fontWeight:"bold"}}>
              Book Vaccine slot
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reschedulepage" style={{fontWeight:"bold"}}>
              ReschedulePage
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/availablevaccine" style={{fontWeight:"bold"}}>
              Available Vaccine
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Vaccinehistory" style={{fontWeight:"bold"}}>
              Vaccine History
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile" style={{fontWeight:"bold"}}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" style={{fontWeight:"bold"}}>
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
