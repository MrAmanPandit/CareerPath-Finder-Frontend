import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoadmapInsights.css';
import AnimatedPage from './animation';
import SkeletonLoader from './SkeletonLoader';
import { TrendingUp, DollarSign, Briefcase, Award, Building, ChevronLeft, Calendar, UserCheck, ShieldCheck } from 'lucide-react';
import useSEO from '../utils/useSEO';

const RoadmapInsights = () => {
    const { jobTitle } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useSEO({
        title: `${jobTitle} Career Insights | Salary & Growth Trends`,
        description: `Get in-depth market results for ${jobTitle} — including salary ranges, future demand, and essential skills required for success.`,
        keywords: `${jobTitle} salary, ${jobTitle} career growth, ${jobTitle} market demand, job insights`,
        canonical: `/career/roadmap/${encodeURIComponent(jobTitle)}/insights`
    });

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                // Fetch by name from our search endpoint
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps/search?q=${encodeURIComponent(jobTitle)}`);

                // The search returns an array, find the exact match or first match
                if (response.data.data && response.data.data.length > 0) {
                    const matched = response.data.data.find(r => r.jobTitle.toLowerCase() === jobTitle.toLowerCase()) || response.data.data[0];
                    setData(matched);
                }
            } catch (err) {
                console.error("Error fetching roadmap insights:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (jobTitle) {
            fetchInsights();
        }
    }, [jobTitle]);

    if (isLoading) {
        return (
            <div className="insights-page-wrapper">
                <SkeletonLoader type="search" />
            </div>
        );
    }

    if (!data) {
        return (
            <AnimatedPage>
                <div className="insights-page-wrapper no-data-state">
                    <h3>Insights Not Found</h3>
                    <p>We don't have detailed career data for "{jobTitle}" yet. Our AI is currently generating this roadmap.</p>
                    <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft size={18} /> Back to Search</button>
                </div>
            </AnimatedPage>
        );
    }

    // Process comma separated strings if they exist
    const skillsList = data.requiredSkills ? data.requiredSkills.split(',').map(s => s.trim()) : [];
    const companiesList = data.companiesHiring ? data.companiesHiring.split(',').map(c => c.trim()) : [];

    return (
        <AnimatedPage>
            <div className="insights-page-wrapper">
                <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft size={18} /> Back to Roadmap</button>

                <div className="insights-header">
                    <h1 className="text-gradient">{data.jobTitle} Career <span style={{ color: "var(--text-color)" }}>Insights</span></h1>
                    <p>Comprehensive analysis of market demand, salary trends, and growth trajectory.</p>
                </div>

                <div className="insights-container">
                    <div className="insights-main">

                        {/* 1. Salary Card */}
                        <div className="insights-card">
                            <div className="card-title">
                                <DollarSign size={24} />
                                Expected Salary Package
                            </div>
                            {data.expectedSalary ? (
                                <>
                                    <div className="salary-display">
                                        <span className="salary-amount">{data.expectedSalary}</span>
                                        <span className="salary-label">Per Annum (Avg)</span>
                                    </div>
                                    <p className="scope-text">Salary ranges depend on individual skills, university prestige, and geographical location (Metros like Bangalore/Gurgaon offer higher base).</p>
                                </>
                            ) : (
                                <p className="scope-text">Salary data varies significantly for this specialized role. Research indicates promising growth for high-performers.</p>
                            )}
                        </div>

                        {/* 2. Growth & Future Scope */}
                        <div className="insights-card">
                            <div className="card-title">
                                <TrendingUp size={24} />
                                Future Scope & Industrial Demand
                            </div>
                            <div className="scope-text">
                                {data.futureScope || "The demand for this role is projected to grow steadily over the next decade as businesses continue to digitize and automate their core processes. Professionals with specialized knowledge in this domain are increasingly seeking to optimize complex systems."}
                            </div>
                        </div>

                        {/* 3. Skills Required */}
                        <div className="insights-card">
                            <div className="card-title">
                                <Award size={24} />
                                Essential Skills & Competencies
                            </div>
                            <div className="skills-grid">
                                {skillsList.length > 0 ? (
                                    skillsList.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))
                                ) : (
                                    <>
                                        <span className="skill-tag">Problem Solving</span>
                                        <span className="skill-tag">Technical Foundation</span>
                                        <span className="skill-tag">Communication</span>
                                        <span className="skill-tag">Industry Domain Knowledge</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 4. Top Hiring Companies */}
                        <div className="insights-card">
                            <div className="card-title">
                                <Building size={24} />
                                Major Organizations Hiring
                            </div>
                            <div className="companies-list">
                                {companiesList.length > 0 ? (
                                    companiesList.map((company, index) => (
                                        <div key={index} className="company-item">
                                            <ShieldCheck size={16} color="#4ade80" />
                                            <span>{company}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="scope-text">Top Tier MNCs, Fortune 500 companies, and rapid-growth Series B+ startups are primary employers for this role.</p>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Stats */}
                    <div className="insights-sidebar">
                        <div className="insights-card sidebar-widget">
                            <div className="card-title">Market Health</div>
                            <div className="stat-row">
                                <span className="stat-label">Job Availability</span>
                                <span className="stat-value">High</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Stability Index</span>
                                <span className="stat-value">7.8/10</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Growth Rate</span>
                                <span className="stat-value">+15% YoY</span>
                            </div>
                        </div>

                        <div className="insights-card sidebar-widget">
                            <div className="card-title">Work Life Impact</div>
                            <div className="stat-row">
                                <span className="stat-label">Remote Possible</span>
                                <span className="stat-value" style={{ color: "#fbbf24" }}>Partial</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Learning Curve</span>
                                <span className="stat-value" style={{ color: "#a855f7" }}>Steep</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default RoadmapInsights;
