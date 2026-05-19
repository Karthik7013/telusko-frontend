import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  courseId: string
  slug: string
  title: string
  thumbnailUrl: string
  instructorName: string
  basePrice: number
  discountPercentage?: number
  discountedPrice?: number
}

export interface CartState {
  items: CartItem[]
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem('telusko-cart')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.items)) return parsed
    }
  } catch {}
  return { items: [] }
}

const initialState: CartState = loadCart()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const exists = state.items.find(i => i.courseId === action.payload.courseId)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex(i => i.courseId === action.payload)
      if (idx !== -1) state.items.splice(idx, 1)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
