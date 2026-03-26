import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceSupabase } from "@/lib/supabase/server";
import { sendDonationReceipt, sendRegistrationReceipt } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("[Stripe Webhook] Signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  const supabase = createServiceSupabase();

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;

        if (metadata.type === "registration") {
          // Save registration payment
          await supabase
            .from("registrations")
            .update({
              payment_status: "paid",
              stripe_payment_intent_id: paymentIntent.id,
              amount_paid_cents: paymentIntent.amount,
            })
            .eq("id", metadata.registration_id);

          // Send receipt email
          if (metadata.player_name && metadata.event_name && metadata.email) {
            await sendRegistrationReceipt({
              to: metadata.email,
              playerName: metadata.player_name,
              eventName: metadata.event_name,
              amount: `$${(paymentIntent.amount / 100).toFixed(2)}`,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            }).catch((err) =>
              console.error("[Webhook] Failed to send registration receipt:", err)
            );
          }
        } else {
          // Treat as a donation
          await supabase.from("donations").insert({
            donor_first_name: metadata.donor_name?.split(" ")[0] || null,
            donor_last_name:
              metadata.donor_name?.split(" ").slice(1).join(" ") || null,
            donor_email: metadata.donor_email || paymentIntent.receipt_email,
            amount_cents: paymentIntent.amount,
            is_recurring: false,
            stripe_payment_intent_id: paymentIntent.id,
            in_honor_of: metadata.in_honor_of || null,
            is_anonymous: false,
            covered_fees: metadata.covered_fees === "true",
            status: "succeeded",
          });

          // Send donation receipt
          if (metadata.donor_email && metadata.donor_name) {
            await sendDonationReceipt({
              to: metadata.donor_email,
              name: metadata.donor_name,
              amount: `$${(paymentIntent.amount / 100).toFixed(2)}`,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              isRecurring: false,
            }).catch((err) =>
              console.error("[Webhook] Failed to send donation receipt:", err)
            );
          }
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const metadata = subscription.metadata;
        const customer = (await stripe.customers.retrieve(
          subscription.customer as string
        )) as Stripe.Customer;

        await supabase.from("donations").insert({
          donor_first_name: metadata.donor_name?.split(" ")[0] || null,
          donor_last_name:
            metadata.donor_name?.split(" ").slice(1).join(" ") || null,
          donor_email: metadata.donor_email || customer.email,
          amount_cents: Number(metadata.original_amount_cents) || 0,
          is_recurring: true,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          in_honor_of: metadata.in_honor_of || null,
          is_anonymous: false,
          covered_fees: metadata.covered_fees === "true",
          status: "succeeded",
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        // Only handle subscription invoices (not the first one which is handled above)
        if (invoice.subscription && invoice.billing_reason === "subscription_cycle") {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          const metadata = subscription.metadata;
          const customer = (await stripe.customers.retrieve(
            invoice.customer as string
          )) as Stripe.Customer;

          await supabase.from("donations").insert({
            donor_first_name: metadata.donor_name?.split(" ")[0] || null,
            donor_last_name:
              metadata.donor_name?.split(" ").slice(1).join(" ") || null,
            donor_email: metadata.donor_email || customer.email,
            amount_cents: invoice.amount_paid,
            is_recurring: true,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: invoice.customer as string,
            stripe_payment_intent_id:
              typeof invoice.payment_intent === "string"
                ? invoice.payment_intent
                : null,
            in_honor_of: metadata.in_honor_of || null,
            is_anonymous: false,
            covered_fees: metadata.covered_fees === "true",
            status: "succeeded",
          });

          // Send recurring donation receipt
          if (metadata.donor_email && metadata.donor_name) {
            await sendDonationReceipt({
              to: metadata.donor_email,
              name: metadata.donor_name,
              amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              isRecurring: true,
            }).catch((err) =>
              console.error("[Webhook] Failed to send recurring receipt:", err)
            );
          }
        }
        break;
      }

      default:
        // Unhandled event type — acknowledge receipt
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[Stripe Webhook] Error handling ${event.type}:`, error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
