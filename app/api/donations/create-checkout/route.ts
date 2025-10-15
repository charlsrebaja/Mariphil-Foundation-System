import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await request.json();
    const { amount, recurring, donorName, donorEmail, message } = body;

    if (!amount || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: "Amount, name, and email are required" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "php",
            product_data: {
              name: recurring ? "Monthly Donation" : "One-time Donation",
              description: `Donation to Mariphil Foundation Inc.${
                message ? ` - ${message}` : ""
              }`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
            ...(recurring && {
              recurring: {
                interval: "month",
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: recurring ? "subscription" : "payment",
      success_url: `${baseUrl}/donation/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate`,
      customer_email: donorEmail,
      metadata: {
        donorName,
        donorEmail,
        message: message || "",
        recurring: recurring.toString(),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
