// import React from 'react'
// import { Link, NavLink } from 'react-router-dom';

// const header = () => {
//   return (
//     <header>
//       <div className="logo">CareerPath Finder</div>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/streams" className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
//             Streams
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
//             About Us
//             </NavLink>
//           </li>
//           <li>
//           <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
//             Contact Us
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//       <Link className="login-btn" to="/login">Login</Link>
//     </header>
//   )
// }

// export default header
import React, { useState } from 'react';
import './header.css';
import { Link,NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [userData, setUserData] = useState([]);

 useEffect(() => {
  axios.get('/api/headerAfterLogin')
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
 }, []);
  return (
    <header className="navbar">
      <div className="navContainer">
        
        {/* Logo */}
        <div className="logo">
          CareerPath Finder
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktopNav">
          <NavLink to="/streams" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Streams</NavLink>
          <NavLink to="/about" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Contact Us</NavLink>
        </nav>

        {/* Desktop Login Button (Hidden on Mobile) */}
        <div className="desktopLogin">
          <Link className="loginBtn" to="/login">{userData.name ? `👤 ${userData.name}` : "Login"}</Link>
        </div>

        {/* Mobile Hamburger Toggle (Hidden on Desktop) */}
        <button className="mobileToggle" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Visible only when toggled on Mobile) */}
      <div className={`mobileNav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/streams" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Streams</NavLink>
        <NavLink to="/about" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Contact Us</NavLink>
        <Link to="/login" className="mobileLoginBtn" onClick={closeMenu}>{userData.name ? `👤 ${userData.name}` : "Login"}</Link>
      </div>
    </header>
  );
};

export default Header;