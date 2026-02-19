"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Clock, MapPin, Truck, Package, ChefHat, Home, RefreshCw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency, cn } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"

const STEPS = [
    { id: 'received', label: "Order Received", icon: Clock },
    { id: 'preparing', label: "Baking", icon: ChefHat },
    { id: 'boxing', label: "Quality Check", icon: Package },
    { id: 'out_for_delivery', label: "Ready / Out for Delivery", icon: Truck },
]

const STATUS_ORDER = ['received', 'preparing', 'boxing', 'out_for_delivery', 'delivered']

export default function OrderTracker() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('id')
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isSimulating, setIsSimulating] = useState(false)
    const supabase = createClient()

    const fetchOrder = async () => {
        if (!orderId) return
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    menu_items (*)
                )
            `)
            .eq('id', orderId)
            .single()

        if (error) {
            console.error(error)
        } else {
            setOrder(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOrder()

        // Real-time subscription
        const channel = supabase
            .channel('order-status')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'orders',
                filter: `id=eq.${orderId}`
            }, (payload) => {
                setOrder((prev: any) => ({ ...prev, ...payload.new }))
                toast.info(`Status updated: ${payload.new.status.replace('_', ' ')}`)
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [orderId])

    const advanceStatus = async () => {
        if (!order) return
        setIsSimulating(true)
        const currentIndex = STATUS_ORDER.indexOf(order.status)
        const nextStatus = STATUS_ORDER[currentIndex + 1]

        if (!nextStatus) {
            toast.info("Order is already delivered!")
            setIsSimulating(false)
            return
        }

        const { error } = await supabase
            .from('orders')
            .update({ status: nextStatus })
            .eq('id', order.id)

        if (error) {
            toast.error(error.message)
        }
        setIsSimulating(false)
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Fetching your treats status...</p>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                <Package className="w-16 h-16 mx-auto text-muted mb-4 opacity-50" />
                <h2 className="text-2xl font-bold">No active order found</h2>
                <p className="text-muted-foreground mt-2">Make sure you have the correct tracking ID.</p>
                <Link href="/menu">
                    <Button className="mt-8 rounded-full px-8">Order Something Fresh</Button>
                </Link>
            </div>
        )
    }

    const currentStepIndex = STATUS_ORDER.indexOf(order.status)
    const progressPercent = ((currentStepIndex + 1) / STATUS_ORDER.length) * 100

    return (
        <div className="max-w-3xl mx-auto space-y-8 p-4 md:p-8">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center px-4 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                    Direct Kitchen Feed
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">Checking on Your Cake?</h1>
                <p className="text-lg text-primary italic font-serif leading-none tracking-normal">We&apos;re currently in the kitchen making a miracle happen.</p>
                <p className="text-sm text-primary/60 font-medium max-w-md mx-auto">
                    Enter your order number below to see exactly where your cake is in our baking process—from the mixing bowl to your front door.
                </p>
                <p className="text-xs font-black text-primary/40 uppercase tracking-widest pt-4">Order #{order.id.slice(0, 8)}</p>
            </div>

            {/* Stepper */}
            <div className="relative pt-10 pb-6">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                    style={{ width: `${progressPercent}%` }}
                />

                <div className="relative z-10 flex justify-between">
                    {STEPS.map((step, idx) => {
                        const isCompleted = idx < currentStepIndex
                        const isCurrent = idx === currentStepIndex
                        const Icon = step.icon

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-3">
                                <motion.div
                                    animate={{
                                        scale: isCurrent ? 1.2 : 1,
                                        backgroundColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--background))",
                                        borderColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--muted))"
                                    }}
                                    className={cn(
                                        "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-shadow",
                                        (isCompleted || isCurrent) ? "text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground bg-muted/30"
                                    )}
                                >
                                    {isCompleted ? <Check className="h-6 w-6 stroke-[3px]" /> : <Icon className="h-6 w-6" />}
                                </motion.div>
                                <span className={cn(
                                    "text-[10px] md:text-sm font-bold text-center max-w-[80px]",
                                    isCurrent ? "text-primary" : "text-muted-foreground opacity-70"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={order.status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <Card className="border-primary/20 bg-primary/5 overflow-hidden">
                        <div className="h-2 bg-primary/20">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2 }}
                            />
                        </div>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                                {order.status === 'received' && "Order Received! 🙏"}
                                {order.status === 'preparing' && "Baking in Progress... 🧁"}
                                {order.status === 'boxing' && "Quality Check... ✨"}
                                {order.status === 'out_for_delivery' && "Ready / Out for Delivery! 🚚"}
                                {order.status === 'delivered' && "Delivered with Love! ❤️"}
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-primary/60 italic">
                                {order.status === 'received' && "We've confirmed your blessing and are getting the oven ready."}
                                {order.status === 'preparing' && "Our master bakers are handcrafted your organic treats."}
                                {order.status === 'boxing' && "We're performing a final inspection and premium packaging."}
                                {order.status === 'out_for_delivery' && "The Treat Truck is on its way with your fresh blessing."}
                                {order.status === 'delivered' && "We hope this cake brings a smile to your family's table!"}
                            </CardDescription>
                        </CardHeader>
                        {order.status === 'out_for_delivery' && (
                            <CardContent className="space-y-6 flex flex-col items-center">
                                <div className="flex items-center gap-4 bg-background p-4 rounded-3xl shadow-xl w-full max-w-sm border border-primary/10">
                                    <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                                        👨‍🍳
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold">Efe Cakeson</div>
                                        <div className="text-sm text-muted-foreground font-medium">Top-Rated Delivery Partner</div>
                                    </div>
                                    <Link href={`tel:123`}>
                                        <Button size="icon" variant="outline" className="rounded-2xl border-primary/20 h-12 w-12 text-primary">
                                            <Truck className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        )}
                        {order.status === 'delivered' && (
                            <CardContent className="flex justify-center pb-8">
                                <Link href="/reviews">
                                    <Button className="rounded-full px-8 bg-green-600 hover:bg-green-700">Leave a Review</Button>
                                </Link>
                            </CardContent>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Simulation Controls (Demo Mode Only) */}
            <div className="p-6 border-2 border-dashed border-primary/30 rounded-3xl bg-primary/5 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-primary">Dev Simulation Control</h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">Manual Delivery Advancement</p>
                    </div>
                    <Button
                        size="sm"
                        onClick={advanceStatus}
                        disabled={isSimulating || order.status === 'delivered'}
                        className="rounded-full px-6 font-bold gap-2 shadow-lg shadow-primary/20"
                    >
                        {isSimulating ? "Transitioning..." : "Advance Step"}
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                    <RefreshCw className="w-3 h-3" />
                    Updates status in Supabase Realtime • Triggers Edge Function emails
                </div>
            </div>

            {/* Summary */}
            <Card className="rounded-3xl border shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold font-heading">Order Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center group">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    {item.quantity}x
                                </div>
                                <div>
                                    <div className="font-bold text-sm tracking-tight">{item.menu_items?.name}</div>
                                    <div className="text-xs text-muted-foreground font-medium">{item.menu_items?.category}</div>
                                </div>
                            </div>
                            <div className="font-bold text-sm">{formatCurrency(item.price_at_time * item.quantity)}</div>
                        </div>
                    ))}
                    <div className="flex justify-between pt-6 border-t">
                        <div>
                            <span className="font-bold text-lg">Total Amount</span>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Paid via Paystack</p>
                        </div>
                        <span className="font-bold text-2xl text-primary font-heading tracking-tight">
                            {formatCurrency(order.total_amount)}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
