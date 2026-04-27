import React from 'react';

const Checkout = ({ cart, setCart, addNotification }) => {
  // Logic to calculate total
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      addNotification("Your cart is empty! 🛒", "error");
      return;
    }

    // 1. Create a new Order Object (Day 22 Learning)
    const newOrder = {
      id: Math.floor(Math.random() * 1000000), // Random ID
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
      status: 'Processing'
    };

    // 2. Get existing orders from LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');

    // 3. Save everything back to LocalStorage
    localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, newOrder]));

    // 4. Clear the cart and show success message
    setCart([]);
    addNotification('Order placed successfully! 🚀 Check My Orders page.', 'success');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ borderBottom: '2px solid #232f3e', paddingBottom: '10px' }}>Checkout 💳</h2>
      
      {cart.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Your cart is empty. Add some products first!</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <span>{item.title.slice(0, 30)}...</span>
              <span style={{ fontWeight: 'bold' }}>${item.price}</span>
            </div>
          ))}

          <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '20px' }}>
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>

          <button 
            onClick={handlePlaceOrder}
            style={{ 
              width: '100%', 
              marginTop: '30px', 
              padding: '15px', 
              background: '#FFD814', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Place Order (COD)
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;