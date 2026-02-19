import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async (payload: EmailPayload) => {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set. Logging email payload instead:");
    console.log(JSON.stringify(payload, null, 2));
    return { success: true, simulated: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'The A Cake <orders@theacake.com>',
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  return await res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { record, type, table } = await req.json()
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 1. Handle Welcome Email (Triggers on public.users INSERT)
    if (table === 'users' && type === 'INSERT') {
      const { data: { user } } = await supabase.auth.admin.getUserById(record.id)
      const email = user?.email
      if (email) {
        await sendEmail({
          to: email,
          subject: "Welcome to The A Cake Fam!",
          html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                            <h1 style="color: #0c4a6e;">Blessings, ${record.full_name || 'Friend'}!</h1>
                            <p>We're thrilled to have you join The A Cake family. You're now part of a community that appreciates organic, premium treats made with love.</p>
                            <p>As a member, you'll earn points on every purchase and get early access to our seasonal flavors.</p>
                            <a href="${SUPABASE_URL.replace('.supabase.co', '')}" style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 20px;">Browse Flavors</a>
                            <p style="margin-top: 30px; font-size: 12px; color: #666;">If you have any questions, just reply to this email!</p>
                        </div>
                    `
        })
      }
    }

    // 2. Handle Order Emails (Triggers on public.orders)
    if (table === 'orders') {
      const { data: { user } } = await supabase.auth.admin.getUserById(record.user_id)
      const email = user?.email
      if (!email) throw new Error('No email found for order')

      // Case A: Order Confirmation (INSERT or payment_status becomes 'paid')
      if (type === 'INSERT' && record.payment_status === 'paid') {
        await sendEmail({
          to: email,
          subject: `Order Confirmed - #${record.id.slice(0, 8)}`,
          html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                            <h1 style="color: #0c4a6e;">Payment Received!</h1>
                            <p>Your order <strong>#${record.id.slice(0, 8)}</strong> has been confirmed and is being prepared with organic care.</p>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 0;"><strong>Total:</strong> ${record.total_amount / 100} NGN</p>
                                <p style="margin: 5px 0 0;"><strong>Status:</strong> Preparing</p>
                            </div>
                            <p>You can track your order live on our website.</p>
                            <a href="${SUPABASE_URL.replace('.supabase.co', '')}/tracker?id=${record.id}" style="background: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">Track My Cake</a>
                        </div>
                    `
        })
      }

      // Case B: Delivery Confirmation (status becomes 'delivered')
      if (type === 'UPDATE' && record.status === 'delivered') {
        await sendEmail({
          to: email,
          subject: "Your Treats have Arrived!",
          html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                            <h1 style="color: #15803d;">Delivered!</h1>
                            <p>Great news! Your order from The A Cake has been delivered. We hope it brings a smile to your face.</p>
                            <p>Don't forget to share your experience and tag us!</p>
                            <div style="margin-top: 20px; font-style: italic;">"A taste of heaven, grown from the earth."</div>
                        </div>
                    `
        })
      }
    }

    return new Response(JSON.stringify({ success: true }), {
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
