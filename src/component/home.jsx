import React from 'react'
import { Link } from 'react-router-dom'

const content = () => {
  return (
    <main>
        <section class="hero">
            <h1>Discover & Explore Your Career Path Based on Your Stream</h1>
            <p>Select your stream and explore personalized career options designed to match your skills, interests, and goals.</p>
            <Link to="/signup" className="btn-primary">Get Started</Link>
        </section>

        <section class="about">
            <h2 class="section-title">About Us</h2>
            <p>CareerPath Finder is your personalized guide to discovering the right career. Whether you're a student exploring options, a graduate unsure of your next step, or a professional considering a career switch, CareerPath Finder helps you identify opportunities that align with your skills, interests, and goals.</p>
        </section>

        <section class="features">
            <h2 class="section-title">Features</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="icon">🎯</div>
                    <h3>Personalized Career Assessments</h3>
                    <p>Discover careers that suit your strengths and passions.</p>
                </div>
                <div class="feature-card">
                    <div class="icon">📊</div>
                    <h3>Comprehensive Career Insights</h3>
                    <p>Get detailed information about job roles, required skills, and future growth.</p>
                </div>
                <div class="feature-card">
                    <div class="icon">🎓</div>
                    <h3>Education & Course Guidance</h3>
                    <p>Find the best courses, degrees, and certifications for your chosen path.</p>
                </div>
                <div class="feature-card">
                    <div class="icon">🗺️</div>
                    <h3>Roadmaps & Action Plans</h3>
                    <p>Step-by-step guidance to help you reach your dream career.</p>
                </div>
            </div>
        </section>

    </main>
  )
}

export default content
