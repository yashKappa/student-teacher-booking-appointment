import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Firebase';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEnrollmentFromCookies = () => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const cookie = cookies.find(c => c.startsWith('enrollment='));
    return cookie ? cookie.split('=')[1] : null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const enrollment = getEnrollmentFromCookies();
      if (!enrollment) return;

      try {
        const q = query(collection(db, 'students'), where('enrollmentNumber', '==', enrollment));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setUserData(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
   <div className='content'>
     <div className="profile-grid-container">
      <div className='data'>
        <div className="profile-header">
        <h2>👤 Student Profile</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : !userData ? (
        <p>No user data found.</p>
      ) : (
        <div className="profile-grid">
          <div className="profile-card">
            <label>Full Name</label>
            <span>{userData.fullName}</span>
          </div>
          <div className="profile-card">
            <label>Enrollment No</label>
            <span>{userData.enrollmentNumber}</span>
          </div>
          <div className="profile-card">
            <label>Email</label>
            <span>{userData.email}</span>
          </div>
          <div className="profile-card">
            <label>Phone</label>
            <span>{userData.phone}</span>
          </div>
          <div className="profile-card">
            <label>Date of Birth</label>
            <span>{userData.dob}</span>
          </div>
          <div className="profile-card">
            <label>Course</label>
            <span>{userData.course}</span>
          </div>
          <div className="profile-card">
            <label>Registered On</label>
            <span>{new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      )}
      </div>
    </div>
   </div>
  );
};

export default Profile;
