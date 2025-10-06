import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./berita.css";
import imgPlaceholder from "../../images/about.jpg";

const Awards = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/berita");
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
            <Link to={`/news/${newsItems[0].id}`} className="news-large">
              <img
                src={
                  newsItems[0].gambar
                    ? `http://localhost:8080/uploads/${newsItems[0].gambar}`
                    : imgPlaceholder
                }
                alt={newsItems[0].judul || "Berita"}
                onError={(e) => (e.target.src = imgPlaceholder)}
              />
              <div className="news-overlay">
                <h2 className="news-judul">{newsItems[0].judul}</h2>
              </div>
            </Link>
          )}

          <div className="news-small-container">
            {newsItems.slice(1).map((item) => (
              <Link
                to={`/news/${item.id}`}
                className="news-small"
                key={item.id}
              >
                <img
                  src={
                    item.gambar
                      ? `http://localhost:8080/uploads/${item.gambar}`
                      : imgPlaceholder
                  }
                  alt={item.judul || "Berita"}
                  onError={(e) => (e.target.src = imgPlaceholder)}
                />
                <div className="news-overlay">
                  <h3>{item.judul}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
