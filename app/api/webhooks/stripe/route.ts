import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract metadata
        const { donorName, donorEmail, message, recurring } =
          session.metadata || {};
        const amount = session.amount_total ? session.amount_total / 100 : 0;

        // Save donation to database
        await prisma.donation.create({
          data: {
            donorName: donorName || "Anonymous",
            donorEmail: donorEmail || "",
            amount,
            currency: session.currency?.toUpperCase() || "PHP",
            stripePaymentId:
              (session.payment_intent as string) ||
              (session.subscription as string),
            recurring: recurring === "true",
            message: message || null,
          },
        });

        // Send thank you email
        if (donorEmail) {
          try {
            await sendEmail({
              to: donorEmail,
              subject: "Thank You for Your Donation!",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1 style="color: #1EBD1E;">Thank You, ${donorName}!</h1>
                  <p>We are grateful for your generous donation of <strong>${session.currency?.toUpperCase()} ${amount.toFixed(
                2
              )}</strong>.</p>
                  <p>Your support helps us continue our mission of transforming lives and building hope for children and families across the Philippines.</p>
                  ${message ? `<p><em>Your message: "${message}"</em></p>` : ""}
                  <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
                  <p><strong>Receipt Details:</strong></p>
                  <ul>
                    <li>Amount: ${session.currency?.toUpperCase()} ${amount.toFixed(
                2
              )}</li>
                    <li>Date: ${new Date().toLocaleDateString()}</li>
                    <li>Transaction ID: ${session.id}</li>
                    <li>Type: ${
                      recurring === "true" ? "Monthly Recurring" : "One-time"
                    }</li>
                  </ul>
                  <p>This receipt serves as confirmation of your tax-deductible donation.</p>
                  <p>With gratitude,<br />Mariphil Foundation Inc.</p>
                </div>
              `,
            });
          } catch (emailError) {
            console.error("Error sending thank you email:", emailError);
          }
        }

        console.log("Donation recorded successfully:", session.id);
        break;
      }

      case "invoice.payment_succeeded": {
        // Handle recurring payment success
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Recurring payment succeeded:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        // Handle recurring payment failure
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Recurring payment failed:", invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
