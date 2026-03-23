import React from 'react'
import { Link } from 'react-router-dom' 
import useSEO from '../utils/useSEO';
import { motion } from 'framer-motion';
import SEOSchema from './SEOSchema';

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
            <h1>Discover & Explore Your Career Path Based on Your Stream</h1>
            <p>Select your stream and explore personalized career options designed to match your skills, interests, and goals.</p>
            <Link to="/career/roadmap/search" className="btn-primary">Get Started</Link>
        </section>

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
