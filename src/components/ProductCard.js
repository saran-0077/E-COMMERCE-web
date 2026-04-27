import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = React.memo(({ product, onAdd, onWishlist, isFav }) => {
  return (
    <div 
      role="article" 
      aria-labelledby={`title-${product.id}`}
      style={{ 
        border: '1px solid #eee', padding: '15px', borderRadius: '12px', 
        textAlign: 'center', background: 'white', position: 'relative' 
      }}
    >
      {/* Wishlist Button with ARIA Label */}
      <button 
        onClick={() => onWishlist(product)} 
        aria-label={isFav ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        style={{ 
          position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', 
          fontSize: '24px', background: 'none', border: 'none'
        }}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <Link to={`/product/${product.id}`} aria-label={`View details for ${product.title}`}>
        <img src={product.image} alt="" role="presentation" style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
        <h4 id={`title-${product.id}`} style={{ fontSize: '13px', margin: '10px 0', height: '40px', overflow: 'hidden' }}>
          {product.title}
        </h4>
      </Link>

      <p style={{ fontWeight: 'bold', color: '#B12704' }}>${product.price}</p>
      
      <button 
        onClick={() => onAdd(product)} 
        aria-label={`Add ${product.title} to cart`}
        style={{ 
          width: '100%', padding: '10px', background: '#FFD814', 
          border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' 
        }}
      >
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCard;