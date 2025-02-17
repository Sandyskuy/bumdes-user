import React from "react";
import "../transaksi/checkout.css"; // Sesuaikan dengan file CSS Anda jika diperlukan

const GopayQR = ({ imageUrl }) => {
  return (
    <div className="container mt-5">
      <h2>QR Code Gopay</h2>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>
        Silahkan Scan Gambar Dibawah
      </h3>
      <div className="gopay-qr-container">
        <img src={imageUrl} alt="Gopay QR Code" className="gopay-qr-image" />
      </div>
    </div>
  );
};

export default GopayQR;
