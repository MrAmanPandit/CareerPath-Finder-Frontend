import React from 'react';
import './roadmap.css'; // Reusing the exact same CSS file!
import AnimatedPage from '../component/animation';

const DataScientistRoadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      phase: "Phase 1: Foundation",
      title: "Mathematics & Statistics",
      description: "Data Science is heavily rooted in math. Before writing complex code, you must understand the math behind the algorithms. Focus heavily on Linear Algebra, Calculus, Probability, and descriptive/inferential Statistics.",
      skills: ["Linear Algebra", "Calculus", "Probability", "Statistics"]
    },
    {
      id: 2,
      phase: "Phase 2: Programming & Data Wrangling",
      title: "Python, SQL & Data Manipulation",
      description: "Learn a primary data programming language (Python is the industry standard). Master SQL to extract data from databases, and learn libraries like Pandas and NumPy to clean, manipulate, and prepare messy data for analysis.",
      skills: ["Python / R", "SQL", "Pandas & NumPy", "Data Cleaning"]
    },
    {
      id: 3,
      phase: "Phase 3: Core Machine Learning",
      title: "Predictive Modeling",
      description: "Dive into Machine Learning. Understand how to train algorithms to make predictions. Learn supervised learning (regression, classification), unsupervised learning (clustering), and how to evaluate if your model is actually accurate.",
      skills: ["Supervised Learning", "Unsupervised Learning", "Scikit-Learn", "Model Evaluation"]
    },
    {
      id: 4,
      phase: "Phase 4: Practical Application",
      title: "Projects & Storytelling",
      description: "A Data Scientist must be able to explain their findings. Build end-to-end projects, compete in Kaggle competitions, and practice Data Visualization (using Matplotlib, Seaborn, or Tableau) to tell compelling stories with your data.",
      skills: ["Data Visualization", "Kaggle Competitions", "GitHub Portfolio", "Business Storytelling"]
    },
    {
      id: 5,
      phase: "Phase 5: The Job Hunt",
      title: "Interviews & Specialization",
      description: "Prepare for technical interviews that will test your coding, SQL, and statistical knowledge. Many start as a Data Analyst before transitioning to a Data Scientist role. Later, you can specialize in Advanced AI, Deep Learning, or NLP.",
      skills: ["Technical Interviews", "A/B Testing", "Business Acumen", "Junior Data Scientist"]
    }
  ];

  return (
    <AnimatedPage>
    <div className="roadmapWrapper">
      
      <div className="roadmapHeader">
        <h1 className="roadmapTitle">Roadmap: Data Scientist</h1>
        <p className="roadmapSubtitle">Your step-by-step guide to mastering data, building predictive models, and uncovering hidden business insights.</p>
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

export default DataScientistRoadmap;