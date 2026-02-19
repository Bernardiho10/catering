
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { createOrder } from "@/app/actions/checkout"
import { CreditCard, ShieldCheck } from "lucide-react"

export function CheckoutForm() {
    const [isLoading, setIsLoading] = useState(false)
    const clearCart = useCartStore(state => state.clearCart)
    const cartState = useCartStore.getState()
    const items = cartState.items
    const total = cartState.total

    const handlePaystackSimulation = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        toast.info("Connecting to Paystack...")

        // Simulate network delay for Paystack gateway
        await new Promise(resolve => setTimeout(resolve, 2000))

        try {
            const result = await createOrder({
                items: items.map(i => ({
                    id: i.id,
                    quantity: i.quantity,
                    price: i.price,
                    isOrganic: i.dietary_tags?.includes('organic')
                })),
                total: total,
                paymentStatus: 'paid', // Simulating successful payment
                paymentMethod: 'paystack',
                paymentReference: `PAY-${Math.floor(Math.random() * 1000000)}`
            })

            if (result.success) {
                toast.success("Payment Received! Your order is being processed.")
                clearCart()
                window.location.href = `/tracker?id=${result.orderId}`
            } else {
                toast.error(`Order failed: ${result.message}`)
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred.")
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="p-6 border rounded-2xl bg-muted/30">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Paystack Checkout</h3>
                        <p className="text-xs text-muted-foreground">Secure payment gateway</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm py-2 border-b">
                        <span className="text-muted-foreground">Total to Pay</span>
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handlePaystackSimulation} className="space-y-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-full bg-[#09a5db] hover:bg-[#078bb9] text-white"
                >
                    {isLoading ? "Processing..." : `Pay ${formatCurrency(total)} with Paystack`}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    128-bit SSL Secured Encryption
                </div>
            </form>
        </div>
    )
}
