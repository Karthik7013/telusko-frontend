import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartItemCard from '@/checkout/components/CartItemCard'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { removeFromCart } from '@/features/cart/cartSlice'

const Cart = () => {
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
          <span className="text-2xl font-bold ml-2">${subtotal}</span>
        </div>
        <Button size="lg" className="font-bold px-8" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
