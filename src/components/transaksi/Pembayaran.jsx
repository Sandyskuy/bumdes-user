import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pembayaran.css";
import Gopay from "./Gopay";

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [proofFile, setProofFile] = useState(null);
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  const handleBayarClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleProofClick = (item) => {
    setSelectedItem(item);
    setShowProofModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowProofModal(false);
    setSelectedItem(null);
  };

  const handleProofSubmit = async () => {
    if (!proofFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("bukti_pembayaran", proofFile);
    formData.append("transaksi_id", selectedItem.id);

    try {
      const response = await axios.post(
        `http://localhost:8080/bukti/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Proof uploaded successfully:", response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error uploading proof:", error);
      setError("An error occurred while uploading the proof.");
    }
  };

  const handleFileChange = (event) => {
    setProofFile(event.target.files[0]);
  };

  const handleCopyRekening = () => {
    if (selectedItem && selectedItem.midtrans.va_numbers.length > 0) {
      navigator.clipboard.writeText(
        selectedItem.midtrans.va_numbers[0].va_number
      );
      alert("Nomor rekening berhasil disalin!");
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="container mt-3">
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>Pembayaran</h2>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>
        Daftar Pesanan Belum Dibayar
      </h3>
      {error && <p className="text-danger">{error}</p>}
      {data && Array.isArray(data) && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index} className="pesanan-card">
              <h3>Kode TR: {item.id}</h3>
              <p>Metode Pembayaran: {item.midtrans.payment_type}</p>
              <p>
                Status:{" "}
                <span
                  style={{
                    color:
                      item.midtrans.transaction_status === "settlement"
                        ? "green"
                        : item.midtrans.transaction_status === "pending"
                        ? "orange"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.midtrans.transaction_status}
                </span>{" "}
                {item.pembayaran_status === 1
                  ? "(Sudah Dikonfirmasi)"
                  : "(Belum Dikonfirmasi)"}
              </p>
              <p>Lakukan pembayaran sebelum: {item.midtrans.expiry_time}</p>
              <div className="button-group">
                <button onClick={() => handleBayarClick(item)}>Bayar</button>
                <button onClick={() => handleProofClick(item)}>
                  Kirim Bukti Pembayaran
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-shopping-cart empty-icon"></i>
          <h3>Belum Ada Pembayaran</h3>
          <p>Semua pesananmu sudah lunas, atau belum ada transaksi.</p>
        </div>
      )}

      {showModal && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Konfirmasi Pembayaran</h2>
            <p>Kode TR: {selectedItem.id}</p>
            <p>Metode Pembayaran: {selectedItem.midtrans.payment_type}</p>
            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    selectedItem.midtrans.transaction_status === "settlement"
                      ? "green"
                      : selectedItem.midtrans.transaction_status === "pending"
                      ? "orange"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {selectedItem.midtrans.transaction_status}
              </span>
            </p>
            {selectedItem.midtrans.va_numbers &&
              selectedItem.midtrans.va_numbers.length > 0 && (
                <>
                  <p>
                    Bank:{" "}
                    {selectedItem.midtrans.va_numbers[0].bank.toUpperCase()}
                  </p>
                  <p>
                    No Rekening:{" "}
                    <strong>
                      {selectedItem.midtrans.va_numbers[0].va_number}
                    </strong>
                    <button onClick={handleCopyRekening} className="copy-btn">
                      Salin
                    </button>
                  </p>
                </>
              )}
            <p>Total: {formatRupiah(selectedItem.midtrans.gross_amount)}</p>
          </div>
        </div>
      )}

      {showProofModal && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Upload Bukti Pembayaran</h2>
            <p>Kode TR: {selectedItem.id}</p>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleProofSubmit}>Kirim Bukti</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pembayaran;
