import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  name: string;
  price_cents: number;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  mode: "payment";
  success_url: string;
  cancel_url: string;
  customer_email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required" },
        { status: 400 }
      );
    }

    if (!body.success_url || !body.cancel_url) {
      return NextResponse.json(
        { error: "success_url and cancel_url are required" },
        { status: 400 }
      );
    }

    const line_items = body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price_cents,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: body.mode || "payment",
      line_items,
      success_url: body.success_url,
      cancel_url: body.cancel_url,
      ...(body.customer_email && { customer_email: body.customer_email }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[Stripe Checkout] Error creating session:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
