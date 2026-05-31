import { configureStore } from '@reduxjs/toolkit'
import authApi from '@/features/auth/authApi';
import { coursesApi } from '@/features/courses/coursesApi';
import { ordersApi } from '@/features/orders/ordersApi';
import { couponsApi } from '@/features/coupons/couponsApi';
import { enrollmentsApi } from '@/features/enrollments/enrollmentsApi';
import { preferencesApi } from '@/features/preferences/preferencesApi';
import cartReducer, { type CartState } from '@/features/cart/cartSlice';
import authReducer from '@/features/auth/authSlice';
import { identityApi } from '@/features/identity/identityApi';
import { transactionsApi } from '@/features/transactions/transactionsApi';
import { wishlistApi } from '@/features/wishlist/wishlistApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [identityApi.reducerPath]: identityApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
    [enrollmentsApi.reducerPath]: enrollmentsApi.reducer,
    [preferencesApi.reducerPath]: preferencesApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(coursesApi.middleware)
      .concat(ordersApi.middleware)
      .concat(couponsApi.middleware)
      .concat(enrollmentsApi.middleware)
      .concat(preferencesApi.middleware)
      .concat(identityApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(wishlistApi.middleware),
  devTools: true,
})

let currentCart: CartState | undefined
store.subscribe(() => {
  const prev = currentCart
  currentCart = store.getState().cart
  if (prev !== currentCart) {
    try {
      localStorage.setItem('telusko-cart', JSON.stringify(currentCart))
    } catch { }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;