import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ShieldCheck,
  Globe,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="footer-glow"></div>
      
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Brand & Mission */}
          <motion.div className="footer-col brand-col" variants={itemVariants}>
            <div className="footer-logo">
              <span className="logo-text">CareerPath<span>Finder</span></span>
            </div>
            <p className="footer-description">
              Empowering students with AI-driven academic guidance and personalized career roadmaps to navigate their future with confidence.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                
                <Mail size={16} />
                <span>careerpathsfinder@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Sikandra, Kanpur Dehat, Uttar Pradesh</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Stay Connected */}
          <motion.div className="footer-col connect-col" variants={itemVariants}>
            <h4 className="footer-title">Connect With Us</h4>
            <p className="footer-subtitle">Join us for the latest career insights.</p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon">
                <Youtube size={20} />
              </a>
              <a href="mailto:careerpathsfinder@gmail.com" className="social-icon">
                <Mail size={20} />
              </a>
            </div>
            
            <div className="status-indicator">
              <div className="pulse-dot"></div>
              <span>AI Guidance Systems Online</span>
            </div>
          </motion.div>

        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} CareerPath Finder. Developed for future leaders.
          </div>
          <div className="bottom-links">
            <Link to="/privacy-policy"><ShieldCheck size={14} /> Privacy Policy</Link>
            <Link to="/contact"><Globe size={14} /> Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
