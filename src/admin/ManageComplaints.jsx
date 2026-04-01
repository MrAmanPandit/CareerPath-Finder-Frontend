import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUsers.css";
import "./ManageFeedback.css";
import SkeletonLoader from "../component/SkeletonLoader";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const authHeaders = () => ({
    withCredentials: true,
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
});

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => { fetchComplaints(); }, []);

    const fetchComplaints = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/contact/complaints`,
                authHeaders()
            );
            setComplaints(response.data.data || []);
        } catch (error) {
            console.error("Error fetching complaints:", error);
            showErrorAlert("Failed to load complaints.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleView = async (id) => {
        const isExpanding = expandedId !== id;
        setExpandedId(isExpanding ? id : null);
        if (isExpanding) {
            const c = complaints.find(c => c._id === id);
            if (c && !c.isRead) {
                try {
                    await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/contact/complaints/${id}/read`, {}, authHeaders());
                    setComplaints(prev => prev.map(c => c._id === id ? { ...c, isRead: true } : c));
                } catch { /* non-critical */ }
            }
        }
    };

    const handleDone = async (id) => {
        const result = await showConfirmDialog(
            "Mark as Resolved?",
            "This will send the user a personal thank-you notification the next time they open the site.",
            "Yes, mark resolved!"
        );
        if (!result.isConfirmed) return;
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/contact/complaints/${id}/done`, {}, authHeaders());
            await showSuccessAlert("Complaint resolved! The user will be thanked on their next visit.");
            setComplaints(prev => prev.map(c => c._id === id ? { ...c, isDone: true, isRead: true } : c));
        } catch {
            showErrorAlert("Failed to mark complaint as done.");
        }
    };

    const handleDelete = async (id) => {
        const result = await showConfirmDialog("Delete Complaint", "Are you sure you want to delete this complaint?", "Yes, delete");
        if (!result.isConfirmed) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/contact/complaints/${id}`, authHeaders());
            showSuccessAlert("Complaint deleted.");
            fetchComplaints();
        } catch {
            showErrorAlert("Failed to delete complaint.");
        }
    };

    const unreadCount = complaints.filter(c => !c.isRead).length;
    const resolvedCount = complaints.filter(c => c.isDone).length;

    return (
        <div className="manage-users-wrapper">
            <div className="manage-users-container" style={{ borderTopColor: "#ef4444" }}>

                <header className="form-header">
                    <div className="feedback-header-row">
                        <h2 style={{ color: "var(--text-color)" }}>🚩 User Complaints</h2>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {unreadCount > 0 && (
                                <span className="feedback-unread-badge complaints-unread">{unreadCount} unread</span>
                            )}
                            {resolvedCount > 0 && (
                                <span className="feedback-unread-badge" style={{ background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff" }}>
                                    {resolvedCount} resolved
                                </span>
                            )}
                        </div>
                    </div>
                    <p>Address user issues seriously. Mark them done once you've fixed or followed up on them.</p>
                </header>

                <div className="table-wrapper">
                    {isLoading ? (
                        <div className="loading-state"><SkeletonLoader type="table" /></div>
                    ) : complaints.length === 0 ? (
                        <div className="empty-state">No complaints yet — that's a great sign! 🎉</div>
                    ) : (
                        <table className="users-table" style={{ minWidth: "820px" }}>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Email</th>
                                    <th>Issue</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map((c) => (
                                    <tr key={c._id} className={!c.isRead ? "row-unread" : ""}>
                                        <td>
                                            <div className="user-name">
                                                <div className="avatar-circle" style={{
                                                    background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                                                    color: "#b91c1c"
                                                }}>
                                                    {c.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>
                                                    {c.name}
                                                    {!c.isRead && <span className="inline-unread-dot" title="Unread" style={{ marginLeft: "6px" }} />}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{c.email}</td>
                                        <td
                                            className={expandedId === c._id ? "message-expanded" : "message-cell"}
                                            style={{ maxWidth: "260px", whiteSpace: expandedId === c._id ? "normal" : "nowrap" }}
                                        >
                                            {c.message}
                                        </td>
                                        <td style={{ whiteSpace: "nowrap" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {c.isDone ? (
                                                <span className="role-badge" style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", color: "#065f46", border: "1px solid #6ee7b7" }}>
                                                    ✅ Resolved
                                                </span>
                                            ) : (
                                                <span className="role-badge" style={{ background: "linear-gradient(135deg, #fef2f2, #fee2e2)", color: "#b91c1c", border: "1px solid #fca5a5" }}>
                                                    Open
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="action-cells">
                                                <button className="btn-action btn-promote" onClick={() => handleToggleView(c._id)}>
                                                    {expandedId === c._id ? "Hide" : "View"}
                                                </button>
                                                {!c.isDone && (
                                                    <button
                                                        className="btn-action btn-done"
                                                        onClick={() => handleDone(c._id)}
                                                    >
                                                        Done
                                                    </button>
                                                )}
                                                <button className="btn-action btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="table-summary">
                    <div className="table-footer">
                        <p>Total Complaints: <span>{complaints.length}</span></p>
                    </div>
                    <div className="table-footer">
                        <p>Resolved: <span>{resolvedCount}</span></p>
                    </div>
                    <div className="table-footer">
                        <p>Open: <span>{complaints.length - resolvedCount}</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageComplaints;
