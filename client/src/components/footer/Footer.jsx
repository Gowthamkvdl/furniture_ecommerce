import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-100 text-center secondary-300 rounded-top-4 box-shadow"
      style={{
        padding: ".3rem 0",
        color: "#000000ff",
        fontSize: "0.9rem",
        zIndex: 1000,
      }}
    >
      <p className="mb-0">
        © {new Date().getFullYear()} <strong>Macx Furniture</strong>. All rights reserved.
      </p>
      <style>
        {`
          @media (min-width: 768px) {
            footer {
              position: fixed;
              bottom: 0;
              left: 0;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
