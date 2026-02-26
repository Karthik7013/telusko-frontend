import React, { useState, useEffect } from 'react';
import { useUpdatePasswordMutation } from '../admin/adminApi';
import { useGetUserQuery } from './authApi';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
        general?: string;
    }>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const [updatePassword] = useUpdatePasswordMutation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            general: '',
        });

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match',
            });
            setLoading(false);
            return;
        }

        try {
            if (user) {
                await updatePassword({
                    userId: user.id,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                });
                setSuccess(true);
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setLoading(false);
                navigate('/profile');
            }
        } catch (error: any) {
            setErrors({
                ...errors,
                general: error?.data?.message || 'Failed to update password. Please try again.',
            });
            setLoading(false);
        }
    };

    return (
        <div className="password-change">
            <h2>Change Password</h2>
            {success && (
                <div className="success-message">Password changed successfully!</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.currentPassword && (
                        <div className="error">{errors.currentPassword}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.newPassword && (
                        <div className="error">{errors.newPassword}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && (
                        <div className="error">{errors.confirmPassword}</div>
                    )}
                </div>
                <button type="submit" disabled={loading}>Update Password</button>
            </form>
        </div>
    );
};

export default PasswordChange