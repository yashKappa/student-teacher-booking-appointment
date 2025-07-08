import React, { useState } from 'react';
import '../Student/Student.css'; // Reusing the same CSS
import { Link } from 'react-router-dom';
import BackButton from '../../../Back';

const Teacher = () => {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!teacherId || !password) {
      setError('Please enter both fields.');
      return;
    }

    alert(`Logged in as ${teacherId}`);
    setError('');
  };

  return (
    <div className="student-container">
      <BackButton />
      <form className="student-form" onSubmit={handleLogin}>
        <h2>👨‍🏫 Teacher Login</h2>

        <label>Teacher ID</label>
        <input
          type="text"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          placeholder="e.g. TCH2025001"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && <p className="student-error">{error}</p>}

        <button type="submit">Login</button>

        <div className="register-link">
          Not registered? Contact Admin.
        </div>
      </form>
    </div>
  );
};

export default Teacher;
