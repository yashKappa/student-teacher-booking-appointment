import React, { useState, useEffect } from 'react';
import './Student.css';
import { useNavigate } from 'react-router-dom';
import { db, doc, setDoc } from '../../../Firebase';
import BackButton from '../../../Back';

// Utility to generate fake UID
const generateUID = () => '_' + Math.random().toString(36).substr(2, 9);

// Utility to set cookie
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    email: '',
    phone: '',
    dob: '',
    course: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check for existing cookie to auto-login
  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const enrollmentCookie = cookies.find(c => c.startsWith('enrollment='));
    if (enrollmentCookie) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const { fullName, surname, email, phone, dob, course } = formData;
    return fullName && surname && email && phone && dob && course;
  };

  const generateEnrollmentNumber = (uid) => {
    const year = new Date().getFullYear().toString().slice(-2);
    return `STC${year}${uid.slice(0, 6).toUpperCase()}`;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      setError('Please fill in all fields before continuing.');
      setSuccess('');
      return;
    }

    try {
      const fakeUID = generateUID();
      const enrollment = generateEnrollmentNumber(fakeUID);
      const studentRef = doc(db, 'students', fakeUID);

      await setDoc(studentRef, {
        uid: fakeUID,
        enrollmentNumber: enrollment,
        fullName: formData.fullName,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        course: formData.course,
        createdAt: new Date()
      });

      // Set cookie for auto-login
      setCookie('enrollment', enrollment, 7);

      setSuccess('Registered successfully!');
      setError('');

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try again.');
      setSuccess('');
    }
  };

  return (
    <div className="student-container">
      <BackButton />
      <form className="student-form" onSubmit={(e) => e.preventDefault()}>
        <h2>🎓 Student Registration</h2>

        <div className="form-grid">
          <input type="text" name="fullName" placeholder="Student Name" value={formData.fullName} onChange={handleChange} />
          <input type="text" name="surname" placeholder="Student Surname" value={formData.surname} onChange={handleChange} />
          <input type="email" name="email" placeholder="College Email" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="">Select Course</option>
            <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
            <option value="B.Com">B.Com</option>
            <option value="BBA">BBA</option>
            <option value="BA Psychology">BA Psychology</option>
            <option value="M.Sc. IT">M.Sc. IT</option>
            <option value="M.Com">M.Com</option>
          </select>
        </div>

        {error && <p className="student-error">{error}</p>}
        {success && <p className="student-success">{success}</p>}

        <button type="button" className="google-btn" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
