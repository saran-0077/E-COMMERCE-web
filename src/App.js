import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Components
import Layout from './components/Layout';
import Notification from './components/Notification';

// Lazy Loading
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const WishlistPage = lazy(() => import('./pages/Wishlist'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('myCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cart));
  }, [cart]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    addNotification(`${product.title.slice(0, 15)}... added to cart!`, 'success');
  };

  // 🛡️ NEW: Wishlist Logic to fix the Error
  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('myWishlist') || '[]');
    const exists = wishlist.find(item => item.id === product.id);
    
    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('myWishlist', JSON.stringify(updatedWishlist));
      addNotification("Added to Wishlist! ❤️", "success");
    } else {
      addNotification("Item already in Wishlist", "info");
    }
  };

  return (
    <BrowserRouter>
      <Layout cartCount={cart.length}>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
          {notifications.map(n => (
            <Notification key={n.id} message={n.message} type={n.type} onClose={() => removeNotification(n.id)} />
          ))}
        </div>

        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px' }}><div className="spinner"></div><h3>Finalizing Store... 🚀</h3></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={
              <Products 
                addToCart={addToCart} 
                onWishlist={addToWishlist} // 👈 Passing the function
                addNotification={addNotification} 
              />
            } />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<Profile addNotification={addNotification} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} addNotification={addNotification} />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;