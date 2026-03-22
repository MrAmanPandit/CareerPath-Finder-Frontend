import React from 'react'
import { Link } from 'react-router-dom' 
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const content = () => {
  return (
    <main>
        <motion.section 
          className="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <h1>Discover & Explore Your Career Path Based on Your Stream</h1>
            <p>Select your stream and explore personalized career options designed to match your skills, interests, and goals.</p>
            <Link to="/career/roadmap/search" className="btn-primary">Get Started</Link>
        </motion.section>

        <motion.section 
          className="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">About Us</h2>
            <p>CareerPath Finder is your personalized guide to discovering the right career. Whether you're a student exploring options, a graduate unsure of your next step, or a professional considering a career switch, CareerPath Finder helps you identify opportunities that align with your skills, interests, and goals.</p>
        </motion.section>

        <motion.section 
          className="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">Features</h2>
            <motion.div 
               className="feature-grid"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="feature-card" variants={itemVariants}>
                    <div className="icon">🎯</div>
                    <h3>Personalized Career Assessments</h3>
                    <p>Discover careers that suit your strengths and passions.</p>
                </motion.div>
                <motion.div className="feature-card" variants={itemVariants}>
                    <div className="icon">📊</div>
                    <h3>Comprehensive Career Insights</h3>
                    <p>Get detailed information about job roles, required skills, and future growth.</p>
                </motion.div>
                <motion.div className="feature-card" variants={itemVariants}>
                    <div className="icon">🎓</div>
                    <h3>Education & Course Guidance</h3>
                    <p>Find the best courses, degrees, and certifications for your chosen path.</p>
                </motion.div>
                <motion.div className="feature-card" variants={itemVariants}>
                    <div className="icon">🗺️</div>
                    <h3>Roadmaps & Action Plans</h3>
                    <p>Step-by-step guidance to help you reach your dream career.</p>
                </motion.div>
            </motion.div>
        </motion.section>

    </main>
  )
}

export default content
