import React from 'react';
import './roadmap.css'; // Reusing the exact same CSS file!
import AnimatedPage from '../component/animation';

const ClinicalPsychologistRoadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "High School (10+2)",
      description: "Start by choosing the Arts/Humanities or Science (Biology) stream. While you can technically come from any stream, having a background in Biology or taking Psychology as a core subject in high school provides a massive advantage for understanding human behavior and brain anatomy.",
      skills: ["10+2 (Arts or Biology)", "Basic Psychology", "Sociology", "Communication Skills"]
    },
    {
      id: 2,
      phase: "Phase 2: Undergraduate Degree",
      title: "Bachelor's in Psychology",
      description: "Pursue a B.A. or B.Sc. in Psychology. This 3-4 year degree covers the fundamentals of the human mind, cognitive processes, developmental psychology, and critical research methodologies.",
      skills: ["B.A. / B.Sc. Psychology", "Research Methods", "Developmental Psych", "Statistics"]
    },
    {
      id: 3,
      phase: "Phase 3: Postgraduate Specialization",
      title: "Master's in Clinical Psychology",
      description: "You must specialize by completing an M.A. or M.Sc. specifically in Clinical Psychology. This 2-year program dives deep into psychopathology, clinical assessment, and therapeutic techniques. You will also complete a research dissertation.",
      skills: ["M.A. / M.Sc. Clinical Psych", "Psychopathology", "Psychological Testing", "Dissertation"]
    },
    {
      id: 4,
      phase: "Phase 4: Licensing & Advanced Training",
      title: "M.Phil / Psy.D & Certification",
      description: "To legally practice as a 'Clinical Psychologist' in many regions (like getting an RCI license in India), you must complete a 2-year M.Phil in Clinical Psychology or a Psy.D (Doctor of Psychology). This phase involves heavy, supervised clinical training in psychiatric wards.",
      skills: ["M.Phil in Clinical Psych", "Psy.D", "RCI License (India)", "Supervised Practicum"]
    },
    {
      id: 5,
      phase: "Phase 5: Professional Practice",
      title: "Therapeutic Modalities & Career",
      description: "Master specific therapy frameworks like CBT or DBT. Once licensed, you can start working in hospitals, rehabilitation centers, NGOs, or open your own private therapy practice to assess, diagnose, and treat mental health disorders.",
      skills: ["CBT / DBT Frameworks", "Patient Assessment", "Counseling", "Private Practice Setup"]
    }
  ];

  return (
    <AnimatedPage>
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: Clinical Psychologist</h1>
        <p className="roadmapSubtitle">Your step-by-step guide to understanding the human mind, earning your clinical license, and helping others heal.</p>
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

export default ClinicalPsychologistRoadmap;