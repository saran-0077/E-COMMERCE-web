import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ addToCart, onWishlist, addNotification }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const cachedData = sessionStorage.getItem('cachedProducts');
    if (cachedData) {
      setProducts(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        sessionStorage.setItem('cachedProducts', JSON.stringify(data));
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        addNotification("API Error! Please check connection.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [addNotification]);

  const filtered = products.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  if (loading) return <div style={{textAlign: 'center', marginTop: '100px'}}><div className="spinner"></div><h3>Loading Collection...</h3></div>;
  
  if (error) return (
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <h2>⚠️ {error}</h2>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '90vh' }}>
      <aside style={{ width: '260px', padding: '25px', backgroundColor: '#f8f9fa', borderRight: '1px solid #ddd' }}>
        <h3>Filters</h3>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '8px' }}>
          <option value="All">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </aside>

      <main style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
          {filtered.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
              onWishlist={onWishlist} // 👈 Passing down to card
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;