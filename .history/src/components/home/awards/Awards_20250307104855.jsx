import React from "react";
import { Link } from "react-router-dom";
import "./awards.css";
import img from "../../images/about.jpg";

const Awards = () => {
  // Data berita manual
  const newsItems = [
    {
      title: "Berita Utama Hari Ini",
      description:
        "Ringkasan singkat dari berita utama yang menarik perhatian banyak orang.",
    },
    {
      title: "Berita Kedua",
    },
    {
      title: "Berita Ketiga",
    },
  ];

  return (
    <section className="awards padding">
      <div className="container">
        <div className="heading-container">
          <h1>Agenda</h1>
          <Link to="/newslist" className="lihat-semua-btn">
            Lihat Semua <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="news-grid">
          {newsItems.length > 0 && (
            <div className="news-large">
              <img src={img} alt={newsItems[0].title} />
              <div className="news-overlay">
                <h2>{newsItems[0].title}</h2>
                <p>{newsItems[0].description}</p>
              </div>
            </div>
          )}
          <div className="news-small-container">
            {newsItems.slice(1).map((item, index) => (
              <div className="news-small" key={index}>
                <img src={img} alt={item.title} />
                <div className="news-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
