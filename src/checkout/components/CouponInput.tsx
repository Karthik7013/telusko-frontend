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
