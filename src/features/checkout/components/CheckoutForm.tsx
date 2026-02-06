
"use client"

import { useEffect, useState } from "react"
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    clearCart()
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [stripe, clearCart])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout/success`,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ?? "An unexpected error occurred.")
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }

    // Mock checkout for demo purposes
    const handleMockCheckout = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Create mock order data
        const mockOrder = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toISOString(),
            status: 'In Progress',
            total: 26.50, // This would normally come from cart store but for now hardcoded or read from store
            items: []
        }
        localStorage.setItem('lastOrder', JSON.stringify(mockOrder))

        // Clear cart
        try {
            // We need to access clearCart from the store but it's not directly exposed here inside the function easily unless we use the hook
            // Actually we have clearCart from the hook above
            clearCart()
        } catch (e) { console.error(e) }

        toast.success("Order placed successfully! (Demo)")
        window.location.href = "/tracker"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner">Processing...</div> : "Pay now"}
                </span>
            </Button>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or (Demo Mode)</span>
                </div>
            </div>

            <Button
                type="button"
                variant="secondary"
                className="w-full bg-green-100 text-green-700 hover:bg-green-200"
                onClick={handleMockCheckout}
                disabled={isLoading}
            >
                Simulate Successful Order
            </Button>
            {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    )
}
