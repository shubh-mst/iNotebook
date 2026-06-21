import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          iNotebook
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/archive">
              Archive
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/login" className="btn login-btn">
                Login
              </Link>

              <Link to="/signup" className="btn signup-btn">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
