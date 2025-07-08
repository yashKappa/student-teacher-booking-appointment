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

  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const enrollmentCookie = cookies.find(c => c.startsWith('enrollment='));

    if (enrollmentCookie) {
      const enrollmentNumber = enrollmentCookie.split('=')[1];

      // Fetch student name from Firestore
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

  return (
    <div className="home">
      <div>
        <Navbar />
      </div>
      <div className='sec'>
        {/* Home Section */}
        <section id="home" className="section home-section">
          <div className="home-content animated-fade">
            <h1 className="animated-slide">Welcome to S&T Learning Platform</h1>
            <p className="animated-slide-delay">
              Empowering students and teachers through seamless digital connections.
            </p>

            <div className="home-actions">
              {studentName ? (
                <Link to="/dashboard" className="btn primary">Student Name : {studentName}</Link>
              ) : (
                <>
                  <Link to="/student" className="btn primary">Student Login</Link>
                  <Link to="/teacher" className="btn secondary">Teacher Login</Link>
                </>
              )}
            </div>

            <div className="slideshow">
              <div className="slide active">📘 Learn from experienced educators worldwide.</div>
              <div className="slide">🚀 Build your career with guided mentorship.</div>
              <div className="slide">🌐 Anytime. Anywhere. Any Device.</div>
            </div>

            <div className="features-section">
              <h2>Platform Highlights</h2>
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

        {/* Other sections */}
        <Branch />
        <Course />
        <Overview />
        <About />
      </div>
    </div>
  );
};

export default Home;
