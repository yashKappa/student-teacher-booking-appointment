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
  course: [], 
  specialist: '',
  datetime: '',
});

  const [message, setMessage] = useState('');

  const generateTeacherID = () => {
    const prefix = 'TC2025';
    const random = Math.floor(100 + Math.random() * 900); // random 3-digit
    return `${prefix}${random}`;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const teacherID = generateTeacherID();
  const contactID = generateContactID(); // ✅ new line

  const teacherData = {
    ...formData,
    createdAt: new Date(),
    teacherID,
    contactID // ✅ include contactID
  };

  try {
    await setDoc(doc(db, 'teachers', teacherID), teacherData);
    setMessage('✅ Teacher added successfully!');
    setFormData({
  fullName: '',
  surname: '',
  phone: '',
  email: '',
  course: [], // 🔁 reset to empty array
  specialist: '',
  datetime: ''
});

  } catch (error) {
    console.error('Error adding teacher:', error);
    setMessage('❌ Failed to add teacher. Try again.');
  }
};


  const generateContactID = () => {
  const prefix = 'CT2025';
  const random = Math.floor(1000 + Math.random() * 9000); // random 4-digit
  return `${prefix}${random}`;
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox' && name === 'course') {
    setFormData(prev => {
      const newCourses = checked
        ? [...prev.course, value]  // Add course
        : prev.course.filter(c => c !== value); // Remove course

      return { ...prev, course: newCourses };
    });
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          
  <div className="course-options">
  <label><input type="checkbox" name="course" value="B.Sc. Computer Science" onChange={handleChange} checked={formData.course.includes('B.Sc. Computer Science')} /> B.Sc. Computer Science</label>
  <label><input type="checkbox" name="course" value="B.Com" onChange={handleChange} checked={formData.course.includes('B.Com')} /> B.Com</label>
  <label><input type="checkbox" name="course" value="BBA" onChange={handleChange} checked={formData.course.includes('BBA')} /> BBA</label>
  <label><input type="checkbox" name="course" value="BA Psychology" onChange={handleChange} checked={formData.course.includes('BA Psychology')} /> BA Psychology</label>
  <label><input type="checkbox" name="course" value="M.Sc. IT" onChange={handleChange} checked={formData.course.includes('M.Sc. IT')} /> M.Sc. IT</label>
  <label><input type="checkbox" name="course" value="M.Com" onChange={handleChange} checked={formData.course.includes('M.Com')} /> M.Com</label>
</div>
    
        </div>

        <button type="submit">Submit</button>
        {message && <p className={`teacher-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default TeacherAdd;
