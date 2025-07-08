import React, { useState } from 'react';
import './Student.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../Firebase';
import BackButton from '../../../Back';

const Student = () => {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  const trimmedId = studentId.trim();

  if (!trimmedId) {
    setError('Please enter your Enrollment Number.');
    return;
  }

  try {
    const q = query(
      collection(db, 'students'),
      where('enrollmentNumber', '==', trimmedId)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setError('Enrollment Number not found.');
      return;
    }

    // ✅ Set cookie for auto-login (7 days)
    const expires = new Date(Date.now() + 7 * 86400000).toUTCString();
    document.cookie = `enrollment=${trimmedId}; expires=${expires}; path=/`;

    setError('');
    navigate('/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <div className="student-container">
      <BackButton />
      <form className="student-form" onSubmit={handleLogin}>
        <h2>🎓 Student Login</h2>

        <label>Enrollment Number</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="e.g. STC2025001"
        />

        {error && <p className="student-error">{error}</p>}

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Student;
