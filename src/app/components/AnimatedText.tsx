"use client";
import { useState, useEffect } from "react";

const messages = [
  "Upto 80% OFF on everything",
  // "Ramadan Sale",
  "Pay in installments with Tabby",
  "Free shipping",
];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length); // Change message
        setFade(true); // Fade-in new message
      }, 500); // Delay before switching message
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 bg-red-900 flex justify-center items-center overflow-hidden">
      <p
        className={`capitalize tracking-[0.15rem] transition-all duration-500 transform ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        } text-sm  text-white`}
      >
        {messages[index]}!
      </p>
    </div>
  );
}
