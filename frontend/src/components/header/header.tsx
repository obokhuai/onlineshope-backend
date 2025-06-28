import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import './header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <a href="/" className="brand">ProShop</a>
          <button
            className="menu-icon"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <FaBars />
          </button>
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            <a href="/cart">
              <FaShoppingCart className="icon" />
              Cart
            </a>
            <a href="/login">
              <FaUser className="icon" />
              Sign In
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
