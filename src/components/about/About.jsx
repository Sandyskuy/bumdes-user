import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about1.png";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about-section">
        <Back
          name="Tentang Kami"
          title="Tentang Kami - Apa itu bumdes ?"
          cover={img}
        />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Bumdes Multiguna Sidomulyo"
              subtitle="Jalan Raya Wonoasri Desa Sidomulyo Kecamatan Wonoasri Kabupaten Madiun 63157"
            />

            <p>
              Badan Usaha Milik Desa (BUMDes) Multiguna Sidomulyo adalah sebuah
              entitas usaha yang beroperasi di Desa Sidomulyo, Kecamatan
              Wonoasri, Kabupaten Madiun. Berlokasi di Jalan Raya Wonoasri, Desa
              Sidomulyo, Kecamatan Wonoasri, Kabupaten Madiun, dengan kode pos
              63157, BUMDes ini didirikan dengan tujuan untuk mengembangkan
              potensi ekonomi lokal dan meningkatkan kesejahteraan masyarakat
              desa. Melalui berbagai unit usaha yang dikelolanya, BUMDes
              Multiguna Sidomulyo berfokus pada pemberdayaan masyarakat,
              peningkatan pendapatan desa, serta penyediaan layanan dan produk
              yang bermanfaat bagi warga sekitar.
            </p>
          </div>
          <div className="right row">
            <img src="./immio1.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
