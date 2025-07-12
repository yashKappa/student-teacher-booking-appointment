// src/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
   <section id="about" className="section about-section">
  <div className="about-container">
    <h1><i class="fa-solid fa-address-card"></i> About Us</h1>
    <p className="about-intro">
      <strong>S&T</strong> is built to connect students with the best educators. We simplify scheduling, communication, and online learning — all in one place.
    </p>

    {/* Mission, Vision, Values */}
    <div className="about-features">
      <div className="feature-box animated-slide">
        <h3>🎯 Mission</h3>
        <p>Make education easy, accessible, and affordable for all through digital transformation.</p>
      </div>
      <div className="feature-box animated-slide-delay">
        <h3>🌍 Vision</h3>
        <p>To be the most trusted platform for personalized learning experiences globally.</p>
      </div>
      <div className="feature-box animated-slide-delay2">
        <h3>💡 Values</h3>
        <p>Innovation | Empathy | Trust | Commitment to Learners</p>
      </div>
    </div>

    {/* Timeline */}
    <div className="about-timeline">
      <h2>📈 Our Journey</h2>
      <ul className="timeline">
        <li><strong>2022:</strong> Idea conceptualized by passionate educators</li>
        <li><strong>2023:</strong> First prototype launched, tested with real users</li>
        <li><strong>2024:</strong> Official launch of S&T — 10K+ sessions booked</li>
        <li><strong>2025:</strong> Expanding into global education markets</li>
      </ul>
    </div>

    {/* Team */}
    <div className="about-team">
      <h2>Meet the Team</h2>
      <div className="team-grid">
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" />
          <h4>Yash S.</h4>
          <p>Founder & Developer</p>
        </div>
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Designer" />
          <h4>Priya M.</h4>
          <p>UI/UX Designer</p>
        </div>
        <div className="team-member">
          <img src="https://randomuser.me/api/portraits/men/64.jpg" alt="Support" />
          <h4>Rahul T.</h4>
          <p>Support Lead</p>
        </div>
      </div>
    </div>

    {/* FAQ */}
    <div className="about-faq">
      <h2>🙋 Frequently Asked Questions</h2>
      <div className="faq-box">
        <h4>How do I book a session?</h4>
        <p>Sign in as a student, choose your teacher, select time, and confirm!</p>
      </div>
      <div className="faq-box">
        <h4>Is it free for teachers?</h4>
        <p>Yes, teachers can create profiles and start teaching without any charges.</p>
      </div>
      <div className="faq-box">
        <h4>Can I reschedule a class?</h4>
        <p>Absolutely. Visit your dashboard and pick a new time.</p>
      </div>
    </div>

    {/* Contact / CTA */}
    <div className="about-cta">
      <h2>📬 Get in Touch</h2>
      <p>Have questions or feedback? We'd love to hear from you.</p>
      <a href="mailto:contact@sandtedu.com" className="contact">Contact Us</a>
    </div>
  </div>
</section>


  );
};

export default About;
