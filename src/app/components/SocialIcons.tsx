"use client";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa6";

const socialLinks = [
  { name: "Facebook", icon: <FaFacebook size={24} />, link: "https://www.facebook.com/profile.php?id=61572005000994" },
  { name: "Instagram", icon: <FaInstagram size={24} />, link: "https://www.instagram.com/home_cene?utm_source=qr&igsh=MTMxaXFuamVlMjFiNA==" },
  { name: "TikTok", icon: <FaTiktok size={24} />, link: "https://www.tiktok.com/@homecene?fbclid=IwY2xjawIWqddleHRuA2FlbQIxMAABHTKTje6bjnfz1e7C8C3oCZPmBhoN3G50sXRd9X2xxxbSEIggTtmEfqM8UQ_aem_pJnUtEaTP2IYTdkWpFCrwQ" },
  { name: "Linkedin", icon: <FaLinkedin size={24} />, link: "https://www.linkedin.com/company/homecene" },
];

export default function SocialIcons() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex gap-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          onMouseEnter={() => setHovered(social.name)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="p-2 bg-gray-800 text-white rounded-full transition-all duration-300 group-hover:scale-110">
            {social.icon}
          </div>
          {hovered === social.name && (
            <span className="absolute left-1/2 -translate-x-1/2 bottom-10 bg-black text-white text-xs px-2 py-1 rounded-md opacity-90">
              {social.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
