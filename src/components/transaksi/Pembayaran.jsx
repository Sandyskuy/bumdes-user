import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pembayaran.css"; // Import file CSS untuk gaya modal

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false); // State for proof of payment modal
  const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang dipilih untuk bayar
  const [proofFile, setProofFile] = useState(null); // State for payment proof file
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in again.");
      navigate("/login"); // Redirect to login if no token is found
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
        console.log("Fetched Data:", response.data);
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access, please log in again.");
          localStorage.removeItem("token");
          navigate("/login"); // Redirect to login on 401 error
        } else {
          setError("An error occurred while fetching cart items.");
        }
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleBayarClick = (item) => {
    setSelectedItem(item); // Menetapkan item yang dipilih untuk bayar
    setShowModal(true);
  };

  const handleProofClick = (item) => {
    setSelectedItem(item); // Menetapkan item yang dipilih untuk upload bukti
    setShowProofModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowProofModal(false); // Close proof modal
    setSelectedItem(null); // Me-reset item yang dipilih
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
      handleCloseModal(); // Menutup modal setelah bukti diupload
    } catch (error) {
      console.error("Error uploading proof:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setError("An error occurred while uploading the proof.");
    }
  };

  const handleFileChange = (event) => {
    setProofFile(event.target.files[0]);
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
                Status: {item.midtrans.transaction_status}{" "}
                {item.pembayaran_status === 1
                  ? "(Sudah Dikonfirmasi)"
                  : "(Belum Dikonfirmasi)"}
              </p>
              <p>Lakukan pembayaran sebelum: {item.midtrans.expiry_time}</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {item.details &&
                    item.details.map((detail, idx) => (
                      <tr key={idx}>
                        <td>{detail.barang.nama}</td>
                        <td>Rp. {detail.barang.harga}</td>
                        <td>{detail.jumlah}</td>
                        <td>{detail.barang.harga * detail.jumlah}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                <button onClick={() => handleBayarClick(item)}>Bayar</button>
                <button onClick={() => handleProofClick(item)}>
                  Kirim Bukti Pembayaran
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada pesanan yang belum dibayar.</p>
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
            <p>Status: {selectedItem.midtrans.transaction_status}</p>
            {selectedItem.midtrans.va_numbers &&
              selectedItem.midtrans.va_numbers.length > 0 && (
                <>
                  <p>Bank: {selectedItem.midtrans.va_numbers[0].bank}</p>
                  <p>
                    No rekening: {selectedItem.midtrans.va_numbers[0].va_number}
                  </p>
                </>
              )}
            <p>Total: {selectedItem.midtrans.gross_amount}</p>

            <table className="table">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.details &&
                  selectedItem.details.map((detail, idx) => (
                    <tr key={idx}>
                      <td>{detail.barang.nama_barang}</td>
                      <td>Rp. {detail.barang.harga}</td>
                      <td>{detail.jumlah}</td>
                      <td>{detail.barang.harga * detail.jumlah}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
