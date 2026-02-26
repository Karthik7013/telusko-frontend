import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';
import { Role } from '../types/role';

interface UserState {
    profile: User | null;
    roles: Role[];
    permissions: string[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    roles: [],
    permissions: [],
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<User>) => {
            state.profile = action.payload;
        },
        setRoles: (state, action: PayloadAction<Role[]>) => {
            state.roles = action.payload;
        },
        setPermissions: (state, action: PayloadAction<string[]>) => {
            state.permissions = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.profile = null;
            state.roles = [];
            state.permissions = [];
            state.loading = false;
            state.error = null;
        }
    }
});

export default userSlice;
