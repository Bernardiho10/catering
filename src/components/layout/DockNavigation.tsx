
"use client";

import React from "react";
import Link from "next/link";
import { Home, UtensilsCrossed, Package, Settings } from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { CartSheet } from "@/features/cart/components/CartSheet";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export function DockNavigation() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <Dock magnification={56} distance={80} className="bg-card/95 border border-border shadow-lg backdrop-blur-md rounded-full px-3 py-2">
                <DockIcon className="bg-transparent">
                    <Link href="/" className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors">
                        <Home className="w-5 h-5" />
                    </Link>
                </DockIcon>

                <DockIcon className="bg-transparent">
                    <Link href="/#menu" className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors">
                        <UtensilsCrossed className="w-5 h-5" />
                    </Link>
                </DockIcon>

                <DockIcon className="bg-transparent">
                    <div className="flex items-center justify-center w-full h-full">
                        <CartSheet />
                    </div>
                </DockIcon>

                <DockIcon className="bg-transparent">
                    <Link href="/orders" className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors">
                        <Package className="w-5 h-5" />
                    </Link>
                </DockIcon>

                <DockIcon className="bg-transparent">
                    <Link href="/admin" className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors">
                        <Settings className="w-5 h-5" />
                    </Link>
                </DockIcon>

                <DockIcon className="bg-transparent">
                    <div className="flex items-center justify-center w-full h-full">
                        <AnimatedThemeToggler />
                    </div>
                </DockIcon>
            </Dock>
        </div>
    );
}
