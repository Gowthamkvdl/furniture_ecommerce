import React from 'react'
import { useLoaderData } from 'react-router-dom'

const AdminProducts = () => {

    const products = useLoaderData() 

  return (
    <div className="container mt-md-5 py-md-4">
      <h3 className="mb-4 mt-md-3">Customers List</h3>
 
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
  )
}

export default AdminProducts