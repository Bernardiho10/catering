"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useCartStore } from "@/features/cart/store"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface MobileOrderButtonProps {
    onOrderClick: () => void
}

export function MobileOrderButton({ onOrderClick }: MobileOrderButtonProps) {
    const { items } = useCartStore()
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isMounted, setIsMounted] = useState(false)

    // Only show on mobile screens AND if cart is empty
    useEffect(() => {
        setIsMounted(true)
        const checkMobile = () => {
            const isMobileWidth = window.innerWidth < 1024
            const isCartEmpty = items.length === 0
            setIsVisible(isMobileWidth && isCartEmpty)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        // Reset position on fresh page load (refresh requirement)
        localStorage.removeItem("mobile-btn-pos")

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [items.length])

    // Load saved position (for navigation within session)
    useEffect(() => {
        if (isMounted) {
            const saved = localStorage.getItem("mobile-btn-pos")
            if (saved) {
                try {
                    setPosition(JSON.parse(saved))
                } catch (e) {
                    console.error("Failed to parse position", e)
                }
            }
        }
    }, [isMounted])

    const handleDragEnd = (_: any, info: any) => {
        const newPos = {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
        }
        setPosition(newPos)
        localStorage.setItem("mobile-btn-pos", JSON.stringify(newPos))
    }

    if (!isVisible) return null

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            animate={{ x: position.x, y: position.y }}
            initial={{ x: 0, y: 0 }}
            style={{
                touchAction: "none",
                position: 'fixed',
                bottom: '100px',
                right: '24px',
                zIndex: 40
            }}
            whileDrag={{ scale: 1.1, zIndex: 60 }}
            className="pointer-events-auto"
        >
            <Button
                onClick={onOrderClick}
                size="lg"
                className="rounded-full shadow-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-6 gap-2 font-bold border-2 border-white/20"
            >
                <ShoppingCart className="h-5 w-5" />
                ORDER NOW
            </Button>
        </motion.div>
    )
}
