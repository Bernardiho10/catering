
'use server'

import { stripe } from "@/lib/stripe"

export async function createPaymentIntent(amount: number) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        })

        return { clientSecret: paymentIntent.client_secret }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return { error: `Internal Server Error: ${message}` }
    }
}
