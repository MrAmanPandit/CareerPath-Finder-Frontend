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

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

        const fetchedUser = response.data.data;
        setUser(fetchedUser); // Correctly extract user from 'data' property

        // Prefill the form data so unchanged fields don't get saved as blank strings
        setUserData({
          firstName: fetchedUser.firstName || '',
          lastName: fetchedUser.lastName || '',
          mobileNumber: fetchedUser.mobileNumber || '',
          currentStudy: fetchedUser.currentStudy || '',
          branch: fetchedUser.branch || '',
          dream: fetchedUser.dream || '',
        });
        setPreviewUrl(fetchedUser.avatar || null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(user?.avatar || null);
    }
  };

  const handleEditDetail = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    try {
      // 1. Send data using FormData for optional image upload
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("currentStudy", userData.currentStudy);
      formData.append("branch", userData.branch);
      formData.append("dream", userData.dream);
      formData.append("mobileNumber", userData.mobileNumber);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/edit-user`, formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data"
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

          <div className="profile-preview-container">
            <div className="profile-preview-circle">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-image" />
              ) : (
                <div className="preview-placeholder">👤</div>
              )}
            </div>
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
                  placeholder={`Your Current First Name: ${user.firstName}`} required />
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
                  placeholder={`Your Current Branch: ${user.branch}`} required />
              </div>

              <div className="form-group full-width">
                <label htmlFor="dream">Career Dream</label>
                <input
                  type="text"
                  name="dream"
                  id="dream"
                  value={userData.dream}
                  onChange={handleInputChange}
                  placeholder={`Your Current Dream: ${user.dream}`} required />
              </div>

              <div className="form-group full-width">
                <label htmlFor="avatar">Update Profile Picture (Optional)</label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="inputField fileInput"
                />
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