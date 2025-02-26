"use client"; // Next.js client component

import { useEffect, useRef, useState } from "react";


const TABBY_PUBLIC_KEY = process.env.NEXT_PUBLIC_TABBY_PUBLIC_KEY;

const TabbyPromo = ({
  price,
  currency,
  lang,
}: {
  price: number;
  currency: string;
  lang: string;
}) => {
  const tabbyRef = useRef<HTMLDivElement>(null);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🔥 Remove old widget content before updating
    if (tabbyRef.current) {
      tabbyRef.current.innerHTML = "";
    }

    const loadTabbyScript = () => {
      return new Promise<void>((resolve) => {
        if (document.querySelector("#tabby-promo-script")) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.tabby.ai/tabby-promo.js";
        script.async = true;
        script.id = "tabby-promo-script";
        script.onload = () => {
          console.log("✅ Tabby script loaded!");
          resolve();
        };

        document.body.appendChild(script);
      });
    };

    // Load Tabby Script only once
    if (!document.querySelector("#tabby-promo-script")) {
      // const script = document.createElement("script");
      // script.src = "https://checkout.tabby.ai/tabby-promo.js";
      // script.async = true;
      // script.id = "tabby-promo-script";
      // document.body.appendChild(script);

      // script.onload = () => {
      //   console.log("✅ Tabby script loaded!");
      //   initializeTabbyPromo();
      // };
      loadTabbyScript().then(() => {
        initializeTabbyPromo();
        // setIsLoading(false)
      });
    } else {
      initializeTabbyPromo();
      // setIsLoading(false)
    }

    function initializeTabbyPromo() {
      if (!price || !currency) {
        console.warn("⚠️ Missing price or currency. Tabby promo hidden.");
        tabbyRef.current!.style.display = "none";
        return;
      }
      if (typeof window !== "undefined" && window.TabbyPromo){

        try {

      // 🔄 Reinitialize TabbyPromo
      window &&  (window as any)?.TabbyPromo&&  new (window as any).TabbyPromo({
        selector: "#TabbyPromo",
        currency: currency,
        price: price,
        lang,
        installmentsCount: 4,
        publicKey: `${TABBY_PUBLIC_KEY}`, // Replace with actual API Key
        merchantCode: "HCHARE", // Change for different currencies
      });
    }
    catch (error) {
      console.log("Error initializing TabbyPromo:", error);
    }
      console.log("✅ TabbyPromo updated!");
      // setIsLoading(false)
      // setTimeout(() => setIsLoading(false), 500);
  }
}
  }, [price, currency, lang]); // 🔄 Runs every time price or currency changes

  return (
    <><div id="TabbyPromo" ref={tabbyRef} /></>
  );
};

export default TabbyPromo;
