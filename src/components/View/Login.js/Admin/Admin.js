import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../Firebase';
import BackButton from '../../../Back';

const Admin = () => {
  const [adminData, setAdminData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-login if cookie exists
  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const isAuthenticated = cookies.find(c => c.startsWith('adminAuth=true'));

    if (isAuthenticated) {
      navigate('/admindash');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = adminData;

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const q = query(
        collection(db, 'Admin'),
        where('username', '==', username),
        where('password', '==', password)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('Invalid credentials.');
        return;
      }

      // ✅ Set cookie for 7 days
      const expires = new Date(Date.now() + 7 * 86400000).toUTCString();
      document.cookie = `adminAuth=true; expires=${expires}; path=/`;

      setError('');
      navigate('/admindash');
    } catch (err) {
      console.error('Admin login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="student-container">
      <BackButton />
      <form className="student-form" onSubmit={handleLogin}>
        <h2>🛠️ Admin Login</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={adminData.username}
          onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
          placeholder="e.g. Admin"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={adminData.password}
          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          placeholder="Enter Password"
        />

        {error && <p className="student-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
