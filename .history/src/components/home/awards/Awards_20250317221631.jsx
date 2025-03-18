import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./awards.css";
import img from "../../images/about.jpg";
const Awards = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/news") // Ganti dengan URL backend CI4
      .then((response) => response.json())
      .then((data) => setNewsItems(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

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
              <img src={newsItems[0].gambar} alt={newsItems[0].judul} />
              <div className="news-overlay">
                <h2>{newsItems[0].judul}</h2>
                <p>{newsItems[0].isi}</p>
              </div>
            </div>
          )}
          <div className="news-small-container">
            {newsItems.slice(1).map((item, index) => (
              <div className="news-small" key={index}>
                <img src={item.gambar} alt={item.judul} />
                <div className="news-overlay">
                  <h3>{item.judul}</h3>
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
