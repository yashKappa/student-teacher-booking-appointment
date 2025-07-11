import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import './TeacherAdd.css';

const TeacherAdd = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    phone: '',
    email: '',
    course: '',
    specialist: '',
    datetime: '',
  });

  const [message, setMessage] = useState('');

  const generateTeacherID = () => {
    const prefix = 'TC2025';
    const random = Math.floor(100 + Math.random() * 900); // random 3-digit
    return `${prefix}${random}`;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherID = generateTeacherID();
    const teacherData = {
      ...formData,
      createdAt: new Date(),
      teacherID
    };

    try {
      await setDoc(doc(db, 'teachers', teacherID), teacherData);
      setMessage('✅ Teacher added successfully!');
      setFormData({
        fullName: '',
        surname: '',
        phone: '',
        email: '',
        course: '',
        specialist: '',
        datetime: ''
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
      setMessage('❌ Failed to add teacher. Try again.');
    }
  };

  return (
    <div className="teacher-add-container">
      <form onSubmit={handleSubmit} className="teacher-form">
        <h2>Add Teacher</h2>
        <div className="form-grid">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            name="specialist"
            value={formData.specialist}
            onChange={handleChange}
            placeholder="Specialist"
            required
          />
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
          />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
            <option value="B.Com">B.Com</option>
            <option value="BBA">BBA</option>
            <option value="BA Psychology">BA Psychology</option>
            <option value="M.Sc. IT">M.Sc. IT</option>
            <option value="M.Com">M.Com</option>
          </select>
        </div>

        <button type="submit">Submit</button>
        {message && <p className={`teacher-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default TeacherAdd;
