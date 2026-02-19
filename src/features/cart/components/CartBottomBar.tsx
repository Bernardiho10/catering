"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/features/cart/store"
import { formatCurrency, cn } from "@/lib/utils"
import { ShoppingBag, ChevronUp } from "lucide-react"
import { CartDrawer } from "./CartDrawer"
import { BlurFade } from "@/components/magicui/blur-fade"
import { motion } from "framer-motion"

export function CartBottomBar() {
    const { items, total } = useCartStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted || items.length === 0) return null

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const handleDragEnd = (_: any, info: any) => {
        setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
        })
    }

    return (
        <>
            <motion.div
                className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 pointer-events-none"
                drag
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={{ x: position.x, y: position.y }}
                initial={{ x: 0, y: 0 }}
                style={{ touchAction: "none" }}
            >
                <div className="max-w-4xl mx-auto flex justify-center sm:justify-end">
                    <BlurFade delay={0.1}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                            className={cn(
                                "bg-[#001ba0] hover:bg-[#001580] text-white shadow-[0_20px_50px_rgba(0,27,160,0.3)] flex items-center group transition-all duration-700 pointer-events-auto active:scale-[0.98]",
                                isOpen
                                    ? "w-16 h-16 rounded-full justify-center p-0 translate-y-[-20px] sm:translate-y-0"
                                    : "w-full p-6 rounded-[2rem] justify-between"
                            )}
                        >
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "h-14 w-14 bg-white/10 rounded-full flex items-center justify-center relative transition-transform duration-500",
                                    !isOpen && "group-hover:scale-110"
                                )}>
                                    <ShoppingBag className="h-6 w-6" />
                                    <span className="absolute -top-1 -right-1 h-6 w-6 bg-white text-[#001ba0] text-[10px] font-black rounded-full flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                </div>
                                {!isOpen && (
                                    <div className="text-left animate-in fade-in slide-in-from-left-4 duration-500">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Your Cart</h3>
                                        <p className="text-xl font-black uppercase tracking-tighter">
                                            {itemCount} {itemCount === 1 ? 'Blessing' : 'Blessings'} Ready
                                        </p>
                                    </div>
                                )}
                            </div>

                            {!isOpen && (
                                <div className="flex items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="text-right hidden sm:block">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Subtotal</h3>
                                        <p className="text-xl font-black uppercase tracking-tighter">{formatCurrency(total)}</p>
                                    </div>
                                    <div className="h-14 w-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#001ba0] transition-all duration-500">
                                        <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
                                    </div>
                                </div>
                            )}

                            {isOpen && (
                                <div className="animate-in zoom-in fade-in duration-500">
                                    <ChevronUp className="h-6 w-6 rotate-180" />
                                </div>
                            )}
                        </button>
                    </BlurFade>
                </div>
            </motion.div>

            <CartDrawer open={isOpen} onOpenChange={setIsOpen} />
        </>
    )
}
