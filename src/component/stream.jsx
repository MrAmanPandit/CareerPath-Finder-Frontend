import React from 'react'
import './stream.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../utils/useSEO';

import { Dna, Calculator, TrendingUp, Palette } from 'lucide-react';

// Create a motion-enhanced version of the Link component
const MotionLink = motion.create(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Stream = () => {
  useSEO({
    title: 'Choose Your Academic Path | Science, Commerce & Arts',
    description: 'Select your academic branch — Biology, Mathematics, Commerce, or Arts — explore tailored career paths and top courses available for you.',
    keywords: 'choose branch, biology careers, maths careers, commerce careers, arts careers, academic path guidance',
    canonical: '/streams'
  });

  const streams = [
    { name: 'Biology', path: '/streams/biology', icon: Dna, color: '#4ecdc4' },
    { name: 'Maths', path: '/streams/maths', icon: Calculator, color: '#3b82f6' },
    { name: 'Commerce', path: '/streams/commerce', icon: TrendingUp, color: '#f59e0b' },
    { name: 'Arts', path: '/streams/arts', icon: Palette, color: '#8b5cf6' }
  ];

  return (
    <div className="body">
      <div className="streamSection">
        <motion.h1 
          className="streamTitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your <span className="text-gradient">Academic Path</span>
        </motion.h1>

        <motion.div 
          className="cardsContainer"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {streams.map((stream) => (
            <motion.div 
              key={stream.name} 
              variants={cardVariants}
              className="streamCardWrapper"
            >
              <MotionLink 
                to={stream.path} 
                className="streamCard glass-card"
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="streamIcon" style={{ backgroundColor: `${stream.color}20`, color: stream.color, borderColor: `${stream.color}40` }}>
                  <stream.icon size={48} />
                </div>
                <h2 className="streamName">{stream.name}</h2>
              </MotionLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Stream;
