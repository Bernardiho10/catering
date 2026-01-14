
"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuItem } from "../types"
import { useCartStore } from "@/features/cart/store"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { Minus, Plus, ShoppingBag, Clock } from "lucide-react"

interface ProductDialogProps {
    item: MenuItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ProductDialog({ item, open, onOpenChange }: ProductDialogProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const addItem = useCartStore(state => state.addItem)

    if (!item) return null

    const galleryImages = item.images && item.images.length > 0
        ? item.images
        : [item.image_url]

    if (galleryImages[0] !== item.image_url && !galleryImages.includes(item.image_url)) {
        galleryImages.unshift(item.image_url)
    }

    const currentImage = galleryImages[selectedImageIndex] || item.image_url

    const handleAddToCart = () => {
        addItem({
            ...item,
            quantity,
        })
        toast.success(`Added ${quantity} ${item.name} to cart`)
        onOpenChange(false)
        setQuantity(1)
        setSelectedImageIndex(0)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2 !bg-white dark:!bg-zinc-900 border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-[200px] md:h-full md:min-h-[420px] bg-muted">
                    <Image
                        src={currentImage}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {galleryImages.length > 1 && (
                        <div className="flex gap-2 p-2 overflow-x-auto scrollbar-hide bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm absolute bottom-0 w-full z-10">
                            {galleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImageIndex === idx 
                                            ? 'border-primary' 
                                            : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${item.name} view ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col min-h-0 overflow-hidden bg-white dark:bg-zinc-900">
                    <div className="flex-1 p-5 overflow-y-auto min-h-0">
                        <DialogHeader className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Ready in 25 min</span>
                            </div>
                            <DialogTitle className="text-2xl font-heading font-semibold text-foreground">
                                {item.name}
                            </DialogTitle>
                            <div className="text-2xl font-semibold text-primary">
                                {formatCurrency(item.price)}
                            </div>
                            {item.dietary_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {item.dietary_tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                                {item.description}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="shrink-0 border-t border-border bg-zinc-50 dark:bg-zinc-800 p-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-center gap-1 bg-muted rounded-full p-1 border border-border w-fit mx-auto">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-full"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-full"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button 
                                onClick={handleAddToCart} 
                                className="w-full rounded-full h-12" 
                                size="lg"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart · {formatCurrency(item.price * quantity)}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
