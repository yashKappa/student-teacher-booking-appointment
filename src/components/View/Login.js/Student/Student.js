// src/components/Student.js
import React, { useState } from 'react';
import './Student.css';
import { Link } from 'react-router-dom';

const Student = ({ switchToRegister }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!studentId || !password) {
      setError('Please enter both Enrollment Number and Password.');
    } else {
      setError('');
      // TODO: Backend API call
      alert(`Logged in as ${studentId}`);
    }
  };

  return (
    <section className="student-login-section">
      <div className="login-box" data-aos="fade-up">
        <h2>🎓 Student Login</h2>
        <p className="subtext">Access your college dashboard, classes, and results.</p>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="studentId">Enrollment Number</label>
          <input
            type="text"
            id="studentId"
            placeholder="e.g. STC2025001"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-footer">
          <a href="#">Forgot Password?</a> |
          <Link to="/register">🎓 Student Register</Link>
        </div>
      </div>
    </section>
  );
};

export default Student;
