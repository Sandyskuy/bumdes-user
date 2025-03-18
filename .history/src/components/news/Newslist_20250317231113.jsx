import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Newslist.css";

const NewsList = () => {
  const [berita, setNewsItems] = useState([]);

  // Fetch berita dari API dengan axios
  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/berita"); // Sesuaikan URL jika perlu
      setNewsItems(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <section className="news-list">
      <div className="container">
        <h1>Daftar Berita</h1>
        <div className="news-list-container">
          {berita.length > 0 ? (
            berita.map((item) => (
              <div className="newslist-item" key={item.id}>
                <img
                  src={item.gambar ? `http://localhost:8000/uploads/${item.gambar}` : "/default-news.png"}
                  alt={item.judul}
                  onError={(e) => (e.target.src = "/default-news.png")} // Fallback jika gambar tidak ditemukan
                />
                <div className="newslist-info">
                  <h2>{item.judul}</h2>
                  <Link to={`/berita/${item.id}`} className="read-more">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada berita yang tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
