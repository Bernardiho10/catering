
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Truck, ChefHat } from "lucide-react"

interface OrderTrackerProps {
    orderId: string
    initialStatus: string
    initialCheckpoints: any[]
}

const STATUS_STEPS = [
    { key: 'received', label: 'Order Received', icon: Clock },
    { key: 'preparing', label: 'Preparing', icon: ChefHat },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
]

export function OrderTracker({ orderId, initialStatus, initialCheckpoints }: OrderTrackerProps) {
    const [status, setStatus] = useState(initialStatus)
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel(`order-${orderId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${orderId}`,
                },
                (payload) => {
                    setStatus(payload.new.status)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [orderId, supabase])

    const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === status)

    // Fallback if status not in list (e.g. cancelled)
    if (currentStepIndex === -1 && status === 'cancelled') {
        return <div className="text-red-500 font-bold text-center p-4">Order Cancelled</div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative flex flex-col gap-8 pl-6 border-l-2 border-muted ml-4 my-4">
                    {STATUS_STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex
                        const isCurrent = index === currentStepIndex
                        const Icon = step.icon

                        return (
                            <div key={step.key} className={`relative flex items-center gap-4 ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                <div className={`absolute -left-[31px] bg-background p-1 border-2 rounded-full ${isCompleted ? 'border-primary' : 'border-muted'}`}>
                                    <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${isCurrent ? 'bg-primary/10 text-primary' : ''}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold">{step.label}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
