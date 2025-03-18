import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Newslist.css";

const NewsList = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/berita") // Sesuaikan dengan endpoint backend CI4
      .then((response) => response.json())
      .then((data) => setNewsItems(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <section className="news-list">
      <div className="container">
        <h1>Daftar Berita</h1>
        <div className="news-list-container">
          {newsItems.map((news) => (
            <div className="newslist-item" key={berita.id}>
              <img src={news.gambar} alt={news.judul} />
              <div className="newslist-info">
                <h2>{news.judul}</h2>
                <Link to={`/news/${news.id}`} className="read-more">
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