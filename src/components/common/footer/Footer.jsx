import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src="../images/logo3.png" alt="" />

              <p>
                Badan Usaha Milik Desa (BUMDes) Multiguna Sidomulyo adalah
                sebuah entitas usaha yang beroperasi di Desa Sidomulyo,
                Kecamatan Wonoasri, Kabupaten Madiun.
              </p>
            </div>
          </div>

          {footer.map((val) => (
            <div className="box" key={val.title}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, index) => (
                  <li key={index}>{items.list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>©2024 Bumdes Sidomulyo. All Rights Reserved</span>
      </div>
    </>
  );
};

export default Footer;
