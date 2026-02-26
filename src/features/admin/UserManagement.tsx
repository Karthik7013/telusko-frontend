import React, { useState, useEffect } from 'react';
import {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useDeleteUserMutation,
} from '../admin/adminApi';
import { User } from '../../types/user';

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        isInstructor: false,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { data: usersData, isLoading: usersLoading, refetch } = useGetUsersQuery();
    const { data: userByIdData } = useGetUserByIdQuery(selectedUser?.id || 0);
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
    const [updatePassword, { isLoading: passwordLoading }] = useUpdatePasswordMutation();
    const [deleteUser] = useDeleteUserMutation();

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);

    useEffect(() => {
        if (userByIdData) {
            setFormData({
                email: userByIdData.email,
                fullName: userByIdData.fullName,
                isInstructor: userByIdData.isInstructor,
            });
        }
    }, [userByIdData]);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setSelectedUser(null);
        setFormData({
            email: '',
            fullName: '',
            isInstructor: false,
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (selectedUser) {
                await updateUser({
                    id: selectedUser.id,
                    data: formData,
                });
                setSuccess('User updated successfully!');
            }
            refetch();
        } catch (err: any) {
            setError(err?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (selectedUser) {
                await updatePassword({
                    userId: selectedUser.id,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                });
                setSuccess('Password updated successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                });
            }
        } catch (err: any) {
            setError(err?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setLoading(true);
            setError(null);
            try {
                // Call the delete user API (assuming it exists)
                await deleteUser(userId);
                setSuccess('User deleted successfully!');
                refetch();
                if (selectedUser?.id === userId) {
                    setSelectedUser(null);
                    setIsEditing(false);
                }
            } catch (err: any) {
                setError(err?.data?.message || 'Failed to delete user');
            } finally {
                setLoading(false);
            }
        }
    };

    if (usersLoading) {
        return <div>Loading users...</div>;
    }

    return (
        <div className="user-management">
            <h2>User Management</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="user-management-grid">
                <div className="user-list">
                    <div className="user-list-header">
                        <h3>Users ({users.length})</h3>
                        <button onClick={handleCreateNew} className="btn-primary">
                            Create New User
                        </button>
                    </div>
                    <ul className="user-items">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                                onClick={() => handleSelectUser(user)}
                            >
                                <div className="user-info">
                                    <h4>{user.fullName}</h4>
                                    <p>{user.email}</p>
                                    <div className="user-details">
                                        <span className="user-role">
                                            {user.isInstructor ? 'Instructor' : 'Student'}
                                        </span>
                                        <span className="user-created">
                                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(user.id);
                                    }}
                                    disabled={loading}
                                    className="btn-danger"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="user-form">
                    <h3>{isEditing ? (selectedUser ? 'Edit User' : 'Create User') : 'Select a User'}</h3>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.isInstructor}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isInstructor: e.target.checked })
                                        }
                                    />
                                    Instructor Account
                                </label>
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    disabled={loading || updateLoading}
                                    className="btn-primary"
                                >
                                    {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setSelectedUser(null);
                                    }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p>Select a user from the list to edit, or create a new one.</p>
                    )}

                    {selectedUser && (
                        <div className="password-section">
                            <h4>Change Password</h4>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || passwordLoading}
                                    className="btn-primary"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;