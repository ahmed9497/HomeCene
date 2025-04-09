"use client";

import { useEffect, useState } from "react";

const ViewContentEvent = ({
  contentId,
  contentName,
  contentCategory,
  value,
  currency,
}: any) => {
  const [eventFired, setEventFired] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && contentId && !eventFired) {
    

      (window as any).dataLayer = (window as any).dataLayer || [];

      // Check if "view_item" has already been pushed for this product
      const hasEvent = (window as any).dataLayer.some(
        (event: any) =>
          event.event === "view_item" && event.ecommerce?.items?.[0]?.item_id === contentId
      );

      if (!hasEvent) {
        (window as any).dataLayer.push({
          event: "view_item", // GTM Event Name
          ecommerce: {
            value: value, // Total Order Amount
            currency: currency || "AED", // Currency Code
            items: [
              {
                item_name: contentName, // Product Name
                item_id: contentId, // Product SKU or ID
                price: value, // Product Price
                item_category: contentCategory, // Main Category
                currency: "AED",
                value: value,
                quantity:1
              },
            ],
          },
        });

        // Set state to prevent future triggers in the same session
        setEventFired(true);
      }
    }
  }, [contentId, contentName, contentCategory, value, currency, eventFired]);

  return null; // No visible UI needed
};

export default ViewContentEvent;
