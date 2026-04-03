import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { donationSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = donationSchema.parse(body)

    const amountCents = validated.amount_cents
    const totalCents = validated.covered_fees ? Math.round(amountCents * 1.03) : amountCents

    // For recurring donations, create a subscription
    if (validated.is_recurring) {
      const customer = await stripe.customers.create({
        email: validated.email,
        name: `${validated.first_name} ${validated.last_name}`,
      })

      const price = await stripe.prices.create({
        unit_amount: totalCents,
        currency: 'usd',
        recurring: { interval: 'month' },
        product_data: { name: 'BBG Monthly Donation' },
      })

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          donor_first_name: validated.first_name,
          donor_last_name: validated.last_name,
          donor_email: validated.email,
          is_anonymous: String(validated.is_anonymous),
          in_honor_of: validated.in_honor_of || '',
        },
      })

      const invoice = subscription.latest_invoice as any
      const subPaymentIntent = invoice.payment_intent as any

      return NextResponse.json({
        clientSecret: subPaymentIntent.client_secret,
        subscriptionId: subscription.id,
      })
    }

    // One-time donation
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      metadata: {
        donor_first_name: validated.first_name,
        donor_last_name: validated.last_name,
        donor_email: validated.email,
        is_recurring: 'false',
        is_anonymous: String(validated.is_anonymous),
        in_honor_of: validated.in_honor_of || '',
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error('Donation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 400 }
    )
  }
}
