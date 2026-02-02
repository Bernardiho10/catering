"use client"

import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

// Helper to map URL category/occasion to display title
const getPageTitle = (cat: string | null, occ: string | null) => {
    if (occ) {
        switch (occ) {
            case 'bday': return 'Birthday Treats'
            case 'thank-you': return 'Thank You Gifts'
            case 'love': return 'Romance & Love'
            case 'congrats': return 'Congratulations'
            default: return 'Occasions'
        }
    }
    if (cat) {
        switch (cat) {
            case 'warm': return 'Warm Cookies'
            case 'frozen': return 'Frozen Dough'
            case 'packs': return 'Cookie Packs'
            case 'pie': return 'Cookie Pies'
            case 'brownies': return 'Brownies'
            case 'ice-cream': return 'Ice Cream'
            case 'drinks': return 'Drinks'
            case 'featured': return 'Featured Items'
            default: return 'Menu'
        }
    }
    return 'Full Menu'
}

import { Suspense } from "react"

function MenuContent() {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const occasion = searchParams.get('occ')

    const filteredItems = MOCK_MENU_ITEMS.filter(item => {
        // Filter by Occasion
        if (occasion) {
            return item.seasonal === occasion
        }
        // Filter by Category
        if (category) {
            if (category === 'featured') return item.featured
            return item.category === category
        }
        // Default: Show all
        return true
    })

    const title = getPageTitle(category, occasion)

    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{title}</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Freshly baked moments delivered to your door.
                    </p>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl">
                        <p className="text-xl text-muted-foreground font-medium">Sorry, no items found in this category right now.</p>
                        <Button variant="link" className="mt-4 text-primary" onClick={() => window.location.href = '/menu'}>
                            View Full Menu
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading menu...</div>}>
            <MenuContent />
        </Suspense>
    )
}

function ProductCard({ item }: { item: typeof MOCK_MENU_ITEMS[0] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-border/50"
                onClick={() => setOpen(true)}
            >
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.featured && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                            FEATURED
                        </div>
                    )}
                </div>
                <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1">{item.name}</h3>
                        <span className="font-bold text-primary whitespace-nowrap">{formatCurrency(item.price)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{item.description}</p>
                    <Button className="w-full rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        Add to Order
                    </Button>
                </div>
            </div>

            <ProductDialog open={open} onOpenChange={setOpen} item={item} />
        </>
    )
}
