// components/WhatsAppButton.jsx
"use client";


import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton({ product }:{product:any}) {
  const router = useRouter();
  const phone = "971559086152"; // ← your WhatsApp number with country code, no “+” or dashes

  // Build the message
  const baseMsg = "Hi there! I’d like to know more about Homecene.";
  const productMsg = product && product
    ? ` I’m interested in *${product.title}* (ID: ${product.slug}).`
    : "";
  const text = encodeURIComponent(baseMsg + productMsg);

  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-4 right-4
        w-14 h-14
        bg-green-500 hover:bg-green-600
        rounded-full
        flex items-center justify-center
        shadow-lg
        z-50
        transition
      "
    >
        <FaWhatsapp size={30} color="white"/>
      
    </a>
  );
}


