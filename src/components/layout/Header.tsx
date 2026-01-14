
import Link from "next/link"
import { Menu, Leaf, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "./UserNav"
import { CartSheet } from "@/features/cart/components/CartSheet"

export async function Header() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: profile } = user
        ? await supabase
              .from("users")
              .select("role")
              .eq("id", user.id)
              .maybeSingle()
        : { data: null }

    const isAdmin = profile?.role === "admin"

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4 md:px-6">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Left Nav */}
                <nav className="hidden md:flex md:items-center md:gap-6">
                    <Link
                        href="/"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        Menu
                    </Link>
                    <Link
                        href="/orders"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        My Orders
                    </Link>
                </nav>

                {/* Mobile Menu Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 md:hidden text-foreground hover:bg-muted rounded-full"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-background border-r border-border">
                        <nav className="grid gap-6 text-lg font-medium pt-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2"
                            >
                                <Leaf className="h-6 w-6 text-primary" />
                                <span className="font-heading font-semibold text-xl text-foreground">Foody</span>
                            </Link>
                            <Link href="/" className="hover:text-primary transition-colors text-muted-foreground">
                                Menu
                            </Link>
                            <Link
                                href="/orders"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                My Orders
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Center Brand */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group"
                    >
                        <Leaf className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
                        <div className="flex flex-col">
                            <span className="font-heading font-semibold text-2xl text-foreground transition-colors group-hover:text-primary">
                                Foody
                            </span>
                            <span className="text-[10px] text-muted-foreground tracking-wide">Premium Catering Services</span>
                        </div>
                    </Link>
                </div>

                {/* Mobile Brand */}
                <div className="md:hidden flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-heading font-semibold text-lg text-foreground">Foody</span>
                </div>


                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <form className="hidden lg:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search dishes..."
                                className="pl-9 w-[200px] bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background rounded-full text-sm"
                            />
                        </div>
                    </form>

                    {isAdmin && (
                        <Link href="/admin">
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex rounded-full text-xs"
                            >
                                Admin
                            </Button>
                        </Link>
                    )}

                    <CartSheet />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    )
}
