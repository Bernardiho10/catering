"use client"

import { useState, useMemo, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { Button } from "@/components/ui/button"
import { formatCurrency, cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Cake, Heart, Gift, Sparkles, Cookie, CupSoda, Truck, Flame, Star, ChevronRight, Search } from "lucide-react"
import { MenuItem } from "@/features/menu/types"
import { useMenu } from "@/features/menu/hooks/useMenu"
import { useCartStore } from "@/features/cart/store"

const categories = [
    { id: null, name: "All", icon: Cake },
    { id: "organic-cakes", name: "Organic Cakes", icon: Cake },
    { id: "specialty", name: "Specialty", icon: Heart, badge: "NEW" },
    { id: "bundles", name: "Family Bundles", icon: Gift },
    { id: "gluten-free", name: "Gluten Free", icon: Sparkles },
    { id: "truffles", name: "Truffles", icon: Cookie },
    { id: "drinks", name: "Drinks", icon: CupSoda },
    { id: "catering", name: "Catering", icon: Truck },
]

const getPageTitle = (cat: string | null, occ: string | null) => {
    if (occ) {
        switch (occ) {
            case 'bday': return 'Birthday Blessings'
            case 'thank-you': return 'Thank You Gifts'
            case 'love': return 'Romance & Love'
            case 'congrats': return 'Congratulations'
            default: return 'Occasions'
        }
    }
    if (cat) {
        const category = categories.find(c => c.id === cat)
        return category?.name || 'Menu'
    }
    return 'Our Organic Cake Flavors'
}

interface ProductCardProps {
    item: MenuItem
    onSelect: (item: MenuItem) => void
}

const ProductCard = memo(function ProductCard({ item, onSelect }: ProductCardProps) {
    const { addItem } = useCartStore()

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        addItem({ ...item, quantity: 1 })
    }

    return (
        <BlurFade delay={0.1} inView>
            <div
                onClick={() => onSelect(item)}
                className="group cursor-pointer space-y-4"
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-blue-50 rounded-sm">
                    <Image
                        src={item.image_url || '/placeholder-cake.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    <Button
                        onClick={handleQuickAdd}
                        className="absolute bottom-6 left-6 right-6 h-12 bg-white/90 hover:bg-white text-primary rounded-sm font-black uppercase text-[10px] tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                        Quick Add +
                    </Button>
                </div>
                <div className="space-y-1 pr-4">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest leading-tight group-hover:text-accent transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-xs font-bold text-primary/40">{formatCurrency(item.price)}</p>
                </div>
            </div>
        </BlurFade>
    )
})

export default function MenuView({ initialItems }: { initialItems: MenuItem[] }) {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const occ = searchParams.get('occ')
    const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null)

    const { items: hookItems } = useMenu()
    const displayItems = useMemo(() =>
        (initialItems && initialItems.length > 0) ? initialItems : hookItems,
        [initialItems, hookItems])

    const filteredItems = useMemo(() => {
        return displayItems.filter(item => {
            if (occ) return item.seasonal === occ
            if (category) {
                if (category === 'featured') return item.featured
                return item.category === category
            }
            return true
        })
    }, [displayItems, category, occ])

    const title = useMemo(() => getPageTitle(category, occ), [category, occ])

    return (
        <div className="min-h-screen bg-white">
            <header className="py-20 md:py-32 bg-primary text-white overflow-hidden text-center space-y-8">
                <BlurFade delay={0.1} inView>
                    <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                        {occ ? getPageTitle(null, occ) : category ? categories.find(c => c.id === category)?.name : 'Our Organic Cake Flavors'}
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto font-medium text-lg md:text-xl">
                        Handcrafted with the purest organic ingredients, delivered from our kitchen to your home.
                    </p>
                </BlurFade>
            </header>

            {/* Order Flow Visualization */}
            <div className="container mx-auto px-4 md:px-6 pb-12 mt-12">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                        { step: 1, label: "Flavor" },
                        { step: 2, label: "Size" },
                        { step: 3, label: "Customization" },
                        { step: 4, label: "Delivery" },
                        { step: 5, label: "Payment" },
                        { step: 6, label: "Confirmation" },
                    ].map((item) => (
                        <div key={item.step} className="flex flex-col items-center gap-3 p-4 bg-blue-50/50 rounded-sm border border-blue-50">
                            <div className="h-8 w-8 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center">
                                {item.step}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Category Navigation */}
            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-blue-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex gap-8 overflow-x-auto py-4 scrollbar-hide justify-center">
                        {categories.map((cat) => {
                            const isActive = cat.id === category
                            return (
                                <Link
                                    key={cat.id || 'all'}
                                    href={cat.id ? `/menu?cat=${cat.id}` : '/menu'}
                                    className={cn(
                                        "relative py-1 text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap",
                                        isActive
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-primary/40 hover:text-primary"
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Product Grid Area */}
            <div className="container mx-auto px-4 md:px-6 py-16">
                {/* Bakery Policy Section */}
                <div className="mb-16">
                    <div className="max-w-4xl bg-blue-50/10 border border-blue-50 p-8 md:p-12 rounded-sm text-center mx-auto space-y-6">
                        <h2 className="text-xl font-black text-primary uppercase tracking-widest">Bakery Policy</h2>
                        <p className="text-sm font-medium text-primary/60 leading-relaxed italic">
                            &quot;Every cake is baked fresh, specifically for you. Because we use organic ingredients with no artificial preservatives, we recommend ordering 48 hours in advance. For orders with less than 48 hours notice, please call us to check for immediate availability—we’ll do our best to make it happen!&quot;
                        </p>
                    </div>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {filteredItems.map((item) => (
                            <ProductCard key={item.id} item={item} onSelect={setSelectedProduct} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 space-y-6">
                        <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                            <Search className="h-10 w-10 text-primary/20" />
                        </div>
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">No Flavors Found</h3>
                        <p className="text-primary/60 font-medium">Try selecting another category or occassion.</p>
                        <Button className="rounded-sm bg-primary px-10 h-14 font-black uppercase tracking-widest" onClick={() => window.location.href = '/menu'}>
                            View All Flavors
                        </Button>
                    </div>
                )}
            </div>

            <ProductDialog
                item={selectedProduct}
                open={!!selectedProduct}
                onOpenChange={(open) => !open && setSelectedProduct(null)}
            />

            {/* Newsletter/Join Section */}
            <section className="py-20 border-t border-blue-50 bg-blue-50/20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-widest mb-4">
                        Join Abraham's Rewards
                    </h2>
                    <p className="text-primary/60 max-w-xl mx-auto mb-8 font-medium">
                        Earn points for free treats, exclusive birthday rewards, and member-only events.
                    </p>
                    <Link href="/rewards">
                        <Button className="rounded-sm bg-primary hover:bg-primary/90 px-10 h-14 font-black uppercase tracking-widest shadow-xl">
                            Sign Up Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
