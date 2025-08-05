import React, { useContext, useState } from "react";
import apiRequest from "../../../lib/apiRequest";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const CustomerOrders = () => {
  const data = useLoaderData();
  const orders = data.customer.orders; 
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancel = async () => {
    try {
      await apiRequest.put(`/order/${selectedOrder.id}`, {
        status: "cancelled",
      });

      // Update local UI
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "cancelled" }
          : order
      );

      data.orders = updatedOrders;
      setShowOrderModal(false);
      setSelectedOrder(null);
      alert("✅ Order cancelled!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to cancel order.");
    }
  };
  return (
    <div className=" min-vh-100">
      <h5 className="mb-3 pt-md-3 fs-2">My Orders List</h5>
      {/* Orders Section */}
      <div className="card shadow-sm p-3 mb-4">
        <h5>My Orders</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Order ID</th> 
                <th>Product</th>
                <th>Qunatity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ?.slice()
                .reverse()
                .map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.id}</td>
                    <td>{order.title}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.total}</td>
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
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Order Modal */}
      {showOrderModal && selectedOrder && (
        <div className="custom-modal">
          <div className="modal-content p-4">
            <h5>Order Details</h5>
            <p>
              <strong>Product:</strong> {selectedOrder.title}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Total:</strong> ₹{selectedOrder.total}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>

            <div className="d-flex justify-content-end gap-2 mt-3">
              {selectedOrder.status === "cancelled" ? (
                <span className="text-danger">❌ Order Already Cancelled</span>
              ) : selectedOrder.status === "delivered" ? (
                <span className="text-success">✅ Order Already Delivered</span>
              ) : (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleCancel}
                >
                  Cancel Order
                </button>
              )}

              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedOrder(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
