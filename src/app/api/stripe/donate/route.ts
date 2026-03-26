import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface DonateBody {
  amount_cents: number;
  email: string;
  name: string;
  is_recurring: boolean;
  covered_fees?: boolean;
  in_honor_of?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DonateBody = await request.json();

    if (!body.amount_cents || body.amount_cents < 100) {
      return NextResponse.json(
        { error: "Minimum donation is $1.00" },
        { status: 400 }
      );
    }

    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    const totalCents = body.covered_fees
      ? Math.round(body.amount_cents * 1.03)
      : body.amount_cents;

    const metadata: Record<string, string> = {
      donor_name: body.name,
      donor_email: body.email,
      original_amount_cents: String(body.amount_cents),
      covered_fees: String(!!body.covered_fees),
    };

    if (body.in_honor_of) {
      metadata.in_honor_of = body.in_honor_of;
    }

    if (body.is_recurring) {
      // Create or retrieve a Stripe customer
      const customers = await stripe.customers.list({
        email: body.email,
        limit: 1,
      });

      const customer =
        customers.data.length > 0
          ? customers.data[0]
          : await stripe.customers.create({
              email: body.email,
              name: body.name,
              metadata,
            });

      // Create a price for the recurring donation
      const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: totalCents,
        recurring: { interval: "month" },
        product_data: {
          name: `BBG Monthly Donation - $${(totalCents / 100).toFixed(2)}`,
        },
      });

      // Create a subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
        metadata,
      });

      const invoice = subscription.latest_invoice as any;
      const paymentIntent = invoice?.payment_intent as any;

      return NextResponse.json({
        type: "subscription",
        subscription_id: subscription.id,
        client_secret: paymentIntent?.client_secret,
      });
    } else {
      // One-time donation: create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCents,
        currency: "usd",
        receipt_email: body.email,
        metadata,
      });

      return NextResponse.json({
        type: "payment_intent",
        client_secret: paymentIntent.client_secret,
      });
    }
  } catch (error) {
    console.error("[Stripe Donate] Error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
}
