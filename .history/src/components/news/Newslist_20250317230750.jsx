import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../images/empty-news.png"; // Gambar default jika berita tidak memiliki gambar

import Back from "../common/Back";
import "./News.css";
import ReactPaginate from "react-paginate";

const News = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 10;

  // Fetch berita dari API menggunakan axios
  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/berita");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle perubahan halaman
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  // Filter berita berdasarkan pencarian
  const filteredNews = news.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung berita yang akan ditampilkan di halaman saat ini
  const currentNews = filteredNews.slice(
    pageNumber * newsPerPage,
    (pageNumber + 1) * newsPerPage
  );

  return (
    <section className="news-section">
      <Back name="News" title="News - Latest Updates" cover={img} />

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari berita..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* News List */}
      <div className="news-container">
        {currentNews.map((item) => {
          const imageUrl = item.gambar
            ? `http://localhost:8000/uploads/${item.gambar}`
            : imgPlaceholder;

          return (
            <Link
              key={item.id}
              to={`/berita/${item.id}`}
              className="news-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div>
                <img
                  src={imageUrl}
                  className="news-img"
                  alt={item.judul}
                  loading="lazy"
                  onError={(e) => (e.target.src = imgPlaceholder)}
                />
                <div className="news-info">
                  <h5 className="news-title">{item.judul}</h5>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredNews.length / newsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </section>
  );
};

export default News;