'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type CateringFormData = {
    name: string
    email: string
    phone: string
    eventDate: string
    guestCount: string
    eventType: string
    message: string
}

export type ActionResponse = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
}

export async function submitCateringRequest(data: CateringFormData): Promise<ActionResponse> {
    const supabase = await createClient()

    // Basic validation (can be enhanced with Zod)
    if (!data.name || !data.email) {
        return { success: false, message: "Name and Email are required." }
    }

    try {
        const { error } = await supabase
            .from('catering_requests')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                event_date: data.eventDate || null,
                guest_count: parseInt(data.guestCount) || 0,
                event_type: data.eventType,
                message: data.message,
                status: 'pending'
            })

        if (error) {
            console.error("Supabase Error:", error)
            return { success: false, message: "Failed to submit request. Please try again." }
        }

        revalidatePath('/catering')
        return { success: true, message: "Request submitted successfully!" }
    } catch (error) {
        console.error("Server Error:", error)
        return { success: false, message: "An unexpected error occurred." }
    }
}
