import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import "./header.css";
import { nav, navLogined } from "../../data/Data";
import Profile from "../../images/Profile.png";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [login, setLogin] = useState(() => !!localStorage.getItem("token")); // Perbaikan di sini
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false); // Pastikan state diperbarui
    navigate("/login");
  };

  const navItems = useMemo(() => (login ? navLogined : nav), [login]);

  return (
    <header>
      <div className="container flex">
        <div className="logo-bumdes">
          <img src="./images/logo1.png" alt="Logo" />
        </div>
        <nav className="nav">
          <ul className={classNames({ small: navList, flex: !navList })}>
            {navItems.map((list, index) => (
              <li key={index}>
                <Link to={list.path}>{list.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="button flex">
          {login ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="profile-dropdown-toggle"
              >
                <img src={Profile} alt="Profile" className="profile-image" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/keranjang">
                  Keranjang
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/payments">
                  Pembayaran
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="/riwayat">
                  Riwayat
                </Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button className="btn-signin">
                <i className="fa fa-sign-in"></i> Sign In
              </button>
            </Link>
          )}
        </div>
        <div className="toggle">
          <button onClick={() => setNavList((prev) => !prev)}>
            <i className={`fa ${navList ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
