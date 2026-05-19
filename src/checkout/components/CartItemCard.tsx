import { Delete, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/features/cart/cartSlice'

interface CartItemCardProps {
  item: CartItem
  onRemove: (courseId: string) => void
}

const CartItemCard = ({ item, onRemove }: CartItemCardProps) => {
  const displayPrice = item.discountedPrice ?? item.basePrice

  return (
    <div className="flex gap-4 p-4 border rounded-xl bg-sidebar-accent">
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
        <Trash2 className="size-5" />
      </Button>
    </div>
  )
}

export default CartItemCard
