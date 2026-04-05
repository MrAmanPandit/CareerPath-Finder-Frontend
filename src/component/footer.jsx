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
  ChevronRight,
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

          {/* Column 2: Platform Links */}
          <motion.div className="footer-col" variants={itemVariants}>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/"><ChevronRight size={14} /> Home</Link></li>
              <li><Link to="/career"><ChevronRight size={14} /> Career Roadmaps</Link></li>
              <li><Link to="/streams"><ChevronRight size={14} /> Academic Paths</Link></li>
              <li><Link to="/profile"><ChevronRight size={14} /> Student Profile</Link></li>
            </ul>
          </motion.div>

          {/* Column 3: Resources & Support */}
          <motion.div className="footer-col" variants={itemVariants}>
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/about"><ChevronRight size={14} /> About Our Vision</Link></li>
              <li><Link to="/contact"><ChevronRight size={14} /> Contact Support</Link></li>
              <li><Link to="/yam-ai"><ChevronRight size={14} /> Yam AI Assistant</Link></li>
              <li><Link to="/login"><ChevronRight size={14} /> Login / Register</Link></li>
            </ul>
          </motion.div>

          {/* Column 4: Stay Connected */}
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
            <Link to="/about"><ShieldCheck size={14} /> Privacy Policy</Link>
            <Link to="/contact"><Globe size={14} /> Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
