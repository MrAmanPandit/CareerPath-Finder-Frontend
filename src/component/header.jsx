import React, { useState } from 'react';
import './header.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import '../index.css';
import { motion } from 'framer-motion';

const MotionNavLink = motion.create(NavLink);
const MotionLink = motion.create(Link);

const Header = () => {
  // State to handle mobile menu toggle

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const headerRef = useRef(null);

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // This React code remains the same in Header.jsx

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 'withCredentials' is required if you are using cookies for JWT
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
          headers: {
            // Include this if you are using the Authorization Header instead of Cookies
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        setUser(response.data.message); // Assuming your API wraps response in a 'data' object
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // 1. Create a reference for the header component

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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


    <motion.header
      className="navbar"
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navContainer">

        {/* Logo */}
        <div className="logo">
          CareerPath Finder
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktopNav">
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Home</MotionNavLink>
          <MotionNavLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/streams" className={({ isActive }) => `navLink ${isActive ? 'active' : 'inactive'}`}>Streams</MotionNavLink>
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
        <NavLink to="/streams" className={({ isActive }) => `mobileNavLink ${isActive ? 'active-link' : 'inactive-link'}`} onClick={closeMenu}>Streams</NavLink>
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