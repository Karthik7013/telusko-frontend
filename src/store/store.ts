import { configureStore } from '@reduxjs/toolkit'
import authApi from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { adminApi } from '@/features/admin/adminApi';
import { coursesApi } from '@/features/courses/coursesApi';
import { transactionsApi } from '@/features/transactions/transactionsApi';
import { wishlistApi } from '@/features/wishlist/wishlistApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(coursesApi.middleware)
            .concat(transactionsApi.middleware)
            .concat(wishlistApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;