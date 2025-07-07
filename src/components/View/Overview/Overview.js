import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <section id="overview" className="section overview-section">
      <div className="overview-header">
        <h1>Platform Overview</h1>
        <p>Explore how our platform bridges the gap between students and teachers effectively.</p>
      </div>

      {/* Overview Illustration */}
      <div className="overview-illustration">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/online-learning-4440880-3685791.png"
          alt="Online Learning"
        />
      </div>

      {/* Feature Cards */}
      <div className="overview-cards">
        <div className="card">
          <h3>👨‍🏫 For Teachers</h3>
          <p>Create your own profile, schedule sessions, and connect with students directly.</p>
        </div>
        <div className="card">
          <h3>🎓 For Students</h3>
          <p>Book appointments, attend live classes, and track your learning progress.</p>
        </div>
        <div className="card">
          <h3>📅 Smart Scheduling</h3>
          <p>Our smart calendar sync helps avoid conflicts and improves time management.</p>
        </div>
      </div>

      {/* Message Block */}
      <div className="overview-message">
        <h2>Why Choose S&T?</h2>
        <p>
          With a user-friendly design, advanced scheduling, real-time communication, and performance tracking — S&T offers a complete digital learning experience.
        </p>
      </div>

      {/* Platform Stats */}
      <div className="overview-stats">
        <div>
          <h2>1.2K+</h2>
          <p>Students Enrolled</p>
        </div>
        <div>
          <h2>200+</h2>
          <p>Verified Teachers</p>
        </div>
        <div>
          <h2>98%</h2>
          <p>Satisfaction Rate</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="overview-testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"This platform makes learning easy and fun! Scheduling is smooth and reliable."</p>
            <span>- Aisha, Student</span>
          </div>
          <div className="testimonial">
            <p>"I can manage my classes, track student progress, and even communicate with parents."</p>
            <span>- Mr. Rao, Teacher</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="overview-features">
        <h2>More Features</h2>
        <ul className="features-grid">
          <li>📂 Secure Document Sharing</li>
          <li>🎥 Live & Recorded Sessions</li>
          <li>📊 Progress Tracking</li>
          <li>🔒 Private 1-on-1 Meetings</li>
          <li>📢 Announcements</li>
          <li>🌐 Multi-language Support</li>
        </ul>
      </div>
    </section>
  );
};

export default Overview;
