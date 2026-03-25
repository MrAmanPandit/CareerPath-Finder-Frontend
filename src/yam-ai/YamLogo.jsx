import React from 'react';
import { motion } from 'framer-motion';

const YamLogo = ({ size = 48 }) => {
    return (
        <motion.div 
            style={{ 
                width: size, 
                height: size, 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 0 8px var(--yam-primary))'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Outer Energy Ring */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: '2px solid var(--yam-primary)',
                    borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
                    opacity: 0.6
                }}
                animate={{ 
                    rotate: 360,
                    borderRadius: [
                        '38% 62% 63% 37% / 41% 44% 56% 59%',
                        '62% 38% 37% 63% / 54% 51% 49% 46%',
                        '38% 62% 63% 37% / 41% 44% 56% 59%'
                    ]
                }}
                transition={{ 
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                    borderRadius: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
            />

            {/* Inner Glowing Core */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    background: 'linear-gradient(135deg, var(--yam-primary), var(--yam-secondary))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
                    overflow: 'hidden'
                }}
                animate={{ rotate: 45 }}
            >
                {/* Shimmer Effect */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '200%',
                        height: '20%',
                        background: 'rgba(255,255,255,0.2)',
                        top: '40%',
                        left: '-100%',
                        rotate: '-45deg'
                    }}
                    animate={{ left: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                <span style={{ 
                    color: 'white', 
                    fontSize: size * 0.3, 
                    fontWeight: '800', 
                    transform: 'rotate(-45deg)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontFamily: '"Outfit", sans-serif'
                }}>
                    Y
                </span>
            </motion.div>

            {/* Orbiting Particle */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    background: 'var(--yam-secondary)',
                    borderRadius: '50%',
                    boxShadow: '0 0 5px var(--yam-secondary)'
                }}
                animate={{ 
                    rotate: 360,
                    x: [0, size/2, 0, -size/2, 0],
                    y: [size/2, 0, -size/2, 0, size/2]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
        </motion.div>
    );
};

export default YamLogo;
