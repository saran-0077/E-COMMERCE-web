import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Wishlist data-ah localstorage-la irundhu edukkurom
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px', width: '100%' }}>
      <h2 style={{ borderBottom: '2px solid #ff4757', paddingBottom: '10px' }}>My Wishlist ❤️</h2>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Your wishlist is empty!</p>
          <Link to="/products" style={{ color: 'blue' }}>Go Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {wishlist.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', textAlign: 'center', background: 'white' }}>
              <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <h4 style={{ fontSize: '14px', margin: '10px 0', height: '35px', overflow: 'hidden' }}>{item.title}</h4>
              <p style={{ fontWeight: 'bold' }}>${item.price}</p>
              <button 
                onClick={() => removeFromWishlist(item.id)}
                style={{ width: '100%', background: '#ff4757', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;