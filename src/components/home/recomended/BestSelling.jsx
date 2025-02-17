import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./bestselling.css";
import defaultImage from "../../images/empty cart.png"; // Gambar default jika tidak ada gambar produk

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/barang/bestseller"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching best selling products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color={"#36D7B7"} size={150} />
      </div>
    );
  }

  return (
    <section className="mb background">
      <div className="container">
        <div className="heading-container">
          <h1>Produk Unggulan</h1>
          <Link to="/produk" className="lihat-semua-btn">
            Lihat Semua <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="recomended">
          {products.map((product) => {
            const imageUrl = product.gambar
              ? `http://localhost:8080/uploads/${product.gambar}`
              : defaultImage;

            return (
              <Link
                key={product.id}
                to={`/barang/detail/${product.id}`}
                className="card-section"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <img
                    src={imageUrl}
                    className="card-img"
                    alt={product.nama}
                    onError={(e) => (e.target.src = defaultImage)} // Jika gambar gagal dimuat, gunakan default
                  />
                  <div className="card-body">
                    <div className="card-title-container">
                      <h5 className="card-titles">{product.nama}</h5>
                      <p className="category-name">{product.nama_kategori}</p>
                    </div>
                    <p className="card-texts">{formatRupiah(product.harga)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
