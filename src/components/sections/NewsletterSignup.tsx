"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("You're on the list! Watch your inbox for weekly recipes and exclusive offers.")
        setEmail("")
        setIsLoading(false)
    }

    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/30 to-secondary/20" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        Join 10,000+ food lovers
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                        Get weekly recipes & exclusive offers
                    </h2>
                    
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Subscribe to our newsletter for seasonal menus, cooking tips from our chefs, 
                        and early access to new dishes. No spam, just good food.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-11 h-12 rounded-full bg-background border-border"
                                required
                            />
                        </div>
                        <Button 
                            type="submit" 
                            size="lg" 
                            className="h-12 px-8 rounded-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>

                    <p className="text-xs text-muted-foreground">
                        By subscribing, you agree to our privacy policy. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    )
}
