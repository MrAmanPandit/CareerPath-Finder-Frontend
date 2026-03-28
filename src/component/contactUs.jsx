import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimatedPage from './animation';
import './contactUs.css';
import useSEO from '../utils/useSEO';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';
import { Mail, Phone, User, MessageSquare, Send, Lightbulb, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';

const Contact = () => {
  const [contactType, setContactType] = useState('suggestion'); // 'suggestion' or 'complaint'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Parallax Background Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const blobX = useTransform(springX, [0, window.innerWidth], [-20, 20]);
  const blobY = useTransform(springY, [0, window.innerHeight], [-20, 20]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Fetch logged-in user details to pre-fill the form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = response.data.message;
        if (user) {
          setFormData(prev => ({
            ...prev,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || '',
            email: user.email || ''
          }));
        }
      } catch (error) {
        console.error("Error fetching user details for pre-fill:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useSEO({
    title: `Contact Us | ${contactType === 'suggestion' ? 'Give a Suggestion' : 'File a Complaint'}`,
    description: 'Have questions, suggestions, or feedback about CareerPath Finder? Reach out to our support team and we\'ll get back to you shortly.',
    keywords: 'contact CareerPath Finder, career guidance support, feedback, help',
    canonical: '/contact'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = contactType === 'suggestion' ? 'suggestion' : 'complaint';
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/contact/${endpoint}`, formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      showErrorAlert(error.response?.data?.message || `Failed to submit ${contactType}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
    <div className="contactWrapper" onMouseMove={handleMouseMove}>
      {/* Dynamic Background Blobs */}
      <div className="blob-container">
        <motion.div style={{ x: blobX, y: blobY }} className="blob blob-1"></motion.div>
        <motion.div style={{ x: useTransform(springX, [0, window.innerWidth], [20, -20]), y: useTransform(springY, [0, window.innerHeight], [20, -20]) }} className="blob blob-2"></motion.div>
        <motion.div style={{ x: useTransform(springX, [0, window.innerWidth], [-10, 10]), y: useTransform(springY, [0, window.innerHeight], [10, -10]) }} className="blob blob-3"></motion.div>
      </div>

      <motion.div 
        className="contactCard glass-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="contactTitle">Get in <span className="text-gradient">Touch</span></h2>
              
              {/* Contact Type Selector */}
              <div className="contactSelector">
                <button 
                  className={`selectorBtn ${contactType === 'suggestion' ? 'active' : ''}`}
                  onClick={() => setContactType('suggestion')}
                >
                  <Lightbulb size={18} /> Suggestions
                  {contactType === 'suggestion' && <motion.div layoutId="activeTab" className="activeBg" />}
                </button>
                <button 
                  className={`selectorBtn ${contactType === 'complaint' ? 'active' : ''}`}
                  onClick={() => setContactType('complaint')}
                >
                  <AlertCircle size={18} /> Complaints
                  {contactType === 'complaint' && <motion.div layoutId="activeTab" className="activeBg" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={contactType}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="contactText">
                    {contactType === 'suggestion' 
                      ? "Have a brilliant idea to improve our platform? We'd love to hear your suggestions!" 
                      : "Facing any issues or have a grievance? Tell us what went wrong, and we'll fix it."}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <form className="contactForm" onSubmit={handleSubmit}>
                <div className="form-grid-layout" style={{gridTemplateColumns: '1fr'}}>
                  <motion.div 
                    className="inputGroup"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="inputLabel">Name</label>
                    <div className="inputContainer read-only">
                      <User className="inputIcon" size={18} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name" 
                        className="inputField" 
                        readOnly
                        required 
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="inputGroup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="inputLabel">Email Address</label>
                    <div className="inputContainer read-only">
                      <Mail className="inputIcon" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email" 
                        className="inputField" 
                        readOnly
                        required 
                      />
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="inputGroup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="inputLabel">Detailed Message</label>
                  <div className="inputContainer" style={{alignItems: 'flex-start'}}>
                    <MessageSquare className="inputIcon" size={18} style={{marginTop: '15px'}} />
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={contactType === 'suggestion' ? "Share your thoughts..." : "Describe your complaint..."} 
                      className="inputField textArea" 
                      rows="4"
                      required 
                    ></textarea>
                  </div>
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="submitButton" 
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {isSubmitting ? (
                    <div className="btn-content">
                      <RefreshCcw className="spinning-icon" size={18} />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="btn-content">
                        <Send size={18} />
                        <span>Submit {contactType === 'suggestion' ? 'Suggestion' : 'Complaint'}</span>
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-scene"
              className="success-scene"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="success-icon-wrapper">
                <CheckCircle size={80} className="success-icon" />
              </div>
              <h2 className="success-title">Thank You!</h2>
              <p className="success-text">
                Your <strong>{contactType}</strong> has been received successfully. 
                Our team will review it and get back to you shortly.
              </p>
              <motion.button 
                className="back-button"
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </AnimatedPage>
  );
};

export default Contact;