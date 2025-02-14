import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // trailingSlash:true,
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
  images: {
    domains: ['images.pexels.com','vinova-furstore.myshopify.com','res.cloudinary.com'],
  },
};

export default nextConfig;
