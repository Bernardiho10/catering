
"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Plus, Minus } from "lucide-react"
import { useCartStore } from "../store"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CartSheet() {
    const { items, removeItem, updateQuantity, total } = useCartStore()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-[11px] font-semibold text-primary-foreground flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                    <span className="sr-only">Open cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md !bg-white dark:!bg-zinc-900 border-l border-border p-0">
                <SheetHeader className="p-6 pb-4 border-b border-border bg-zinc-50 dark:bg-zinc-800/50">
                    <SheetTitle className="text-2xl font-heading font-semibold">Your Cart</SheetTitle>
                    <SheetDescription className="text-sm">
                        {itemCount === 0 ? "Your cart is waiting to be filled" : `${itemCount} item${itemCount > 1 ? 's' : ''} ready for checkout`}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
                            </div>
                            <h3 className="font-heading font-semibold text-lg mb-1">Your cart is empty</h3>
                            <p className="text-muted-foreground text-sm max-w-[200px]">
                                Browse our menu and add some delicious dishes!
                            </p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-border">
                                <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                                    <Image
                                        src={item.image_url || '/placeholder-food.jpg'}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-foreground truncate mb-1">{item.name}</h4>
                                    <p className="text-sm text-primary font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                    <div className="flex items-center gap-1 mt-2 bg-white dark:bg-zinc-900 rounded-full p-0.5 border border-border w-fit">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 rounded-full hover:bg-muted" 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 rounded-full hover:bg-muted" 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-border p-6 bg-zinc-50 dark:bg-zinc-800/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-2xl font-semibold font-heading">{formatCurrency(total)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Delivery fees calculated at checkout</p>
                        <Button 
                            className="w-full rounded-full h-12 text-base font-semibold" 
                            size="lg" 
                            asChild
                        >
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
