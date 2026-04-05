import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageRoadmap.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SkeletonLoader from '../component/SkeletonLoader';
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const ManageRoadmaps = () => {
    const navigate = useNavigate();
    const [roadmaps, setRoadmaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [userRole, setUserRole] = useState("user");

    // Fetch all roadmaps when the page loads
    useEffect(() => {
        fetchUserInfo();
        fetchRoadmaps();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            setUserRole(response.data.data.role);
        } catch (error) {
            console.error("Error fetching user role", error);
        }
    };

    const fetchRoadmaps = async () => {
        setIsLoading(true);
        try {
            // Adjust this URL if your backend route for getting all roadmaps is different
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/roadmaps`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            setRoadmaps(response.data.data || []);
        } catch (error) {
            console.error("Error fetching roadmaps:", error);
            setMessage({ text: "Failed to load roadmaps from the database.", type: "error" });

            // Fallback mock data so you can see the UI while you build the backend!

        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (roadmapId, jobTitle) => {
        const result = await showConfirmDialog(
            "Delete Roadmap",
            `WARNING: Are you sure you want to permanently delete the roadmap for "${jobTitle}"?`,
            "Yes, delete roadmap!"
        );
        if (!result.isConfirmed) return;

        try {
            // Adjust URL to match your backend delete route
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/roadmaps/${roadmapId}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            setMessage({ text: "", type: "" });
            await showSuccessAlert("Roadmap successfully deleted.");
            fetchRoadmaps(); // Refresh the list so the deleted roadmap disappears
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Failed to delete roadmap.");
        }
    };

    return (
        <div className="manage-roadmaps-wrapper">
            <div className="manage-roadmaps-container">

                <header className="form-header">
                    <h2>Manage Career Roadmaps</h2>
                    <p>View all published step-by-step career journeys or remove outdated ones from the database.</p>
                </header>

                {message.text && (
                    <div className={`status-banner ${message.type === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message.text}
                    </div>
                )}

                <div className="table-wrapper">
                    {isLoading ? (
                        <div className="loading-state"><SkeletonLoader type="table" /></div>
                    ) : (
                        <table className="roadmaps-table">
                            <thead>
                                <tr>
                                    <th>Roadmap Title</th>
                                    <th>Total Steps</th>
                                    <th>Published On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roadmaps.map((roadmap) => (
                                    <tr key={roadmap._id}>
                                        <td>
                                            <div className="roadmap-name-cell">
                                                <div className="roadmap-icon">🗺️</div>
                                                <span className="font-semibold text-dark">
                                                    {roadmap.jobTitle}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="steps-badge">
                                                {roadmap.steps?.length || 0} Steps
                                            </span>
                                        </td>
                                        <td>{new Date(roadmap.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-cells">
                                                {userRole === 'admin' && (
                                                    <button
                                                        className="btn-action btn-delete"
                                                        onClick={() => handleDelete(roadmap._id, roadmap.jobTitle)}
                                                    >Delete</button>
                                                )}
                                                <button
                                                    className="btn-action btn-update"
                                                    onClick={() => navigate(`/admin/update-roadmap/${roadmap._id}`)}
                                                >Update</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {!isLoading && roadmaps.length === 0 && (
                        <div className="empty-state">No roadmaps found in the database.</div>
                    )}
                </div>
                <div className="table-summary" >

                    <div className="table-footer">
                        <p>Total Roadmaps: {roadmaps.length}</p>
                    </div>

                    <div className="add-user-btn">
                        <Link to="/admin/add-roadmap">  <button className="btn-action btn-add" style={{ float: 'right', border: "1px solid #169f56ff", borderRadius: "5px", padding: "5px 10px", backgroundColor: "#e8f9ecff", color: "#000000ff" }}>Add Roadmap</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageRoadmaps;