"use client"

import Link from "next/link"
import { Cookie, Instagram, Facebook, Twitter, Mail, Cake, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
    return (
        <footer className="bg-white border-t border-blue-50">
            {/* Newsletter Section - Refined */}
            <div className="border-b border-blue-50">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl font-black text-primary uppercase tracking-widest">Join the Family</h3>
                            <p className="text-primary/60 mt-2 font-medium">
                                Sign up for fresh-baked updates and exclusive organic treats.
                            </p>
                        </div>
                        <form className="flex gap-3 w-full max-w-md">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="h-12 border-blue-100 focus-visible:ring-primary rounded-sm"
                            />
                            <Button
                                type="submit"
                                className="h-12 px-8 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 rounded-sm shadow-xl"
                            >
                                Join
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand & Location */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Our Mission</h4>
                            <p className="text-primary/70 text-sm leading-relaxed font-medium max-w-sm">
                                Abraham’s Organic Treats — A Blessing in Every Slice.
                                Traditionally crafted with 100% organic ingredients and shared with love.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:text-accent hover:bg-blue-50 rounded-full">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:text-accent hover:bg-blue-50 rounded-full">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:text-accent hover:bg-blue-50 rounded-full">
                                <Twitter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60 uppercase tracking-widest">
                            <li><Link href="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
                            <li><Link href="/catering" className="hover:text-primary transition-colors">Catering</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-primary transition-colors">Gifting</Link></li>
                            <li><Link href="/rewards" className="hover:text-primary transition-colors">Rewards</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6">Support</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60 uppercase tracking-widest">
                            <li><Link href="/tracker" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6">About</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60 uppercase tracking-widest">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="/policies/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                            <li><Link href="/policies/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-blue-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                        © 2026 Abraham&apos;s Organic Treats. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest flex items-center gap-2">
                            <Cake className="h-3 w-3 text-accent" /> Warm Moments Delivered®
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
