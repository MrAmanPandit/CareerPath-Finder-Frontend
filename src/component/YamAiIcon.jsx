import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import './YamAiIcon.css';

const YamAiIcon = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const controls = useAnimation();
    const iconRef = useRef(null);
    const isDragging = useRef(false);

    // Hide the icon if we are already on any AI page
    const aiRoutes = ['/yam-ai', '/education-ai', '/career-ai'];
    if (aiRoutes.includes(location.pathname)) {
        return null;
    }

    const handleDragEnd = (event, info) => {
        const screenWidth = window.innerWidth;
        const iconWidth = iconRef.current ? iconRef.current.offsetWidth : 60;
        const currentX = info.point.x;

        // Calculate nearest edge: 0 (left) or screenWidth - iconWidth (right)
        const targetX = currentX < screenWidth / 2 ? 0 : screenWidth - iconWidth - 40; 
        // Note: subtracting 40 for the 20px padding on each side defined in CSS

        controls.start({
            x: targetX - (screenWidth - iconWidth - 20), // Adjust relative to initial right: 20px position
            transition: { type: "spring", stiffness: 300, damping: 25 }
        });
    };

    return (
        <motion.div 
            ref={iconRef}
            className="yam-ai-fab" 
            drag
            dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 120, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={() => {
                isDragging.current = true;
            }}
            onDragEnd={(event, info) => {
                handleDragEnd(event, info);
                // Preventive measure: small delay before allowing clicks again
                setTimeout(() => {
                    isDragging.current = false;
                }, 100);
            }}
            animate={controls}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onTap={() => {
                if (!isDragging.current) {
                    navigate('/yam-ai');
                }
            }}
        >
            <div className="yam-ai-pulse"></div>
            <div className="yam-ai-icon-container">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="yam-logo-svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="yam-ai-text">YAM AI</span>
            </div>
        </motion.div>
    );
};

export default YamAiIcon;
