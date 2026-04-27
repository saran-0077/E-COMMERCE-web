import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Your cart is empty</h2>
      <button onClick={() => navigate('/products')}>Go Shopping</button>
    </div>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>🛒 Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={styles.itemRow}>
          <img src={item.image} alt={item.title} style={{ width: '60px' }} />
          <div style={{ flex: 2, paddingLeft: '20px' }}>
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', marginLeft: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button 
          onClick={() => navigate('/checkout')} 
          style={{ padding: '15px 30px', background: 'orange', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  itemRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }
};

export default Cart;