import React from 'react';
import { GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';

const EducationAi = () => {
    const navigate = useNavigate();
    
    const suggestions = [
        "Help me with a study schedule",
        "Top resources for Calculus",
        "Best way to learn Python?",
        "How to stay focused while studying?",
        "Explain quantum physics simply",
        "Tips for long-term memory",
        "How to prepare for board exams?",
        "Write a summary of World War II",
        "Effective note-taking methods",
        "How to write a research paper?",
        "Group study vs Solo study?"
    ];

    const customNav = (
        <nav className="yam-sections-nav">
            <button className="nav-pill" onClick={() => navigate('/yam-ai')}>
                <MessageSquare size={14} style={{marginRight: 6}} /> General Chat
            </button>
            <button className="nav-pill active">
                <GraduationCap size={14} style={{marginRight: 6}} /> Education Hub
            </button>
            <button className="nav-pill" onClick={() => navigate('/career-ai')}>
                <Briefcase size={14} style={{marginRight: 6}} /> Career Portal
            </button>
        </nav>
    );

    return (
        <ChatCore 
            title="Education AI"
            subtitle="Academic Intelligence Hub"
            welcomeMessage="Welcome to the **Education Intelligence Hub**. Stuck on a concept or need a study roadmap? I'm ready to help you excel academically."
            suggestions={suggestions}
            context="[Context: User is in the specialized Education section] "
            isDedicatedPage={true}
            customNav={customNav}
        />
    );
};

export default EducationAi;
