import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../features/auth/authApi';
import SettingsForm from '../features/auth/SettingsForm';
import type { User } from '../types/user';

const Settings = () => {
    const { data, isLoading } = useGetUserQuery();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : user ? (
                <SettingsForm user={user} />
            ) : (
                <div>No user data available</div>
            )}
        </div>
    );
};

export default Settings;