"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store"
import { formatCurrency } from "@/lib/utils"

interface FloatingCartProps {
    onOpen: () => void
}

export function FloatingCart({ onOpen }: FloatingCartProps) {
    const items = useCartStore(state => state.items)
    const total = useCartStore(state => state.total)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    if (itemCount === 0) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
            <Button
                onClick={onOpen}
                size="lg"
                className="h-14 px-6 rounded-full shadow-xl bg-primary hover:bg-primary/90 gap-3"
            >
                <div className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center">
                        {itemCount}
                    </span>
                </div>
                <span className="font-semibold">View Cart</span>
                <span className="font-bold">{formatCurrency(total)}</span>
            </Button>
        </div>
    )
}
