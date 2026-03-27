import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './roadmapCollection.css';
import SkeletonLoader from './SkeletonLoader';

const RoadmapCollection = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. The Job Title State
  const [jobTitle, setJobTitle] = useState('');

  // 2. The Dynamic Steps Array State
  // We initialize it with one empty step so the admin has something to type into immediately
  const [steps, setSteps] = useState([
    { title: '', duration: '', description: '', courses: [{ name: '', link: '' }] }
  ]);



  // Handle changes for the dynamic step inputs
  const handleStepChange = (index, event) => {
    const { name, value } = event.target;
    // Create a copy of the current steps array
    const updatedSteps = [...steps];
    // Update the specific field of the specific step
    updatedSteps[index][name] = value;
    // Save the array back to state
    setSteps(updatedSteps);
  };

  // Add a brand new empty step to the array
  const handleAddStep = () => {
    setSteps([...steps, { title: '', duration: '', description: '', courses: [{ name: '', link: '' }] }]);
  };

  // Remove a specific step (in case the admin makes a mistake)
  const handleRemoveStep = (indexToRemove) => {
    const updatedSteps = steps.filter((_, index) => index !== indexToRemove);
    setSteps(updatedSteps);
  };

  // --- Handlers for Nested Courses ---
  const handleCourseChange = (stepIndex, courseIndex, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].courses[courseIndex][field] = value;
    setSteps(updatedSteps);
  };

  const handleAddCourse = (stepIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].courses.push({ name: '', link: '' });
    setSteps(updatedSteps);
  };

  const handleRemoveCourse = (stepIndex, courseIndexToRemove) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].courses = updatedSteps[stepIndex].courses.filter(
      (_, index) => index !== courseIndexToRemove
    );
    setSteps(updatedSteps);
  };

  // 3. Format and Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: 'Saving roadmap to database...' });

    // Format the payload to match your exact Mongoose Schema
    const formattedPayload = {
      jobTitle: jobTitle.trim(),
      // Map over the steps to add the required "id" and filter courses
      steps: steps.map((step, index) => ({
        id: index + 1, // Automatically generates 1, 2, 3... based on its order
        title: step.title,
        duration: step.duration,
        description: step.description,
        courses: step.courses.filter(c => c.name.trim() !== '')
      }))
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps`, formattedPayload);
      setMessage({ type: 'success', text: `Roadmap for ${jobTitle} successfully added!` });
      
      // Reset the form completely
      setJobTitle('');
      setSteps([{ title: '', duration: '', description: '', courses: [{ name: '', link: '' }] }]);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add roadmap.' });
    }
  };

  if (loading) return <div className="admin-loading"><SkeletonLoader type="form" /></div>;
  if (!isAdmin) return null;

  return (
    <AnimatedPage>
      <div className="admin-wrapper">
        <div className="admin-container">
          
          <div className="admin-header">
            <span className="admin-badge">Roadmap Builder</span>
            <h1>Create Career Roadmap</h1>
            <p>Design a step-by-step educational journey for a specific dream job.</p>
          </div>

          {message.text && (
            <div className={`admin-status ${message.type === 'success' ? 'status-green' : 'status-blue'}`}>
              {message.text}
            </div>
          )}

          <form className="admin-form" onSubmit={handleSubmit}>
            
            {/* The Main Job Title */}
            <div className="form-section">
              <div className="input-group">
                <label>Target Dream Job (e.g., Software Engineer)</label>
                <input 
                  type="text" 
                  value={jobTitle} 
                  onChange={(e) => setJobTitle(e.target.value)} 
                  placeholder="Enter the main career title" 
                  required 
                  className="job-title-input"
                />
              </div>
            </div>

            {/* The Dynamic Steps */}
            <div className="steps-container">
              <h3>Roadmap Steps</h3>
              
              {steps.map((step, index) => (
                <div key={index} className="step-card-admin">
                  <div className="step-header">
                    <h4>Step {index + 1}</h4>
                    {/* Only show the Remove button if there is more than 1 step */}
                    {steps.length > 1 && (
                      <button type="button" onClick={() => handleRemoveStep(index)} className="btn-remove-step">
                        Remove Step
                      </button>
                    )}
                  </div>

                  <div className="grid-2-col">
                    <div className="input-group">
                      <label>Step Title (e.g., Foundation & Academics)</label>
                      <input type="text" name="title" value={step.title} onChange={(e) => handleStepChange(index, e)} required />
                    </div>
                    <div className="input-group">
                      <label>Duration (e.g., 3-4 Years)</label>
                      <input type="text" name="duration" value={step.duration} onChange={(e) => handleStepChange(index, e)} required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Description (What should the student focus on?)</label>
                    <textarea name="description" value={step.description} onChange={(e) => handleStepChange(index, e)} rows="3" required></textarea>
                  </div>

                  <div className="input-group">
                    <label>Recommended Courses for this Step</label>
                    {step.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="course-input-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => handleCourseChange(index, courseIndex, 'name', e.target.value)}
                          placeholder="Course Name"
                          required
                          style={{ flex: 1 }}
                        />
                        <input
                          type="url"
                          value={course.link}
                          onChange={(e) => handleCourseChange(index, courseIndex, 'link', e.target.value)}
                          placeholder="URL"
                          required
                          style={{ flex: 1 }}
                        />
                        {step.courses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCourse(index, courseIndex)}
                            className="btn-remove-course"
                            style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', width: '30px', cursor: 'pointer' }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddCourse(index)}
                      className="btn-add-course"
                      style={{ marginTop: '5px', padding: '5px 10px', borderRadius: '4px', border: '1px dashed #ccc', cursor: 'pointer' }}
                    >
                      + Add Another Course
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* The Dynamic "Add Step" Button */}
            <button type="button" onClick={handleAddStep} className="btn-add-step">
              + Add Another Step
            </button>

            {/* The Final Submit Button */}
            <button type="submit" className="admin-submit-btn">
              Publish Entire Roadmap
            </button>

          </form>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RoadmapCollection;