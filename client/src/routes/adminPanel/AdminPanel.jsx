import React from "react";
import { useLoaderData } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js"; // adjust path based on your structure

const AdminPanel = () => {
  const { users, products } = useLoaderData();

  // Filter users based on role
  const customers = users.filter((user) => user.role === "customer");
  const sellers = users.filter((user) => user.role === "seller");

  const handleVerify = async (sellerId) => {
    try {
      await apiRequest.put(`/user/verify-seller/${sellerId}`);
      window.location.reload(); // reload to update verification status
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  console.log(customers, sellers, products);

  return (
    <div className="container py-4">
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Customers Table */}
      <div className="card shadow-sm rounded-3 mb-4 p-3">
        <h5 className="mb-3">Customers</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="card shadow-sm rounded-3 mb-4 p-3">
        <h5 className="mb-3">Sellers</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.id}</td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>
                    {seller.isVerified ? (
                      <span className="badge bg-success">Verified</span>
                    ) : (
                      <span className="badge bg-danger">Not Verified</span>
                    )}
                  </td>
                  <td>
                    {!seller.verified ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleVerify(seller.id)}
                      >
                        Verify Seller
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-secondary" disabled>
                        Verified
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Table */}
      <div className="card shadow-sm rounded-3 mb-4 p-3">
        <h5 className="mb-3">Products</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Store Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.title}</td>
                  <td>{prod.category}</td>
                  <td>{prod.seller.shopName}</td>
                  <td>{prod.price}</td>
                  <td>{prod.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
