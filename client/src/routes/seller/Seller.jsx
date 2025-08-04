import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import "./seller.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Seller = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {
    if (data?.error === "unauthorized") {
      alert("You are not authorized to view this page.");
      navigate("/login"); // or wherever you want to redirect
    }

    if (data?.error === "server_error") {
      alert("Something went wrong. Please try again later.");
      navigate("/");
    }
  }, [data, navigate]);

  // Use local state for products so we can update the UI dynamically
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(data.orders || []);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    setProducts(data.products || []);
  }, [data.products]);

  const handleRemoveProduct = (product) => {
    setProductToRemove(product);
    setShowRemoveModal(true);
  };

  const removeProductConfirm = async () => {
    try {
      await apiRequest.delete(`/product/${productToRemove.id}`);
      // Update UI immediately
      setProducts((prev) =>
        prev.filter((item) => item.id !== productToRemove.id)
      );
      setShowRemoveModal(false);
      setProductToRemove(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Something went wrong while deleting the product.");
    }
  };

  const handleDelever = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      alert("❌ Order not found.");
      return;
    }

    if (order.status === "cancelled") {
      alert(
        "❌ Cannot mark as delivered. Order has been cancelled by the customer."
      );
      return;
    }

    if (order.status === "delivered") {
      alert("⚠️ Order is already marked as delivered.");
      return;
    }

    try {
      await apiRequest.put(`/order/${orderId}`, {
        status: "delivered",
      });

      // Update the UI
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, status: "delivered" } : o
        )
      );

      alert("✅ Order marked as delivered!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update order status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Seller Dashboard</h4>

      {/* Profile */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="pb-2">
          Profile Info{" "}
          <Link
            to={"/admin"}
            className={`btn btn-warning float-end ${
              currentUser.admin ? "d-block" : "d-none"
            }`}
          >
            Admin Panel
          </Link>{" "}
        </h5>
        <p>
          <strong>Name:</strong> {currentUser?.name?.toUpperCase() || ""}
        </p>
        <p>
          <strong>Email:</strong> {currentUser?.email || ""}
        </p>
        <p>
          <strong>Store:</strong> {currentUser?.shopName || ""}
          <span
            className={`badge ${
              currentUser?.isVerified === true
                ? "bg-success"
                : "bg-warning text-dark"
            } ms-2`}
          >
            {currentUser?.isVerified === true
              ? "Verified✔"
              : "Under verification"}
          </span>
        </p>
      </div>

      {/* Products */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">My Products</h5>
          <Link to="/add" className="btn btn-sm btn-success">
            + Add Product
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products
                  .slice()
                  .reverse()
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.stock}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <Link
                          to={`/edit/${item.id}`}
                          className="btn btn-sm btn-outline-primary me-1"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveProduct(item)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Section */}
      <div className="card shadow-sm p-3 mb-4">
        <h5>Recent Orders</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Total</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders
                  .slice()
                  .reverse()
                  .map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.title}</td>
                      <td>{order.total}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <span
                          className={`badge  ${
                            order.status === "pending"
                              ? "bg-warning text-dark"
                              : order.status === "delivered"
                              ? "bg-success text-light"
                              : order.status.toLowerCase() === "cancelled"
                              ? "bg-danger text-light"
                              : "bg-info"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logout */}
      <div className="text-end">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedOrder && (
        <div className="custom-modal">
          <div className="modal-content p-4">
            <h5>Order Details</h5>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.title}
            </p>
            <p>
              <strong>Total:</strong> {selectedOrder.total}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <div className="text-end">
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setShowOrderModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleDelever(selectedOrder.id)}
                disabled={selectedOrder.status === "cancelled"}
              >
                Deliver Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Product Modal */}
      {showRemoveModal && productToRemove && (
        <div className="custom-modal">
          <div className="modal-content p-4">
            <h5>Remove Product</h5>
            <p>
              Are you sure you want to remove{" "}
              <strong>{productToRemove.title}</strong>?
            </p>
            <div className="text-end">
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={removeProductConfirm}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seller;
