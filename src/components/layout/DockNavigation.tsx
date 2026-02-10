
"use client";

import React from "react";
import Link from "next/link";
import { Home, UtensilsCrossed, Gift, MapPin, Truck, ShoppingBag, User, Settings } from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { CartSheet } from "@/features/cart/components/CartSheet";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function DockNavigation() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-full px-4 flex justify-center pointer-events-none">
            <TooltipProvider>
                <Dock direction="middle" className="pointer-events-auto bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-full px-4 py-3 gap-3">
                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <Home className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Home</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/menu" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <UtensilsCrossed className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Menu</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/rewards" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <Gift className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Rewards</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/locations" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <MapPin className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Locations</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-full h-full">
                                    <CartSheet trigger={
                                        <div className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                                            <ShoppingBag className="w-5 h-5" />
                                        </div>
                                    } />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent><p>Cart</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/tracker" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <Truck className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Track Order</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/profile" className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors">
                                    <User className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Profile</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-full h-full">
                                    <AnimatedThemeToggler />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent><p>Theme</p></TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        </div>
    );
}
