import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceSupabase } from '@/lib/supabase/server'
import { sendDonationReceipt } from '@/lib/resend'
import { formatCents } from '@/lib/utils'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceSupabase()

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      const meta = paymentIntent.metadata

      await supabase.from('donations').insert({
        donor_first_name: meta.donor_first_name,
        donor_last_name: meta.donor_last_name,
        donor_email: meta.donor_email,
        amount_cents: paymentIntent.amount,
        is_recurring: meta.is_recurring === 'true',
        is_anonymous: meta.is_anonymous === 'true',
        in_honor_of: meta.in_honor_of || null,
        covered_fees: false,
        stripe_payment_intent_id: paymentIntent.id,
        stripe_customer_id: (paymentIntent.customer as string) || null,
        status: 'succeeded',
      })

      if (meta.donor_email) {
        try {
          await sendDonationReceipt({
            to: meta.donor_email,
            name: `${meta.donor_first_name} ${meta.donor_last_name}`,
            amount: formatCents(paymentIntent.amount),
            date: new Date().toLocaleDateString(),
            isRecurring: meta.is_recurring === 'true',
          })
        } catch (emailErr) {
          console.error('Donation receipt email failed:', emailErr)
        }
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      const meta = paymentIntent.metadata

      await supabase.from('donations').insert({
        donor_first_name: meta.donor_first_name,
        donor_last_name: meta.donor_last_name,
        donor_email: meta.donor_email,
        amount_cents: paymentIntent.amount,
        is_recurring: meta.is_recurring === 'true',
        is_anonymous: meta.is_anonymous === 'true',
        stripe_payment_intent_id: paymentIntent.id,
        status: 'failed',
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
