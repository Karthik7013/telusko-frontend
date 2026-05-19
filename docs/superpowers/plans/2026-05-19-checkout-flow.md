# Checkout Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete checkout flow — cart, checkout page with coupon, order success/failure pages.

**Architecture:** Client-side cart in Redux (localStorage-persisted). Checkout page calls backend APIs for coupon validation and order creation. Cart icon in navbar with item count badge.

**Tech Stack:** React 19, Redux Toolkit, RTK Query, Tailwind v4, react-router-dom v7, sonner (toasts), lucide-react (icons)

---

### Task 1: Cart Redux Slice

**Files:**
- Create: `src/features/cart/cartSlice.ts`
- Modify: `src/store/store.ts` (add cart reducer)

- [ ] **Step 1: Create the cart slice**

```typescript
// src/features/cart/cartSlice.ts
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

interface CartState {
  items: CartItem[]
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem('telusko-cart')
    if (raw) return JSON.parse(raw)
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
      state.items = state.items.filter(i => i.courseId !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
```

- [ ] **Step 2: Create typed Redux hooks file**

```typescript
// src/hooks/use-redux.ts
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

- [ ] **Step 3: Add cart reducer to store**

Edit `src/store/store.ts`. Add import and add to reducers:

```typescript
import cartReducer from '@/features/cart/cartSlice';
// ...
reducer: {
    // ...existing
    cart: cartReducer,
},
```

Also add a localStorage subscriber. Modify the store file:

```typescript
// After store creation, subscribe to persist cart
let currentCart: any
store.subscribe(() => {
  const prev = currentCart
  currentCart = store.getState().cart
  if (prev !== currentCart) {
    localStorage.setItem('telusko-cart', JSON.stringify(currentCart))
  }
})
```

Full modified file:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import authApi from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { adminApi } from '@/features/admin/adminApi';
import { coursesApi } from '@/features/courses/coursesApi';
import cartReducer from '@/features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(coursesApi.middleware)
})

let currentCart: any
store.subscribe(() => {
  const prev = currentCart
  currentCart = store.getState().cart
  if (prev !== currentCart) {
    localStorage.setItem('telusko-cart', JSON.stringify(currentCart))
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
```

---

### Task 2: Orders, Coupons, and Enrollments API Slices

**Files:**
- Create: `src/features/orders/ordersApi.ts`
- Create: `src/features/coupons/couponsApi.ts`
- Create: `src/features/enrollments/enrollmentsApi.ts`

- [ ] **Step 1: Create ordersApi**

```typescript
// src/features/orders/ordersApi.ts
import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

export interface CreateOrderRequest {
  userId: string
  subtotalAmount: number
  taxAmount?: number
  discountAmount?: number
  totalAmount: number
  currency?: string
  notes?: string
}

export interface OrderItem {
  id: string
  orderId: string
  courseId: string
  title: string
  slug: string | null
  unitPrice: number
  quantity: number
  totalAmount: number
  status: 'active' | 'cancelled' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  subtotalAmount: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
  currency: string
  paymentMethod: string | null
  paymentTransactionId: string | null
  paymentCompletedAt: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  orderItems?: OrderItem[]
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
    getOrderByNumber: builder.query<ApiResponse<Order>, string>({
      query: (orderNumber) => `/orders/number/${orderNumber}`,
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderByNumberQuery } = ordersApi
```

- [ ] **Step 2: Create couponsApi**

```typescript
// src/features/coupons/couponsApi.ts
import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

export interface Coupon {
  id: string
  code: string
  name: string | null
  description: string | null
  discountPercent: number
  discountAmount: number | null
  usageLimit: number
  usageCount: number
  validFrom: string | null
  validUntil: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const couponsApi = createApi({
  reducerPath: 'couponsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    validateCoupon: builder.query<ApiResponse<Coupon>, string>({
      query: (code) => `/coupons/code/${code}`,
    }),
  }),
})

export const { useLazyValidateCouponQuery } = couponsApi
```

- [ ] **Step 3: Create enrollmentsApi**

```typescript
// src/features/enrollments/enrollmentsApi.ts
import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

export interface CreateEnrollmentRequest {
  userId: string
  courseId: string
  couponId?: string
  paidAmount?: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  couponId: string | null
  paidAmount: number | null
  status: string
  enrolledAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

export const enrollmentsApi = createApi({
  reducerPath: 'enrollmentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createEnrollment: builder.mutation<ApiResponse<Enrollment>, CreateEnrollmentRequest>({
      query: (body) => ({
        url: '/enrollments',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateEnrollmentMutation } = enrollmentsApi
```

- [ ] **Step 4: Wire all new APIs to store**

Edit `src/store/store.ts`:

```typescript
import { ordersApi } from '@/features/orders/ordersApi';
import { couponsApi } from '@/features/coupons/couponsApi';
import { enrollmentsApi } from '@/features/enrollments/enrollmentsApi';

// In reducer:
[ordersApi.reducerPath]: ordersApi.reducer,
[couponsApi.reducerPath]: couponsApi.reducer,
[enrollmentsApi.reducerPath]: enrollmentsApi.reducer,

// In middleware:
.concat(ordersApi.middleware)
.concat(couponsApi.middleware)
.concat(enrollmentsApi.middleware)
```

---

### Task 3: Cart Icon Component for Navbar

**Files:**
- Create: `src/components/common/CartIcon.tsx`
- Modify: `src/components/features/NavbarPresenter.tsx`

- [ ] **Step 1: Create CartIcon component**

```typescript
// src/components/common/CartIcon.tsx
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useAppSelector } from '@/hooks/use-redux'
import { Button } from '@/components/ui/button'

const CartIcon = () => {
  const count = useAppSelector(state => state.cart.items.length)

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link to="/cart">
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full size-5 flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </Link>
    </Button>
  )
}

export default CartIcon
```

- [ ] **Step 2: Add CartIcon to NavbarPresenter**

In `NavbarPresenter.tsx`:
- Add `ShoppingCart` to lucide-react imports (cart icon already, just add)
- Add import: `import CartIcon from '@/components/common/CartIcon'`
- Add the CartIcon in the right section (line 100), before the auth buttons:

```tsx
{/* --- RIGHT SECTION: AUTH & MOBILE ICONS --- */}
<div className="flex items-center gap-2">
    <CartIcon />    {/* ADD THIS */}
    {!isLogin && <div className="lg:hidden flex-1">
    ...
```

---

### Task 4: Wire Course Detail Page Buttons

**Files:**
- Modify: `src/course/pages/CourseDetail.tsx`

- [ ] **Step 1: Add imports and dispatch to CourseDetailPage**

Add imports:
```typescript
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { addToCart } from '@/features/cart/cartSlice'
import { useAppDispatch } from '@/hooks/use-redux'
```

Add inside the component function:
```typescript
const navigate = useNavigate()
const dispatch = useAppDispatch()
```

- [ ] **Step 2: Wire "Add to cart" button (line 184)**

Replace:
```tsx
<Button className="w-full h-12 text-base font-bold">Add to cart</Button>
```
With:
```tsx
<Button
  className="w-full h-12 text-base font-bold"
  onClick={() => {
    dispatch(addToCart({
      courseId: course.data.id,
      slug: course.data.slug,
      title: course.data.title,
      thumbnailUrl: course.data.thumbnailUrl,
      instructorName: course.data.instructor.fullName,
      basePrice: course.data.basePrice,
      discountPercentage: course.data.discountPercentage,
      discountedPrice: course.data.discountedPrice,
    }))
    toast.success('Added to cart')
  }}
>
  Add to cart
</Button>
```

- [ ] **Step 3: Wire "Buy now" button (line 185)**

Replace:
```tsx
<Button variant="outline" className="w-full h-12 text-base font-bold">Buy now</Button>
```
With:
```tsx
<Button
  variant="outline"
  className="w-full h-12 text-base font-bold"
  onClick={() => navigate(`/checkout?course=${course.data.slug}`)}
>
  Buy now
</Button>
```

- [ ] **Step 4: Wire mobile "Buy now" button (line 78)**

Replace:
```tsx
<Button className="flex-1 font-bold">Buy now</Button>
```
With:
```tsx
<Button
  className="flex-1 font-bold"
  onClick={() => navigate(`/checkout?course=${course.data.slug}`)}
>
  Buy now
</Button>
```

---

### Task 5: Cart Page

**Files:**
- Create: `src/checkout/pages/Cart.tsx`
- Create: `src/checkout/components/CartItemCard.tsx`

- [ ] **Step 1: Create CartItemCard component**

```typescript
// src/checkout/components/CartItemCard.tsx
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/features/cart/cartSlice'

interface CartItemCardProps {
  item: CartItem
  onRemove: (courseId: string) => void
}

const CartItemCard = ({ item, onRemove }: CartItemCardProps) => {
  const displayPrice = item.discountedPrice ?? item.basePrice

  return (
    <div className="flex gap-4 p-4 border rounded-xl bg-card">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="size-24 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.instructorName}</p>
        <div className="mt-1">
          <span className="font-bold text-primary">${displayPrice}</span>
          {item.discountedPrice && (
            <span className="text-sm text-muted-foreground line-through ml-2">${item.basePrice}</span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item.courseId)}
      >
        <X className="size-5" />
      </Button>
    </div>
  )
}

export default CartItemCard
```

- [ ] **Step 2: Create Cart page**

```typescript
// src/checkout/pages/Cart.tsx
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartItemCard from '@/checkout/components/CartItemCard'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { removeFromCart } from '@/features/cart/cartSlice'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.cart.items)
  const subtotal = items.reduce((sum, item) => sum + (item.discountedPrice ?? item.basePrice), 0)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingCart className="size-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any courses yet.</p>
        <Button asChild>
          <Link to="/search">Browse courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4 mr-2" /> Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h1>

      <div className="space-y-4">
        {items.map(item => (
          <CartItemCard
            key={item.courseId}
            item={item}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between p-4 border rounded-xl bg-muted/30">
        <div>
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="text-2xl font-bold ml-2">${subtotal.toFixed(2)}</span>
        </div>
        <Button size="lg" className="font-bold px-8" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default CartPage
```

---

### Task 6: Checkout Components

**Files:**
- Create: `src/checkout/components/OrderSummaryCard.tsx`
- Create: `src/checkout/components/CouponInput.tsx`
- Create: `src/checkout/components/PriceBreakdown.tsx`

- [ ] **Step 1: Create OrderSummaryCard**

```typescript
// src/checkout/components/OrderSummaryCard.tsx
import type { CartItem } from '@/features/cart/cartSlice'

interface OrderSummaryCardProps {
  item: CartItem
}

const OrderSummaryCard = ({ item }: OrderSummaryCardProps) => {
  const displayPrice = item.discountedPrice ?? item.basePrice

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="size-16 rounded object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.title}</h4>
        <p className="font-bold text-primary text-sm mt-1">${displayPrice}</p>
      </div>
    </div>
  )
}

export default OrderSummaryCard
```

- [ ] **Step 2: Create CouponInput**

```typescript
// src/checkout/components/CouponInput.tsx
import { useState } from 'react'
import { CheckCircle, XCircle, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLazyValidateCouponQuery } from '@/features/coupons/couponsApi'
import type { Coupon } from '@/features/coupons/couponsApi'

interface CouponInputProps {
  subtotal: number
  onCouponApplied: (coupon: Coupon) => void
  onCouponRemoved: () => void
}

const CouponInput = ({ subtotal, onCouponApplied, onCouponRemoved }: CouponInputProps) => {
  const [code, setCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [error, setError] = useState('')
  const [validate, { isLoading }] = useLazyValidateCouponQuery()

  const handleApply = async () => {
    if (!code.trim()) return
    setError('')
    try {
      const result = await validate(code.trim())
      if (result.data?.success && result.data.data) {
        setAppliedCoupon(result.data.data)
        onCouponApplied(result.data.data)
      } else {
        setError('Invalid or expired coupon code')
      }
    } catch {
      setError('Failed to validate coupon. Try again.')
    }
  }

  const handleRemove = () => {
    setAppliedCoupon(null)
    setCode('')
    onCouponRemoved()
  }

  if (appliedCoupon) {
    const discountAmount = subtotal * (appliedCoupon.discountPercent / 100)
    return (
      <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-5 text-green-600" />
            <div>
              <p className="font-medium text-sm text-green-700 dark:text-green-400">{appliedCoupon.code}</p>
              <p className="text-xs text-green-600/70 dark:text-green-500/70">
                {appliedCoupon.discountPercent}% off — Save ${discountAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">Coupon Code</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="pl-9"
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          />
        </div>
        <Button variant="outline" onClick={handleApply} disabled={isLoading || !code.trim()}>
          {isLoading ? 'Validating...' : 'Apply'}
        </Button>
      </div>
      {error && (
        <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
          <XCircle className="size-4" /> {error}
        </p>
      )}
    </div>
  )
}

export default CouponInput
```

- [ ] **Step 3: Create PriceBreakdown**

```typescript
// src/checkout/components/PriceBreakdown.tsx
interface PriceBreakdownProps {
  subtotal: number
  discountAmount: number
  total: number
}

const PriceBreakdown = ({ subtotal, discountAmount, total }: PriceBreakdownProps) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      <div className="border-t pt-2 flex justify-between font-bold text-base">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default PriceBreakdown
```

---

### Task 7: Checkout Page

**Files:**
- Create: `src/checkout/pages/Checkout.tsx`

- [ ] **Step 1: Create Checkout page**

```typescript
// src/checkout/pages/Checkout.tsx
import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import OrderSummaryCard from '@/checkout/components/OrderSummaryCard'
import CouponInput from '@/checkout/components/CouponInput'
import PriceBreakdown from '@/checkout/components/PriceBreakdown'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { clearCart } from '@/features/cart/cartSlice'
import { useCreateOrderMutation } from '@/features/orders/ordersApi'
import { useGetCourseBySlugQuery } from '@/features/courses/coursesApi'
import type { Coupon } from '@/features/coupons/couponsApi'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const courseSlug = searchParams.get('course')
  const cartItems = useAppSelector(state => state.cart.items)

  const [createOrder, { isLoading: isPlacing }] = useCreateOrderMutation()
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  // If "Buy now" from course detail, fetch that single course
  const { data: directCourse } = useGetCourseBySlugQuery(courseSlug || '', { skip: !courseSlug })

  const items = useMemo(() => {
    if (courseSlug && directCourse?.data) {
      const c = directCourse.data
      return [{
        courseId: c.id,
        slug: c.slug,
        title: c.title,
        thumbnailUrl: c.thumbnailUrl,
        instructorName: c.instructor.fullName,
        basePrice: c.basePrice,
        discountPercentage: c.discountPercentage,
        discountedPrice: c.discountedPrice,
      }]
    }
    return cartItems
  }, [courseSlug, directCourse, cartItems])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.discountedPrice ?? item.basePrice), 0),
    [items]
  )

  const discountAmount = appliedCoupon
    ? subtotal * (appliedCoupon.discountPercent / 100)
    : 0

  const total = Math.max(0, subtotal - discountAmount)

  const handlePlaceOrder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id
      if (!userId) {
        toast.error('Please log in to place an order')
        navigate('/auth/login')
        return
      }

      const result = await createOrder({
        userId,
        subtotalAmount: subtotal,
        discountAmount,
        totalAmount: total,
      }).unwrap()

      if (result.success) {
        dispatch(clearCart())
        navigate(`/order/success?orderNumber=${result.data.orderNumber}`)
      } else {
        navigate('/order/failure')
      }
    } catch {
      navigate('/order/failure')
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Nothing to checkout</h1>
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Button asChild><a href="/search">Browse courses</a></Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4 mr-2" /> Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left: Order Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {courseSlug && (
            <p className="text-sm text-muted-foreground mb-4">
              You're purchasing 1 course
            </p>
          )}
          <div className="space-y-3">
            {items.map(item => (
              <OrderSummaryCard key={item.courseId} item={item} />
            ))}
          </div>
        </div>

        {/* Right: Coupon + Price + Place Order */}
        <div>
          <div className="sticky top-24 space-y-6 p-6 border rounded-xl bg-card">
            <CouponInput
              subtotal={subtotal}
              onCouponApplied={setAppliedCoupon}
              onCouponRemoved={() => setAppliedCoupon(null)}
            />

            <div className="border-t pt-4">
              <PriceBreakdown
                subtotal={subtotal}
                discountAmount={discountAmount}
                total={total}
              />
            </div>

            <Button
              className="w-full h-12 text-base font-bold"
              onClick={handlePlaceOrder}
              disabled={isPlacing}
            >
              {isPlacing ? (
                <><Loader2 className="size-5 animate-spin mr-2" /> Placing order...</>
              ) : (
                <><Lock className="size-5 mr-2" /> Place Order</>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your payment is processed securely. Your card details are handled by the payment provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
```

---

### Task 8: Order Success & Failure Pages

**Files:**
- Create: `src/checkout/pages/OrderSuccess.tsx`
- Create: `src/checkout/pages/OrderFailure.tsx`

- [ ] **Step 1: Create OrderSuccess page**

```typescript
// src/checkout/pages/OrderSuccess.tsx
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-lg">
      <CheckCircle className="size-20 mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-2">
        Your order has been placed successfully.
      </p>
      {orderNumber && (
        <p className="text-sm font-mono bg-muted inline-block px-3 py-1 rounded mb-6">
          Order #{orderNumber}
        </p>
      )}
      <div className="flex gap-3 justify-center mt-8">
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard/my-learnings">Go to My Learnings</Link>
        </Button>
      </div>
    </div>
  )
}

export default OrderSuccessPage
```

- [ ] **Step 2: Create OrderFailure page**

```typescript
// src/checkout/pages/OrderFailure.tsx
import { Link, useNavigate } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OrderFailurePage = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-lg">
      <XCircle className="size-20 mx-auto text-destructive mb-6" />
      <h1 className="text-3xl font-bold mb-2">Order Failed</h1>
      <p className="text-muted-foreground mb-8">
        Something went wrong while processing your order. Please try again.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={() => navigate('/cart')}>
          Back to Cart
        </Button>
        <Button onClick={() => navigate('/checkout')}>
          Try Again
        </Button>
      </div>
    </div>
  )
}

export default OrderFailurePage
```

---

### Task 9: Router Integration

**Files:**
- Modify: `src/router/app-router.tsx`

- [ ] **Step 1: Add lazy imports and routes**

Add imports:
```typescript
const CartPage = lazy(() => import('@/checkout/pages/Cart'))
const CheckoutPage = lazy(() => import('@/checkout/pages/Checkout'))
const OrderSuccessPage = lazy(() => import('@/checkout/pages/OrderSuccess'))
const OrderFailurePage = lazy(() => import('@/checkout/pages/OrderFailure'))
```

Add routes inside the **Public Routes** section (before the `*` catch-all):

```tsx
<Route path="cart" element={<CartPage />} />
<Route path="checkout" element={<CheckoutPage />} />
<Route path="order/success" element={<OrderSuccessPage />} />
<Route path="order/failure" element={<OrderFailurePage />} />
```

These should be placed inside the `MainLayout` route (public routes, since cart and checkout are accessible navigationally but require auth at the API level).

---

### Task 10: Build Verification

- [ ] **Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Dev server startup**

Run: `npm run dev`
Expected: Dev server starts without errors
