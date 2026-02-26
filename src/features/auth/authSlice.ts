import { createSlice } from '@reduxjs/toolkit'
import authApi, { type User } from '@/features/auth/authApi'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth-slice',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.user
            state.isAuthenticated = true
        })
        builder.addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
            state.isAuthenticated = true
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
