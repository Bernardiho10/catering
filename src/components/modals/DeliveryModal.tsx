"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, Truck, Store, Clock, ChevronRight } from "lucide-react"

interface DeliveryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const DELIVERY_AREAS = [
    { id: "downtown", name: "Downtown", deliveryTime: "25-35 min" },
    { id: "midtown", name: "Midtown", deliveryTime: "30-40 min" },
    { id: "uptown", name: "Uptown", deliveryTime: "35-45 min" },
    { id: "suburbs", name: "Suburbs", deliveryTime: "40-50 min" },
]

export function DeliveryModal({ open, onOpenChange }: DeliveryModalProps) {
    const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery")
    const [address, setAddress] = useState("")
    const [selectedArea, setSelectedArea] = useState("")
    const [step, setStep] = useState<"type" | "address" | "confirm">("type")

    const handleContinue = () => {
        if (step === "type") {
            setStep("address")
        } else if (step === "address") {
            setStep("confirm")
        } else {
            // Final confirmation - close modal
            onOpenChange(false)
            setStep("type")
        }
    }

    const handleBack = () => {
        if (step === "address") {
            setStep("type")
        } else if (step === "confirm") {
            setStep("address")
        }
    }

    const resetAndClose = () => {
        setStep("type")
        setAddress("")
        setSelectedArea("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={resetAndClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-border rounded-2xl p-0 overflow-hidden">
                <div className="p-6">
                    <DialogHeader className="space-y-3 mb-6">
                        <DialogTitle className="text-2xl font-heading font-semibold text-foreground">
                            {step === "type" && "How would you like to receive your order?"}
                            {step === "address" && (orderType === "delivery" ? "Enter Delivery Address" : "Select Pickup Location")}
                            {step === "confirm" && "Confirm Your Selection"}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            {step === "type" && "Choose delivery or pickup to get started."}
                            {step === "address" && orderType === "delivery" && "We'll show you the freshest items available in your area."}
                            {step === "address" && orderType === "pickup" && "Select your preferred pickup location."}
                            {step === "confirm" && "Review your order type and location."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Step 1: Order Type Selection */}
                    {step === "type" && (
                        <div className="space-y-4">
                            <RadioGroup
                                value={orderType}
                                onValueChange={(value) => setOrderType(value as "delivery" | "pickup")}
                                className="grid grid-cols-2 gap-4"
                            >
                                <Label
                                    htmlFor="delivery"
                                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${orderType === "delivery"
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                        }`}
                                >
                                    <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                                    <div className={`p-3 rounded-full ${orderType === "delivery" ? "bg-primary text-white" : "bg-muted"}`}>
                                        <Truck className="h-6 w-6" />
                                    </div>
                                    <span className="font-semibold text-foreground">Delivery</span>
                                    <span className="text-xs text-muted-foreground text-center">We bring it to you</span>
                                </Label>
                                <Label
                                    htmlFor="pickup"
                                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${orderType === "pickup"
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                        }`}
                                >
                                    <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                                    <div className={`p-3 rounded-full ${orderType === "pickup" ? "bg-primary text-white" : "bg-muted"}`}>
                                        <Store className="h-6 w-6" />
                                    </div>
                                    <span className="font-semibold text-foreground">Pickup</span>
                                    <span className="text-xs text-muted-foreground text-center">Pick up at our store</span>
                                </Label>
                            </RadioGroup>
                        </div>
                    )}

                    {/* Step 2: Address/Location Selection */}
                    {step === "address" && orderType === "delivery" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium">
                                    Delivery Address
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="address"
                                        placeholder="Enter your street address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="pl-10 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Or select a delivery area</Label>
                                <RadioGroup value={selectedArea} onValueChange={setSelectedArea} className="space-y-2">
                                    {DELIVERY_AREAS.map((area) => (
                                        <Label
                                            key={area.id}
                                            htmlFor={area.id}
                                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedArea === area.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value={area.id} id={area.id} />
                                                <span className="font-medium">{area.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {area.deliveryTime}
                                            </div>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    )}

                    {step === "address" && orderType === "pickup" && (
                        <div className="space-y-4">
                            <RadioGroup value={selectedArea} onValueChange={setSelectedArea} className="space-y-2">
                                {[
                                    { id: "main-store", name: "Main Street Store", address: "123 Main St", hours: "8am - 10pm" },
                                    { id: "oak-store", name: "Oak Avenue Location", address: "456 Oak Ave", hours: "9am - 9pm" },
                                    { id: "park-store", name: "Central Park Store", address: "789 Park Blvd", hours: "7am - 11pm" },
                                ].map((store) => (
                                    <Label
                                        key={store.id}
                                        htmlFor={store.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedArea === store.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value={store.id} id={store.id} />
                                            <div>
                                                <p className="font-medium">{store.name}</p>
                                                <p className="text-sm text-muted-foreground">{store.address}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">{store.hours}</div>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === "confirm" && (
                        <div className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-xl space-y-3">
                                <div className="flex items-center gap-3">
                                    {orderType === "delivery" ? (
                                        <Truck className="h-5 w-5 text-primary" />
                                    ) : (
                                        <Store className="h-5 w-5 text-primary" />
                                    )}
                                    <span className="font-semibold capitalize">{orderType}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {address || DELIVERY_AREAS.find(a => a.id === selectedArea)?.name || "Selected location"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="border-t border-border bg-muted/30 p-4 flex gap-3">
                    {step !== "type" && (
                        <Button variant="outline" onClick={handleBack} className="rounded-full">
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={handleContinue}
                        className="flex-1 rounded-full h-12"
                        disabled={step === "address" && !address && !selectedArea}
                    >
                        {step === "confirm" ? "Start Ordering" : "Continue"}
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
