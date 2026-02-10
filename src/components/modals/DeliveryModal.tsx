
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Truck, Store, MapPin, ChevronRight, X } from "lucide-react"
import { AddressEntryModal } from "./AddressEntryModal"

interface DeliveryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeliveryModal({ open, onOpenChange }: DeliveryModalProps) {
    const [method, setMethod] = useState<"delivery" | "pickup" | null>(null)
    const [addressModalOpen, setAddressModalOpen] = useState(false)

    const handleMethodSelect = (selected: "delivery" | "pickup") => {
        setMethod(selected)
        if (selected === "delivery") {
            // Close this modal and open address modal (or keep this open and switch view, but typical flow might be distinct modals)
            // Typically "Start Order" -> "Delivery or Pickup" -> "Address"
            // We'll treat this modal as the "Start Order" selector.
            onOpenChange(false)
            setAddressModalOpen(true)
        } else {
            // For pickup, we might show store selector here or navigate to locations page
            // For now, let's just close and log (or navigate)
            console.log("Pickup selected")
            onOpenChange(false)
            // In a real app, this would open StoreSelectorModal or redirect
            window.location.href = "/locations"
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-white dark:bg-zinc-900 border-border shadow-2xl overflow-hidden">
                    <div className="bg-[#c41e3a] p-6 text-white text-center relative">
                        <DialogTitle className="text-2xl font-heading font-bold">
                            Start Your Order
                        </DialogTitle>
                        <DialogDescription className="text-white/80 mt-1">
                            How would you like to receive your warm cookies?
                        </DialogDescription>
                        {/* Close button override for custom header */}
                        <div
                            className="absolute right-4 top-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                            onClick={() => onOpenChange(false)}
                        >
                            <X className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid gap-4">
                            <button
                                onClick={() => handleMethodSelect("delivery")}
                                className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-muted hover:border-[#c41e3a] hover:bg-[#c41e3a]/5 transition-all duration-300 text-left"
                            >
                                <div className="h-14 w-14 rounded-full bg-[#c41e3a]/10 text-[#c41e3a] flex items-center justify-center shrink-0 group-hover:bg-[#c41e3a] group-hover:text-white transition-colors duration-300">
                                    <Truck className="h-7 w-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-[#c41e3a] transition-colors">
                                        Delivery
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        We bring warm cookies to your door.
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                            </button>

                            <button
                                onClick={() => handleMethodSelect("pickup")}
                                className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-muted hover:border-[#c41e3a] hover:bg-[#c41e3a]/5 transition-all duration-300 text-left"
                            >
                                <div className="h-14 w-14 rounded-full bg-[#c41e3a]/10 text-[#c41e3a] flex items-center justify-center shrink-0 group-hover:bg-[#c41e3a] group-hover:text-white transition-colors duration-300">
                                    <Store className="h-7 w-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-[#c41e3a] transition-colors">
                                        Pickup
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Order ahead and pick up in store.
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-xs text-muted-foreground">
                                By continuing, you agree to our <a href="/terms" className="underline hover:text-primary">Terms of Use</a>.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <AddressEntryModal
                open={addressModalOpen}
                onOpenChange={setAddressModalOpen}
                onConfirm={(addr) => {
                    console.log("Confirmed address:", addr)
                    setAddressModalOpen(false)
                    // Proceed to menu or next step
                    window.location.href = "/menu"
                }}
            />
        </>
    )
}
