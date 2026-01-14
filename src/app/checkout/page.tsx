
'use client'

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm"
import { useCartStore } from "@/features/cart/store"
import { createPaymentIntent } from "@/features/checkout/actions"
import { Loader2, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("")
    const { items, total, updateQuantity, removeItem } = useCartStore()
    const [taxRate, setTaxRate] = useState(8.0)
    const [deliveryFeeAmount, setDeliveryFeeAmount] = useState(299)
    const supabase = createClient()

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('tax_rate, delivery_fee')
                .single()
            
            if (data) {
                setTaxRate(data.tax_rate || 8.0)
                setDeliveryFeeAmount(data.delivery_fee || 299)
            }
        }
        fetchSettings()
    }, [])

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
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-heading font-semibold text-foreground">Your cart is empty</h1>
                        <p className="text-muted-foreground">Add some delicious items to get started.</p>
                    </div>
                    <Link href="/#menu">
                        <Button className="rounded-full px-8">Browse Menu</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const deliveryFee = deliveryFeeAmount
    const tax = Math.round(subtotal * (taxRate / 100))

    return (
        <div className="container mx-auto px-4 md:px-6 py-10">
            <h1 className="text-3xl font-heading font-semibold text-foreground mb-8">Checkout</h1>
            
            <div className="grid lg:grid-cols-5 gap-8">
                {/* Payment Form - Left Side */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                    <Card className="rounded-2xl border-border">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold">Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {clientSecret ? (
                                <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} />
                                </Elements>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-40 gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground text-center">
                                        Initializing payment...
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary - Right Side */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <Card className="rounded-2xl border-border sticky top-24">
                        <CardHeader className="pb-4 border-b border-border">
                            <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                Order Summary
                                <span className="text-sm font-normal text-muted-foreground">
                                    {items.length} {items.length === 1 ? 'item' : 'items'}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Items List */}
                            <div className="max-h-[300px] overflow-y-auto divide-y divide-border">
                                {items.map((item) => (
                                    <div key={item.id} className="p-4 flex gap-3">
                                        <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                                            <Image
                                                src={item.image_url || '/placeholder-food.jpg'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                                            <p className="text-sm text-primary font-medium mt-0.5">
                                                {formatCurrency(item.price * item.quantity)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-full"
                                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-full"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-full ml-auto text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="p-4 border-t border-border space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span className="text-foreground">{formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax ({taxRate}%)</span>
                                    <span className="text-foreground">{formatCurrency(tax)}</span>
                                </div>
                                <div className="flex justify-between text-base font-semibold pt-3 border-t border-border">
                                    <span className="text-foreground">Total</span>
                                    <span className="text-primary">{formatCurrency(subtotal + deliveryFee + tax)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
