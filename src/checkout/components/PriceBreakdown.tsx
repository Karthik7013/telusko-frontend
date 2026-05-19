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
