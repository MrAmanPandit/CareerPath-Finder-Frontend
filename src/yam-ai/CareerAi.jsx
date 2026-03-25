import React from 'react';
import { GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';

const CareerAi = () => {
    const navigate = useNavigate();

    const suggestions = [
        "How to prepare for a Tech interview?",
        "High-paying remote careers?",
        "Tips for a resume review",
        "How to start freelancing?",
        "Career path for Data Science",
        "What is networking in careers?",
        "Salary negotiation tips",
        "How to build a portfolio?",
        "Career change at 30?",
        "Best soft skills for 2026",
        "Work-life balance strategies"
    ];

    const customNav = (
        <nav className="yam-sections-nav">
            <button className="nav-pill" onClick={() => navigate('/yam-ai')}>
                <MessageSquare size={14} style={{marginRight: 6}} /> General Chat
            </button>
            <button className="nav-pill" onClick={() => navigate('/education-ai')}>
                <GraduationCap size={14} style={{marginRight: 6}} /> Education Hub
            </button>
            <button className="nav-pill active">
                <Briefcase size={14} style={{marginRight: 6}} /> Career Portal
            </button>
        </nav>
    );

    return (
        <ChatCore 
            title="Careers AI"
            subtitle="Professional Guidance Portal"
            welcomeMessage="Welcome to the **Career Guidance Portal**. From resume tips to job market trends, I'm here to help you navigate your professional future."
            suggestions={suggestions}
            context="[Context: User is in the specialized Career section] "
            isDedicatedPage={true}
            customNav={customNav}
        />
    );
};

export default CareerAi;
