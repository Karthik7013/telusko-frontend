import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OrderSuccess = () => {
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

export default OrderSuccess
