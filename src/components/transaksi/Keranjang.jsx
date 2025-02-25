import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import ikon keranjang
import "./Keranjang.css";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/transaksi/Cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data);
        let total = response.data.reduce(
          (sum, item) => sum + parseInt(item.harga) * item.jumlah,
          0
        );
        setTotal(total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, total } });
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container-cart mt-4">
      <h2 className="text-center mb-4">Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <FaShoppingCart className="empty-cart-icon" />
          <p className="text-center text-muted">
            Oops! Keranjang belanja kamu masih kosong.
          </p>
          <Link to="/product" className="btn btn-primary">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.barang_id} className="cart-item">
              <img
                src={`http://localhost:8080/uploads/${item.gambar_barang}`}
                alt={item.nama_barang}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h5>{item.nama_barang}</h5>
                <p className="text-muted">Harga: {formatRupiah(item.harga)}</p>
                <p className="text-muted">Jumlah: {item.jumlah}</p>
              </div>
            </div>
          ))}
          <div className="text-end mt-4">
            <h4>Total: {formatRupiah(total)}</h4>
            <button className="btn btn-checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Keranjang;
