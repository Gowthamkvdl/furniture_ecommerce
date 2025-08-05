import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";

const SellerOrders = () => {
  const data = useLoaderData();
  const [orders, setOrders] = useState(data.seller.orders || []);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
  return (
    <div>
      <h5 className="mb-3 pt-md-3 fs-2">Recent Orders List</h5>
      <div className="card shadow-sm p-3 mb-4 min-vh-100"> 
        <h5>Recent Orders</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
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
                  <td colSpan="6" className="text-center">
                    No orders found.
                  </td>
                </tr>
              )}
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
    </div>
  );
};

export default SellerOrders;
