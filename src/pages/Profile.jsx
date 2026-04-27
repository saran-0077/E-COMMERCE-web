import React, { useState, useEffect } from 'react';

const Profile = ({ addNotification }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: ''
  });

  // Load existing profile from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(user));
    addNotification('Profile updated successfully! ✅', 'success');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2>My Profile 👤</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}><b>Full Name</b></label>
          <input 
            type="text" name="name" value={user.name} onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            placeholder="Enter your name" required 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}><b>Email Address</b></label>
          <input 
            type="email" name="email" value={user.email} onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            placeholder="Enter email" required 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}><b>Delivery Address</b></label>
          <textarea 
            name="address" value={user.address} onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
            placeholder="Enter address"
          />
        </div>
        <button type="submit" style={{ padding: '15px', background: '#232f3e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;