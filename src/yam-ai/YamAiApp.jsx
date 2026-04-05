import React from 'react';
import { GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';
import useSEO from '../utils/useSEO';

const YamAiApp = () => {
    const navigate = useNavigate();
    useSEO({
        title: 'YAM AI Assistant | Your Academic Mentor',
        description: 'Chat with YAM AI for instant academic help, career guidance, and learning roadmaps. Your 24/7 personal mentor.',
        keywords: 'YAM AI, AI mentor, academic help AI, career assistant India',
        canonical: '/yam-ai'
    });

    const suggestions = [
        "How can you help me?",
        "Compare top career paths",
        "Explain complex topics simply"
    ];

    const customNav = (
        <nav className="yam-sections-nav">
            <button className="nav-pill active">
                <MessageSquare size={14} style={{ marginRight: 6 }} /> General Chat
            </button>
            <button className="nav-pill" onClick={() => navigate('/education-ai')}>
                <GraduationCap size={14} style={{ marginRight: 6 }} /> Education Hub
            </button>
            <button className="nav-pill" onClick={() => navigate('/career-ai')}>
                <Briefcase size={14} style={{ marginRight: 6 }} /> Career Portal
            </button>
        </nav>
    );

    return (
        <ChatCore
            title="YAM AI"
            subtitle="Your Academic Mentor"
            suggestions={suggestions}
            customNav={customNav}
            backRoute="/"
        />
    );
};

export default YamAiApp;
