import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Trophy, Star, CheckCircle, ArrowRight, Save, Loader2 } from 'lucide-react';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    withCredentials: true
                });
                setUser(response.data.message);
            } catch (error) {
                console.error("Error fetching user data for dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <Loader2 className="animate-spin" size={32} />
                <p>Loading your progress...</p>
            </div>
        );
    }

    if (!user) return null;

    const stats = [
        { id: 1, label: 'Study Hours', value: `${user.studyHours || 0}h`, icon: <Clock size={20} />, color: '#4ecdc4' },
        { id: 2, label: 'Completed Modules', value: `${user.completedModules || 0}/15`, icon: <BookOpen size={20} />, color: '#3b82f6' },
        { id: 3, label: 'Readiness Score', value: `${user.readinessScore || 0}%`, icon: <Trophy size={20} />, color: '#fbbf24' },
    ];

    const savedRoadmaps = user.savedRoadmaps || [];
    const savedCourses = user.savedCourses || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            className="student-dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="dashboard-section-header">
                <h3><Trophy size={20} className="header-icon" /> Student Dashboard</h3>
                <p>Track your progress and stay ahead in your career journey.</p>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid">
                {stats.map(stat => (
                    <motion.div 
                        key={stat.id} 
                        className="stat-card glass-card"
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="stat-icon-wrapper" style={{ color: stat.color, background: `${stat.color}15` }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Preparation Progress */}
            <motion.div className="progress-section glass-card" variants={itemVariants}>
                <div className="section-title">
                    <h4>Preparation Progress</h4>
                    <span className="percentage">{user.readinessScore || 0}%</span>
                </div>
                <div className="progress-bar-container">
                    <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${user.readinessScore || 0}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>
                <p className="progress-hint">
                    {user.readinessScore > 80 ? "You are doing amazing! Keep it up." : "Consistency is key. Spend more time on your roadmap to improve your score."}
                </p>
            </motion.div>

            {/* Saved Content Grid */}
            <div className="saved-content-grid">
                {/* Saved Roadmaps */}
                <motion.div className="saved-section glass-card" variants={itemVariants}>
                    <div className="section-header">
                        <h4><Star size={18} fill="#fbbf24" color="#fbbf24" /> Saved Roadmaps</h4>
                    </div>
                    {savedRoadmaps.length > 0 ? (
                        <div className="roadmap-list">
                            {savedRoadmaps.map((roadmap, index) => (
                                <div key={index} className="roadmap-item">
                                    <div className="roadmap-info">
                                        <span className="roadmap-title">{roadmap.jobTitle || "Active Roadmap"}</span>
                                        <span className="roadmap-cat">Career Path</span>
                                    </div>
                                    <div className="mini-progress">
                                        <div className="mini-bar" style={{ width: `40%` }} />
                                        <span className="mini-text">40%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-saved">No roadmaps saved yet.</p>
                    )}
                    <button className="view-all-btn" onClick={() => window.location.href='/career/roadmap/search'}>Explore Roadmaps <ArrowRight size={14} /></button>
                </motion.div>

                {/* Saved Courses */}
                <motion.div className="saved-section glass-card" variants={itemVariants}>
                    <div className="section-header">
                        <h4><Save size={18} color="#4ecdc4" /> Saved Courses</h4>
                    </div>
                    {savedCourses.length > 0 ? (
                        <div className="course-list">
                            {savedCourses.map((courseName, index) => (
                                <div key={index} className="course-item">
                                    <div className="course-info">
                                        <span className="course-title">{courseName}</span>
                                        <span className="course-platform">CareerPath Academy</span>
                                    </div>
                                    <span className={`status-pill in-progress`}>
                                        In Progress
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-saved">No courses saved yet.</p>
                    )}
                    <button className="view-all-btn" onClick={() => window.location.href='/streams'}>Discover Courses <ArrowRight size={14} /></button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
