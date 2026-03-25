import React from 'react'
import { Link } from 'react-router-dom' 
import useSEO from '../utils/useSEO';
import { motion } from 'framer-motion';
import SEOSchema from './SEOSchema';
import { ArrowRight, GraduationCap, Briefcase, Target, Zap, Map } from 'lucide-react';
import YamLogo from '../yam-ai/YamLogo';
import './AiHubSection.css';

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
  },
  hover: { 
    y: -10, 
    boxShadow: "0px 15px 30px rgba(78, 205, 196, 0.2)",
    transition: { duration: 0.3 }
  }
};

const iconVariants = {
  hover: { 
    scale: 1.15, 
    rotate: 10, 
    filter: "drop-shadow(0 0 10px rgba(78, 205, 196, 0.5))",
    transition: { type: "spring", stiffness: 300 } 
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
  useSEO({
    title: 'Discover & Explore Your Career Path',
    description: 'CareerPath Finder helps students and professionals explore personalized career options, step-by-step roadmaps, and course guidance based on their stream — Biology, Maths, Commerce, or Arts.',
    keywords: 'career path finder, career guidance, career roadmap, career for students, find career, best career options India',
    canonical: '/'
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does CareerPath Finder help students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CareerPath Finder helps students identify the best career options based on their 10+2 stream, offering step-by-step educational roadmaps from high school through professional employment."
        }
      },
      {
        "@type": "Question",
        "name": "Are the career roadmaps free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, anyone can search and view detailed career trajectories for roles like Software Engineer, Data Scientist, UI/UX Designer, and more using our AI generator or curated collections."
        }
      }
    ]
  };

  return (
    <main>
        <SEOSchema schema={faqSchema} />
        <section className="hero">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover & Explore your <span className="text-gradient">Career Path</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Select your stream and explore personalized career options designed to match your skills, interests, and goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/career/roadmap/search" className="btn-primary">Get Started</Link>
            </motion.div>
        </section>

        <motion.section 
          className="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">About <span className="text-gradient">Us</span></h2>
            <p>CareerPath Finder is your personalized guide to discovering the right career. Whether you're a student exploring options, a graduate unsure of your next step, or a professional considering a career switch, CareerPath Finder helps you identify opportunities that align with your skills, interests, and goals.</p>
        </motion.section>

        {/* AI Intelligence Hub Section */}
        <motion.section 
          className="ai-hub-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">YAM AI <span className="text-gradient">Intelligence Core</span></h2>
            <div className="ai-grid">
                <motion.div variants={itemVariants} whileHover="hover">
                    <Link to="/yam-ai" className="ai-card">
                        <div className="ai-card-icon">
                            <YamLogo size={50} />
                        </div>
                        <h3>General Assistant</h3>
                        <p>Your 24/7 academic companion for quick answers and general study guidance.</p>
                        <div className="ai-card-btn">Explore Core <ArrowRight size={16} /></div>
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} whileHover="hover">
                    <Link to="/education-ai" className="ai-card">
                        <div className="ai-card-icon">
                            <GraduationCap size={40} />
                        </div>
                        <h3>Education Specialist</h3>
                        <p>Deep-dive into complex subjects, exam preparation, and customized study roadmaps.</p>
                        <div className="ai-card-btn">Learn More <ArrowRight size={16} /></div>
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} whileHover="hover">
                    <Link to="/career-ai" className="ai-card career">
                        <div className="ai-card-icon">
                            <Briefcase size={40} />
                        </div>
                        <h3>Career Guidance</h3>
                        <p>Expert professional advice, resume strategies, and industry transition roadmaps.</p>
                        <div className="ai-card-btn">Accelerate Career <ArrowRight size={16} /></div>
                    </Link>
                </motion.div>
            </div>
        </motion.section>

        <motion.section 
          className="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">Platform <span className="text-gradient">Features</span></h2>
            <motion.div 
               className="feature-grid"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div 
                  className="feature-card glass-card" 
                  variants={itemVariants} 
                  whileHover="hover"
                >
                    <motion.div className="ai-card-icon" variants={iconVariants}>
                        <Target size={40} />
                    </motion.div>
                    <h3>Personalized Assessments</h3>
                    <p>Discover careers that suit your strengths and passions.</p>
                </motion.div>
                <motion.div 
                  className="feature-card glass-card" 
                  variants={itemVariants}
                  whileHover="hover"
                >
                    <motion.div className="ai-card-icon" variants={iconVariants}>
                        <Zap size={40} />
                    </motion.div>
                    <h3>Comprehensive Insights</h3>
                    <p>Get detailed information about job roles, required skills, and growth.</p>
                </motion.div>
                <motion.div 
                  className="feature-card glass-card" 
                  variants={itemVariants}
                  whileHover="hover"
                >
                    <motion.div className="ai-card-icon" variants={iconVariants}>
                        <GraduationCap size={40} />
                    </motion.div>
                    <h3>Education Guidance</h3>
                    <p>Find the best courses and certifications for your chosen path.</p>
                </motion.div>
                <motion.div 
                  className="feature-card glass-card" 
                  variants={itemVariants}
                  whileHover="hover"
                >
                    <motion.div className="ai-card-icon" variants={iconVariants}>
                        <Map size={40} />
                    </motion.div>
                    <h3>Actionable Roadmaps</h3>
                    <p>Step-by-step guidance to help you reach your dream career.</p>
                </motion.div>
            </motion.div>
        </motion.section>

    </main>
  )
}

export default content
