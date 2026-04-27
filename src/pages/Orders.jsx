import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #232f3e', paddingBottom: '10px' }}>My Orders 📦</h2>
      
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>No orders found yet. Start shopping!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {orders.map((order, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                <span><b>Order ID:</b> #{order.id}</span>
                <span><b>Date:</b> {new Date(order.date).toLocaleDateString()}</span>
                <span style={{ color: 'green', fontWeight: 'bold' }}>Status: {order.status}</span>
              </div>
              
              {/* Line Items (Drill-down) */}
              <div>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px dashed #eee' }}>
                    <span>{item.title.slice(0, 40)}...</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '15px', fontWeight: 'bold', fontSize: '18px' }}>
                Total Paid: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;