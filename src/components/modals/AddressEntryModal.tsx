
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Navigation, History, Star } from "lucide-react"

interface AddressEntryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (address: string) => void
}

import { useCartStore } from "@/features/cart/store"

export function AddressEntryModal({ open, onOpenChange, onConfirm }: AddressEntryModalProps) {
    const [address, setAddress] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const { setFullAddress } = useCartStore()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        // Simulate API call
        setTimeout(() => {
            setIsSearching(false)
            setFullAddress(address)
            onConfirm(address)
            onOpenChange(false)
        }, 1000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white dark:bg-zinc-900 overflow-hidden border-border shadow-2xl">
                <div className="bg-[#c41e3a] p-6 text-white text-center">
                    <DialogTitle className="text-2xl font-heading font-bold">
                        Where are we delivering?
                    </DialogTitle>
                    <p className="text-white/80 mt-2 text-sm">
                        Enter your address to see if we're baking in your neighborhood.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address-input" className="sr-only">Address</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="address-input"
                                    placeholder="Enter street address, city, state zip"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="pl-10 h-14 rounded-xl border-2 border-input focus-visible:border-[#c41e3a] focus-visible:ring-0 text-base"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-full font-bold text-base bg-[#c41e3a] hover:bg-[#a31830] shadow-md"
                            disabled={!address || isSearching}
                        >
                            {isSearching ? "Checking Availability..." : "Check Availability"}
                        </Button>
                    </form>

                    <div className="space-y-4 pt-4 border-t border-border">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-muted font-normal">
                            <div className="bg-[#c41e3a]/10 p-2 rounded-full text-[#c41e3a]">
                                <Navigation className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-semibold text-foreground">Use Current Location</span>
                                <span className="block text-xs text-muted-foreground">Allow access to your location</span>
                            </div>
                        </Button>

                        {/* Mock Recent Addresses (Hidden for now unless state populated) */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-4">Recent Locations</h4>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-muted font-normal group">
                                <div className="bg-muted p-2 rounded-full text-muted-foreground group-hover:text-foreground">
                                    <History className="h-5 w-5" />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="block font-medium text-foreground">123 Cookie Lane</span>
                                    <span className="block text-xs text-muted-foreground">Austin, TX 78701</span>
                                </div>
                                <Star className="h-4 w-4 text-muted-foreground hover:text-amber-400 cursor-pointer" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
