"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const [animateTick, setAnimateTick] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setAnimateTick(true), 200); // Delays animation for a smooth effect
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      {/* Animated Tick */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-green-500">
          <svg
            className={`w-10 h-10 text-green-500 transform transition-all duration-500 ${
              animateTick ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-900">
        Order Placed Successfully!
      </h1>
      <p className="mt-2 text-gray-600 font-medium">Thank you for your purchase.</p>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">What's Next</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Your order has been placed successfully. We will send you a confirmation email with tracking details once your order is shipped.
      </p>

      {/* Go to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
