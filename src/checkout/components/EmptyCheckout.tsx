import { Button } from "@/components/ui/button"

export function EmptyCheckout() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-2">Nothing to checkout</h1>
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Button asChild><a href="/search">Browse courses</a></Button>
        </div>
    )
}
