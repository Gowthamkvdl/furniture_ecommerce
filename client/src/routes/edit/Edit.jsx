import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js"; // adjust path if needed

const Edit = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    price: parseFloat(data.price) || "",
    stock: data.stock || null,
    category: data.category || "",
  });

  const [error, setError] = useState(null); // ✅ error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error if any

    try {
      await apiRequest.put(`/product/${data.id}`, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock), // ✅ make sure it's an integer
      });
      navigate("/seller");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Something went wrong while updating the product."); // ✅ show error
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Update Your Product</h3>

      <div className="card shadow-sm rounded-3 p-4">
        <form onSubmit={handleSubmit}>
          {/* ✅ Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter product name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="Short description about the product"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="How many available?"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
