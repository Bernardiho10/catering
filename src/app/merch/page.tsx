"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MerchPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-2xl text-center py-20">
                <h1 className="text-4xl font-heading font-bold mb-6">Merchandise Store</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    We're restocking our shelves! New t-shirts, mugs, and hats are coming soon.
                </p>
                <Button asChild size="lg" className="rounded-full">
                    <Link href="/menu">Back to Cookies</Link>
                </Button>
            </div>
        </div>
    )
}
