
import Link from "next/link"
import { Cookie, Instagram, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RetroGrid } from "@/components/magicui/retro-grid"

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <RetroGrid className="opacity-15" />

            {/* Branding Stripe */}
            <div className="w-full h-8 bg-[repeating-linear-gradient(45deg,#c41e3a,#c41e3a_10px,#a31830_10px,#a31830_20px)] shadow-md relative z-10" />

            {/* Newsletter Section */}
            <div className="relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold font-heading">Sign up for Warm Moments</h3>
                            <p className="text-muted-foreground mt-1">
                                Join our list! Be the first to know about new flavors, stores, and exclusive offers.
                            </p>
                        </div>
                        <form className="flex gap-2 w-full md:w-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-background/80 border-input text-foreground placeholder:text-muted-foreground rounded-full px-5 min-w-[280px]"
                            />
                            <Button
                                type="submit"
                                className="rounded-full px-6 font-bold bg-[#c41e3a] text-white hover:bg-[#a31830] shadow-md"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5 w-fit group">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c41e3a] to-[#8b1528] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                                <Cookie className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-heading font-bold text-xl text-[#c41e3a]">David's Delights</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Warm Moments Delivered® since 1999. Fresh-baked cookies delivered to your door.
                        </p>
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Instagram"
                                className="h-9 w-9 text-muted-foreground hover:text-[#c41e3a] hover:bg-[#c41e3a]/10 rounded-full"
                            >
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Facebook"
                                className="h-9 w-9 text-muted-foreground hover:text-[#c41e3a] hover:bg-[#c41e3a]/10 rounded-full"
                            >
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Twitter"
                                className="h-9 w-9 text-muted-foreground hover:text-[#c41e3a] hover:bg-[#c41e3a]/10 rounded-full"
                            >
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Email"
                                className="h-9 w-9 text-muted-foreground hover:text-[#c41e3a] hover:bg-[#c41e3a]/10 rounded-full"
                            >
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Menu</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/menu" className="hover:text-[#c41e3a] transition-colors">Full Menu</Link></li>
                            <li><Link href="/menu?cat=warm" className="hover:text-[#c41e3a] transition-colors">Warm Cookies</Link></li>
                            <li><Link href="/menu?cat=valentines" className="hover:text-[#c41e3a] transition-colors">Valentine's Day</Link></li>
                            <li><Link href="/menu?cat=birthday" className="hover:text-[#c41e3a] transition-colors">Birthday Bundles</Link></li>
                            <li><Link href="/menu?cat=pie" className="hover:text-[#c41e3a] transition-colors">Cookie Pie</Link></li>
                            <li><Link href="/menu?cat=brownies" className="hover:text-[#c41e3a] transition-colors">Brownies</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Services</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/catering" className="hover:text-[#c41e3a] transition-colors">Catering</Link></li>
                            <li><Link href="/corporate" className="hover:text-[#c41e3a] transition-colors">Corporate Gifting</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-[#c41e3a] transition-colors">Gift Cards</Link></li>
                            <li><Link href="/rewards" className="hover:text-[#c41e3a] transition-colors">David's Rewards®</Link></li>
                            <li><Link href="/delivery-areas" className="hover:text-[#c41e3a] transition-colors">Delivery Areas</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Company</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-[#c41e3a] transition-colors">Our Story</Link></li>
                            <li><Link href="/about" className="hover:text-[#c41e3a] transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-[#c41e3a] transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-[#c41e3a] transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-[#c41e3a] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Support</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><Link href="/tracker" className="hover:text-[#c41e3a] transition-colors">Track Order</Link></li>
                            <li><Link href="/policies/delivery" className="hover:text-[#c41e3a] transition-colors">Delivery Policy</Link></li>
                            <li><Link href="/policies/privacy" className="hover:text-[#c41e3a] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/policies/terms" className="hover:text-[#c41e3a] transition-colors">Terms of Use</Link></li>
                            <li><Link href="/rewards/faq" className="hover:text-[#c41e3a] transition-colors">Rewards FAQ</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 David's Delights. Warm Moments Delivered®</p>
                    <div className="flex items-center gap-6">
                        <Link href="/policies/accessibility" className="hover:text-[#c41e3a] transition-colors">Accessibility</Link>
                        <Link href="/sitemap" className="hover:text-[#c41e3a] transition-colors">Sitemap</Link>
                        <Link href="/policies/privacy" className="hover:text-[#c41e3a] transition-colors">Your Privacy Choices</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
