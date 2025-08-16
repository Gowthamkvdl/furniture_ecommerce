import React, { useContext } from "react";
import "./navbar.css";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");
  const { currentUser, updateUser } = useContext(AuthContext);
  useEffect(() => {
    // Whenever currentUser changes, this effect will run and update the navbar
  }, [currentUser]); // Re-run this effect when currentUser changes
  return (
    <div className="d-flex justify-content-center">
      <ScrollToTop />

      <nav className="navbar responsive-bg text-white box-shadow mt-md-2 rounded-4 container navbar-expand d-flex align-items-center  justify-content-md-between justify-content-around ">
        <div className="touristBus d-none d-md-block sidePart">
          <h1 className="title-text m-4 ">Macx Furniture</h1>
        </div>
        <div>
          <div
            className="collapse mb-3 secondary-500 me-md-4 mb-md-0  navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-md-4">
              <li className="nav-item ">
                <HashLink
                  smooth
                  to="/#landning"
                  className="nav-link d-flex flex-column align-items-center"
                  scroll={(el) => {
                    const yOffset = -100; // change this offset value as needed
                    const y =
                      el.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-house d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                  <span className="nav-text">Home</span>
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink
                  smooth
                  to="/#categories"
                  className="nav-link d-flex flex-column align-items-center"
                  scroll={(el) => {
                    const yOffset = -60; // change this offset value as needed
                    const y =
                      el.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-tags d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <span className="nav-text">Categories</span>
                </HashLink>
              </li>
              {/* <li className="nav-item">
                <HashLink
                  smooth
                  to="/#contact"
                  className="nav-link d-flex flex-column align-items-center"
                  scroll={(el) => {
                    const yOffset = -60; // change this offset value as needed
                    const y =
                      el.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-telephone d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                  </svg>
                  <span className="nav-text">Contact</span>
                </HashLink>
              </li> */}
              <li className="nav-item">
                <Link
                  className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive(
                    "/shop"
                  )}`}
                  to="/shop"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bag-heart  d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
                    />
                  </svg>
                  <span className="nav-text">Shop</span>
                </Link>
              </li>
              <li className="nav-item rounded-4">
                <Link
                  className={`nav-link shadow-none d-flex flex-column flex-md-row align-items-center mb-0 pb-0 ${isActive(
                    "/register"
                  )}`}
                  to={
                    currentUser
                      ? currentUser.role === "customer"
                        ? "/customer"
                        : currentUser.role === "seller"
                        ? "/seller"
                        : currentUser.role === "admin"
                        ? "/admin"
                        : "/"
                      : "/register"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person mt-1 title-tex me-md-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <span className="nav-text">
                    {currentUser ? "Profile" : "Register"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
