import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="footerContainer">
        
        {/* Navigation Links */}
        <div className="footerLinks">
          <Link to="/" className="footerLink">Home</Link>
          <Link to="/streams" className="footerLink">Academic Paths</Link>
          <Link to="/career" className="footerLink">Career</Link>
          <Link to="/about" className="footerLink">About</Link>
          <Link to="/contact" className="footerLink">Contact Us</Link>
        </div>

        {/* Copyright Text */}
        <div className="footerCopyright">
          © 2026 CareerPath Finder. All rights reserved.
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
