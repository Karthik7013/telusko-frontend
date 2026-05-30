import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import OrderSummaryCard from '@/checkout/components/OrderSummaryCard'
import CouponInput from '@/checkout/components/CouponInput'
import PriceBreakdown from '@/checkout/components/PriceBreakdown'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { clearCart } from '@/features/cart/cartSlice'
import { useCreateOrderMutation } from '@/features/orders/ordersApi'
import { useGetCourseBySlugQuery } from '@/features/courses/coursesApi'
import type { Coupon } from '@/features/coupons/couponsApi'
import { ApiError } from '@/components/common/ApiError';
import { Skeleton } from '@/components/ui/skeleton';

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const courseSlug = searchParams.get('course')
  const cartItems = useAppSelector(state => state.cart.items)

  const [createOrder, { isLoading: isPlacing }] = useCreateOrderMutation()
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  // If "Buy now" from course detail, fetch that single course
  const { data: directCourse, isLoading: isCourseLoading, error: courseError, refetch } = useGetCourseBySlugQuery(courseSlug || '', { skip: !courseSlug })

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

      if (result.success && result.data) {
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

  if (courseSlug && isCourseLoading) return <CheckoutSkeleton />;
  if (courseSlug && courseError) return <ApiError error="Failed to load course details" onRetry={refetch} />;

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

function CheckoutSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default Checkout
