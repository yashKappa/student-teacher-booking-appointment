// src/Home.js
import React from 'react';
import Navbar from './Navbar/Navbar';
import Overview from './Overview/Overview';
import About from './About/About';
import Branch from './Branch/Branch';
import Course from './Course/Course';
import './home.css';

const Home = () => {
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
      <a href="#student-login" className="btn primary">Student Login</a>
      <a href="#teacher-login" className="btn secondary">Teacher Login</a>
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
  {/* Optional Floating Icons */}
  <div className="floating-icons">
    <span>🎓</span>
    <span>📖</span>
    <span>💡</span>
  </div>

  </div>

  {/* NEW SECTION: Features */}
 
  {/* NEW SECTION: Trust Badges */}
</section>



      {/* Overview and About as sections */}
      <Branch />
      <Course />
      <Overview />
      <About />
      </div>
    </div>
  );
};

export default Home;
