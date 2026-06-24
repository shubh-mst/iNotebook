import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Sidebar.css";
const host = process.env.REACT_APP_API_URL;
console.log("HOST =", host);

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="user-profile">
            <div className="avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="user-details">
              <h3>{user?.name || "Guest User"}</h3>
              <p>{user?.email || "guest@example.com"}</p>
            </div>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link to="/archive">
              <i className="fa-solid fa-box-archive"></i>
              <span>Archived Notes</span>
            </Link>
          </li>

          <li>
            <Link to="/about">
              <i className="fa-solid fa-circle-info"></i>
              <span>About</span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <p>iNotebook © 2026</p>
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
}

export default Sidebar;
