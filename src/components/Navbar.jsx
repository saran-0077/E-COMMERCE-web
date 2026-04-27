import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 50px', 
      background: '#232f3e', 
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      {/* Logo */}
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '22px', textDecoration: 'none' }}>
        🛒 MyStore
      </Link>
      
      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Products</Link>
        <Link to="/wishlist" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Wishlist ❤️</Link>
        <Link to="/orders" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Orders 📦</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Profile 👤</Link>

        {/* ⚡ Day 23: Admin Highlighted Link */}
        <Link to="/admin" style={{ 
          color: '#FFD814', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '14px',
          border: '1px solid #FFD814',
          padding: '5px 12px',
          borderRadius: '20px'
        }}>
          Admin 📊
        </Link>

        <Link to="/checkout" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Checkout</Link>

        {/* Cart Badge */}
        <div style={{ 
          background: '#FFD814', 
          color: '#111', 
          padding: '5px 15px', 
          borderRadius: '20px', 
          fontWeight: 'bold',
          fontSize: '14px' 
        }}>
          Cart: {cartCount}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;