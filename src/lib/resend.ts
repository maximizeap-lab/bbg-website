import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt(params: {
  to: string;
  name: string;
  amount: string;
  date: string;
  isRecurring: boolean;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "BBG <noreply@baseballgenerations.com>",
    to: params.to,
    subject: "Thank You for Your Donation to Baseball Generations",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #F5F0E8; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-family: 'Bebas Neue', Arial, sans-serif; font-size: 36px; color: #F5A623; margin: 0;">BASEBALL GENERATIONS</h1>
          <p style="color: #F5F0E8; opacity: 0.7; margin-top: 4px;">From South LA to the Big Leagues</p>
        </div>
        <div style="background: #1a2a44; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
          <h2 style="color: #F5A623; margin-top: 0;">Thank You, ${params.name}!</h2>
          <p>Your ${params.isRecurring ? "monthly " : ""}donation of <strong style="color: #F5A623;">${params.amount}</strong> is making a real difference for kids in South LA.</p>
          <p>Every dollar helps us put bats in hands, coaches on fields, and kids in front of scouts who can change their lives.</p>
        </div>
        <div style="background: #1a2a44; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #F5F0E8; margin-top: 0;">Tax Receipt</h3>
          <p><strong>Organization:</strong> Baseball Generations Foundation</p>
          <p><strong>EIN:</strong> 85-3342897</p>
          <p><strong>Date:</strong> ${params.date}</p>
          <p><strong>Amount:</strong> ${params.amount}${params.isRecurring ? " (monthly recurring)" : ""}</p>
          <p style="font-size: 12px; opacity: 0.7;">Baseball Generations Foundation is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law. No goods or services were provided in exchange for this contribution.</p>
        </div>
        <div style="text-align: center; padding-top: 24px; border-top: 1px solid #2a3a54;">
          <p style="font-size: 14px; opacity: 0.7;">Follow our players' journeys on Instagram</p>
          <a href="https://instagram.com/baseballgenerations" style="color: #F5A623; text-decoration: none; font-weight: bold;">@baseballgenerations</a>
        </div>
      </div>
    `,
  });
}

export async function sendRegistrationReceipt(params: {
  to: string;
  playerName: string;
  eventName: string;
  amount: string;
  date: string;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "BBG <noreply@baseballgenerations.com>",
    to: params.to,
    subject: `Registration Confirmed: ${params.eventName}`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #F5F0E8; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-family: 'Bebas Neue', Arial, sans-serif; font-size: 36px; color: #F5A623; margin: 0;">BASEBALL GENERATIONS</h1>
        </div>
        <div style="background: #1a2a44; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
          <h2 style="color: #F5A623; margin-top: 0;">You're Registered!</h2>
          <p><strong>Player:</strong> ${params.playerName}</p>
          <p><strong>Event:</strong> ${params.eventName}</p>
          <p><strong>Amount Paid:</strong> ${params.amount}</p>
          <p><strong>Date:</strong> ${params.date}</p>
        </div>
        <div style="text-align: center; padding-top: 24px;">
          <p>Follow <a href="https://instagram.com/baseballgenerations" style="color: #F5A623;">@baseballgenerations</a> for event updates.</p>
          <p style="font-size: 12px; opacity: 0.5;">Questions? Email Generationalbaseball@gmail.com</p>
        </div>
      </div>
    `,
  });
}
