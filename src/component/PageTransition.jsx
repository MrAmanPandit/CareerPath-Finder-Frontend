import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
