import React, { useState, useEffect } from 'react';
import '../Student/Student.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Back';

const Teacher = () => {
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🔁 Auto-login if cookie exists
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookieObject = {};
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookieObject[name] = value;
    });

    if (cookieObject.teacherID) {
       navigate('/'); // ⬅️ Navigate to home after login
    }
  }, [navigate]);

  const handleLogin = (e) => {
  e.preventDefault();

  const trimmed = teacherId.trim();
  if (!trimmed) {
    setError('Please enter your Teacher ID.');
    return;
  }

  // ✅ Set cookie
  const expires = new Date(Date.now() + 7 * 86400000).toUTCString(); // 7 days
  document.cookie = `teacherID=${trimmed}; expires=${expires}; path=/`;

  setError('');
  navigate('/'); // ⬅️ Navigate to home after login
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
          placeholder="e.g. TC2025101"
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
