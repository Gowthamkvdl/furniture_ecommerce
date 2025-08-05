import React from "react";
import { useLoaderData } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";

const AdminSellers = () => {
  const data = useLoaderData();
  const sellers = data.filter((user) => user.role === "seller");
  const handleVerify = async (sellerId) => {
    try {
      await apiRequest.put(`/user/verify-seller/${sellerId}`);
      window.location.reload(); // reload to update verification status
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };
  return (
    <div className="container mt-md-5 py-md-4">   
      <h3 className="mb-4 mt-md-3">Sellers List</h3> 

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
    </div>
  );
};

export default AdminSellers;
