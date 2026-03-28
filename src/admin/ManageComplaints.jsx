import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageFeedback.css";
import SkeletonLoader from "../component/SkeletonLoader";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/contact/complaints`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            setComplaints(response.data.data || []);
        } catch (error) {
            console.error("Error fetching complaints:", error);
            showErrorAlert("Failed to load complaints.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await showConfirmDialog(
            "Delete Complaint",
            "Are you sure you want to delete this complaint?",
            "Yes, delete"
        );
        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/contact/complaints/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            showSuccessAlert("Complaint deleted.");
            fetchComplaints();
        } catch (error) {
            showErrorAlert("Failed to delete complaint.");
        }
    };

    return (
        <div className="manage-feedback-wrapper">
            <div className="manage-feedback-container">
                <header className="form-header">
                    <h2 style={{color:"var(--text-color)"}}>User Complaints</h2>
                    <p>Address user issues and improve the overall service quality.</p>
                </header>

                {isLoading ? (
                    <SkeletonLoader type="table" />
                ) : complaints.length === 0 ? (
                    <div className="empty-state">No complaints yet! (That's good news!)</div>
                ) : (
                    <table className="feedback-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Issue</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((c) => (
                                <tr key={c._id}>
                                    <td><strong>{c.name}</strong></td>
                                    <td>
                                        <div>{c.email}</div>
                                    </td>
                                    <td className={expandedId === c._id ? "message-expanded" : "message-cell"}>
                                        {c.message}
                                    </td>
                                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn-view" onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}>
                                            {expandedId === c._id ? "Hide" : "View"}
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageComplaints;
