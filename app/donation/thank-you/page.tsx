import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You - Mariphil Foundation Inc.",
  description:
    "Thank you for your generous donation to Mariphil Foundation Inc.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Generosity!
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Your donation has been processed successfully. You will receive a
            confirmation email with your receipt shortly.
          </p>

          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              Your support helps us continue our mission of transforming lives
              and building hope for children and communities across the
              Philippines.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What happens next?
            </h2>

            <div className="text-left space-y-3">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-700">
                  You'll receive a tax-deductible receipt via email
                </p>
              </div>

              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-700">
                  We'll keep you updated on the impact of your donation
                </p>
              </div>

              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-700">
                  Your donation will be put to work immediately to help those in
                  need
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Our Projects
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Have questions?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
