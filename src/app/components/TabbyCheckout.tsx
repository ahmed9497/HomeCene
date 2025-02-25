"use client";

import { useEffect } from "react";

const TabbyCheckout = ({totalAmount}:{totalAmount:any}) => {
  useEffect(() => {
    // Load Tabby script dynamically
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://checkout.tabby.ai/tabby-card.js";
    script.async = true;
    script.onload = () => {
        window && new (window as any).TabbyCard({
        selector: "#tabbyCard", // Empty div for TabbyCard.
        currency: "AED", // Required: AED, SAR, KWD only supported.
        lang: "en", // Optional: Language of snippet and popups.
        price: totalAmount, // Required: Total cart amount.
        size: "wide", // Required: narrow | wide supported.
        theme: "black", // Required: black | default supported.
        header: false, // Hide header if a payment method name is already present.
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="tabbyCard"></div>;
};

export default TabbyCheckout;
