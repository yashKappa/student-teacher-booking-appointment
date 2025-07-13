// src/components/Navbar.js
import React, { useState, useEffect, useRef  } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const sideMenuRef = useRef(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

 const checkLoginStatus = () => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  return cookies.some(c => c.startsWith('enrollment=')) || cookies.some(c => c.startsWith('teacherID='));
};

  const getCookieValue = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};


 const handleLogout = () => {
  document.cookie = 'enrollment=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'teacherID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  setIsLoggedIn(false);
  navigate('/');
  window.location.reload(); 
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

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
    {(() => {
      const enrollment = getCookieValue('enrollment');
      const teacherID = getCookieValue('teacherID');

      if (enrollment) {
        return <li><Link to="/profile">Dashboard</Link></li>;
      } else if (teacherID) {
        return <li><Link to="/techdashboard">Dashboard</Link></li>;
      }
      return null;
    })()}
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
                <Link to="/admin" className="btn secondary">Admin Login</Link>
              </div>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>

        <button className="menu-btn" onClick={toggleMenu}>☰</button>
      </nav>

      <div ref={sideMenuRef} className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul>
          <li><a href="#home" onClick={closeMenu} className={activeSection === 'home' ? 'active' : ''}><i class="fa-solid fa-house-user"></i> Home</a></li>
          <li><a href="#branch" onClick={closeMenu} className={activeSection === 'branch' ? 'active' : ''}><i class="fa-solid fa-code-branch"></i> Branch</a></li>
          <li><a href="#course" onClick={closeMenu} className={activeSection === 'course' ? 'active' : ''}><i class="fa-solid fa-book"></i> Course</a></li>
          <li><a href="#overview" onClick={closeMenu} className={activeSection === 'overview' ? 'active' : ''}><i class="fa-solid fa-circle-info"></i> Overview</a></li>
          <li><a href="#about" onClick={closeMenu} className={activeSection === 'about' ? 'active' : ''}><i class="fa-solid fa-address-card"></i> About</a></li>

        
          {!isLoggedIn ? (
            <>
              <li><Link to="/student" onClick={closeMenu}><i class="fa-solid fa-graduation-cap"></i> Student Login</Link></li>
              <li><Link to="/teacher" onClick={closeMenu}><i class="fa-solid fa-graduation-cap"></i> Teacher Login</Link></li>
              <li><Link to="/admin" onClick={closeMenu}><i class="fa-solid fa-crown"></i> Admin Login</Link></li>
            </>
          ) : (
            <>
{(() => {
      const enrollment = getCookieValue('enrollment');
      const teacherID = getCookieValue('teacherID');

      if (enrollment) {
        return <li><Link to="/profile"><i class="fa-solid fa-chart-simple"></i> Dashboard</Link></li>;
      } else if (teacherID) {
        return <li><Link to="/techdashboard"><i class="fa-solid fa-chart-simple"></i> Dashboard</Link></li>;
      }
      return null;
    })()}              
    <li><button className='logout' onClick={() => { handleLogout(); closeMenu(); }}>Logout <i class="fa-solid fa-right-from-bracket"></i></button></li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
