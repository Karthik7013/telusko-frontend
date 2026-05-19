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
