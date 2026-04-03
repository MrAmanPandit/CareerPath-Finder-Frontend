import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Trophy, Star, CheckCircle, ArrowRight, Save, Loader2, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx'; // shared context — user already fetched

const StudentDashboard = () => {
    const { user } = useUser(); // read from shared context, no extra API call
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                    withCredentials: true
                };

                const insightsRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/users/insights`,
                    config
                );
                setInsights(insightsRes.data.data);

            } catch (error) {
                console.error("Insights fetch failed:", error);
                setInsights({ error: true });
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
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

            {/* AI Insight Section */}
            {loading ? (
                <motion.div className="insight-marquee-container glass-card" variants={itemVariants} style={{ marginBottom: '24px', padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p style={{ fontSize: '14px', opacity: 0.6 }}>✨ Calculating your personalized insights...</p>
                </motion.div>
            ) : (insights && !insights.error) ? (
                <motion.div className="insight-marquee-container glass-card" variants={itemVariants} style={{ marginBottom: '24px', position: 'relative', overflow: 'hidden', padding: '20px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(159, 48, 157, 0.1))', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ background: 'linear-gradient(to right, #4ecdc4, #9f309d)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>✨ YAM AI Guidance</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(78, 205, 196, 0.5), transparent)' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div className="insight-block">
                            <h4 style={{ fontSize: '14px', color: 'var(--text-color)', marginBottom: '6px', opacity: 0.8 }}><CheckCircle size={14} style={{ display: 'inline', marginRight: '4px' }} /> {insights.phase?.title}</h4>
                            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{insights.phase?.message}</p>
                        </div>
                        <div className="insight-block">
                            <h4 style={{ fontSize: '14px', color: 'var(--text-color)', marginBottom: '6px', opacity: 0.8 }}><Trophy size={14} style={{ display: 'inline', marginRight: '4px' }} /> {insights.performance?.title}</h4>
                            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{insights.performance?.message}</p>
                        </div>
                        {insights.recommendation && (
                            <div className="insight-block" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(78, 205, 196, 0.3)' }}>
                                <h4 style={{ fontSize: '14px', color: 'var(--text-color)', marginBottom: '6px', opacity: 0.8 }}><Star size={14} style={{ display: 'inline', marginRight: '4px' }} /> {insights.recommendation.title}</h4>
                                <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '10px' }}>{insights.recommendation.message}</p>
                                <a href={insights.recommendation.url} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', color: '#4ecdc4', textDecoration: 'none' }}>
                                    View {insights.recommendation.match} <ArrowRight size={12} />
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>
            ) : insights?.error ? (
                <motion.div className="insight-marquee-container glass-card" variants={itemVariants} style={{ marginBottom: '24px', padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <p style={{ fontSize: '14px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} />
                        Unable to connect to AI Guidance.
                        <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', marginLeft: '4px', padding: 0, fontSize: '14px', fontWeight: 'bold' }}>
                            Re-sync Now
                        </button>
                    </p>
                </motion.div>
            ) : (
                <motion.div className="insight-marquee-container glass-card" variants={itemVariants} style={{ marginBottom: '24px', padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p style={{ fontSize: '14px', opacity: 0.8 }}>⚡ Please <Link to="/edit-details" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 'bold' }}>update your profile</Link> to generate personalized career insights!</p>
                </motion.div>
            )}

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
                    <button className="view-all-btn" onClick={() => window.location.href = '/career/roadmap/search'}>Explore Roadmaps <ArrowRight size={14} /></button>
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
                    <button className="view-all-btn" onClick={() => window.location.href = '/streams'}>Discover Courses <ArrowRight size={14} /></button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
