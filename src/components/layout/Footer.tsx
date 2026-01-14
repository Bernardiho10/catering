
import Link from "next/link"
import { Leaf, Instagram, Facebook, Mail, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5 w-fit group">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 via-primary to-blue-500 flex items-center justify-center shadow-md shadow-amber-500/20 transition-transform group-hover:scale-105">
                                <Leaf className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-heading font-semibold text-xl text-golden">Foody</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Premium catering for weddings, corporate events, and private gatherings. 
                            Restaurant-quality cuisine delivered to your venue.
                        </p>
                        <div className="flex gap-1.5 pt-2">
                            <Button variant="ghost" size="icon" aria-label="Instagram" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Facebook" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Twitter" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="YouTube" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                                <Youtube className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Email" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Menu</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Browse Dishes</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Mains</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Appetizers</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Desserts</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Seasonal</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Dietary</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Vegan</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Vegetarian</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Gluten-Free</Link></li>
                            <li><Link href="/#menu" className="hover:text-primary transition-colors">Dairy-Free</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Company</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our Chefs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Support</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Foody Catering. Exceptional service, every time.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Accessibility</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
                        <span>Crafted by <span className="text-foreground font-medium">Bernard Oko</span></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
