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
import { useRef } from 'react';
import axios from 'axios';


const Header = () => {
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Create a reference for the header component
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 2. Use an effect to listen for clicks anywhere on the page
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open, AND the click happened outside our headerRef...
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false); // ...close the menu!
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty array ensures this only runs once on mount

  const [userData, setUserData] = useState([]);

 // Close menu when clicking or tapping outside of the header
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is OPEN, and the click happened OUTSIDE the header...
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false); // ...close it!
      }
    };

    // Listen for both mouse clicks (desktop) and screen touches (mobile)
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]); // Dependency array ensures it always checks the current open/closed state
  return (
    <header className="navbar" ref={headerRef}>
      <div className="navContainer">
        
        {/* Logo */}
        <div className="logo">
          CareerPath Finder
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktopNav">
          <NavLink to="/streams" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Streams</NavLink>
          <NavLink to="/career" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Career</NavLink>
          <NavLink to="/about" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Contact Us</NavLink>
        </nav>

        {/* Desktop Login Button (Hidden on Mobile) */}
        <div className="desktopLogin">
          <Link className="loginBtn" to="/login">{userData.name ? `👤 ${userData.name}` : ((<img src='/public/login.png'/>),'Login')}</Link>
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
        <NavLink to="/career" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Career</NavLink>
        <NavLink to="/about" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Contact Us</NavLink>
        <Link to="/login" className="mobileLoginBtn" onClick={closeMenu}>{userData.name ? `👤 ${userData.name}` : "Login"}</Link>
      </div>
    </header>
  );
};

export default Header;