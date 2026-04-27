import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Loading Details...</h2>;
  if (!product) return <h2 style={{ textAlign: 'center' }}>Not Found!</h2>;

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '50px' }}>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h1>{product.title}</h1>
        <h2 style={{ color: 'red' }}>${product.price}</h2>
        <p>{product.description}</p>
        <button onClick={() => { addToCart(product); navigate('/checkout'); }} style={{ padding: '15px 30px', background: 'orange', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetails;