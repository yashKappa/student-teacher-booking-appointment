import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Firebase';
import './TechDashboard.css';
import Request from '../Request/Request';
import { Link } from 'react-router-dom';

const TechDashboard = () => {
const [teacherData, setTeacherData] = useState(null);

const getTeacherIdFromCookies = () => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const cookie = cookies.find(c => c.startsWith('teacherID='));
  return cookie ? cookie.split('=')[1] : null;
};


useEffect(() => {
  const fetchTeacherData = async () => {
    const teacherID = getTeacherIdFromCookies();
    if (!teacherID) return;

    try {
      const q = query(collection(db, 'teachers'), where('teacherID', '==', teacherID));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setTeacherData(data);
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    }
  };

  fetchTeacherData();
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

        {teacherData && (
  <div className="info-card teacher-info">
    <div><strong>Name:</strong> {teacherData.fullName} {teacherData.surname}</div>
    <div><strong>Email:</strong> {teacherData.email}</div>
    <div><strong>Contact ID:</strong> {teacherData.contactID}</div>
    <div><strong>Teacher ID:</strong> {teacherData.teacherID}</div>
    <div><strong>Specialist:</strong> {teacherData.specialist}</div>
    <div><strong>Courses:</strong> {Array.isArray(teacherData.course) ? teacherData.course.join(', ') : teacherData.course}</div>
    <div><strong>Mobile:</strong> {teacherData.phone}</div>
  </div>
)}



<div className="tab-content">
  <Request />
</div>

      </div>
      </div>
      </div>
    </div>
  );
};

export default TechDashboard;
