import React, { useState } from 'react';
import { useUpdateUserMutation } from '../admin/adminApi';
import type { User } from '../../types/user';

interface ProfileFormProps {
    user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        isInstructor: user?.isInstructor || false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [updateUser] = useUpdateUserMutation();

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
                general: 'Failed to update profile. Please try again.',
            });
            setLoading(false);
        }
    };

    return (
        <div className="profile-form">
            <h2>Edit Profile</h2>
            {success && (
                <div className="success-message">Profile updated successfully!</div>
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
                        Instructor
                    </label>
                </div>
                <button type="submit" disabled={loading}>Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileForm;