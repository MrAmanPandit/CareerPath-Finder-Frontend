import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './YamAiIcon.css';

const YamAiIcon = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide the icon if we are already on any AI page
    const aiRoutes = ['/yam-ai', '/education-ai', '/career-ai'];
    if (aiRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="yam-ai-fab" onClick={() => navigate('/yam-ai')}>
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
        </div>
    );
};

export default YamAiIcon;
