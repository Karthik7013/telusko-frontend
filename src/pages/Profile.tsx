import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../features/auth/authApi';
import ProfileForm from '../features/auth/ProfileForm';

const Profile = () => {
    const { data, isLoading } = useGetUserQuery();
    const [user, setUser] = useState(data);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : user ? (
                <ProfileForm user={user} />
            ) : (
                <div>No user data available</div>
            )}
        </div>
    );
};

export default Profile;