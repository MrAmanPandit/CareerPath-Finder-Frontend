import React, { useState, useEffect } from 'react';
import './aboutUs.css';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award, Shield, Globe, Rocket, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSEO from '../utils/useSEO';
import amanImg from '../assets/aman.png';
import yuvImg from '../assets/yuv.png';
import harshikaImg from '../assets/harshika.png';
import mohitImg from '../assets/mohit.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const About = () => {
  const [liveStats, setLiveStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRoadmaps: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/public-stats`);
        if (response.data?.data) {
          setLiveStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch public stats:", error);
      }
    };
    fetchStats();
  }, []);

  useSEO({
    title: 'About Us | CareerPath Finder',
    description: 'Empowering students and professionals to navigate their career journey with confidence through data-driven insights and personalized guidance.',
    keywords: 'about CareerPath Finder, career guidance team, professional development, career coaching',
    canonical: '/about'
  });

  const stats = [
    { icon: <Users size={24} />, count: `${liveStats.totalUsers || '200'}+`, label: "Active Students" },
    { icon: <Target size={24} />, count: `${liveStats.totalRoadmaps || '10'}+`, label: "Career Roadmaps" },
    { icon: <Award size={24} />, count: `${liveStats.totalCourses || '25'}+`, label: "Academic Courses" },
    { icon: <Globe size={24} />, count: "24/7", label: "Global Reach" },
  ];

  const values = [
    { icon: <Shield size={32} />, title: "Integrity", desc: "Honest, unbiased guidance for every user." },
    { icon: <Rocket size={32} />, title: "Innovation", desc: "Leading the way with AI-powered insights." },
    { icon: <Heart size={32} />, title: "Excellence", desc: "Striving for perfection in every resource." },
  ];

  return (
    <div className="aboutWrapper">
      {/* Hero Section */}
      <section className="aboutHero">
        <motion.div 
          className="heroContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="heroBadge">Building clarity, one roadmap at a time</span>
          <h1 className="heroTitle">Empowering Your <span className="text-gradient">Professional Journey</span></h1>
          <p className="heroSubtitle">
            CareerPath Finder isn't just a platform; it's a commitment. We believe that every talent deserves a roadmap, 
            and no ambition should be lost in the noise of traditional counseling.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="statsContainer">
        <motion.div 
          className="statsGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} className="statItem glass-card" variants={itemVariants}>
              <div className="statIcon">{stat.icon}</div>
              <h2 className="statCount">{stat.count}</h2>
              <p className="statLabel">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="missionSection">
        <div className="missionGrid">
          <motion.div 
            className="missionCard glass-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="iconBox mission"><Target size={32} /></div>
            <h3>Our Mission</h3>
            <p>To democratize professional guidance by providing every individual with the personalized tools and insights needed to bridge the gap between where they are and where they belong.</p>
          </motion.div>
          
          <motion.div 
            className="missionCard glass-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="iconBox vision"><TrendingUp size={32} /></div>
            <h3>Our Vision</h3>
            <p>To ensure no ambition is lost in noise. We aim to be the world's most trusted partner in career development, building clarity for every student dreaming of a better future.</p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="valuesSection">
        <h2 className="sectionTitle">Our Core <span className="text-gradient">Values</span></h2>
        <motion.div 
          className="valuesGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((val, idx) => (
            <motion.div key={idx} className="valueCard" variants={itemVariants}>
              <div className="valueIcon">{val.icon}</div>
              <h4>{val.title}</h4>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="teamSection">
        <h2 className="sectionTitle">The Minds Behind the <span className="text-gradient">Mission</span></h2>
        <motion.div
          className="teamGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: "Aman Pandey", role: "Founder & Backend Architect", img: amanImg },
            { name: "Yuvraj Upadhyay", role: "Co-Founder & Frontend Lead", img: yuvImg },
            { name: "Mohit", role: "Core Developer", img: mohitImg },
            { name: "Harshika Singh", role: "Strategic Operations", img: harshikaImg },
            { name: "Antra", role: "Community Engagement", img: null }
          ].map((member, idx) => (
            <motion.div key={idx} className="teamCard glass-card" variants={itemVariants}>
              <div className="memberImgWrapper">
                {member.img ? (
                  <img src={member.img} alt={member.name} />
                ) : (
                  <div className="placeholderAvatar"><Users size={40} /></div>
                )}
              </div>
              <div className="memberInfo">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="ctaSection">
        <motion.div 
          className="ctaCard glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Ignite Your Career?</h2>
          <p>Join thousands of others who have found their path with our expert guidance.</p>
          <Link to="/signup" className="ctaButton">
            Get Started Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
