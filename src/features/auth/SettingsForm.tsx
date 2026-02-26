import React, { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '../admin/adminApi';
import { useGetUserQuery } from './authApi';
import type { User } from '../../types/user';

interface SettingsFormProps {
    user: User;
}

const SettingsForm = ({ user }: SettingsFormProps) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        isInstructor: user?.isInstructor || false,
    });
    const { data: userData } = useGetUserQuery();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        if (userData) {
            setFormData({
                fullName: userData.fullName,
                email: userData.email,
                isInstructor: userData.isInstructor,
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await updateUser({
                id: user.id,
                data: formData,
            });
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setErrors({
                general: 'Failed to update settings. Please try again.',
            });
            setLoading(false);
        }
    };

    return (
        <div className="settings-form">
            <h2>Account Settings</h2>
            {success && (
                <div className="success-message">Settings updated successfully!</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && (
                        <div className="error">{errors.fullName}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && (
                        <div className="error">{errors.email}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isInstructor"
                            checked={formData.isInstructor}
                            onChange={handleChange}
                        />
                        Instructor Account
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsForm;
