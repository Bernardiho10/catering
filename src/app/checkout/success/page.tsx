
'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"
import { useCartStore } from "@/features/cart/store"

export default function SuccessPage() {
    const clearCart = useCartStore(state => state.clearCart)
    const trackingId = "KTH-0001"

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
            <div className="rounded-full bg-primary/10 p-6 border border-primary/20">
                <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold font-heading tracking-wider">Order Received</h1>
            <p className="text-muted-foreground max-w-md">
                Your table is set. Our kitchen is preparing your order with care. You can follow the journey in real time.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href={`/tracking/${trackingId}?celebrate=1`}>Track This Order</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">Back to Menu</Link>
                </Button>
            </div>
        </div>
    )
}
