import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import useSEO from '../utils/useSEO';
import { motion } from 'framer-motion';
import SEOSchema from './SEOSchema';
import { ArrowRight, GraduationCap, Briefcase, Target, Zap, Map, Compass, Heart, Sparkles, Milestone } from 'lucide-react';
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
    scale: 1.02,
    boxShadow: "0px 15px 30px rgba(78, 205, 196, 0.2)",
    transition: { duration: 0.3 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
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
    description: 'CareerPath Finder helps students and professionals explore personalized career options, step-by-step roadmaps, and course guidance based on their current study and branch path.',
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

  const typingWords = ["Future", "Passion", "Success", "Dream"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = typingWords[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(75);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <main className="home-grid-container">
        <SEOSchema schema={faqSchema} />
        
        {/* Module 1: Hero Card */}
        <section className="macro-card hero-card">
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

            <div className="hero-content">
                <motion.div 
                    className="hero-badge"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Sparkles size={14} /> <span>AI-Powered Career Discovery</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Discover & Explore your <span className="text-gradient dynamic-word">{currentText}<span className="cursor-dynamic">|</span></span>
                </motion.h1>

                <motion.div className="hero-feature-tags">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                        <Target size={18} className="tag-icon icon-target" /> Personalized
                    </motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                        <Zap size={18} className="tag-icon icon-zap" /> Fast Roadmap
                    </motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                        <GraduationCap size={18} className="tag-icon icon-grad" /> Expert Guidance
                    </motion.span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Tell us your current study and branch to explore personalized career options designed to match your skills, interests, and goals.
                </motion.p>
                <motion.div
                  className="hero-cta"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link to="/career" className="btn-primary btn-glow">Get Started Free</Link>
                  <span className="cta-subtext">No credit card required</span>
                </motion.div>
            </div>
        </section>

        {/* Module 2: The Choice Card */}
        <motion.section 
          className="macro-card the-choice"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <div className="section-content-human">
                <Compass className="icon-accent" size={48} />
                <h2 className="section-title">The <span className="text-gradient">Overwhelming Choice</span></h2>
                <p>We've all been there. 10th grade, 12th grade, or even after graduation—the same haunting question: <strong>"What next?"</strong></p>
                <p>The world is full of thousands of career paths, but you only have one life. My goal is to stop the guesswork and help you find the path that actually feels like <em>you</em>.</p>
            </div>
        </motion.section>

        {/* Module 3: Mission Card */}
        <motion.section 
          className="macro-card about mission-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <h2 className="section-title">My <span className="text-gradient">Mission</span></h2>
            <p>CareerPath Finder isn't just a platform; it's a commitment. I believe that every talent deserves a roadmap, and no ambition should be lost in the noise of traditional counseling. Whether you're a biology student dreaming of research or a commerce student looking at new-age fin-tech, I help you bridge the gap between where you are and where you belong.</p>
            <div className="mission-quote">
                <Heart size={20} className="icon-heart" />
                <span>Building clarity, one roadmap at a time.</span>
            </div>
        </motion.section>

        {/* Module 4: Intelligence Hub (Full-width grid card) */}
        <motion.section 
          className="macro-card ai-hub-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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

        {/* Module 5: Journey Roadmap (Full-width grid card) */}
        <motion.section 
          className="macro-card the-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
            <h2 className="section-title">Your <span className="text-gradient">Success Journey</span></h2>
            <div className="process-narrative">
                <motion.div className="narrative-step" variants={itemVariants} whileHover="hover">
                    <div className="step-count">01</div>
                    <div className="step-text">
                        <h3>Tell me your story</h3>
                        <p>Not just your stream, but your interests. We start by understanding who you are.</p>
                    </div>
                </motion.div>
                <motion.div className="narrative-step" variants={itemVariants} whileHover="hover">
                    <div className="step-count">02</div>
                    <div className="step-text">
                        <h3>Map the future</h3>
                        <p>We generate a step-by-step educational roadmap—from your current stage to your dream office.</p>
                    </div>
                </motion.div>
                <motion.div className="narrative-step" variants={itemVariants} whileHover="hover">
                    <div className="step-count">03</div>
                    <div className="step-text">
                        <h3>Take the leap</h3>
                        <p>With clarity in hand, you're no longer just dreaming; you're following a plan.</p>
                    </div>
                </motion.div>
            </div>
            <motion.div className="final-cta" variants={itemVariants}>
                <p>Are you ready to stop searching and start following your path?</p>
                <Link to="/career" className="btn-secondary">Let's Build Your Roadmap <Sparkles size={16} /></Link>
            </motion.div>
        </motion.section>

    </main>
  )
}

export default content
