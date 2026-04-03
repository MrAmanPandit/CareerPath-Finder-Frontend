import React, { useState } from 'react';
import './header.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../index.css';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext.jsx'; // shared context — no extra API call

const MotionNavLink = motion.create(NavLink);
const MotionLink = motion.create(Link);

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Read from shared context — user is already fetched once at app startup
  const { user, isLoggedIn } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Combined Effect to handle clicks/taps outside the header to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      className="navbar"
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div className="navContainer">

        {/* Logo */}
        <div className="logo">
          <Link to={"/"}>
          CareerPath Finder
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktopNav">
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Home</MotionNavLink>
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/streams" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Academic Paths</MotionNavLink>
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/career" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Career</MotionNavLink>
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/about" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>About Us</MotionNavLink>
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/contact" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Contact Us</MotionNavLink>
        </nav>


        {/* Desktop Login Button (Hidden on Mobile) */}
        <div className="desktopLogin">
          {isLoggedIn && user?.role === 'admin' && (
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="loginBtn" to="/admin/dashboard">Admin Panel</MotionLink>
          )}
          {isLoggedIn ? (
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="loginBtn" to="/profile">👤 {user?.firstName}</MotionLink>
          ) : (
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="loginBtn" to="/login">Login</MotionLink>
          )}
        </div>

        {/* Mobile Hamburger Toggle (Hidden on Desktop) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`mobileToggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-bar bar1"></span>
          <span className="hamburger-bar bar2"></span>
          <span className="hamburger-bar bar3"></span>
        </motion.button>
      </div>

      {/* Mobile Navigation Dropdown (Visible only when toggled on Mobile) */}
      <div className={`mobileNav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/streams" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Academic Paths</NavLink>
        <NavLink to="/career" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Career</NavLink>
        <NavLink to="/about" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Contact Us</NavLink>
        {isLoggedIn && user?.role === 'admin' && (
          <NavLink to="/admin/dashboard" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Admin Panel</NavLink>
        )}
        {isLoggedIn ? (
          <Link to="/profile" className="mobileLoginBtn" onClick={closeMenu}>{user?.firstName ? `👤 ${user?.firstName}` : "Profile"}</Link>
        ) : (
          <Link to="/login" className="mobileLoginBtn" onClick={closeMenu}>Login</Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;