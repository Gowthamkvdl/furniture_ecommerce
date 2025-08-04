import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'danger'

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setMessageType("danger");
      setMessage("Please log in to add a product.");
      return;
    }

    if (currentUser.role !== "seller") {
      setMessageType("danger");
      setMessage("Only sellers are allowed to add products.");
      return;
    }

    if (!currentUser.isVerified) {
      setMessageType("warning");
      setMessage(
        "Your seller account is currently under verification. Please wait for approval."
      );
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", parseInt(formData.stock));
      data.append("category", formData.category);
      data.append("image", formData.image);
      data.append("sellerId", currentUser.id);

      const res = await apiRequest.post("/product/add", data);

      setMessageType("success");
      setMessage("Product added successfully!");

      // Optionally clear form after successful add
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });
      // console.log(res)
      navigate(`/product/${res.data.product.id}`);
    } catch (err) {
      console.error(err);
      setMessageType("danger");
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Add New Product</h3>

      {message && (
        <div className={`alert alert-${messageType} mb-4`} role="alert">
          {message}
        </div>
      )}

      <div className="card shadow-sm rounded-3 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="How many available?"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
