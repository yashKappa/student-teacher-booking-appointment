// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const checkLoginStatus = () => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    return cookies.some(c => c.startsWith('enrollment='));
  };

  const handleLogout = () => {
    document.cookie = 'enrollment=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, []);

  // Highlight nav section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'branch', 'course', 'overview', 'about'];
      const scrollY = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollY && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="brand">S&T</span>
        </div>

        <ul className="nav-center">
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
          <li><a href="#branch" className={activeSection === 'branch' ? 'active' : ''}>Branch</a></li>
          <li><a href="#course" className={activeSection === 'course' ? 'active' : ''}>Course</a></li>
          <li><a href="#overview" className={activeSection === 'overview' ? 'active' : ''}>Overview</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>

          {isLoggedIn && (
            <>
              <li><Link to="/dashboard">Profile</Link></li>
              <li><Link to="/request">Request</Link></li>
              <li><Link to="/teacher">Teacher</Link></li>
            </>
          )}
        </ul>

        <div className="settings-dropdown">
          {!isLoggedIn ? (
            <>
              <button className="settings-btn">Login</button>
              <div className="dropdown-content">
                <Link to="/student" className="btn primary">Student Login</Link>
                <Link to="/teacher" className="btn secondary">Teacher Login</Link>
              </div>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>

        <button className="menu-btn" onClick={toggleMenu}>☰</button>
      </nav>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#branch" onClick={closeMenu}>Branch</a></li>
          <li><a href="#course" onClick={closeMenu}>Course</a></li>
          <li><a href="#overview" onClick={closeMenu}>Overview</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/student" onClick={closeMenu}>Student Login</Link></li>
              <li><Link to="/teacher" onClick={closeMenu}>Teacher Login</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" onClick={closeMenu}>Profile</Link></li>
              <li><Link to="/request" onClick={closeMenu}>Request</Link></li>
              <li><Link to="/teacher" onClick={closeMenu}>Teacher</Link></li>
              <li><button className='logout' onClick={() => { handleLogout(); closeMenu(); }}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
