# Phase 4: E-commerce & Enrollment

## Overview
Implement the complete e-commerce system for course purchases, including shopping cart, checkout, order management, coupons, and wishlist functionality. This phase enables users to purchase courses and manage their learning investments.

## Goals
- Build shopping cart functionality
- Implement checkout and payment processing
- Add coupon and discount system
- Create order management
- Implement wishlist functionality
- Handle course enrollment after purchase

## API Endpoints to Implement

### 1. Orders Endpoints
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `GET /orders/user/:userId` - Get orders by user
- `GET /orders/number/:orderNumber` - Get order by order number
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status
- `DELETE /orders/:id` - Delete order

### 2. Coupons Endpoints
- `GET /coupons` - Get all coupons
- `GET /coupons/:id` - Get coupon by ID
- `GET /coupons/code/:code` - Get coupon by code
- `GET /coupons/validate/:code` - Validate coupon
- `POST /coupons` - Create coupon (admin)
- `PUT /coupons/:id` - Update coupon (admin)
- `DELETE /coupons/:id` - Delete coupon (admin)

### 3. Wishlists Endpoints
- `GET /wishlists` - Get all wishlists
- `GET /wishlists/:id` - Get wishlist by ID
- `GET /wishlists/user/:userId` - Get wishlists by user
- `GET /wishlists/course/:courseId` - Get wishlists by course
- `POST /wishlists` - Add to wishlist
- `DELETE /wishlists/:id` - Remove from wishlist
- `DELETE /wishlists/user/:userId/course/:courseId` - Remove specific

### 4. Enrollments Endpoints (already in Phase 3, but used here)
- `POST /enrollments` - Create enrollment (after purchase)
- `GET /enrollments/user/:userId` - Get user enrollments

## Components to Build/Enhance

### 1. Shopping Cart Components
- **ShoppingCart** (`src/features/ecommerce/ShoppingCart.tsx`)
  - Cart items display
  - Quantity adjustment
  - Remove items
  - Price summary
  - Coupon application
  - Checkout button
  - Empty cart state

- **CartIcon** (`src/components/common/CartIcon.tsx`)
  - Cart badge with item count
  - Dropdown with cart preview
  - Quick view of cart items
  - Go to cart button

- **CartSidebar** (`src/features/ecommerce/CartSidebar.tsx`)
  - Slide-in cart panel
  - Quick add/remove
  - Mini cart summary

### 2. Checkout Components
- **CheckoutPage** (`src/pages/Checkout.tsx`)
  - Multi-step checkout process
  - Billing information form
  - Payment method selection
  - Order review
  - Coupon application
  - Place order button

- **PaymentProcessor** (`src/features/ecommerce/PaymentProcessor.tsx`)
  - Payment method integration (Stripe/PayPal placeholder)
  - Card details form
  - Payment confirmation
  - Error handling

- **OrderReview** (`src/features/ecommerce/OrderReview.tsx`)
  - Order summary
  - Price breakdown
  - Applied coupons
  - Terms and conditions

### 3. Order Management Components
- **OrderHistory** (`src/pages/OrderHistory.tsx`)
  - List of user orders
  - Order status display
  - Order details view
  - Reorder functionality
  - Invoice download

- **OrderDetail** (`src/pages/OrderDetail.tsx`)
  - Complete order information
  - Purchased courses
  - Payment details
  - Receipt/invoice

- **OrderSummary** (`src/features/ecommerce/OrderSummary.tsx`)
  - Reusable order summary component
  - Used in checkout and order detail

### 4. Coupon Components
- **CouponInput** (`src/features/ecommerce/CouponInput.tsx`)
  - Coupon code input
  - Apply button
  - Validation feedback
  - Applied coupons display

- **CouponManager** (`src/features/ecommerce/CouponManager.tsx`) (Admin)
  - Create/edit/delete coupons
  - Coupon list with filters
  - Usage statistics
  - Activation/deactivation

### 5. Wishlist Components
- **WishlistPage** (`src/pages/Wishlist.tsx`)
  - List of wishlisted courses
  - Remove from wishlist
  - Add to cart
  - Empty wishlist state

- **WishlistButton** (`src/components/common/WishlistButton.tsx`)
  - Toggle wishlist status
  - Heart icon with fill state
  - Tooltip on hover

- **WishlistManager** (`src/features/ecommerce/WishlistManager.tsx`)
  - Manage wishlist items
  - Move to cart
  - Bulk remove

## State Management (Redux)

### Create cartSlice (`src/features/ecommerce/cartSlice.ts`)
```typescript
interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  total: number;
  discount: number;
  subtotal: number;
  isLoading: boolean;
  error: string | null;
}

interface CartItem {
  courseId: number;
  course: Course;
  quantity: number;
  price: number;
  addedAt: string;
}
```

### Create orderSlice (`src/features/ecommerce/orderSlice.ts`)
```typescript
interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  courseId: number;
  course: Course;
  quantity: number;
  price: number;
}
```

### Create couponSlice (`src/features/ecommerce/couponSlice.ts`)
```typescript
interface CouponState {
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  validationResult: {
    isValid: boolean;
    discount?: number;
    message?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  applicableCourseIds?: number[];
  minPurchaseAmount?: number;
}
```

### Create wishlistSlice (`src/features/ecommerce/wishlistSlice.ts`)
```typescript
interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

interface WishlistItem {
  id: number;
  userId: number;
  courseId: number;
  course?: Course;
  addedDate: string;
}
```

## Type Definitions

### Create/Update Types (`src/types/`)
- `order.ts` - Order interface and related types
- `coupon.ts` - Coupon interface and related types
- `wishlist.ts` - Wishlist interface and related types

Example types:
```typescript
// order.ts
export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  couponCode?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// coupon.ts
export interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  applicableCourseIds?: number[];
  minPurchaseAmount?: number;
  createdAt: string;
  updatedAt: string;
}

// wishlist.ts
export interface Wishlist {
  id: number;
  userId: number;
  courseId: number;
  course?: Course;
  addedDate: string;
}
```

## API Integration

### Create API Services
- `src/features/ecommerce/ordersApi.ts`
  ```typescript
  export const ordersApi = {
    getOrdersByUser: (userId: number) => ...
    getOrderById: (id: number) => ...
    getOrderByOrderNumber: (orderNumber: string) => ...
    createOrder: (data: OrderData) => ...
    updateOrderStatus: (id: number, status: OrderStatus) => ...
  };
  ```

- `src/features/ecommerce/couponsApi.ts`
  ```typescript
  export const couponsApi = {
    getAllCoupons: () => ...
    getCouponByCode: (code: string) => ...
    validateCoupon: (code: string, cartTotal: number) => ...
    createCoupon: (data: CouponData) => ...
    updateCoupon: (id: number, data: CouponData) => ...
  };
  ```

- `src/features/ecommerce/wishlistsApi.ts`
  ```typescript
  export const wishlistsApi = {
    getWishlistsByUser: (userId: number) => ...
    getWishlistByCourse: (userId: number, courseId: number) => ...
    addToWishlist: (userId: number, courseId: number) => ...
    removeFromWishlist: (userId: number, courseId: number) => ...
  };
  ```

## Pages to Create

1. **Shopping Cart Page** (`src/pages/Cart.tsx`)
   - Route: `/cart`
   - Cart items and checkout

2. **Checkout Page** (`src/pages/Checkout.tsx`)
   - Route: `/checkout`
   - Multi-step checkout

3. **Order History Page** (`src/pages/OrderHistory.tsx`)
   - Route: `/orders`
   - List of user orders

4. **Order Detail Page** (`src/pages/OrderDetail.tsx`)
   - Route: `/orders/:orderNumber`
   - Order details

5. **Wishlist Page** (`src/pages/Wishlist.tsx` - enhance existing if exists)
   - Route: `/wishlist`
   - Wishlisted courses

## Routing Updates

Add to `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  {
    path: '/cart',
    element: <ProtectedRoute><CartPage /></ProtectedRoute>,
  },
  {
    path: '/checkout',
    element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>,
  },
  {
    path: '/orders',
    element: <ProtectedRoute><OrderHistoryPage /></ProtectedRoute>,
  },
  {
    path: '/orders/:orderNumber',
    element: <ProtectedRoute><OrderDetailPage /></ProtectedRoute>,
  },
  {
    path: '/wishlist',
    element: <ProtectedRoute><WishlistPage /></ProtectedRoute>,
  },
  // ... existing routes
];
```

## Payment Integration

### Payment Providers
- **Stripe** (recommended)
- **PayPal**
- **Razorpay** (for India)
- **Mollie** (for Europe)

### Payment Flow
1. User clicks "Buy Now" or proceeds to checkout
2. Cart is validated
3. Order is created in backend with "pending" status
4. Payment is processed via payment provider
5. On success:
   - Order status updated to "completed"
   - Enrollment created for purchased courses
   - User redirected to order success page
6. On failure:
   - Order status updated to "failed"
   - User shown error and retry option

### Payment Security
- Use backend for payment processing
- Never store sensitive payment data on frontend
- Implement proper error handling
- Add payment retry logic
- Handle webhook notifications (backend)

## Coupon System

### Coupon Types
- **Percentage discount** (e.g., 20% off)
- **Fixed amount discount** (e.g., $10 off)

### Coupon Validation
- Check if coupon is active
- Check validity dates
- Check usage limits
- Check minimum purchase amount
- Check applicable courses
- Calculate discount

### Coupon Application
- Apply before payment
- Show discount in order summary
- Validate in real-time
- Allow removal of applied coupon

## Wishlist Features

### Wishlist Actions
- Add course to wishlist
- Remove from wishlist
- Move to cart
- Share wishlist (future)
- Email wishlist (future)

### Wishlist Display
- Show all wishlisted courses
- Course cards with quick actions
- Empty state with suggestions
- Count in navigation

## Testing Checklist

- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Remove from cart works
- [ ] Cart persists on page refresh (localStorage)
- [ ] Coupon validation works
- [ ] Discount calculation is correct
- [ ] Checkout flow completes successfully
- [ ] Payment integration works (test mode)
- [ ] Order is created after payment
- [ ] Enrollment created after successful order
- [ ] Order history displays correctly
- [ ] Order detail shows all information
- [ ] Wishlist add/remove works
- [ ] Move to cart from wishlist works
- [ ] Cart badge updates correctly
- [ ] Responsive design on all devices
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Deliverables

### Files to Create
```
src/pages/
├── Cart.tsx
├── Checkout.tsx
├── OrderHistory.tsx
├── OrderDetail.tsx
└── Wishlist.tsx (enhance)

src/features/ecommerce/
├── ShoppingCart.tsx
├── CartSidebar.tsx
├── CheckoutPage.tsx
├── PaymentProcessor.tsx
├── OrderReview.tsx
├── OrderHistory.tsx
├── OrderDetail.tsx
├── WishlistManager.tsx
├── CouponInput.tsx
├── CouponManager.tsx (admin)
├── cartSlice.ts
├── orderSlice.ts
├── couponSlice.ts
├── wishlistSlice.ts
├── ordersApi.ts
├── couponsApi.ts
├── wishlistsApi.ts
└── paymentApi.ts

src/components/common/
├── CartIcon.tsx
├── WishlistButton.tsx
└── OrderSummary.tsx

src/types/
├── order.ts
├── coupon.ts
└── wishlist.ts
```

### Files to Modify
- `src/router/app-router.tsx` - Add new routes
- `src/App.tsx` - Ensure proper routing
- `src/components/layout/NavbarContainer.tsx` - Add cart icon

## Success Criteria

1. Users can add courses to cart
2. Shopping cart works smoothly
3. Coupon system applies discounts correctly
4. Checkout process is seamless
5. Payment integration works (test mode)
6. Orders are created successfully
7. Enrollments are created after purchase
8. Order history displays correctly
9. Wishlist functionality works
10. All e-commerce flows are secure and user-friendly

## Notes

- Implement proper cart persistence (localStorage)
- Use secure payment processing (backend handles sensitive data)
- Add proper error handling for payment failures
- Implement order confirmation emails (backend)
- Add invoice generation (backend)
- Consider implementing guest checkout
- Add address management for billing (if needed)
- Implement proper tax calculation (backend)
- Add currency conversion if needed
- Plan for refunds and cancellations

## Next Phase Preparation

Once e-commerce is complete, Phase 5 will add advanced features like reviews, ratings, and analytics to enhance the learning experience.