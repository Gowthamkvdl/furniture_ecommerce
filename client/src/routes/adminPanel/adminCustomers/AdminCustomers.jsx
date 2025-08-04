import React from "react";
import { useLoaderData } from "react-router-dom";

const AdminCustomers = () => {
  const users = useLoaderData(); 
  console.log(users.data)
  const customers = users.filter((user) => user.role === "customer");

  return ( 
    <div className="container mt-md-5 py-md-4">
      <h3 className="mb-4 mt-md-3">Customers List</h3>
 
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
              {customers?.map((cust) => (
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
    </div>
  );
};

export default AdminCustomers;
