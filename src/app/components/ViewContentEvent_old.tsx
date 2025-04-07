"use client";

import { useEffect } from "react";
import { fbEvent } from "../lib/fpixel";

const ViewContentEvent = ({ contentId, contentName, contentCategory, value, currency }: any) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // window.fbq("track", "ViewContent", {
      //   content_ids: [contentId], // ID of the content being viewed
      //   content_name: contentName, // Name of the content
      //   content_category: contentCategory, // Category of the content
      //   value: value, // Optional: Value of the content
      //   currency: currency || "USD", // Optional: Currency
      // });
      fbEvent("ViewContent", {
        content_ids: [contentId], // ID of the content being viewed
        content_name: contentName, // Name of the content
        content_category: contentCategory, // Category of the content
        value: value, // Optional: Value of the content
        currency: currency || "AED",
      })
    }
  }, [contentId, contentName, contentCategory, value, currency]);

  return null; // No visible UI needed
};

export default ViewContentEvent;
