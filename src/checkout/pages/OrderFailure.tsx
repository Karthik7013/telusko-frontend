import { useNavigate } from 'react-router-dom'
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
