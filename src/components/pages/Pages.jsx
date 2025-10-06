import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Detail from "../services/DetailProduk";
import Keranjang from "../transaksi/Keranjang";
import Checkout from "../transaksi/Checkout.jsx";
import Sukses from "../transaksi/Sukses";
import Pembayaran from "../transaksi/Pembayaran";
import Selesai from "../transaksi/Selesai";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import DefaultLayout from "./DefaultLayout";
import NewsList from "../news/Newslist.jsx";
import NewsDetail from "../news/NewsDetail.jsx";

const Pages = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />
      <Route
        path="/about"
        element={
          <DefaultLayout>
            <About />
          </DefaultLayout>
        }
      />
      <Route
        path="/product"
        element={
          <DefaultLayout>
            <Services />
          </DefaultLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <DefaultLayout>
            <Contact />
          </DefaultLayout>
        }
      />
      <Route
        path="/barang/detail/:id"
        element={
          <DefaultLayout>
            <Detail />
          </DefaultLayout>
        }
      />
      <Route
        path="/keranjang"
        element={
          <DefaultLayout>
            <Keranjang />
          </DefaultLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <DefaultLayout>
            <Checkout />
          </DefaultLayout>
        }
      />
      <Route
        path="/sukses"
        element={
          <DefaultLayout>
            <Sukses />
          </DefaultLayout>
        }
      />
      <Route
        path="/payments"
        element={
          <DefaultLayout>
            <Pembayaran />
          </DefaultLayout>
        }
      />
      <Route
        path="/riwayat"
        element={
          <DefaultLayout>
            <Selesai />
          </DefaultLayout>
        }
      />
      <Route
        path="/newslist"
        element={
          <DefaultLayout>
            <NewsList />
          </DefaultLayout>
        }
      />
      <Route
        path="/news/:id"
        element={
          <DefaultLayout>
            <NewsDetail />
          </DefaultLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Pages />
    </Router>
  );
};

export default App;
