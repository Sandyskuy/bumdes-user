import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import imgPlaceholder from "../images/empty cart.png";
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
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/barang/detail/${id}`
        );
        setBarang(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBarang();
  }, [id]);

  const addToCart = async () => {
    if (quantity < 1) {
      setError("Quantity harus minimal 1");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/transaksi/Cart/",
        {
          barang_id: id,
          jumlah: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/keranjang");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !barang) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container-detail mt-5">
      <div className="row">
        {/* Image Section */}
        <div className="col-lg-6 col-md-6 mb-4">
          <div className="product-image-container">
            <img
              src={
                barang?.gambar
                  ? `http://localhost:8080/uploads/${barang.gambar}`
                  : imgPlaceholder
              }
              alt={barang?.nama || "Product Image"}
              className="product-detail-image"
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = imgPlaceholder;
              }}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-lg-6 col-md-6">
          <div className="product-info">
            <h2 className="product-name">
              {barang?.nama || "Nama produk tidak tersedia"}
            </h2>
            <p className="product-price">
              {barang ? formatRupiah(barang.harga) : "-"}
            </p>
            <p className="product-description">
              {barang?.deskripsi || "Deskripsi produk tidak tersedia."}
            </p>
            <p className="product-stock">
              <strong>Stock:</strong> {barang?.stok ?? "-"}
            </p>

            {/* Quantity Control */}
            <div className="quantity-container mb-4">
              <button
                className="quantity-btn-detail"
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantity(val < 1 || isNaN(val) ? 1 : val);
                }}
              />
              <button
                className="quantity-btn-detail"
                onClick={() => setQuantity((q) => q + 1)}
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
