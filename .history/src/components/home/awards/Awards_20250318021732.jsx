import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./awards.css";
import imgPlaceholder from "../../images/about.jpg";

const Awards = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch berita dari backend
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/berita"); // Sesuaikan endpoint
        setNewsItems(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Gagal mengambil berita.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              <img
                src={newsItems[0].gambar ? `http://localhost:8080/uploads/${newsItems[0].gambar}` : imgPlaceholder}
                alt={newsItems[0].judul}
                onError={(e) => (e.target.src = imgPlaceholder)}
              />
              <div className="news-overlay">
                <h2>{newsItems[0].judul}</h2>
                <p>{newsItems[0].deskripsi || "Tidak ada ringkasan."}</p>
              </div>
            </div>
          )}
          <div className="news-small-container">
            {newsItems.slice(1).map((item, index) => (
              <div className="news-small" key={index}>
                <img
                  src={item.gambar ? `http://localhost:8080/uploads/${item.gambar}` : imgPlaceholder}
                  alt={item.judul}
                  onError={(e) => (e.target.src = imgPlaceholder)}
                />
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
