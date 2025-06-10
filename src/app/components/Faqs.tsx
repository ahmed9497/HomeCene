"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


type FaqItem = {
    question: string;
    answer: string;
  };
  
  type Props = {
    faqData: FaqItem[]; // ✅ now an array
  };
export default function Faqs({faqData}:Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
         <h2 className="text-2xl font-bold text-primary mb-6 text-center">FAQs</h2>
      {faqData&&faqData.map((faq:FaqItem, index:number) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <button
            onClick={() => toggle(index)}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="text-base font-semibold text-gray-800">{faq.question}</h3>
            <FaChevronDown
              className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden text-gray-600 text-sm mt-2">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
