import { useState, useEffect } from 'react';
import axios from 'axios';
// THIS IS THE CRUCIAL LINK TO YOUR CSS FILE:
import './editDetail.css'; 

const EditDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    grade: '',
    stream: '',
    dream: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/users/current-user', {
          withCredentials: true 
        });
        
        const userData = response.data.data;
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          mobileNumber: userData.mobileNumber || '',
          grade: userData.grade || '',
          stream: userData.stream || '',
          dream: userData.dream || ''
        });
        setLoading(false);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); 

    try {
      await axios.patch('/api/v1/users/update-account', formData, {
        withCredentials: true
      });
      setMessage({ type: 'success', text: 'Profile details updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update details.' });
    }
  };

  if (loading) {
    return <div className="edit-page-container">Loading your details...</div>;
  }

  return (
    <div className="edit-page-container">
      <div className="edit-card">
        
        <div className="edit-header">
          <h2>Personal Details</h2>
          <p>Update your profile information and career goals.</p>
        </div>

        {message.text && (
          <div className={`status-message ${message.type === 'success' ? 'status-success' : 'status-error'}`}>
            {message.text}
          </div>
        )}

        <form className="updateForm" onSubmit={handleSubmit}>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder='Enter your updated Firstname....'  />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder='Enter your updated Lastname....'  />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input type="tel" name="mobileNumber" id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder='Enter your updated Mobile Number....'  />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Current Grade / Year</label>
              <input type="text" name="grade" id="grade" value={formData.grade} onChange={handleChange} placeholder='Enter your updated Grade....'  />
            </div>

            <div className="form-group">
              <label htmlFor="stream">Academic Stream</label>
              <input type="text" name="stream" id="stream" value={formData.stream} onChange={handleChange} placeholder='Enter your updated Firstname....'  />
            </div>

            <div className="form-group full-width">
              <label htmlFor="dream">Career Dream</label>
              <input type="text" name="dream" id="dream" value={formData.dream} onChange={handleChange} placeholder='Enter your updated updated Dream Job....' />
            </div>
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
          
        </form>
      </div>
    </div>
  );
};

export default EditDetails;