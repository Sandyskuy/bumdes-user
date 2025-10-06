import React, { useEffect, useState,  useCallback } from "react";
import { Link } from "react-router-dom";
import "./Newslist.css";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 10;

  // Fetch berita dari API
  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/news");
      setNews(response.data);
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
          {berita.map((berita) => (
            <div className="newslist-item" key={berita.id}>
            <img src={berita.gambar} alt={berita.judul} />
              <div className="newslist-info">
                <h2>{berita.judul}</h2>
                <Link to={`/berita/${berita.id}`} className="read-more">
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsList;