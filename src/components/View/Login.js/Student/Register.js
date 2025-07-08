import React, { useState } from 'react';
import './Student.css';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db, doc, setDoc } from '../../../Firebase'; // adjust path as needed
import BackButton from '../../../Back';


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    course: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const { fullName, email, phone, dob, course } = formData;
    return fullName && email && phone && dob && course;
  };

  const generateEnrollmentNumber = (uid) => {
    const year = new Date().getFullYear().toString().slice(-2);
    return `STC${year}${uid.slice(0, 6).toUpperCase()}`;
  };

  const handleGoogleRegister = async () => {
    if (!validateForm()) {
      setError('Please fill in all fields before continuing.');
      setSuccess('');
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const enrollment = generateEnrollmentNumber(user.uid);
      const studentRef = doc(db, 'students', user.uid);

      await setDoc(studentRef, {
        uid: user.uid,
        enrollmentNumber: enrollment,
        googleEmail: user.email,
        fullName: formData.fullName,
        altEmail: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        course: formData.course,
        createdAt: new Date(),
        photoURL: user.photoURL || ''
      });

      setSuccess('Registered successfully!');
      setError('');

      // Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google Sign-in failed. Try again.');
      setSuccess('');
    }
  };

  return (
    <div className="student-container">
      <BackButton />
      <form className="student-form" onSubmit={(e) => e.preventDefault()}>
        <h2>🎓 Student Registration</h2>

        <div className="form-grid">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="College Email" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
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

        <button type="button" className="google-btn" onClick={handleGoogleRegister}>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
