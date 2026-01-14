
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OrderTracker } from "@/features/orders/components/OrderTracker"
import { formatCurrency } from "@/lib/utils"

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: order } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                *,
                menu_items (
                    name,
                    image_url
                )
            )
        `)
        .eq("id", params.id)
        .single()

    if (!order) {
        return <div>Order not found</div>
    }

    // Fetch checkpoints if needed, or rely on order status update
    // implementing simple checkpoints fetching if table occupied
    const { data: checkpoints } = await supabase
        .from("checkpoints")
        .select("*")
        .eq("order_id", params.id)
        .order("created_at", { ascending: true })

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                    <h2 className="font-semibold text-lg">Items</h2>
                    {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <span className="font-bold text-sm w-6 text-center">{item.quantity}x</span>
                                <div>
                                    <div className="font-medium">{item.menu_items?.name || 'Unknown Item'}</div>
                                    {/* Options display could go here */}
                                </div>
                            </div>
                            <div>{formatCurrency(item.price_at_time)}</div>
                        </div>
                    ))}
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(order.total_amount)}</span>
                    </div>
                </div>
            </div>

            <div>
                <OrderTracker
                    orderId={order.id}
                    initialStatus={order.status}
                    initialCheckpoints={checkpoints || []}
                />
            </div>
        </div>
    )
}
