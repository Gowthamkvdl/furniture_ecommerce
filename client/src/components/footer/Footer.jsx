import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-center"
      style={{
        padding: '1rem 0',
        background: '#f1f1f1',
        marginTop: 'auto',
      }}
    >
      <p className="mb-0">© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
