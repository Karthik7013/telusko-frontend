import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useAppSelector } from '@/hooks/useRedux'
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
