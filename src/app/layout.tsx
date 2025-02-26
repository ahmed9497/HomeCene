import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import Header from "./components/Header";
import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"



export const metadata:Metadata = {
  title: "HomeCene | Premium Home Decor, Mirrors, Vases & Lamps in Dubai – Elevate Your Space",
  description: "Discover Homecene, Dubai’s premier destination for luxury home decor, mirror vases, lamps, and stylish furniture. Transform your space with elegant designs and smart home essentials. Fast delivery across the UAE!",
  keywords: "home decor, mirrors, vases, lamps,furniture Dubai, modern furniture, home essentials, interior design, luxury home decor, online furniture store",
  // viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: [
    { rel: "icon", type: "image/x-icon", url: "/favicon.ico" }, // Favicon
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },  // iOS icon
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" }, // Android 192x192
    { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" }, // Android 512x512
  ],
  manifest: "/site.webmanifest", // Link to the Web App Manifest for Android
  openGraph: {
    title: "HomeCene | Premium Home Decor, Mirrors, Vases & Lamps in Dubai – Elevate Your Space",
    description: "Shop luxury home decor & furniture in Dubai. Explore our stylish and modern collections to upgrade your space.",
    url: "https://www.homecene.com",
    siteName: "HomeCene",
    images: [
      {
        url: "https://www.homecene.com/images/mirror-slide.webp",
        width: 1200,
        height: 630,
        alt: "HomeCene Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeCene | Premium Home Decor, Mirrors, Vases & Lamps in Dubai – Elevate Your Space",
    description: "Discover premium home decor and furniture at HomeCene. Elevate your living space with stylish, high-quality essentials. Shop now!",
    images: ["https://www.homecene.com/mirror-slide.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body>
  
      <Suspense fallback={<p>Loading...</p>}>
        <Script strategy="beforeInteractive"
          id="facebook-pixel"
          // Ensures script is loaded after the page is interactive
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '465789456465893');
            fbq('track', 'PageView');
          `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=465789456465893&ev=PageView&noscript=1"
          />
        </noscript>

        <CartProvider>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <Header />

          <div>
            {children}
            <Analytics />
          </div>
          <div className="flex justify-center bg-gray-100 py-10 items-center flex-col">
            <h1 className="text-primary font-bold text-3xl mb-4">Licensed & Registered By</h1>
            <div className="flex gap-x-10">
            <img src="dubai_gov_logo.png" alt="DED_LOGO_DUBAI" className="w-[300x]"/>
            <img src="logo_ded.png" alt="DED_LOGO_DUBAI" className="w-[200px"/>
            </div>
          </div>
          <Footer />
        </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
