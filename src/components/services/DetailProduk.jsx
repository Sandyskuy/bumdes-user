import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Detailproduk.css";

const DetailBarang = () => {
  const { id } = useParams();
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/barang/detail/${id}`
        );
        setBarang(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBarang();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/transaksi/Cart/",
        {
          barang_id: id,
          jumlah: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/keranjang");
    } catch (error) {
      setError(error.message);
    }
  };

  // Format harga ke dalam Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-detail mt-5">
      <div className="row">
        {/* Image Section */}
        <div className="col-lg-6 col-md-6 mb-4">
          <div className="product-image-container">
            <img
              src={`http://localhost:8080/uploads/${barang.gambar}`}
              alt={barang.nama}
              className="product-image"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-lg-6 col-md-6">
          <div className="product-info">
            <h2 className="product-name">{barang.nama}</h2>
            <p className="product-price">{formatRupiah(barang.harga)}</p>
            <p className="product-description">{barang.deskripsi}</p>
            <p className="product-stock">
              <strong>Stock:</strong> {barang.stok}
            </p>

            {/* Quantity Control */}
            <div className="quantity-container mb-4">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className="btn btn-add-to-cart" onClick={addToCart}>
              Add to Cart
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
