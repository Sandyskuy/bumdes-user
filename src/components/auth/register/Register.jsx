import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // import Link
import "./register.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    pass_confirm: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage(response.data.message || "Registrasi berhasil!");
        setFormData({
          email: "",
          username: "",
          password: "",
          pass_confirm: "",
          phone_number: "",
        });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        setErrorMessage("Harap perbaiki kesalahan di bawah.");
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Daftar Akun</h2>
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Nama Pengguna"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone_number"
              placeholder="Nomor Telepon"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && (
              <p className="error">{errors.phone_number}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="pass_confirm"
              placeholder="Konfirmasi Kata Sandi"
              value={formData.pass_confirm}
              onChange={handleChange}
              required
            />
            {errors.pass_confirm && (
              <p className="error">{errors.pass_confirm}</p>
            )}
          </div>
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Memuat..." : "Daftar"}
          </button>
        </form>
        <p className="login-link">
          Sudah punya akun?{" "}
          <Link to="/login" className="link">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
