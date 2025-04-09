"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GtmPageView = () => {
  const pathname = usePathname();
  const eventFired = useRef<string | null>(null); // Store the last triggered path

  useEffect(() => {
    if ((window as any).__pageViewFired) return;
    (window as any).__pageViewFired = true;
    if (typeof window !== "undefined" && eventFired.current !== pathname) {
      (window as any).dataLayer = (window as any).dataLayer || [];

      // Check if page_view has already been fired for this path
      const hasEvent = (window as any).dataLayer.some(
        (event: any) =>
          event.event === "page_view" && event.page_path === pathname
      );

      if (!hasEvent) {
        (window as any).dataLayer.push({
          event: "page_view",
          page_path: pathname,
          page_url: window.location.href,
        });

        console.log(`✅ GTM Page View Triggered: ${pathname}`);
        eventFired.current = pathname; // Store the triggered path
      } else {
        console.log(`🚫 GTM Page View Already Triggered: ${pathname}`);
      }
    }
  }, [pathname]);

  return null; // No UI needed
};

export default GtmPageView;
