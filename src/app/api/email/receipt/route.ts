import { NextRequest, NextResponse } from "next/server";
import {
  sendDonationReceipt,
  sendRegistrationReceipt,
} from "@/lib/resend";

interface DonationReceiptData {
  to: string;
  name: string;
  amount: string;
  date: string;
  isRecurring: boolean;
}

interface RegistrationReceiptData {
  to: string;
  playerName: string;
  eventName: string;
  amount: string;
  date: string;
}

type ReceiptBody =
  | { type: "donation"; data: DonationReceiptData }
  | { type: "registration"; data: RegistrationReceiptData };

export async function POST(request: NextRequest) {
  try {
    const body: ReceiptBody = await request.json();

    if (!body.type || !body.data) {
      return NextResponse.json(
        { error: "type and data are required" },
        { status: 400 }
      );
    }

    if (body.type === "donation") {
      const { to, name, amount, date, isRecurring } = body.data;

      if (!to || !name || !amount) {
        return NextResponse.json(
          { error: "to, name, and amount are required for donation receipts" },
          { status: 400 }
        );
      }

      await sendDonationReceipt({
        to,
        name,
        amount,
        date: date || new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isRecurring: isRecurring ?? false,
      });

      return NextResponse.json({ success: true, type: "donation" });
    }

    if (body.type === "registration") {
      const { to, playerName, eventName, amount, date } = body.data;

      if (!to || !playerName || !eventName) {
        return NextResponse.json(
          {
            error:
              "to, playerName, and eventName are required for registration receipts",
          },
          { status: 400 }
        );
      }

      await sendRegistrationReceipt({
        to,
        playerName,
        eventName,
        amount: amount || "$0.00",
        date: date || new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });

      return NextResponse.json({ success: true, type: "registration" });
    }

    return NextResponse.json(
      { error: "Invalid type. Must be 'donation' or 'registration'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Email Receipt] Error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send receipt" },
      { status: 500 }
    );
  }
}
