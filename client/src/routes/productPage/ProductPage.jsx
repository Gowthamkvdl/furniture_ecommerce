import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

const ProductPage = () => {
  const product = useLoaderData();
  const { currentUser } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState(product.reviews || []);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // inside ProductPage component
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // helper to generate full address
  const getFullAddress = () => {
    return `${street}, ${city}, ${state} - ${zip}, ${country}`.trim();
  };

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:3000${product.image}`;

  const handlePlaceOrder = async () => {
    setError("");
    if (quantity > product.stock) {
      return setError("❌ Not enough stock available.");
    }
    if (!currentUser) {
      return setError("❌ Login to place orders.");
    }
    if (currentUser.role === "seller") {
      return setError("❌ Sellers cannot place orders.");
    }
    if (
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zip.trim() ||
      !country.trim()
    ) {
      return setError("❌ Please fill all address fields.");
    }
    try {
      await apiRequest.post("/order", {
        customerId: currentUser.id,
        productId: product.id,
        quantity,
        address: getFullAddress(),
        title: product.title,
      });
      setOrdered(true);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to place order. Try again.");
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      return setError("❌ Please enter review text.");
    }
    try {
      const res = await apiRequest.post("/product/review", {
        customerId: currentUser.id,
        productId: product.id,
        comment,
        customerName: currentUser.name,
      });

      // Update the UI with the new review without reload
      setReviews((prev) => [
        {
          ...res.data,
          createdAt: new Date().toISOString(), // or use res.data.createdAt if returned
        },
        ...prev,
      ]);

      setShowReviewModal(false);
      setComment("");
      setError("");
      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error(err);
      const serverMsg =
        err.response?.data?.message || "❌ Could not submit review.";
      setError(serverMsg);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        {/* Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={`https://furniture-backend-qz6g.onrender.com${product.image}`}
            alt={product.title} 
            className="img-fluid rounded-4 shadow-sm mb-5"
            style={{ maxWidth: "70%" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
          />
        </div>

        {/* Details */}
        <div className="col-md-6">
          {error && <div className="alert alert-danger mt-4">{error}</div>}
          {ordered && (
            <div className="alert alert-success mt-4">
              ✅ Order placed successfully!
            </div>
          )}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2 className="fw-bold">{product.title}</h2>
            {
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowReviewModal(true)}
              >
                Add Review
              </button>
            }
          </div>

          <p className="text-muted">{product.description}</p>
          <h4 className="text-success fw-semibold mb-3">₹{product.price}</h4>

          <div className="mb-2">
            <strong>Category:</strong> {product.category}
          </div>
          <div className="mb-2">
            <strong>Seller:</strong> {product.seller?.shopName} (
            {product.seller?.name})
          </div>
          <div className="mb-3">
            <strong>Available Quantity:</strong>{" "}
            <span
              className={product.stock > 0 ? "text-primary" : "text-danger"}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Quantity</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control"
              style={{ width: "120px" }}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Delivery Address</label>
            <div className="row g-2">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-dark px-4"
            onClick={() => {
              if (
                !street.trim() ||
                !city.trim() ||
                !state.trim() ||
                !zip.trim() ||
                !country.trim()
              ) {
                return setError("❌ Please fill all address fields.");
              }
              setError("");
              setShowOrderModal(true);
            }}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Place Order"}
          </button>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-5">
        <h4 className="mb-3">Customer Reviews</h4>

        {reviews.length > 0 ? (
          <div className="list-group">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="list-group-item list-group-item-action mb-2"
              >
                <p className="mb-1 fw-bold">{review.comment}</p>
                <small className="text-muted">
                  Reviewed by{" "}
                  <span className="text-dark fs-bold">
                    {review.customerName}
                  </span>{" "}
                  on{" "}
                  <span className="text-dark fs-bold">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>

      {/* Order Confirm Modal */}
      {showOrderModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Your Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOrderModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  <strong>Product:</strong> {product.title}
                </p>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {quantity}
                </p>
                <p>
                  <strong>Total:</strong> ₹{product.price * quantity}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {getFullAddress()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowOrderModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setShowOrderModal(false);
                    handlePlaceOrder();
                  }}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Write Your Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowReviewModal(false)}
                />
              </div>
              <div className="modal-body">
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowReviewModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
