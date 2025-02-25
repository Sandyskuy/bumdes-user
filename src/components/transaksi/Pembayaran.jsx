import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa"; // Import ikon keranjang
import "./Pembayaran.css";

const Pembayaran = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/transaksi/not-complete`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access, please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("An error occurred while fetching cart items.");
        }
      }
    };

    fetchCartItems();
  }, [navigate]);

  return (
    <div className="container mt-3">
      <h2 className="text-center">Pembayaran</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {data && Array.isArray(data) && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index} className="pesanan-card">
              <h3>Kode TR: {item.id}</h3>
              <p>Metode Pembayaran: {item.midtrans.payment_type}</p>
              <p>
                Status: {item.midtrans.transaction_status}{" "}
                {item.pembayaran_status === 1
                  ? "(Sudah Dikonfirmasi)"
                  : "(Belum Dikonfirmasi)"}
              </p>
              <p>Lakukan pembayaran sebelum: {item.midtrans.expiry_time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaShoppingCart size={60} className="empty-icon" />
          <h4 className="text-center mt-3">
            Tidak ada pesanan yang belum dibayar
          </h4>
          <p className="text-center">
            Silakan kembali ke halaman produk untuk melakukan pembelian.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/produk")}
          >
            Belanja Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default Pembayaran;
