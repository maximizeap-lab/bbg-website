import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import {
  playerIntakeStep1,
  playerIntakeStep2,
  playerIntakeStep3,
  playerIntakeStep4,
} from "@/lib/validations";
import { z } from "zod";

const fullIntakeSchema = playerIntakeStep1
  .merge(playerIntakeStep2)
  .merge(playerIntakeStep3)
  .merge(playerIntakeStep4);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the full intake form
    const parsed = fullIntakeSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", fields: errors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const supabase = createServiceSupabase();

    // Look up the event to get price info
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id, name, price_cents, is_free, stripe_price_id")
      .eq("id", data.event_id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Determine payment status
    let paymentStatus: "pending" | "free" | "scholarship" = "pending";
    if (event.is_free || event.price_cents === 0) {
      paymentStatus = "free";
    } else if (data.scholarship_requested) {
      paymentStatus = "scholarship";
    }

    // Save registration to Supabase
    const { data: registration, error: insertError } = await supabase
      .from("registrations")
      .insert({
        event_id: data.event_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        parent_name: data.parent_name,
        parent_email: data.parent_email,
        parent_phone: data.parent_phone,
        school: data.school,
        graduation_year: data.graduation_year,
        position: data.position_primary,
        bats: data.bats,
        throws: data.throws,
        highlight_url: data.highlight_url || null,
        instagram_handle: data.instagram_handle || null,
        gpa: data.gpa ? parseFloat(data.gpa) : null,
        heard_about: data.heard_about,
        scholarship_requested: data.scholarship_requested,
        scholarship_note: data.scholarship_note || null,
        payment_status: paymentStatus,
      })
      .select()
      .single();

    if (insertError || !registration) {
      console.error("[Player Intake] Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save registration" },
        { status: 500 }
      );
    }

    // If event has a price and no scholarship, create Stripe checkout
    let checkoutUrl: string | null = null;

    if (
      paymentStatus === "pending" &&
      event.price_cents > 0 &&
      !data.scholarship_requested
    ) {
      const origin = request.headers.get("origin") || "https://baseballgenerations.com";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${event.name} — ${data.first_name} ${data.last_name}`,
              },
              unit_amount: event.price_cents,
            },
            quantity: 1,
          },
        ],
        customer_email: data.parent_email || data.email,
        success_url: `${origin}/events/${data.event_id}/registered?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/events/${data.event_id}?cancelled=true`,
        metadata: {
          type: "registration",
          registration_id: registration.id,
          player_name: `${data.first_name} ${data.last_name}`,
          event_name: event.name,
          email: data.parent_email || data.email,
        },
      });

      checkoutUrl = session.url;
    }

    return NextResponse.json({
      success: true,
      registration_id: registration.id,
      payment_status: paymentStatus,
      ...(checkoutUrl && { checkout_url: checkoutUrl }),
    });
  } catch (error) {
    console.error("[Player Intake] Error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", fields: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
