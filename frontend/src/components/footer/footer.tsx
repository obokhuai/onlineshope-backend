import React from 'react';
import "./footer.css"

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>ProShop &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
