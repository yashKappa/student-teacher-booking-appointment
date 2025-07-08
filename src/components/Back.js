// Inside Student.js or Register.js (or any other component)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBack}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'absolute',
        top: '0%',
        left: '1%'
      }}
    >
      <i class="fa-solid fa-arrow-left"></i> Back to Home
    </button>
  );
};

export default BackButton;
