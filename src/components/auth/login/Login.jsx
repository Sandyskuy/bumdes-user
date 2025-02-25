import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cek apakah user sudah login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      if (!loginIdentifier || !password) {
        setErrorMessage(
          "Harap masukkan email, username, atau nomor telepon serta password."
        );
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const { data, status } = await axios.post(
          "http://localhost:8080/api/login",
          {
            login: loginIdentifier,
            password,
          }
        );

        if (status === 200 && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);

          alert("Login berhasil!");
          navigate("/");
        } else {
          throw new Error(data.error || "Login gagal. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(
          error.response?.data?.error ||
            "Terjadi kesalahan saat melakukan login."
        );
      }

      setIsLoading(false);
    },
    [loginIdentifier, password, navigate]
  );

  return (
    <div className="container-login">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && (
          <p className="error-message" aria-live="polite">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email, Username, atau No. HP:</label>
            <input
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="signup-text">
          <p>
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
