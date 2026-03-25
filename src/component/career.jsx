import React from 'react';
import './career.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSEO from '../utils/useSEO';
import { Code, TrendingUp, Brain, Plane, Palette, BarChart, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Careers = () => {
  useSEO({
    title: 'Explore Careers | Career Roadmaps for Every Stream',
    description: 'Explore top career options like Software Engineer, Data Scientist, Investment Banker, Clinical Psychologist, Commercial Pilot, and UI/UX Designer. Get step-by-step roadmaps.',
    keywords: 'explore careers, career options, software engineer roadmap, data scientist career, investment banker, clinical psychologist, commercial pilot, UI UX designer India',
    canonical: '/career'
  });
  // Sample data for the careers grid

  // 1. State for the data from your database
  const [careers, setCareers] = useState([]); 
  
  // 2. State for the search bar text
  const [searchTerm, setSearchTerm] = useState("");

  // 3. The magic filter function
  const filteredCareers = careers.filter((career) => {
    // We convert everything to lowercase so "Software" and "software" both match
    return career.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="careersWrapper">
      
      {/* Page Header */}
      <motion.div 
        className="careersHeader"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="careersTitle">Explore <span className="text-gradient">Careers</span></h1>
        <p className="careersSubtitle">Discover top professions, understand what they do, and find out which stream will get you there.</p>
      </motion.div>

      {/* Search/Filter Bar */}
      <motion.div 
        className="searchContainer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
       <Link to="/career/roadmap/search"><button className="searchBtn">Search for a career <span className="ai-badge">with AI Intelligence</span></button></Link>
      </motion.div>

      {/* Careers Grid */}
      <motion.div 
        className="careersGrid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       
          <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="careerCardHeader">
              <span className="careerIcon"><Code size={30} /></span>
              <span className="careerGrowth">Very High Paying</span>
            </div>
            
            <h3 className="careerName">Software Engineer</h3>
            <span className="careerStream">Path: Math (PCM)</span>
            
            <p className="careerDesc">Design, build, and maintain software applications and systems.</p>
            
            <Link to="/career/roadmap/software-engineer" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
          </motion.div>
          
          <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="careerCardHeader">
              <span className="careerIcon"><TrendingUp size={30} /></span>
              <span className="careerGrowth">High Demand</span>
            </div>
            
            <h3 className="careerName">Investment Banker</h3>
            <span className="careerStream">Path: Commerce</span>
            
            <p className="careerDesc">Help corporate clients raise capital and provide financial advisory.</p>
            
            <Link to="/career/roadmap/investment-banker" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}> 
            <div className="careerCardHeader">
              <span className="careerIcon"><Brain size={30} /></span>
              <span className="careerGrowth">Fast Growing</span>
            </div>

            <h3 className="careerName">Clinical Psychologist</h3>
            <span className="careerStream">Path: Arts / Biology</span>

            <p className="careerDesc">Assess, diagnose, and treat mental, emotional, and behavioral disorders.</p>

            <Link to="/career/roadmap/clinical-psychologist" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
          </motion.div>

            <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}>   
               <div className="careerCardHeader">
                    <span className="careerIcon"><Plane size={30} /></span>
                    <span className="careerGrowth">Global Demand</span>
                </div>
                <h3 className="careerName">Commercial Pilot</h3>
                <span className="careerStream">Path: Math (PCM)</span>
                <p className="careerDesc">Navigate and fly airplanes for airlines, transporting passengers and cargo.</p>
                <Link to="/career/roadmap/commercial-pilot" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
            </motion.div>

            <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}>
                <div className="careerCardHeader">
                    <span className="careerIcon"><Palette size={30} /></span>
                    <span className="careerGrowth">Creative Tech</span>
                </div>
                <h3 className="careerName">UI/UX Designer</h3>
                <span className="careerStream">Path: Any Stream</span>
                <p className="careerDesc">Create user-friendly interfaces and design digital experiences.</p>
                <Link to="/career/roadmap/ui-ux-designer" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
            </motion.div> 

            <motion.div className="careerCard glass-card" variants={itemVariants} whileHover={{ y: -5 }}>
                <div className="careerCardHeader">
                    <span className="careerIcon"><BarChart size={30} /></span>
                    <span className="careerGrowth">Top Rated</span>
                </div>
                <h3 className="careerName">Data Scientist</h3>
                <span className="careerStream">Path: Math / Commerce</span>
                <p className="careerDesc">Analyze complex raw data to help businesses make data-driven decisions.</p>
                <Link to="/career/roadmap/data-scientist" className="readMoreBtn">View Roadmap <ArrowRight size={16} /></Link>
            </motion.div>


      </motion.div>

    </div>
  );
};

export default Careers;