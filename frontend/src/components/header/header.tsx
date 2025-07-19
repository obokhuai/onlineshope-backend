import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/users-api-slice';
//import SearchBox from './SearchBox';
//import logo from '../assets/logo.png';
//import { resetCart } from '../slices/cartSlice';
import './header.css';
import { logout } from "../../slices/auth-slice";
import { RootState } from "../../store";

const Header: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    console.log("logout")
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      //dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Dropdown state
  const [userDropdown, setUserDropdown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdown(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target as Node)
      ) {
        setAdminDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            {/* <img src={logo} alt="ProShop" className="navbar-logo" /> */}
            <span className="navbar-title">JosGlamsShop</span>
          </Link>
          <div className="navbar-links">
            {/* <SearchBox /> */}
            <Link className="nav-link" to="/cart">
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            {userInfo ? (
              <div className="nav-dropdown" ref={userDropdownRef}>
                <button
                  className="nav-dropdown-toggle"
                  onClick={() => setUserDropdown((open) => !open)}
                >
                  {userInfo.name} &#x25BC;
                </button>
                {userDropdown && (
                  <div className="nav-dropdown-menu">
                    <Link className="nav-dropdown-item" to="/profile" onClick={() => setUserDropdown(false)}>
                      Profile
                    </Link>
                    <button className="nav-dropdown-item"  onClick={logoutHandler}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="nav-link" to="/login">
                <FaUser /> Sign In
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="nav-dropdown" ref={adminDropdownRef}>
                <button
                  className="nav-dropdown-toggle"
                  onClick={() => setAdminDropdown((open) => !open)}
                >
                  Admin &#x25BC;
                </button>
                {adminDropdown && (
                  <div className="nav-dropdown-menu">
                    <Link className="nav-dropdown-item" to="/admin/productlist" onClick={() => setAdminDropdown(false)}>
                      Products
                    </Link>
                    <Link className="nav-dropdown-item" to="/admin/orderlist" onClick={() => setAdminDropdown(false)}>
                      Orders
                    </Link>
                    <Link className="nav-dropdown-item" to="/admin/userlist" onClick={() => setAdminDropdown(false)}>
                      Users
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
