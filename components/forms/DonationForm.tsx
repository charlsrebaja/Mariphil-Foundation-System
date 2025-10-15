"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type DonationFormData = {
  amount: number;
  customAmount?: number;
  recurring: boolean;
  donorName: string;
  donorEmail: string;
  message?: string;
};

export default function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      recurring: false,
    },
  });

  const presetAmounts = [500, 1000, 2500, 5000];

  const handlePresetAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setValue("amount", amount);
  };

  const handleCustomAmount = () => {
    setIsCustomAmount(true);
    setSelectedAmount(null);
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const donationAmount = isCustomAmount ? data.customAmount : data.amount;

    if (!donationAmount || donationAmount < 100) {
      setSubmitMessage({
        type: "error",
        text: "Minimum donation amount is ₱100",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Create checkout session
      const response = await fetch("/api/donations/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: donationAmount,
          recurring: data.recurring,
          donorName: data.donorName,
          donorEmail: data.donorEmail,
          message: data.message,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        // Redirect to Stripe checkout
        window.location.href = url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
      setIsSubmitting(false);
    }
  };

  const watchRecurring = watch("recurring");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Donation Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Donation Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register("recurring")}
                value="false"
                className="mr-2"
              />
              <span className="text-gray-700">One-time</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register("recurring")}
                value="true"
                className="mr-2"
              />
              <span className="text-gray-700">Monthly (Recurring)</span>
            </label>
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Select Amount *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetAmount(amount)}
                className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                  selectedAmount === amount
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 hover:border-primary text-gray-700"
                }`}
              >
                ₱{amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <button
            type="button"
            onClick={handleCustomAmount}
            className={`w-full p-4 border-2 rounded-lg font-semibold mb-4 transition-all ${
              isCustomAmount
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-300 hover:border-primary text-gray-700"
            }`}
          >
            Custom Amount
          </button>

          {isCustomAmount && (
            <div>
              <input
                type="number"
                {...register("customAmount", {
                  min: { value: 100, message: "Minimum amount is ₱100" },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter custom amount (min ₱100)"
              />
              {errors.customAmount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customAmount.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Donor Information */}
        <div>
          <label
            htmlFor="donorName"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="donorName"
            {...register("donorName", { required: "Name is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Juan Dela Cruz"
          />
          {errors.donorName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.donorName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="donorEmail"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="donorEmail"
            {...register("donorEmail", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="juan@example.com"
          />
          {errors.donorEmail && (
            <p className="mt-1 text-sm text-red-600">
              {errors.donorEmail.message}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            You will receive a receipt at this email
          </p>
        </div>

        {/* Optional Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-2"
          >
            Dedication or Message (Optional)
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="In memory of... or any message you'd like to include"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || (!selectedAmount && !isCustomAmount)}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
        >
          {isSubmitting
            ? "Processing..."
            : `Proceed to Payment${watchRecurring ? " (Monthly)" : ""}`}
        </button>

        <p className="text-sm text-gray-500 text-center">
          You will be redirected to a secure payment page powered by Stripe
        </p>
      </div>
    </form>
  );
}
