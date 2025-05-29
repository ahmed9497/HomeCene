"use client";

import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Accordion = ({ content }: { content: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>(null);
  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-black  text-sm font-extrabold uppercase">
          Product detail:
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 justify-end items-center text-left"
        >
          <FaChevronDown
            className={`h-3 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <div
      ref={contentRef}
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
      }}
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-auto" : "max-h-0"
        }`}
      >
        <div className="py-2 text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
