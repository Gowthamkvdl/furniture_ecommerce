import React, { useState, Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import FurnitureCard from "../../components/furnitureCard/FurnitureCard";

const Product = () => {
  const data = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Living Room", "Bedroom", "Outdoor"];

  return (
    <div className="container py-5 min-vh-100">
      <h2 className="mb-4 fw-bold">Our Products</h2>

      {/* Search + Filter */}
      <div className="row mb-4 g-2 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="col-12 col-md-4 ms-auto">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Deferred Data */}
      <Suspense fallback={<p>Loading products...</p>}>
        <Await resolve={data.shopResponse}>
          {(res) => {
            const products = res.data;

            const filteredData = products.filter((product) => {
              const matchesSearch = product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

              const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

              return matchesSearch && matchesCategory;
            });

            return (
              <div className="row g-4">
                {filteredData.length === 0 ? (
                  <p>No products found.</p>
                ) : (
                  filteredData.map((product) => (
                    <div
                      key={product._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <FurnitureCard
                        title={product.title}
                        price={product.price}
                        image={`https://furniture-backend-qz6g.onrender.com${product.image}`}
                        shopName={product.seller?.shopName || "Unknown Seller"}
                        createdAt={product.createdAt}
                        id={product.id}
                      />
                    </div>
                  ))
                )}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Product;
