
import Link from "next/link"
import { Leaf, Instagram, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <Leaf className="h-6 w-6 text-primary" />
                            <span className="font-heading font-semibold text-xl text-foreground">Foody</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                            Premium catering services for weddings, corporate events, and private gatherings. 
                            We bring exceptional cuisine and hospitality to every occasion.
                        </p>
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Instagram"
                                className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                            >
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Facebook"
                                className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                            >
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Email"
                                className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                            >
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Menu</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Browse Dishes</Link></li>
                            <li><Link href="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Support</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Foody Catering. Exceptional service, every time.</p>
                    <p>
                        Crafted by <span className="text-foreground font-medium">Bernard Oko</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
