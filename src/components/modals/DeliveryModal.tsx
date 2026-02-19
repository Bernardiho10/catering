"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Truck, Store, ChevronRight, X, User, Search, MapPin, Gift, RotateCcw, Users, Clock } from "lucide-react"
import { useCartStore } from "@/features/cart/store"
import { cn } from "@/lib/utils"
import { AddressEntryModal } from "./AddressEntryModal"

interface DeliveryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeliveryModal({ open, onOpenChange }: DeliveryModalProps) {
    const [method, setMethod] = useState<"delivery" | "pickup" | "ship">("delivery")
    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState<string | null>(null)
    const { setOrderType, setFullAddress, clearCart } = useCartStore()

    const handleShareLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.")
            return
        }

        setError(null)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mock distance check: Always fail if not in Houston for demo purposes
                // Real implementation would calculate distance to store locations
                const lat = position.coords.latitude
                const lng = position.coords.longitude

                // Houston roughly around 29.7, -95.3
                const isNearHouston = Math.abs(lat - 29.7) < 0.5 && Math.abs(lng - -95.3) < 0.5

                if (!isNearHouston) {
                    setError("There aren't any stores within 50 miles.")
                } else {
                    setFullAddress("Current Location (Houston)")
                    setOrderType("pickup")
                    onOpenChange(false)
                    window.location.href = "/menu"
                }
            },
            () => {
                setError("Unable to retrieve your location.")
            }
        )
    }

    const handleContinue = () => {
        if (method === "pickup" && !searchQuery && !error) {
            setError("Please enter a location or share your location.")
            return
        }

        setOrderType(method === "ship" ? "delivery" : method) // Mapping ship to delivery for now
        setFullAddress(searchQuery || "Manual Selection")
        onOpenChange(false)
        window.location.href = "/menu"
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white border-none rounded-none overflow-hidden shadow-2xl">
                {/* Header Image & Login */}
                <div className="relative aspect-[16/9] w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
                        alt="The A Cake Header"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-6 right-6">
                        <Button className="bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase text-[10px] tracking-widest px-6 h-10 flex items-center gap-2">
                            <User className="h-3 w-3" />
                            Log In
                        </Button>
                    </div>
                    <button
                        className="absolute left-6 top-6 text-white/70 hover:text-white transition-colors"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-8 w-8" />
                    </button>
                </div>

                <div className="p-8 md:p-12 space-y-8">
                    {/* Dynamic Title based on Method */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-primary">
                            {method === "delivery" && "What address are you delivering to:"}
                            {method === "pickup" && "Let's find a nearby The A Cake!"}
                            {method === "ship" && "Where should we ship your delights?"}
                        </h2>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={method === "pickup" ? "Search here" : "123 Main St."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-6 pr-14 border-2 border-blue-100 rounded-sm focus:border-primary outline-none font-medium text-primary placeholder:text-blue-200 transition-all"
                            />
                            <button
                                onClick={handleContinue}
                                className="absolute right-0 top-0 h-14 w-14 bg-[#001ba0] text-white flex items-center justify-center hover:bg-[#001580] transition-colors rounded-sm"
                            >
                                {method === "pickup" ? <Search className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                            </button>
                        </div>

                        {method === "pickup" && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleShareLocation}
                                    className="text-[#001ba0] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Share My Location
                                </button>
                            </div>
                        )}

                        {method === "delivery" && (
                            <div className="flex justify-end text-[#001ba0] text-xs font-black uppercase tracking-widest hover:underline cursor-pointer">
                                Address Book
                            </div>
                        )}

                        {error && (
                            <p className="text-[#c41e3a] text-xs font-bold italic mt-2 animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Method Selection */}
                    <div className="flex items-center justify-center gap-8 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="method"
                                    className="sr-only"
                                    checked={method === "delivery"}
                                    onChange={() => { setMethod("delivery"); setError(null); }}
                                />
                                <div className={cn(
                                    "h-5 w-5 rounded-full border-2 transition-all",
                                    method === "delivery" ? "border-[#001ba0] bg-[#001ba0]" : "border-blue-100 group-hover:border-blue-200"
                                )}>
                                    {method === "delivery" && <div className="absolute inset-1.5 bg-white rounded-full" />}
                                </div>
                            </div>
                            <span className={cn(
                                "text-sm font-black uppercase tracking-widest",
                                method === "delivery" ? "text-primary" : "text-primary/40"
                            )}>Delivery</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="method"
                                    className="sr-only"
                                    checked={method === "pickup"}
                                    onChange={() => { setMethod("pickup"); setError(null); }}
                                />
                                <div className={cn(
                                    "h-5 w-5 rounded-full border-2 transition-all",
                                    method === "pickup" ? "border-[#001ba0] bg-[#001ba0]" : "border-blue-100 group-hover:border-blue-200"
                                )}>
                                    {method === "pickup" && <div className="absolute inset-1.5 bg-white rounded-full" />}
                                </div>
                            </div>
                            <span className={cn(
                                "text-sm font-black uppercase tracking-widest",
                                method === "pickup" ? "text-primary" : "text-primary/40"
                            )}>Pick Up</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="method"
                                    className="sr-only"
                                    checked={method === "ship"}
                                    onChange={() => { setMethod("ship"); setError(null); }}
                                />
                                <div className={cn(
                                    "h-5 w-5 rounded-full border-2 transition-all",
                                    method === "ship" ? "border-[#001ba0] bg-[#001ba0]" : "border-blue-100 group-hover:border-blue-200"
                                )}>
                                    {method === "ship" && <div className="absolute inset-1.5 bg-white rounded-full" />}
                                </div>
                            </div>
                            <span className={cn(
                                "text-sm font-black uppercase tracking-widest",
                                method === "ship" ? "text-primary" : "text-primary/40"
                            )}>Ship Delights</span>
                        </label>
                    </div>

                    {method === "pickup" && (
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleContinue}
                                className="bg-white border-2 border-blue-100 hover:border-primary text-primary/40 hover:text-primary rounded-sm font-black uppercase text-[10px] tracking-widest px-12 h-14 flex items-center gap-2 transition-all"
                            >
                                Continue
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    {/* Footer Links */}
                    <div className="pt-10 border-t border-blue-50 flex flex-col items-center space-y-8">
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors">
                                <Gift className="h-4 w-4" />
                                Gift Cards
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors">
                                <RotateCcw className="h-4 w-4" />
                                Repeat Order
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors">
                                <Users className="h-4 w-4" />
                                Order for Multiple Recipients
                            </button>
                        </div>

                        <p className="text-[10px] font-medium text-primary/40">
                            Looking for the main The A Cake website? <a href="#" className="text-[#001ba0] underline">Click here</a>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
