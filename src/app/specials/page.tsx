"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SpecialsPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Weekly Specials</h1>
                <p className="text-xl text-muted-foreground mb-12">Limited time offers and exclusive deals.</p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                        <h3 className="text-2xl font-bold font-heading mb-4">Double Dozen Deal</h3>
                        <p className="text-muted-foreground mb-6">Get 2 dozen classic cookies for just $35. Perfect for sharing!</p>
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/menu?cat=packs">View Packs</Link>
                        </Button>
                    </div>
                    <div className="bg-amber-500/5 rounded-3xl p-8 border border-amber-500/10">
                        <h3 className="text-2xl font-bold font-heading mb-4">Free Delivery</h3>
                        <p className="text-muted-foreground mb-6">Use code <strong>FREESHIP</strong> on orders over $50.</p>
                        <Button asChild variant="outline" size="lg" className="rounded-full">
                            <Link href="/menu">Order Now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
