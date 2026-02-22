import React from 'react';
import './roadmap.css'; // Reusing the exact same CSS file!

const CommercialPilotRoadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "Educational Groundwork (10+2)",
      description: "You must complete your 10+2 (or equivalent) strictly with Mathematics and Physics. These subjects are mandatory for understanding aerodynamics, navigation, and aviation meteorology. Fluency in English is also a critical requirement.",
      skills: ["10+2 (PCM)", "Mathematics", "Physics", "English Proficiency"]
    },
    {
      id: 2,
      phase: "Phase 2: Medical Clearance",
      title: "DGCA/FAA Medical Examinations",
      description: "Before spending money on flight training, you must pass rigorous medical tests. You will first need a Class II Medical Certificate to begin flying, followed by a much stricter Class I Medical Certificate, which is mandatory for a Commercial Pilot License.",
      skills: ["Class II Medical", "Class I Medical", "Vision Test", "Physical Fitness"]
    },
    {
      id: 3,
      phase: "Phase 3: Ground School & Initial Flying",
      title: "SPL & Private Pilot License (PPL)",
      description: "Enroll in an approved flying club or aviation academy. You will clear theoretical papers (Air Navigation, Meteorology, Air Regulations) to get your Student Pilot License (SPL), and then log your first 40-50 hours of flight time to earn your PPL.",
      skills: ["Aviation Ground School", "Student Pilot License", "Private Pilot License", "40-50 Flight Hours"]
    },
    {
      id: 4,
      phase: "Phase 4: Building Hours",
      title: "Commercial Pilot License (CPL)",
      description: "This is the most intensive phase. You must log around 200 hours of total flight time. This includes cross-country flying, solo flights, and obtaining your Instrument Rating (IR) so you can fly in low-visibility weather conditions.",
      skills: ["200 Flight Hours", "Instrument Rating (IR)", "Cross-Country Flying", "Multi-Engine Rating"]
    },
    {
      id: 5,
      phase: "Phase 5: Airline Ready",
      title: "Type Rating & Airline Placement",
      description: "A CPL allows you to fly commercially, but to fly massive passenger jets for an airline (like IndiGo or Air India), you need a 'Type Rating' for a specific aircraft (e.g., Airbus A320 or Boeing 737). After this, you apply for First Officer roles.",
      skills: ["Type Rating (A320/B737)", "Airline Assessments", "Simulator Training", "First Officer Role"]
    }
  ];

  return (
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: Commercial Pilot</h1>
        <p className="roadmapSubtitle">Your step-by-step guide from clearing your first medical exam to commanding a commercial airliner.</p>
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

export default CommercialPilotRoadmap;