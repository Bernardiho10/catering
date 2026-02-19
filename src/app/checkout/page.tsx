"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/features/cart/store"
import { formatCurrency, cn } from "@/lib/utils"
import { ShoppingBag, ChevronRight, X, User, Search, MapPin, Gift, RotateCcw, Users, Clock, Calendar, Info, CreditCard, ChevronDown, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function CheckoutPage() {
    const { items, total, fullAddress, shippingDate, senderInfo, recipientInfo, giftInfo, setCheckoutInfo } = useCartStore()
    const [currentStep, setCurrentStep] = useState(1)
    const [expandedStep, setExpandedStep] = useState<number | null>(1)

    const steps = [
        { id: 1, title: "Shipping Date", icon: Calendar },
        { id: 2, title: "Your Information", icon: User },
        { id: 3, title: "Recipient Details", icon: Users },
        { id: 4, title: "Gift Details", icon: Gift },
        { id: 5, title: "Payment Information", icon: CreditCard },
        { id: 6, title: "Review", icon: Info },
    ]

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="text-center space-y-8 max-w-sm">
                    <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBag className="h-12 w-12 text-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-black text-primary uppercase tracking-tighter">Your cart is empty</h1>
                        <p className="text-primary/60 font-medium">Add some organic blessings to your cart to proceed with checkout.</p>
                    </div>
                    <Link href="/menu">
                        <Button className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]">
                            Go to Menu
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 bg-white border-b border-blue-50 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-[#001ba0] flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#001ba0] rounded-full" />
                        </div>
                    </div>
                    <span className="text-2xl font-black text-[#001ba0] uppercase tracking-tighter">The A Cake</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#001ba0] flex items-center gap-2 px-6 h-10 border border-blue-50 rounded-sm hover:bg-blue-50 transition-colors">
                        <User className="h-3 w-3" />
                        Log In
                    </button>
                    <button
                        onClick={() => window.location.href = '/menu'}
                        className="text-[10px] font-black uppercase tracking-widest text-[#001ba0] flex items-center gap-2 px-6 h-10 border border-blue-50 rounded-sm hover:bg-blue-50 transition-colors"
                    >
                        <RotateCcw className="h-3 w-3" />
                        Start Over
                    </button>
                </div>
            </div>

            <div className="min-h-[calc(100vh-64px)] bg-white overflow-y-auto px-6 py-12 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Progress Stepper */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-1 h-3 bg-blue-50 rounded-full overflow-hidden">
                            {steps.map((s) => (
                                <div
                                    key={s.id}
                                    className={cn(
                                        "flex-1 h-full transition-all duration-500",
                                        s.id <= currentStep ? "bg-[#001ba0]" : "bg-transparent"
                                    )}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#001ba0]/40">
                            <span>Progress</span>
                            <span>Step {currentStep}/6</span>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={cn(
                                    "bg-white rounded-sm overflow-hidden transition-all duration-300",
                                    expandedStep === step.id ? "border border-blue-100 shadow-sm" : "border-b border-blue-50 h-20 flex items-center"
                                )}
                            >
                                <button
                                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                    className={cn(
                                        "w-full text-left flex items-center justify-between",
                                        expandedStep === step.id ? "p-8 border-b border-blue-50 bg-blue-50/5" : "px-8"
                                    )}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-10 w-10 flex items-center justify-center rounded-full text-lg font-black transition-all",
                                            currentStep >= step.id ? "bg-[#001ba0] text-white" : "bg-blue-50 text-primary/20"
                                        )}>
                                            {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                                        </div>
                                        <h2 className={cn(
                                            "text-xl font-black uppercase tracking-tighter",
                                            currentStep >= step.id ? "text-primary" : "text-primary/20"
                                        )}>
                                            {step.title}
                                        </h2>
                                    </div>
                                    {expandedStep !== step.id && (
                                        <ChevronDown className="h-6 w-6 text-primary/20" />
                                    )}
                                </button>

                                {expandedStep === step.id && (
                                    <BlurFade delay={0.1} className="p-8 space-y-8">
                                        {step.id === 1 && (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-bold text-primary">Shipping Date</h3>
                                                    <p className="text-sm text-primary/60 italic font-medium leading-relaxed">
                                                        Select when you would like your treats to ship. <br />
                                                        <span className="text-[#001ba0]">Orders ship out on your selected date and transit time is 1-3 days.</span>
                                                    </p>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={shippingDate || ""}
                                                        onChange={(e) => setCheckoutInfo({ shippingDate: e.target.value })}
                                                        className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                    />
                                                </div>
                                                <Button
                                                    onClick={() => { setCurrentStep(2); setExpandedStep(2); }}
                                                    disabled={!shippingDate}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        )}
                                        {step.id === 2 && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">First Name</label>
                                                        <input
                                                            type="text"
                                                            value={senderInfo?.firstName || ""}
                                                            onChange={(e) => setCheckoutInfo({ senderInfo: { ...senderInfo!, firstName: e.target.value } })}
                                                            className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                            placeholder="Abraham"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Last Name</label>
                                                        <input
                                                            type="text"
                                                            value={senderInfo?.lastName || ""}
                                                            onChange={(e) => setCheckoutInfo({ senderInfo: { ...senderInfo!, lastName: e.target.value } })}
                                                            className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                            placeholder="Delight"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={senderInfo?.email || ""}
                                                        onChange={(e) => setCheckoutInfo({ senderInfo: { ...senderInfo!, email: e.target.value } })}
                                                        className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                        placeholder="hello@theacake.com"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={senderInfo?.phone || ""}
                                                        onChange={(e) => setCheckoutInfo({ senderInfo: { ...senderInfo!, phone: e.target.value } })}
                                                        className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                        placeholder="(832) 713-0868"
                                                    />
                                                </div>
                                                <Button
                                                    onClick={() => { setCurrentStep(3); setExpandedStep(3); }}
                                                    disabled={!senderInfo?.firstName || !senderInfo?.lastName || !senderInfo?.email || !senderInfo?.phone}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        )}
                                        {step.id === 3 && (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Recipient Name</label>
                                                    <input
                                                        type="text"
                                                        value={recipientInfo?.name || ""}
                                                        onChange={(e) => setCheckoutInfo({ recipientInfo: { ...recipientInfo!, name: e.target.value } })}
                                                        className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                        placeholder="Mary Jane"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Delivery Address</label>
                                                    <input
                                                        type="text"
                                                        value={recipientInfo?.address || fullAddress || ""}
                                                        onChange={(e) => setCheckoutInfo({ recipientInfo: { ...recipientInfo!, address: e.target.value } })}
                                                        className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                        placeholder="123 Blessing Lane, Houston, TX"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Special Instructions (Optional)</label>
                                                    <textarea
                                                        value={recipientInfo?.instructions || ""}
                                                        onChange={(e) => setCheckoutInfo({ recipientInfo: { ...recipientInfo!, instructions: e.target.value } })}
                                                        className="w-full h-32 border-2 border-blue-100 rounded-sm p-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all resize-none"
                                                        placeholder="Gate code 1234, leave at the front door..."
                                                    />
                                                </div>
                                                <Button
                                                    onClick={() => { setCurrentStep(4); setExpandedStep(4); }}
                                                    disabled={!recipientInfo?.name || (!recipientInfo?.address && !fullAddress)}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        )}
                                        {step.id === 4 && (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Gift Message (Optional)</label>
                                                    <textarea
                                                        value={giftInfo?.message || ""}
                                                        onChange={(e) => setCheckoutInfo({ giftInfo: { ...giftInfo!, message: e.target.value } })}
                                                        className="w-full h-32 border-2 border-blue-100 rounded-sm p-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all resize-none"
                                                        placeholder="To: [Name], Message: [Your Message], From: [Your Name]"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-4 p-6 bg-blue-50/20 border border-blue-50 rounded-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={giftInfo?.isGiftWrapped || false}
                                                        onChange={(e) => setCheckoutInfo({ giftInfo: { ...giftInfo!, isGiftWrapped: e.target.checked } })}
                                                        className="h-5 w-5 rounded border-blue-100 text-[#001ba0] focus:ring-[#001ba0]"
                                                        id="gift-wrap"
                                                    />
                                                    <label htmlFor="gift-wrap" className="flex-1 cursor-pointer">
                                                        <span className="block text-sm font-black uppercase tracking-widest text-[#001ba0]">Signature Gift Wrapping</span>
                                                        <span className="block text-[10px] text-primary/40 font-medium">Add a beautiful royal blue ribbon and gold seal to your Blessing.</span>
                                                    </label>
                                                    <Gift className="h-6 w-6 text-[#001ba0]/20" />
                                                </div>
                                                <Button
                                                    onClick={() => { setCurrentStep(5); setExpandedStep(5); }}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        )}
                                        {step.id === 5 && (
                                            <div className="space-y-6">
                                                <div className="p-8 bg-blue-50/10 border border-blue-50 rounded-sm space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Card Number</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 pr-12 outline-none focus:border-[#001ba0] font-medium text-primary transition-all tracking-[0.2em]"
                                                                placeholder="0000 0000 0000 0000"
                                                            />
                                                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/20" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Expiry</label>
                                                            <input
                                                                type="text"
                                                                className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                                placeholder="MM/YY"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">CVV</label>
                                                            <input
                                                                type="text"
                                                                className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                                placeholder="123"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Billing Zip</label>
                                                            <input
                                                                type="text"
                                                                className="w-full h-14 border-2 border-blue-100 rounded-sm px-6 outline-none focus:border-[#001ba0] font-medium text-primary transition-all"
                                                                placeholder="77001"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary/40 px-2">
                                                    <Lock className="h-3 w-3" />
                                                    Secure 256-bit SSL encrypted payment
                                                </div>
                                                <Button
                                                    onClick={() => { setCurrentStep(6); setExpandedStep(6); }}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Review & Place Order
                                                </Button>
                                            </div>
                                        )}
                                        {step.id === 6 && (
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h3 className="text-xl font-bold text-primary">Order Review</h3>
                                                    <p className="text-sm text-primary/60 italic font-medium leading-relaxed">
                                                        Please confirm all details before placing your blessing.
                                                    </p>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div className="p-6 border border-blue-50 rounded-sm space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40">Shipping Address</h4>
                                                            <p className="text-sm font-bold text-primary">{recipientInfo?.name || "Abraham Delight"}</p>
                                                            <p className="text-xs text-primary/60 font-medium">{recipientInfo?.address || fullAddress || "123 Main St, Houston, TX"}</p>
                                                        </div>
                                                        <div className="p-6 border border-blue-50 rounded-sm space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40">Shipping Date</h4>
                                                            <p className="text-sm font-bold text-primary">{shippingDate ? new Date(shippingDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : "Select a date"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="p-6 border border-blue-50 rounded-sm space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40">Your Information</h4>
                                                            <p className="text-sm font-bold text-primary">{senderInfo?.firstName} {senderInfo?.lastName}</p>
                                                            <p className="text-xs text-primary/60 font-medium">{senderInfo?.email}</p>
                                                            <p className="text-xs text-primary/60 font-medium">{senderInfo?.phone}</p>
                                                        </div>
                                                        <div className="p-6 border border-blue-50 rounded-sm space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40">Gift Message</h4>
                                                            <p className="text-xs text-primary/60 font-medium italic">{giftInfo?.message || "No message provided."}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => { alert('Blessing Placed Successfully!'); window.location.href = '/tracker'; }}
                                                    className="w-full h-14 bg-[#001ba0] hover:bg-[#001580] text-white rounded-sm font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Place Order ({formatCurrency(total)})
                                                </Button>
                                            </div>
                                        )}
                                    </BlurFade>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

