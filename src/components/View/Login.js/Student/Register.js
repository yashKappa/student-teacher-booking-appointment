// src/components/Register.js
import React, { useState } from 'react';
import './Student.css'; // Same CSS used for login
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    course: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Registered successfully!");
  };

  return (
    <section className="student-login-section">
      <div className="login-box" data-aos="fade-up">
        <h2>🎓 Student Registration</h2>
        <p className="subtext">Fill in your details to create a student account</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="College Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
            <select name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select Course</option>
              <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
              <option value="B.Com">B.Com</option>
              <option value="BBA">BBA</option>
              <option value="BA Psychology">BA Psychology</option>
              <option value="M.Sc. IT">M.Sc. IT</option>
              <option value="M.Com">M.Com</option>
            </select>
            <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="full-width-input"
          />

          <button type="submit" className="login-btn">Register</button>
        </form>

        <div className="login-footer">
          Already registered? <Link to="/student">🎓 Student Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
