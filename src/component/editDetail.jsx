import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedPage from './animation';
import './editDetail.css'; 
import SkeletonLoader from './SkeletonLoader'; 
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';

const EditDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    currentStudy: '',
    branch: '',
    dream: ''
  });

   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    currentStudy: '',
    branch: '',
    dream: '',
  });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // 'withCredentials' is required if you are using cookies for JWT
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                    headers: {
                        // Include this if you are using the Authorization Header instead of Cookies
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });

                const fetchedUser = response.data.message;
                setUser(fetchedUser); // Assuming your API wraps response in a 'data' object
                
                // Prefill the form data so unchanged fields don't get saved as blank strings
                setUserData({
                    firstName: fetchedUser.firstName || '',
                    lastName: fetchedUser.lastName || '',
                    mobileNumber: fetchedUser.mobileNumber || '',
                    currentStudy: fetchedUser.currentStudy || '',
                    branch: fetchedUser.branch || '',
                    dream: fetchedUser.dream || '',
                });

            } catch (err) {
               setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleEditDetail = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    try {
      // 1. Send a POST request to your backend URL
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/edit-user`,{
           firstName: userData.firstName,
           lastName: userData.lastName,
           currentStudy: userData.currentStudy,
           branch: userData.branch,
           dream: userData.dream,
           mobileNumber: userData.mobileNumber
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
          withCredentials: true
        }               
      );

      // 2. Handle the successful response!
      console.log("Success!", response.data);
      await showSuccessAlert("Profile details updated successfully!");
     
      window.location.href = '/profile'; // Redirect to home page after successful signup
    } catch (error) {
      // 3. Catch any 400 or 409 errors sent by your backend
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Failed to update details :', errorMsg);
      showErrorAlert(`Failed to update details: ${errorMsg}`);
    }
  };


  if (loading) {
    return <div className="edit-page-container"><SkeletonLoader type="form" /></div>;
  }

  return (
    <AnimatedPage>
    <div className="edit-page-container">
      <div className="edit-card">
        
        <div className="edit-header">
          <h2>Personal Details</h2>
          <p>Update your profile information and career goals.</p>
        </div>

        <form className="updateForm" onSubmit={handleEditDetail}>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              value={userData.firstName} 
              onChange={handleInputChange} 
              placeholder= {`Your Current First Name: ${user.firstName}`} required />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
              type="text" 
              name="lastName" 
              id="lastName" 
              value={userData.lastName} 
              onChange={handleInputChange} 
              placeholder={`Your Current Last Name: ${user.lastName}`} required />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input 
              type="tel" 
              name="mobileNumber" 
              id="mobileNumber" 
              value={userData.mobileNumber} 
              onChange={handleInputChange} 
              placeholder={`Your Current Mobile Number: ${user.mobileNumber}`} required />
            </div>

            <div className="form-group">
              <label htmlFor="currentStudy">Current Study / Qualification</label>
              <input 
              type="text" 
              name="currentStudy" 
              id="currentStudy" 
              value={userData.currentStudy} 
              onChange={handleInputChange} 
              placeholder={`Your Current Study: ${user.currentStudy}`} required />
            </div>

            <div className="form-group">
              <label htmlFor="branch">Academic Branch</label>
              <input 
              type="text" 
              name="branch" 
              id="branch" 
              value={userData.branch} 
              onChange={handleInputChange} 
              placeholder={`Your Current Branch: ${user.branch}`} required/>
            </div>

            <div className="form-group full-width">
              <label htmlFor="dream">Career Dream</label>
              <input 
              type="text" 
              name="dream" 
              id="dream" 
              value={userData.dream} 
              onChange={handleInputChange} 
              placeholder= {`Your Current Dream: ${user.dream}`} required/>
            </div>
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
          
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
};

export default EditDetails;