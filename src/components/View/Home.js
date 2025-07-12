// src/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Overview from './Overview/Overview';
import About from './About/About';
import Branch from './Branch/Branch';
import Course from './Course/Course';
import './home.css';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  // ✅ Check if student is logged in
  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const enrollmentCookie = cookies.find(c => c.startsWith('enrollment='));

    if (enrollmentCookie) {
      const enrollmentNumber = enrollmentCookie.split('=')[1];

      const fetchStudent = async () => {
        try {
          const q = query(
            collection(db, 'students'),
            where('enrollmentNumber', '==', enrollmentNumber)
          );
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const student = snapshot.docs[0].data();
            setStudentName(student.fullName || 'Student');
          }
        } catch (error) {
          console.error('Error fetching student:', error);
        }
      };

      fetchStudent();
    }
  }, []);

  useEffect(() => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const teacherIDCookie = cookies.find(c => c.startsWith('teacherID='));

  if (teacherIDCookie) {
    const teacherID = teacherIDCookie.split('=')[1];

    const fetchTeacher = async () => {
      try {
        const q = query(
          collection(db, 'teachers'),
          where('teacherID', '==', teacherID)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const teacher = snapshot.docs[0].data();
          setTeacherName(teacher.fullName || 'Teacher');
        }
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }
}, []);

const getCookieValue = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

useEffect(() => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const adminAuthCookie = cookies.find(c => c.startsWith('adminAuth='));

  if (adminAuthCookie && adminAuthCookie.split('=')[1] === 'true') {
    navigate('/admindash'); // ✅ Redirect admin
  }
}, [navigate]);

  return (
    <div className="home">
      <Navbar />

      <div className="sec">
        <section id="home" className="section home-section">
          <div className="home-content animated-fade">
            <h1 className="animated-slide">Welcome to S&T Learning Platform</h1>
            <p className="animated-slide-delay">
              Empowering students and teachers through seamless digital connections.
            </p>

          <div className="home-actions">
  {studentName ? (
    <Link to="/dashboard" className="btn primary">Student: {studentName}</Link>
  ) : teacherName ? (
    <Link to={`/teacher/dashboard/${getCookieValue('teacherID')}`} className="btn secondary">
      Teacher: {teacherName}
    </Link>
  ) : (
    <>
      <Link to="/student" className="btn primary">👨‍🎓 Student Login</Link>
      <Link to="/teacher" className="btn secondary tech"> Teacher Login</Link>
      <Link to="/admin" className="btn secondary">👑 Admin Login</Link>
    </>
  )}
</div>


            <div className="slideshow">
              <div className="slide active">📘 Learn from experienced educators worldwide.</div>
              <div className="slide">🚀 Build your career with guided mentorship.</div>
              <div className="slide">🌐 Anytime. Anywhere. Any Device.</div>
            </div>

            <div className="features-section">
              <h2><i class="fa-solid fa-layer-group"></i> Platform Highlights</h2>
              <div className="features-grid">
                <div className="feature-box">
                  <span className="icon">📅</span>
                  <h3>Book Appointments</h3>
                  <p>Students can easily book 1-on-1 sessions with their favorite teachers.</p>
                </div>
                <div className="feature-box">
                  <span className="icon">🎥</span>
                  <h3>Live Sessions</h3>
                  <p>Interactive real-time learning through secure video calls.</p>
                </div>
                <div className="feature-box">
                  <span className="icon">📊</span>
                  <h3>Progress Tracker</h3>
                  <p>Track learning progress, assignments, and achievements.</p>
                </div>
              </div>
            </div>

            <div className="floating-icons">
              <span>🎓</span>
              <span>📖</span>
              <span>💡</span>
            </div>

            <div className="floating-icons-left">
              <span>🧠</span>
              <span>👨‍🎓</span>
              <span>🏫</span>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <Branch />
        <Course />
        <Overview />
        <About />
      </div>
    </div>
  );
};

export default Home;
