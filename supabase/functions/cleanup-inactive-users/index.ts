import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // 1. Get List of all users from Auth
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
        if (listError) throw listError

        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        const inactiveUsers = users.filter(u => {
            const lastSignIn = u.last_sign_in_at ? new Date(u.last_sign_in_at) : new Date(u.created_at)
            return lastSignIn < threeMonthsAgo
        })

        const results = []

        for (const user of inactiveUsers) {
            // 2. Check if user has any orders
            const { count, error: orderError } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)

            if (orderError) continue

            if (count === 0) {
                // 3. User is inactive and has never ordered. Notify and Delete.
                console.log(`Resource Management: Deleting inactive user ${user.email} (last login: ${user.last_sign_in_at})`)

                // Notify via Resend
                if (RESEND_API_KEY) {
                    await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${RESEND_API_KEY}`,
                        },
                        body: JSON.stringify({
                            from: 'The A Cake <security@theacake.com>',
                            to: [user.email],
                            subject: 'Account Maintenance Notice',
                            html: `
                                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                    <h2>Account Deactivation Notice</h2>
                                    <p>Blessings, Friend!</p>
                                    <p>To ensure we provide the best experience for our active family while managing our resources responsibly, we periodically clean up inactive accounts.</p>
                                    <p>Since you haven't logged in for over 3 months and have no order history, your account has been removed to conserve space on our free-tier systems.</p>
                                    <p>You're always welcome back! Feel free to create a new account whenever you're ready for some organic treats.</p>
                                    <p>Stay sweet!</p>
                                </div>
                            `,
                        }),
                    })
                }

                // Delete User
                const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
                if (!deleteError) {
                    results.push({ email: user.email, status: 'deleted' })
                }
            }
        }

        return new Response(JSON.stringify({ success: true, results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        })
    }
})
