import React from 'react';
import './roadmap.css'; // Reusing the exact same CSS file!
import AnimatedPage from '../component/animation';

const InvestmentBankerRoadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "Educational Groundwork",
      description: "Start with a strong academic background in high school. While the Commerce stream with Mathematics is ideal, Science (PCM) students also frequently pivot into high finance. Focus heavily on mathematics, economics, and accounting principles.",
      skills: ["10+2 (Commerce/PCM)", "Mathematics", "Macro/Micro Economics", "Accounting Basics"]
    },
    {
      id: 2,
      phase: "Phase 2: Undergraduate Degree",
      title: "Target Top-Tier Colleges",
      description: "Pursue a degree in Finance, Economics, Business, or even Engineering. In investment banking, the reputation of your undergraduate college heavily influences your ability to secure initial interviews and campus placements.",
      skills: ["B.Com (Hons)", "B.A. Economics", "BBA / BMS", "B.Tech (from top institutes)"]
    },
    {
      id: 3,
      phase: "Phase 3: Deep Dive & Certifications",
      title: "Advanced Financial Knowledge",
      description: "Develop hard technical skills. Learn how to value companies and analyze financial statements. Many successful bankers also pursue professional certifications like the CFA, or aim for a top-tier MBA in Finance to break into the industry at the Associate level.",
      skills: ["Financial Modeling", "Valuation (DCF, LBO)", "CFA (Level 1/2)", "MBA in Finance"]
    },
    {
      id: 4,
      phase: "Phase 4: Practical Application",
      title: "Internships & Networking",
      description: "Real-world experience is mandatory. Apply for highly competitive 'Summer Analyst' internship programs at boutique or bulge-bracket banks. Master Excel shortcuts, learn to create PowerPoint pitchbooks, and actively network with alumni.",
      skills: ["Summer Analyst Internship", "Advanced Excel", "PowerPoint Pitchbooks", "Cold Emailing"]
    },
    {
      id: 5,
      phase: "Phase 5: The Job Hunt",
      title: "The Grueling Interview Process",
      description: "Prepare for intense interviews. You will be tested heavily on accounting rules, corporate finance theory, valuation multiples, and behavioral questions. Your goal is to secure a full-time, entry-level 'Analyst' role.",
      skills: ["Technical Interviews", "Accounting Standards", "M&A Knowledge", "Behavioral Prep"]
    }
  ];

  return (
    <AnimatedPage>
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: Investment Banker</h1>
        <p className="roadmapSubtitle">Your step-by-step guide to breaking into high finance, from your first economics class to landing an Analyst role at a top firm.</p>
      </div>

      <div className="timelineContainer">
        {roadmapSteps.map((step) => (
          <div className="timelineStep" key={step.id}>
            
            {/* The Timeline Line and Dot */}
            <div className="timelineIndicator">
              <div className="timelineDot">{step.id}</div>
              {step.id !== roadmapSteps.length && <div className="timelineLine"></div>}
            </div>

            {/* The Content Card */}
            <div className="timelineCard">
              <span className="stepPhase">{step.phase}</span>
              <h3 className="stepTitle">{step.title}</h3>
              <p className="stepDesc">{step.description}</p>
              
              <div className="stepSkills">
                {step.skills.map((skill, index) => (
                  <span className="skillTag" key={index}>{skill}</span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
    </AnimatedPage>
  );
};

export default InvestmentBankerRoadmap;