"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/features/cart/store"
import { formatCurrency, cn } from "@/lib/utils"
import { Trash2, Edit2, ShoppingBag, X, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DeliveryModal } from "@/components/modals/DeliveryModal"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

interface CartDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { items, total, removeItem, updateQuantity, fullAddress, clearCart } = useCartStore()
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false)

    const handleStartOver = () => {
        clearCart()
        onOpenChange(false)
        setIsDeliveryModalOpen(true)
    }

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] p-0 gap-0 border-t-0 rounded-t-[2rem] overflow-hidden bg-white">
                    <div className="w-full h-full flex flex-col">
                        {/* Cart Header */}
                        <SheetHeader className="p-6 border-b border-blue-50 flex flex-row items-center justify-between bg-white sticky top-0 z-10 space-y-0">
                            <SheetTitle className="text-xl font-black text-[#001ba0] uppercase tracking-tighter flex items-center gap-2">
                                Your Cart
                                <ChevronRight className="h-5 w-5 rotate-90" />
                            </SheetTitle>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </SheetHeader>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center px-10 py-20">
                                    <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag className="h-12 w-12 text-primary/20" />
                                    </div>
                                    <p className="text-sm font-medium text-primary/40 italic">
                                        Your cart is currently empty. <br /> Start adding some blessings!
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-blue-50">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-6 group hover:bg-blue-50/30 transition-colors">
                                            <div className="flex gap-6">
                                                <div className="relative h-24 w-24 rounded-sm overflow-hidden bg-blue-50 shrink-0 border border-blue-100/50">
                                                    <Image
                                                        src={item.image_url || "/placeholder-cake.jpg"}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-sm font-black text-primary uppercase tracking-tight leading-tight pr-4">
                                                                {item.name}
                                                            </h3>
                                                            <span className="text-sm font-black text-primary">
                                                                {formatCurrency(item.price * item.quantity)}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs font-medium text-primary/60 italic">
                                                            {item.quantity}x - {formatCurrency(item.price)} / Each
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex items-center gap-1 bg-blue-50 rounded-full p-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-all"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-all"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Footer */}
                        {items.length > 0 && (
                            <div className="p-8 space-y-8 bg-white border-t border-blue-50 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] pb-12">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-primary/40 font-black uppercase tracking-widest text-[10px]">Shipping</span>
                                        <span className="text-primary/60 font-black uppercase tracking-widest text-[10px]">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-xl font-black text-primary uppercase tracking-tighter">Subtotal</span>
                                        <span className="text-3xl font-black text-[#001ba0]">{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                {fullAddress && (
                                    <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                                        <div className="space-y-2 flex-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Shipping Info</span>
                                            <p className="text-[11px] font-bold text-primary/80 uppercase line-clamp-1 pr-4">
                                                {fullAddress}
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-blue-100 group-hover:bg-primary group-hover:text-white transition-all">
                                            <Edit2 className="h-4 w-4" />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={handleStartOver}
                                        className="h-16 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-red-500 border-2 border-blue-50 hover:border-red-100 rounded-sm transition-all"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Start Over
                                    </button>
                                    <Button
                                        asChild
                                        className="h-16 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 group"
                                    >
                                        <a href="/checkout">
                                            Checkout
                                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            <DeliveryModal
                open={isDeliveryModalOpen}
                onOpenChange={setIsDeliveryModalOpen}
            />
        </>
    )
}
