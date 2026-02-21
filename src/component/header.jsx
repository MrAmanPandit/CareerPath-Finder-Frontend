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

const Header = () => {
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navContainer">
        
        {/* Logo */}
        <div className="logo">
          CareerPath Finder
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktopNav">
          <NavLink to="/streams" className={({ isActive }) => `navLink ${isActive ? 'active-link' : 'inactive-link'}`}>Streams</NavLink>
          <NavLink to="/about" className={({ isActive }) => `navLink ${isActive ? 'active-link' : 'inactive-link'}`}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navLink ${isActive ? 'active-link' : 'inactive-link'}`}>Contact Us</NavLink>
        </nav>

        {/* Desktop Login Button (Hidden on Mobile) */}
        <div className="desktopLogin">
          <button className="loginBtn">Login</button>
        </div>

        {/* Mobile Hamburger Toggle (Hidden on Desktop) */}
        <button className="mobileToggle" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Visible only when toggled on Mobile) */}
      <div className={`mobileNav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/streams" className="mobileNavLink">Streams</Link>
        <Link to="/about" className="mobileNavLink">About Us</Link>
        <Link to="/contact" className="mobileNavLink">Contact Us</Link>
        <Link to="/login" className="mobileLoginBtn">Login</Link>
      </div>
    </header>
  );
};

export default Header;