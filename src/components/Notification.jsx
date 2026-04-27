import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? '#2ecc71' : '#e74c3c';

  return (
    <div 
      className="animate-bounce" // 👈 Day 29: Bounce animation class
      style={{
        background: bgColor,
        color: 'white',
        padding: '12px 25px',
        borderRadius: '12px',
        marginBottom: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontWeight: 'bold',
        minWidth: '250px',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      <span>{type === 'success' ? '✅' : '⚠️'}</span>
      {message}
    </div>
  );
};

export default Notification;