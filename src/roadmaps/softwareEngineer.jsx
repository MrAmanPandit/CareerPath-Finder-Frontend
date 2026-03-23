import React from 'react';
import './roadmap.css';
import AnimatedPage from '../component/animation';
import useSEO from '../utils/useSEO';

const SoftwareEngineer = () => {
  useSEO({
    title: 'Software Engineer Career Roadmap | How to Become a Software Engineer',
    description: 'Follow the complete step-by-step roadmap to become a Software Engineer — from 10+2 PCM to coding skills, specialization, projects, and landing your first tech job.',
    keywords: 'software engineer roadmap, how to become software engineer, software engineer career path, MERN stack, full stack developer India',
    canonical: '/career/roadmap/software-engineer'
  });
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "Educational Groundwork",
      description: "Start with a strong academic base. This typically involves completing 10+2 with Math and Science (PCM), or pursuing a Diploma in Computer Science and Engineering to build early technical context before moving on to a degree.",
      skills: ["10+2 (PCM)", "Diploma in CSE", "B.Tech / BCA / B.Sc CS"]
    },
    {
      id: 2,
      phase: "Phase 2: The Basics",
      title: "Core Programming & CS Fundamentals",
      description: "Learn the building blocks of software. Pick a primary object-oriented programming language and master Data Structures and Algorithms (DSA) to develop a strong logical and problem-solving mindset.",
      skills: ["C++ / Java / Python", "Data Structures", "Algorithms", "Git & GitHub"]
    },
    {
      id: 3,
      phase: "Phase 3: Deep Dive",
      title: "Choose a Specialization",
      description: "Select a specific domain to master. For example, dive into Full Stack Web Development to build complete applications, or explore other high-demand fields like Mobile App Development, AI/ML, or Cloud Computing.",
      skills: ["MERN Stack", "React.js", "Node.js", "Database Management"]
    },
    {
      id: 4,
      phase: "Phase 4: Practical Application",
      title: "Hands-On Experience & Projects",
      description: "Theory isn't enough. Participate in summer training programs, collaborate with others, and build real-world projects—like a career path finder or an e-commerce site—to showcase your actual coding abilities.",
      skills: ["Summer Training", "Internships", "Portfolio Projects", "APIs"]
    },
    {
      id: 5,
      phase: "Phase 5: The Job Hunt",
      title: "Interview Preparation & Applications",
      description: "Structure a clean, professional resume highlighting your tech stack and projects. Practice competitive coding, learn basic system design, and start applying for entry-level Software Developer or Full Stack roles.",
      skills: ["Resume Building", "LeetCode / HackerRank", "System Design", "Mock Interviews"]
    }
  ];

  return (
    <AnimatedPage>
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: Software Engineer</h1>
        <p className="roadmapSubtitle">Your step-by-step guide from writing your first line of code to landing a top-tier tech job.</p>
      </div>

      <div className="timelineContainer">
        {roadmapSteps.map((step) => (
          <div className="timelineStep" key={step.id}>
            
            {/* The Timeline Line and Dot */}
            <div className="timelineIndicator">
              <div className="timelineDot">{step.id}</div>
              {/* Only show the connecting line if it's not the last step */}
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

export default SoftwareEngineer;