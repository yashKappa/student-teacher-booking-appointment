import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import './Profile.css';
import Request from '../Request/Request';
import Teacher from '../Teacher/Teacher';
import Message from '../Message/Message';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('request');

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
          const data = snapshot.docs[0].data();
          setUserData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='main'>
      <Link to="/"> <span className='back-home' ><i class="fa-solid fa-arrow-left"></i> Home </span> </Link>
      <div className="profile-wrapper">
        <div className='profile-data'>
        <div className="top-banner">
  <img
    src="https://www.shutterstock.com/image-vector/education-banner-vector-illustration-learning-260nw-2504919975.jpg"
    alt="Banner"
    className="banner-img"
  />
</div>

      <div className="profile-section">
        <div className="profile-img-box">
          <img src='https://www.pngmart.com/files/23/User-PNG-HD.png' alt="Profile" />
        </div>

        {userData && (
          <div className="info-card">
            <div><strong>Name:</strong> {userData.fullName}{userData.surname}</div>
            <div><strong>Enrollment:</strong> {userData.enrollmentNumber}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Phone:</strong> {userData.phone}</div>
            <div><strong>DoB:</strong> {userData.dob}</div>
            <div><strong>Course:</strong> {userData.course}</div>
            <div><strong>Registered On:</strong> {new Date(userData.createdAt?.seconds * 1000).toLocaleDateString()}</div>
          </div>
        )}

        <div className="tab-btns">
          <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>Request</button>
          <button className={activeTab === 'teacher' ? 'active' : ''} onClick={() => setActiveTab('teacher')}>Teacher</button>
          <button className={activeTab === 'message' ? 'active' : ''} onClick={() => setActiveTab('message')}>Message</button>
        </div>

<div className="tab-content">
  {activeTab === 'request' && <Request />}
  {activeTab === 'teacher' && <Teacher />}
  {activeTab === 'message' && <Message />}
</div>

      </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
