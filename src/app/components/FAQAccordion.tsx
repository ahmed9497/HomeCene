"use client";

import { useState } from "react";

const faqs = [
  {
    question: "When will my order be delivered?",
    answer: "Your order will be delivered within the estimated time mentioned on the product page. However, delays due to logistics, weather, or other factors may occur. You can track your shipment for real-time updates. If your order is shipped in multiple batches, separate tracking details will be provided."
  },
  {
    question: "What should I do if I entered the wrong address?",
    answer: "If you made a mistake in your shipping address, please reply to your order confirmation email or contact us at info@homecene.com within 24 hours so we can update the details before dispatch."
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: "Yes, you can cancel your order within 24 hours of placing it. To request a cancellation, email us at info@homecene.com as soon as possible."
  },
  {
    question: "My item arrived damaged. How can I get a replacement?",
    answer: "We take great care in packaging our products, but if your item arrives damaged, email us at info@homecene.com with your order number and clear pictures of the damage. We'll send a replacement at no extra cost."
  },
  {
    question: "What if my item gets damaged after I start using it?",
    answer: "HomeCene is not responsible for damages that occur after successful delivery. We only replace products that arrive in damaged condition, and such claims must be reported on the day of delivery."
  },
  {
    question: "How do I return an item?",
    answer: "If you want to return an item, please review our return policy at https://homecene.com/pages/return-policy to check eligibility and follow the process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, Apple Pay, and other major payment methods. For details, check our payment page during checkout."
  },
  {
    question: "Do you offer cash on delivery?",
    answer: "Currently, we do not support cash on delivery. All payments must be made online at checkout."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking link. You can use this to monitor your delivery status."
  },
  {
    question: "Still have questions?",
    answer: "If your question wasn’t answered, feel free to email us at info@homecene.com, and we’ll respond within 24 hours."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left flex justify-between items-center py-4 px-2 focus:outline-none transition-all duration-300"
          >
            <span className="text-lg font-medium">{faq.question}</span>
            <span className={`text-xl transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="p-4 bg-gray-100 rounded-md text-gray-700">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
// Function to generate FAQ Schema for SEO
function getFAQSchema(faqs:any) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq:any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }