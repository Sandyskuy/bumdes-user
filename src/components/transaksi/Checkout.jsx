import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Gopay from "./Gopay";
import "./checkout.css"; // Pastikan file CSS ini ada

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(location.state.cartItems);
  const [total, setTotal] = useState(location.state.total);
  const [showModal, setShowModal] = useState(false);
  const [gopay, setGopay] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState("");

  const handleBackToCart = () => {
    navigate("/keranjang");
  };

  const handleConfirmOrder = () => {
    if (!alamat.trim()) {
      setError("Alamat pengiriman wajib diisi!");
      return;
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePaymentMethodSelect = async (paymentType) => {
    let cartItemsRequest = cartItems.map((item) => ({
      name: item.nama_barang,
      barang_id: item.barang_id,
      quantity: item.jumlah ?? 1,
    }));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/transaksi/checkout",
        {
          order_details: cartItemsRequest,
          payment_methode: paymentType,
          alamat: alamat, // Pastikan alamat dimasukkan ke dalam payload
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Order confirmed:", response.data);
      if (response.data.payments.payment_type === "gopay") {
        setImageUrl(response.data.payments.actions[0].url);
        setGopay(true);
        setShowModal(false);
      } else {
        navigate("/sukses");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-content">
        {/* Kiri: Daftar Item */}
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.barang_id} className="checkout-item">
              <img
                src={`http://localhost:8080/uploads/${item.gambar_barang}`}
                alt={item.nama_barang}
                className="checkout-item-image"
              />
              <div className="checkout-item-info">
                <h5>{item.nama_barang}</h5>
                <p>Harga: {formatRupiah(item.harga)}</p>
                <p>Jumlah: {item.jumlah}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Kanan: Alamat & Tombol Checkout */}
        <div className="checkout-summary">
          <div className="checkout-address">
            <h4>Alamat Pengiriman:</h4>
            <textarea
              className="address-input"
              rows="3"
              placeholder="Masukkan alamat lengkap..."
              value={alamat}
              onChange={(e) => {
                setAlamat(e.target.value);
                setError("");
              }}
            />
            {error && <p className="error-text">{error}</p>}
          </div>

          <div className="checkout-buttons">
            <h4>Total: {formatRupiah(total)}</h4>
            <button
              className="btn-confirm-checkout"
              onClick={handleConfirmOrder}
            >
              Konfirmasi Pesanan
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pilihan Pembayaran */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Pilih Metode Pembayaran</h2>
            <div className="payment-options">
              <button
                className="btn-payment bank-transfer"
                onClick={() => handlePaymentMethodSelect("bank_transfer")}
              >
                Transfer Bank
              </button>
              <button
                className="btn-payment gopay"
                onClick={() => handlePaymentMethodSelect("gopay")}
              >
                Gopay
              </button>
            </div>
          </div>
        </div>
      )}

      {gopay && imageUrl && <Gopay imageUrl={imageUrl} />}
      {gopay && (
        <img src={imageUrl} alt="QR Code Gopay" className="gopay-image" />
      )}
    </div>
  );
};

export default Checkout;
