import React, { useEffect, useState } from "react";
import "./header.css";
import { nav, navLogined } from "../../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Profile from "../../images/Profile.png";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(token != null);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header>
      <div className="container flex">
        <div className="logo-bumdes">
          <img src="./images/logo1.png" alt="Logo" />
        </div>
        <div className="nav">
          <ul className={navList ? "small" : "flex"}>
            {login
              ? navLogined.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              : nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))}
          </ul>
        </div>
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
                <Dropdown.Item as={Link} to="/riwayat">
                  Riwayat
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button className="btn1">
                <i className="fa fa-sign-in"></i> Sign In
              </button>
            </Link>
          )}
        </div>
        <div className="toggle">
          <button onClick={() => setNavList(!navList)}>
            {navList ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
