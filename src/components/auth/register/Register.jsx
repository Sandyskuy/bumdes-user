import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    pass_confirm: '',
    phone_number: '' // New phone number field
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);

      if (response.status === 201) {
        setMessage(response.data.message);
        setFormData({
          email: '',
          username: '',
          password: '',
          pass_confirm: '',
          phone_number: '' // Clear the phone number field on success
        });
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        setMessage('Harap perbaiki kesalahan di bawah sebelum melanjutkan.');
      } else {
        setMessage('Terjadi kesalahan. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Daftar Akun</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nama Pengguna"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Kata Sandi"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group"> {/* New phone number input field */}
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Nomor Telepon"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && <p className="error">{errors.phone_number}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="pass_confirm"
              name="pass_confirm"
              placeholder="Konfirmasi Kata Sandi"
              value={formData.pass_confirm}
              onChange={handleChange}
            />
            {errors.pass_confirm && <p className="error">{errors.pass_confirm}</p>}
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Memuat...' : 'Daftar'}
          </button>
        </form>
        {message && <p className={errors ? 'error-message' : 'success'}>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;
