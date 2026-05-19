import { configureStore } from '@reduxjs/toolkit'
import authApi from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { adminApi } from '@/features/admin/adminApi';
import { coursesApi } from '@/features/courses/coursesApi';
import { ordersApi } from '@/features/orders/ordersApi';
import { couponsApi } from '@/features/coupons/couponsApi';
import { enrollmentsApi } from '@/features/enrollments/enrollmentsApi';
import cartReducer, { type CartState } from '@/features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [couponsApi.reducerPath]: couponsApi.reducer,
        [enrollmentsApi.reducerPath]: enrollmentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(coursesApi.middleware)
            .concat(ordersApi.middleware)
            .concat(couponsApi.middleware)
            .concat(enrollmentsApi.middleware)
})

let currentCart: CartState | undefined
store.subscribe(() => {
  const prev = currentCart
  currentCart = store.getState().cart
  if (prev !== currentCart) {
    try {
      localStorage.setItem('telusko-cart', JSON.stringify(currentCart))
    } catch {}
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;