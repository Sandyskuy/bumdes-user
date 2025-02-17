import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../images/empty cart.png"; // Gambar default jika produk tidak memiliki gambar
import img from "../images/services1.png";
import Back from "../common/Back";
import "./Service.css";
import "./Servicecard.css";
import ReactPaginate from "react-paginate";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 12;

  // Fetch produk dari API
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/barang");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Fetch kategori dari API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/kategori");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Panggil API saat pertama kali render
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Handle perubahan halaman
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  // Optimasi pencarian dan filter dengan useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || product.kategori_id === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  // Hitung produk yang akan ditampilkan di halaman saat ini
  const currentProducts = useMemo(() => {
    const start = pageNumber * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, pageNumber, productsPerPage]);

  // Format harga ke dalam Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <section className="services mb">
      <Back name="Products" title="Products - All Products" cover={img} />

      {/* Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Produk */}
      <div className="service container">
        {currentProducts.map((product) => {
          // Cek apakah gambar tersedia, jika tidak, gunakan placeholder
          const imageUrl = product.gambar
            ? `http://localhost:8080/uploads/${product.gambar}`
            : imgPlaceholder;

          return (
            <Link
              key={product.id}
              to={`/barang/detail/${product.id}`}
              className="card"
              style={{
                width: "18rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <img
                  src={imageUrl}
                  className="card-img-top"
                  alt={product.nama}
                  loading="lazy"
                  onError={(e) => (e.target.src = imgPlaceholder)} // Jika error, fallback ke placeholder
                />
                <div className="card-body">
                  <div className="card-title-container">
                    <h5 className="card-title">{product.nama}</h5>
                    <p className="category-name">{product.nama_kategori}</p>
                  </div>
                  <p className="card-text">{formatRupiah(product.harga)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </section>
  );
};

export default Product;
