import React from "react";
import { Link } from "react-router-dom";
import "./Newslist.css";
import img from "../images/about.jpg";

const NewsList = () => {
  // Data berita manual
  const newsItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Berita Pertama",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Berita Kedua",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Berita Ketiga",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Berita Keempat",
    },
  ];

  return (
    <section className="news-list">
      <div className="container">
        <h1>Daftar Berita</h1>
        <div className="news-list-container">
          {newsItems.map((news) => (
            <div className="newslist-item" key={news.id}>
              <img src={img} alt={news.title} />
              <div className="newslist-info">
                <h2>{news.title}</h2>
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
