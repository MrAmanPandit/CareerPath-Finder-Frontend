import React from 'react';
import { GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';
import useSEO from '../utils/useSEO';

const CareerAi = () => {
    const navigate = useNavigate();
    useSEO({
        title: 'Career AI Portal | Professional Growth Guidance',
        description: 'Navigate your professional future with Career AI. Get resume tips, interview prep, and market trend analysis.',
        keywords: 'career AI, job assistance AI, resume tips AI, interview preparation assistant',
        canonical: '/career-ai'
    });

    const suggestions = [
        "High-paying remote careers?",
        "How to prepare for a Tech interview?",
        "Salary negotiation tips"
    ];

    const customNav = (
        <nav className="yam-sections-nav">
            <button className="nav-pill" onClick={() => navigate('/yam-ai')}>
                <MessageSquare size={14} style={{ marginRight: 6 }} /> General Chat
            </button>
            <button className="nav-pill" onClick={() => navigate('/education-ai')}>
                <GraduationCap size={14} style={{ marginRight: 6 }} /> Education Hub
            </button>
            <button className="nav-pill active">
                <Briefcase size={14} style={{ marginRight: 6 }} /> Career Portal
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
