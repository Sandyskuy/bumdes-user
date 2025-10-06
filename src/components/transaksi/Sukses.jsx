import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSuccess.css"; // Import CSS yang akan kita buat

const CheckoutSuccess = () => {
  return (
    <div className="checkout-success-container">
      {/* Logo menggunakan Font Awesome */}
      <div className="logo">
        <i className="fas fa-check-circle"></i> {/* Ikon toko */}
      </div>

      <div className="checkout-box">
        <h2>Checkout Success!</h2>
        <p>
          Pesanan Anda telah berhasil dikonfirmasi. Terima kasih telah
          berbelanja bersama kami!
        </p>
        <Link to="/payments" className="payment-link">
          Lihat Pembayaran
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
