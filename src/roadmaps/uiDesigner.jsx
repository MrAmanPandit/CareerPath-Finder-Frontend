import React from 'react';
import './roadmap.css'; // Reusing the exact same CSS file!

const UiUxRoadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "Design Basics & Psychology",
      description: "You don't need a specific degree, though a background in graphic design, psychology, or computer science helps. Start by mastering fundamental design principles like visual hierarchy, color theory, typography, and understanding how humans interact with digital interfaces.",
      skills: ["Color Theory", "Typography", "Visual Hierarchy", "Human-Computer Interaction"]
    },
    {
      id: 2,
      phase: "Phase 2: Tools of the Trade",
      title: "Figma & Wireframing",
      description: "Learn the industry-standard design tools, primarily Figma. Practice translating your ideas into low-fidelity wireframes (basic sketches of layouts) and then upgrading them into high-fidelity, pixel-perfect UI mockups.",
      skills: ["Figma / Adobe XD", "Wireframing", "UI Mockups", "Auto Layout & Components"]
    },
    {
      id: 3,
      phase: "Phase 3: The 'UX' in UI/UX",
      title: "Research & User Journeys",
      description: "UI is how it looks; UX is how it works. Learn to conduct user research, create user personas, and map out user flows. You must understand the 'why' behind your designs by testing them and solving actual user pain points.",
      skills: ["User Research", "Creating Personas", "User Flow Maps", "Usability Testing"]
    },
    {
      id: 4,
      phase: "Phase 4: Practical Application",
      title: "Prototyping & Portfolio Building",
      description: "Connect your screens to build interactive prototypes that feel like real apps. Then, document your entire process (not just the final pretty images) into in-depth Case Studies. A strong portfolio of 3-4 solid case studies is your ticket to a job.",
      skills: ["Interactive Prototyping", "Micro-interactions", "Writing Case Studies", "Behance / Dribbble"]
    },
    {
      id: 5,
      phase: "Phase 5: The Job Hunt",
      title: "Freelancing or Agency Roles",
      description: "Start applying for Junior Product Designer or UI/UX Designer roles. Be prepared for portfolio reviews where you will have to present your case studies and defend your design decisions to senior designers and product managers.",
      skills: ["Portfolio Presentation", "Design Critique", "Freelance Gigs", "Agency Applications"]
    }
  ];

  return (
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: UI/UX Designer</h1>
        <p className="roadmapSubtitle">Your step-by-step guide to mastering digital design, understanding users, and building a world-class portfolio.</p>
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
  );
};

export default UiUxRoadmap;