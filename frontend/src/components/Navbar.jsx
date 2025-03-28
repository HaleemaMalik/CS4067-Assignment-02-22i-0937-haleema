import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const handleLogoClick = () => {
    localStorage.removeItem("userId");
    // window.location.reload();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  // Watch for login changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const userId = localStorage.getItem("userId");

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#343a40" }}>
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ color: "#ffffff" }} onClick={handleLogoClick}>
          Event Booking App by Bilal Khawar
        </Link>
        <div className="collapse navbar-collapse">
          {(
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/events" style={{ color: "#ffffff" }}>Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/booking" style={{ color: "#ffffff" }}>My Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications" style={{ color: "#ffffff" }}>Notifications</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
