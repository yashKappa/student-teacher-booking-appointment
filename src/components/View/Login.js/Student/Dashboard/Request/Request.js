import React, { useState } from 'react';
import './Request.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../Firebase';



const Request = () => {
  const [formData, setFormData] = useState({
    course: '',
    contactId: '',
    name: '',
    subject: '',
    reason: '',
  });



const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
};


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const enrollment = getCookie('enrollment'); // Read from cookie
  if (!enrollment) {
    alert('Student enrollment ID not found in cookies!');
    return;
  }

  const { contactId, ...rest } = formData;

  const requestData = {
    ...rest,
    submittedAt: new Date(),
    enrollment
  };

  try {
    await setDoc(
      doc(db, 'requests', `${contactId}_${enrollment}`), // unique doc id
      requestData
    );
    alert('✅ Request submitted successfully!');
    setFormData({
      course: '',
      contactId: '',
      name: '',
      subject: '',
      reason: '',
    });
  } catch (error) {
    console.error('Error submitting request:', error);
    alert('❌ Failed to submit request. Try again.');
  }
};


  return (
    <div className="request-section">
      <h3>📌 Permision Form</h3>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact ID Number:</label>
            <input
              type="text"
              name="contactId"
              value={formData.contactId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Student Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Reason:</label>
          <textarea
            name="reason"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Request;
