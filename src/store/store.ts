import { configureStore } from '@reduxjs/toolkit'
import authApi from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { coursesApi } from '@/features/courses/coursesApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(coursesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;