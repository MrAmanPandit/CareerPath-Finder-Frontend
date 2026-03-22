import React from 'react';
import './aboutUs.css';
import { motion } from 'framer-motion';
import amanImg from '../assets/aman.png';
import mohitImg from '../assets/mohit.png';
import yuvImg from '../assets/yuv.png';
import harshikaImg from '../assets/harshika.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const About = () => {
  return (
    <div className="aboutWrapper">
      <motion.div
        className="aboutCard"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="aboutTitle">About Us</h1>

        <p className="aboutText">
          CareerPath Finder is your personalized guide to discovering the right career.
          Whether you're a student exploring options, a graduate unsure of your next step,
          or a professional considering a career switch, CareerPath Finder helps you identify
          opportunities that align with your skills, interests, and goals.
        </p>

        <motion.div
          className="aboutFeatures"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="featureItem" variants={itemVariants}>
            <span className="featureIcon">🎯</span>
            <h3 className="featureTitle">Discover Your Passion</h3>
            <p className="featureDesc">Find career paths perfectly suited to your unique strengths.</p>
          </motion.div>
          <motion.div className="featureItem" variants={itemVariants}>
            <span className="featureIcon">📈</span>
            <h3 className="featureTitle">Plan Your Future</h3>
            <p className="featureDesc">Get step-by-step guidance to reach your ultimate dream career.</p>
          </motion.div>
        </motion.div>

        <div className="developers">
          <h1>Our Team</h1>
          <motion.div
            className="members_row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div className="memberscard" variants={itemVariants}>
              <img src={amanImg} alt="Aman Pandey" />
              <div className='text'>
                <h3 className='memberName'>Aman Pandey</h3>
                <h5 className="designation">Frontend Developer</h5>
              </div>
            </motion.div>
            <motion.div className="memberscard" variants={itemVariants}>
              <img src={mohitImg} alt="Mohit Pal" />
              <div className='text'>
                <h3 className='memberName'>Mohit Pal</h3>
                <h5 className="designation">Backend Developer</h5>
              </div>
            </motion.div>
            <motion.div className="memberscard" variants={itemVariants}>
              <img src={yuvImg} alt="Yuvraj Upadhyay" />
              <div className='text'>
                <h3 className='memberName'>Yuvraj Upadhyay</h3>
                <h5 className="designation">Investor</h5>
              </div>
            </motion.div>
            <motion.div className="memberscard" variants={itemVariants}>
              <img src={harshikaImg} alt="Harshika Singh" />
              <div className='text'>
                <h3 className='memberName'>Harshika Singh</h3>
                <h5 className="designation">Supportive Guy</h5>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;