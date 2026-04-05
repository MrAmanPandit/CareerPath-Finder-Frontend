import React from 'react';
import { GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';
import useSEO from '../utils/useSEO';

const EducationAi = () => {
    const navigate = useNavigate();
    useSEO({
        title: 'Education AI Hub | Specialized Study Guidance',
        description: 'Get specialized education advice, study schedules, and subject guidance from our Education AI Intelligence Hub.',
        keywords: 'education AI, study help, exam preparation AI, academic roadmap generator',
        canonical: '/education-ai'
    });
    
    const suggestions = [
        "Help me with a study schedule",
        "Top resources for my subjects",
        "How to prepare for exams?"
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
