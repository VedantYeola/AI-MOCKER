"use client"; // Ensure this file is treated as a client component

import { useRouter } from "next/navigation"; // Import useRouter
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

const plans = [
  {
    id: 1,
    name: "Free",
    cost: 0,
    offering: [
      "✅ Create 3 Free Mock Interviews",
      "✅ Unlimited Retaken Interviews",
      "❌ Practice Questions",
      "❌ AI InterviewMocker.com Exclusive App Access",
      "❌ Email Support",
    ],
  },
  {
    id: 2,
    name: "Yearly",
    cost: 49.0,
    paymentLink: "https://buy.stripe.com/test_bIYg1wdpm3ij5dSdQQ",
    offering: [
      "✅ Create 3 Mock Interviews",
      "✅ Unlimited Retaken Interviews",
      "✅ Practice Questions",
      "✅ AI InterviewMocker.com Exclusive App Access",
      "✅ Email Support",
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Upgrade = () => {
  const router = useRouter(); // Initialize Next.js router

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Choose an affordable plan packed with the best features for engaging
        your audience, creating customer loyalty, and driving sales.
      </p>

      {/* Pricing Cards */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-10">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={classNames(
              index === 1
                ? "relative bg-gray-900 text-white shadow-2xl"
                : "bg-white shadow-md",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
              "transition-transform duration-300 hover:scale-105 hover:shadow-xl" // Hover effect
            )}
          >
            {/* Plan Title */}
            <h3
              className={classNames(
                index === 1 ? "text-white" : "text-indigo-600",
                "text-lg font-semibold"
              )}
            >
              {plan.name}
            </h3>

            {/* Price */}
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  index === 1 ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {plan.cost === 0 ? "Free" : `$${plan.cost}/year`}
              </span>
            </p>

            {/* Plan Features */}
            <ul className="mt-6 space-y-3 text-sm sm:mt-10">
              {plan.offering.map((feature, idx) => (
                <li key={idx} className="flex gap-x-3">
                  <CheckIcon
                    className={classNames(
                      index === 1 ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  <span className={index === 1 ? "text-gray-300" : "text-gray-600"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            {plan.cost === 0 ? (
              <button
                onClick={() => router.push("/dashboard")} // Redirect to Dashboard
                className="mt-8 block w-full rounded-md bg-indigo-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-400"
              >
                Get Started
              </button>
            ) : (
              <a
                href={plan.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-md bg-indigo-500 text-white shadow-md hover:bg-indigo-400 px-4 py-2.5 text-center text-sm font-semibold"
              >
                Subscribe Now
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
