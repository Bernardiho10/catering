import OrderHistory from "@/components/profile/OrderHistory"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Order History | Cake Delivery",
    description: "View and reorder your past purchases.",
}

export default function OrdersPage() {
    return <OrderHistory />
}
