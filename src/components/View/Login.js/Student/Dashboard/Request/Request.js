import React, { useState } from 'react';
import './Request.css';

const Request = () => {
  const [formData, setFormData] = useState({
    enrollment: '',
    teacherId: '',
    name: '',
    subject: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Request submitted!');
  };

  return (
    <div className="request-section">
      <h3>📌 Request Form</h3>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Student Enrollment Number:</label>
            <input
              type="text"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teacher ID Number:</label>
            <input
              type="text"
              name="teacherId"
              value={formData.teacherId}
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

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default Request;
