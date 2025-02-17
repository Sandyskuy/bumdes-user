import React from "react";
import { useParams, Link } from "react-router-dom";
import "./NewsDetail.css";
import img from "../images/about.jpg"; // Replace with dynamic image if needed

const NewsDetail = () => {
  const { id } = useParams(); // Access the dynamic parameter from the URL

  // Data berita manual (or you can fetch this from an API)
  const newsItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/800x400",
      title: "Berita Pertama",
      content:
        "MUNICH (Reuters) -The United States has asked its European allies what they would need from Washington to participate in Ukraine security arrangements, according to a document seen by Reuters.The diplomatic demarche sent last week, consisting of six points and questions, also asks which countries could contribute to the guarantees, which would be willing to deploy troops to Ukraine as part of a peace settlement, and what the size of any European-led force might be.",
      author: "John Doe",
      publishDate: "2025-02-16",
      tags: ["Teknologi", "Inovasi"],
      category: "Teknologi",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/800x400",
      title: "Berita Kedua",
      content: "Konten lengkap berita kedua yang lebih mendalam dan relevan.",
      author: "Jane Smith",
      publishDate: "2025-02-15",
      tags: ["Ekonomi", "Bisnis"],
      category: "Bisnis",
    },
    // Add more news items as needed
  ];

  // Find the news item by ID
  const news = newsItems.find((news) => news.id === parseInt(id));

  if (!news) {
    return <div>Berita tidak ditemukan!</div>; // Show a 404 message if the news item is not found
  }

  return (
    <section className="news-detail">
      <div className="container-news">
        <div className="news-header">
          <h1 className="news-title">{news.title}</h1>
          <div className="news-meta">
            <p className="author">Oleh {news.author}</p>
            <div className="divider"></div>
            <p className="publish-date">{news.publishDate}</p>
          </div>
          <img src={img} alt={news.title} className="news-detail-image" />
        </div>
        <div className="news-content">
          <p>{news.content}</p>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
