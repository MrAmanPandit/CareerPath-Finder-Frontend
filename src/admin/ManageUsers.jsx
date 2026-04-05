import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUsers.css";
import { Link, useNavigate } from "react-router-dom";
import SkeletonLoader from "../component/SkeletonLoader";
import Swal from "sweetalert2";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Fetch all users when the page loads
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            // Adjust this URL to match your backend route for getting all users
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            // Assuming your backend sends the array of users inside response.data.data
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage({ text: "Failed to load users from the database.", type: "error" });

            // Fallback mock data so you can see the UI while building the backend!
            setUsers([
                { _id: "1", firstName: "Aman", lastName: "Pandey", email: "aman@example.com", role: "admin", createdAt: "2026-01-15T10:00:00Z" },
                { _id: "2", firstName: "Rahul", lastName: "Sharma", email: "rahul@example.com", role: "user", createdAt: "2026-03-01T14:30:00Z" },
                { _id: "3", firstName: "Priya", lastName: "Patel", email: "priya@example.com", role: "user", createdAt: "2026-03-05T09:15:00Z" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromote = async (userId, currentRole) => {
        if (currentRole === 'admin') return;

        const { value: role } = await showConfirmDialog(
            "Change User Role",
            "Select the new role for this user:",
            "Update Role",
            true, // isPromotion
            ['mentor', 'admin', 'user'] // options
        );

        // Since showConfirmDialog might not support selection yet, 
        // I'll implement a custom SweetAlert call here for better UX
        const { value: selectedRole } = await Swal.fire({
            title: 'Update User Role',
            input: 'select',
            inputOptions: {
                'user': 'Regular User',
                'mentor': 'Content Mentor',
                'admin': 'System Admin'
            },
            inputPlaceholder: 'Select a role',
            showCancelButton: true,
            confirmButtonText: 'Update Role',
            confirmButtonColor: '#8b5cf6',
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve();
                    } else {
                        resolve('You need to select a role!');
                    }
                });
            }
        });

        if (!selectedRole) return;

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/admin/users/${userId}/promote`, 
                { role: selectedRole }, 
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            setMessage({ text: "", type: "" });
            await showSuccessAlert(`User successfully updated to ${selectedRole}!`);
            fetchUsers();
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Failed to update role.");
        }
    };

    const handleDelete = async (userId) => {
        const result = await showConfirmDialog(
            "Delete User",
            "Are you sure you want to permanently delete this user? This action cannot be undone.",
            "Yes, delete user!"
        );
        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/users/${userId}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            setMessage({ text: "", type: "" });
            await showSuccessAlert("User successfully deleted.");
            fetchUsers(); // Refresh the list
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Failed to delete user.");
        }
    };

    return (
        <div className="manage-users-wrapper">
            <div className="manage-users-container">

                <header className="form-header">
                    <h2 style={{ color: "var(--text-color)" }}>Manage Users</h2>
                    <p>View, promote, or remove registered users from the CareerPath platform.</p>
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
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Study / Branch</th>
                                    <th>Joined Date</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="user-name">
                                                <div className="avatar-circle">
                                                    {user.avatar ? (
                                                        <img src={user.avatar} alt={user.firstName} className="table-avatar" />
                                                    ) : (
                                                        user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"
                                                    )}
                                                </div>
                                                {user.firstName} {user.lastName}
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div style={{fontSize: '13px'}}>
                                                <span style={{color: 'var(--text-color)', fontWeight: '500'}}>{user.currentStudy || user.grade || "N/A"}</span>
                                                <br />
                                                <span style={{opacity: 0.6}}>{user.branch || user.stream || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`role-badge badge-${user.role || 'user'}`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-cells">
                                                {user.role !== 'admin' && (
                                                    <button
                                                        className="btn-action btn-promote"
                                                        onClick={() => handlePromote(user._id, user.role)}
                                                    >Promote</button>
                                                )}
                                                <button
                                                    className="btn-action btn-delete"
                                                    onClick={() => handleDelete(user._id)}
                                                >Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    
                    {!isLoading && users.length === 0 && (
                        <div className="empty-state">No users found in the database.</div>
                    )}
                </div>
                <div className="table-summary">
                    <div className="table-footer">
                        <p>Total Users: <span>{users.length}</span></p>
                    </div>
                    <div className="table-footer">
                        <p>Total Admins: <span>{users.filter(user => user.role === 'admin').length}</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageUsers;