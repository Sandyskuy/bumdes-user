import React from "react";
import Heading from "../../common/Heading";
import "./style.css";

const PasarSindon = () => {
  return (
    <section className="about">
      <div className="container grid">
        {/* Kiri - Deskripsi */}
        <div className="about-text">
          <div className="about-title">
            <h1>Pasar Sindon </h1>
            <p>
              CJGC+4PG, Sindon, Sidomulyo, Kec. Wonoasri, Kabupaten Madiun, Jawa
              Timur 63157
            </p>
          </div>
          <p>
            Pasar tradisional ini menjadi tempat bertemunya pembeli dan penjual
            lintas generasi. Pada pagi hari, pasar ini ramai oleh pedagang dan
            pembeli, mencerminkan perannya yang vital dalam mendukung ekonomi
            masyarakat sekitar. Nuansa tradisional masih terasa dengan penjual
            lesehan, tawar-menawar, hingga sistem barter. Sore hari, banyak UMKM
            yang menjajakan dagangannya di sekitar pasar. Website ini bertujuan
            untuk mengenalkan Pasar Sindon agar lebih dikenal, tidak hanya di
            Kabupaten Madiun tetapi juga di seluruh Indonesia.
          </p>

          <a
            href="https://pasarsindon.com/"
            className="btn-visit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kunjungi Pasar
          </a>
        </div>

        {/* Kanan - Gambar */}
        <div className="about-image">
          <img src="immio1.png" alt="Pasar Sindon" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default PasarSindon;
