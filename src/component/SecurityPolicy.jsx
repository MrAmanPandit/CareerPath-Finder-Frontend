import React from 'react';
import './SecurityPolicy.css';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Cpu, User, Mail, ArrowRight } from 'lucide-react';
import useSEO from '../utils/useSEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const SecurityPolicy = () => {
  useSEO({
    title: 'Data & Security Policy | CareerPath Finder',
    description: 'Our commitment to protecting your personal data and ensuring a safe experience on CareerPath Finder.',
    keywords: 'security policy, data protection, careerpath finder policy, AI data usage',
    canonical: '/privacy-policy'
  });

  return (
    <div className="privacyWrapper">
      {/* Dynamic Background Blobs */}
      <div className="hero-bg-blobs">
        <motion.div 
            className="blob blob-1"
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                x: [0, 30, 0],
                y: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
            className="blob blob-2"
            animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                x: [0, -40, 0],
                y: [0, -60, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <section className="privacyHero">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="privacyBadge">Your Privacy, Our Priority</span>
          <h1 className="privacyTitle">Security & <span className="text-gradient">Privacy Policy</span></h1>
          <p className="privacySubtitle">
            At CareerPath Finder, we are committed to being transparent about how we collect, use, and protect your personal information.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.div 
        className="privacyContent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Collection */}
        <motion.section className="privacySection" variants={itemVariants}>
          <div className="sectionHeader">
            <div className="iconBox"><Database size={24} /></div>
            <h2>Information We Collect</h2>
          </div>
          <p>To provide you with the best personalized career guidance, we collect the following types of information:</p>
          <ul>
            <li><div className="listDot"></div> <strong>Account Data:</strong> Email address and profile information provided during registration.</li>
            <li><div className="listDot"></div> <strong>Academic Data:</strong> Your educational background, interests, and career goals.</li>
            <li><div className="listDot"></div> <strong>AI Interaction Data:</strong> Conversations with Yam AI Assistant to improve guidance accuracy.</li>
            <li><div className="listDot"></div> <strong>Usage Data:</strong> Information on how you interact with our roadmaps and resources.</li>
          </ul>
        </motion.section>

        {/* AI Usage */}
        <motion.section className="privacySection" variants={itemVariants}>
          <div className="sectionHeader">
            <div className="iconBox"><Cpu size={24} /></div>
            <h2>AI & Data Processing</h2>
          </div>
          <p>Our AI Guidance Systems process your data to generate personalized roadmaps. Here is how we handle it:</p>
          <ul>
            <li><div className="listDot"></div> <strong>Anonymization:</strong> We strive to de-identify data used for AI training where possible.</li>
            <li><div className="listDot"></div> <strong>Contextual Learning:</strong> Your history is used to provide better subsequent recommendations.</li>
            <li><div className="listDot"></div> <strong>Human Oversight:</strong> Critical AI recommendations are reviewed to ensure quality and ethics.</li>
          </ul>
        </motion.section>

        {/* Security */}
        <motion.section className="privacySection" variants={itemVariants}>
          <div className="sectionHeader">
            <div className="iconBox"><Lock size={24} /></div>
            <h2>Data Security</h2>
          </div>
          <p>We implement industry-standard security measures to protect your data from unauthorized access, loss, or misuse. This includes encryption for both data in transit and data at rest.</p>
        </motion.section>

        {/* Rights */}
        <motion.section className="privacySection" variants={itemVariants}>
          <div className="sectionHeader">
            <div className="iconBox"><Shield size={24} /></div>
            <h2>Your Rights</h2>
          </div>
          <p>You have full control over your personal information. You can:</p>
          <ul>
            <li><div className="listDot"></div> Request a copy of the data we hold about you.</li>
            <li><div className="listDot"></div> Update or correct any inaccuracies in your profile.</li>
            <li><div className="listDot"></div> Request deletion of your account and all associated data.</li>
            <li><div className="listDot"></div> Opt-out of non-essential communications.</li>
          </ul>
        </motion.section>

        {/* Contact */}
        <motion.section className="privacySection" variants={itemVariants}>
          <div className="sectionHeader">
            <div className="iconBox"><Mail size={24} /></div>
            <h2>Contact Us</h2>
          </div>
          <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Privacy Team at:</p>
          <div className="contact-info">
            <p style={{ marginTop: '10px' }}><strong>Email:</strong> careerpathsfinder@gmail.com</p>
          </div>
        </motion.section>
      </motion.div>

      {/* Footer info */}
      <footer className="privacyFooter">
        <p className="lastUpdated"><ArrowRight size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Last Updated: April 5, 2026</p>
      </footer>
    </div>
  );
};

export default SecurityPolicy;
