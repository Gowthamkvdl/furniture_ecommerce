import React from "react";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home/Home";
import Layout, { AdminLayout, AuthLayout } from "./components/layout/Layout";
import Shop from "./routes/shop/Shop";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Customer from "./routes/customer/Customer";
import Seller from "./routes/seller/Seller";
import Add from "./routes/add/Add";
import Edit from "./routes/edit/Edit";
import ProductPage from "./routes/productPage/ProductPage";
import AdminPanel from "./routes/adminPanel/AdminPanel";
import {
  adminCustomerLoader,
  adminLoader,
  adminProductLoader,
  adminReviewsLoader,
  adminSellerLoader,
  customerLoader,
  productsLoader,
  sellerLoader,
  shopLoader,
  singleProductLoader,
} from "./lib/loader.js";
import AdminCustomers from "./routes/adminPanel/adminCustomers/AdminCustomers.jsx";
import AdminSellers from "./routes/adminPanel/adminSellers/AdminSellers.jsx";
import AdminProducts from "./routes/adminPanel/adminProducts/AdminProducts.jsx";
import AdminReviews from "./routes/adminPanel/adminReviews/AdminReviews.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
          loader: shopLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },

        {
          path: "/product/:id",
          element: <ProductPage />,
          loader: singleProductLoader,
        },

        {
          path: "/shop",
          element: <Shop />,
          loader: shopLoader,
        },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/seller",
          element: <Seller />,
          loader: sellerLoader,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
          loader: productsLoader,
        },
        {
          path: "/customer",
          element: <Customer />,
          loader: customerLoader,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <AdminPanel />,
          loader: adminLoader,
        },
        {
          path: "products",
          element: <AdminProducts />,
          loader: adminProductLoader,
        },
        {
          path: "customers",
          element: <AdminCustomers />,
          loader: adminCustomerLoader,
        },
        {
          path: "sellers",
          element: <AdminSellers />, 
          loader: adminSellerLoader,
        },
        {
          path: "reviews",
          element: <AdminReviews/>, 
          loader: adminReviewsLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
