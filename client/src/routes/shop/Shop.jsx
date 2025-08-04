import React, { useState } from "react";
import FurnitureCard from "../../components/furnitureCard/FurnitureCard";
import { useLoaderData } from "react-router-dom";

const Product = () => {
  const data = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Living Room", "Bedroom", "Outdoor"];

  const filteredData = data.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Our Products</h2>

      {/* Search and Filter Section */}
      <div className="row mb-4 align-items-center justify-content-between g-2">
        {/* Search Bar */}
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="col-12 col-md-5">
          <select
            className="form-select fw-semibold text-dark"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="row g-4 d-flex">
        {filteredData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredData.map((product) => (
            <div
              key={product._id || product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <FurnitureCard
                title={product.title}
                price={product.price}
                image={`http://localhost:3000${product.image}`}
                shopName={product.seller?.shopName || "Unknown Seller"}
                createdAt={product.createdAt}
                id={product.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
