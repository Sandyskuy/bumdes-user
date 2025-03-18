import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./NewsDetail.css";

const NewsDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data berita berdasarkan ID
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/berita/detail/${id}`);
        setNews(response.data);
      } catch (err) {
        setError("Berita tidak ditemukan!");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="news-detail">
      <div className="container-news">
        <div className="news-header">
        <h1 className="news-title">{news.judul}</h1>
          <div className="news-meta">
            <p className="author">Oleh {news.penulis || "Admin"}</p>
            <div className="divider"></div>
            <p className="publish-date">{news.tanggal}</p>
          </div>
          <img
            src={news.gambar ? `http://localhost:8080/uploads/${news.gambar}` : "/default-news.png"}
            alt={news.judul}
            className="news-detail-image"
            onError={(e) => (e.target.src = "/default-news.png")}
          />
        </div>
        <div className="news-content">
          <p>{news.isi}</p>
        </div>
        <Link to="/" className="back-button">Kembali</Link>
      </div>
    </section>
  );
};

export default NewsDetail;
