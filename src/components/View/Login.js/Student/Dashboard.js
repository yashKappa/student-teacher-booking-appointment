import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the enrollment cookie
    document.cookie = 'enrollment=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/student');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎉 Welcome to Student Dashboard</h2>
      <p>This is your dashboard after successful registration or login.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          background: 'crimson',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
