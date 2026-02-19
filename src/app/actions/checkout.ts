'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { calculatePoints } from "@/lib/rewards"
import { z } from "zod"

const OrderItemSchema = z.object({
    id: z.string().uuid(),
    quantity: z.number().int().positive(),
    price: z.number().int().positive(),
    isOrganic: z.boolean().optional()
})

const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1),
    total: z.number().int().positive(),
    status: z.enum(['received', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']).optional(),
    paymentStatus: z.enum(['pending', 'paid', 'failed']).optional(),
    paymentMethod: z.string().optional(),
    paymentReference: z.string().optional()
})

type OrderItem = {
    id: string // menu item id
    quantity: number
    price: number
    isOrganic?: boolean
}

type CreateOrderParams = {
    items: OrderItem[]
    total: number
    status?: string
    paymentStatus?: 'pending' | 'paid' | 'failed'
    paymentMethod?: string
    paymentReference?: string
}

export async function createOrder(rawParams: z.infer<typeof CreateOrderSchema>) {
    // 0. Validate Input
    const validation = CreateOrderSchema.safeParse(rawParams)
    if (!validation.success) {
        return { success: false, message: "Invalid order data provided." }
    }
    const { items, total, status = 'received', paymentStatus = 'pending', paymentMethod, paymentReference } = validation.data

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    try {
        // 1. Calculate Rewards Points
        const { totalPoints } = calculatePoints(total, items.map(i => ({ isOrganic: i.isOrganic })))

        // 2. Create Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user?.id || null,
                total_amount: total, // stored in cents
                status: status,
                payment_status: paymentStatus,
                payment_method: paymentMethod,
                payment_reference: paymentReference,
                points_earned: paymentStatus === 'paid' ? totalPoints : 0
            })
            .select()
            .single()

        if (orderError) {
            console.error("Error creating order:", orderError)
            return { success: false, message: "Failed to create order record." }
        }

        if (!order) {
            return { success: false, message: "Order created but no data returned." }
        }

        // 3. Update User Points (only if logged in and paid)
        if (user && paymentStatus === 'paid') {
            const { error: pointsError } = await supabase.rpc('increment_user_points', {
                user_uuid: user.id,
                points_to_add: totalPoints
            })

            if (pointsError) {
                console.error("Error updating user points:", pointsError)
                // We don't fail the order if points fail, but good to log
            }
        }

        // 4. Create Order Items
        const orderItems = items.map(item => ({
            order_id: order.id,
            menu_item_id: item.id,
            quantity: item.quantity,
            price_at_time: item.price
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            console.error("Error creating order items:", itemsError)
            // Potential rollback logic here (delete order), but keeping simple for now
            return { success: false, message: "Failed to add items to order." }
        }

        revalidatePath('/profile')
        return { success: true, orderId: order.id }

    } catch (error) {
        console.error("Server error creating order:", error)
        return { success: false, message: "Internal server error." }
    }
}
