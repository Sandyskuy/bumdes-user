import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Badan Usaha Milik Desa (BUMDes)</h1>
          <p>
            BUMDes hadir untuk meningkatkan kesejahteraan masyarakat desa dengan
            mengelola potensi lokal dan menciptakan peluang usaha yang
            berkelanjutan.
          </p>
          <a href="#pelajari-lebih" className="hero-btn">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
