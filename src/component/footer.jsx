// import React from 'react'
// import { Link } from 'react-router-dom'
// import './footer.css'

// const footer = () => {
//   return (
//     <footer>
//         <ul class="footer-nav">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/streams">Streams</Link></li>
//             <li><Link to="/careers">Careers</Link></li>
//             <li><Link to="/about">About</Link></li>
//             <li><Link to="/contact">Contact Us</Link></li>
//         </ul>
//         <p class="copyright">&copy; 2026 CareerPath Finder. All rights reserved.</p>
//     </footer>
//   )
// }

// export default footer
import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        
        {/* Navigation Links */}
        <div className="footerLinks">
          <Link to="/" className="footerLink">Home</Link>
          <Link to="/streams" className="footerLink">Streams</Link>
          <Link to="/career" className="footerLink">Career</Link>
          <Link to="/about" className="footerLink">About</Link>
          <Link to="/contact" className="footerLink">Contact Us</Link>
        </div>

        {/* Copyright Text */}
        <div className="footerCopyright">
          © 2026 CareerPath Finder. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
