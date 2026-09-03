import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppUser {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    roles: string[];
}

interface AuthState {
    accessToken: string | null;
    user: AppUser | null;
    session: any;
    isLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    session: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ accessToken: string }>
        ) => {
            state.accessToken = action.payload.accessToken;
        },
        setUser: (state, action: PayloadAction<AppUser | null>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setSession: (state, action: PayloadAction<any>) => {
            state.session = action.payload;
            const token = action.payload?.access_token ?? action.payload?.accessToken ?? null;
            if (token) {
                state.accessToken = token;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.user = null;
            state.session = null;
            state.isLoading = false;
        },
    },
});

export const { setCredentials, setUser, setSession, setLoading, logOut } = authSlice.actions;

export default authSlice.reducer;