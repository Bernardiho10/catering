
'use client'

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm"
import { useCartStore } from "@/features/cart/store"
import { createPaymentIntent } from "@/features/checkout/actions"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("")
    const { items, total } = useCartStore()

    useEffect(() => {
        if (items.length > 0) {
            createPaymentIntent(total).then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret)
                } else {
                    toast.error("Unable to initialize checkout. Please try again.")
                }
            })
        }
    }, [items, total])

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">Add some delicious items to get started.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
            {clientSecret ? (
                <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            ) : (
                <div className="flex flex-col justify-center items-center h-40 gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground text-center">
                        Initializing checkout... <br />
                        (If this persists, check Stripe keys in .env.local)
                    </p>
                </div>
            )}
        </div>
    )
}
