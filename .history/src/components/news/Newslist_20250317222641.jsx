import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Newslist.css";

const NewsList = () => {
  const [newsItems, setNewsItems] = useState([]);

    const fetchProducts = useCallback(async () => {
      try {
        const response = await axios.get("http://localhost:8080/barang");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, []);

  return (
    <section className="news-list">
      <div className="container">
        <h1>Daftar Berita</h1>
        <div className="news-list-container">
          {newsItems.map((news) => (
            <div className="newslist-item" key={news.id}>
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