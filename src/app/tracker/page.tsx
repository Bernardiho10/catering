import OrderTracker from "@/components/orders/OrderTracker"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Track Your Order | Cookie Delivery",
    description: "Real-time status of your delivery.",
}

export default function TrackerPage() {
    return (
        <div className="container mx-auto py-12">
            <OrderTracker />
        </div>
    )
}
