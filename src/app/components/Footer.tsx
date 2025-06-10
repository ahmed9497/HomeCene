"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaMessage, FaWhatsapp } from "react-icons/fa6";
import SocialIcons from "./SocialIcons";
import SlideIn from "./SlideIn";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("auth")) {
    return null;
  }
  
  return (
    <footer className={` text-gray-300 ${["/account/orders","/account/profile","/success","/contact","/privacy-policy","/terms-and-conditions","/refund-return-policy"].includes(pathname) ? 'bg-primary bg-opacity-5' : ''}`}>
      <div className="bg-primary py-10 rounded-t-3xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
       
       <SlideIn direction="up">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Home Cene</h3>
          <p className="text-sm">
            HomeCene is your go-to destination for premium products. We are
            dedicated to providing the best service and top-quality items.
          </p>
          <div className="flex gap-x-1  ">
          <Image
            unoptimized
            src="/paymethods.png"
            className="bg-primary h-[30px] mt-3 w-auto"
            alt="payments-methods"
            width={400}
            height={60}
          />
          <Image
            unoptimized
            src="/tabby.png"
            className="bg-primary h-[30px] mt-3 w-[70px]"
            alt="payments-methods"
            width={300}
            height={60}
          />
          </div>
         
        </div>
        </SlideIn>
        <SlideIn direction="up" delay={300}>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/shop/mirrors"
                className="hover:text-gray-400 hover:underline"
              >
                Mirrors
              </Link>
            </li>
            <li>
              <Link
                href="/shop/lamps"
                className="hover:text-gray-400 hover:underline"
              >
                Lamps
              </Link>
            </li>
            <li>
              <Link
                href="/shop/vases-and-decor"
                className="hover:text-gray-400 hover:underline"
              >
                Vase & Decor
              </Link>
            </li>
            {/* <li>
              <Link
                href="/shop/artificial-plants"
                className="hover:text-gray-400 hover:underline"
              >
                Artificial Plants
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="/shop/wooden-decor"
                className="hover:text-gray-400 hover:underline"
              >
                Wooden Decor
              </Link>
            </li> */}
          </ul>
        </div>
        </SlideIn>
        <SlideIn direction="up" delay={400}>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Policies</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-gray-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-gray-400 hover:underline"
              >
                Terms And Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/refund-return-policy"
                className="hover:text-gray-400 hover:underline"
              >
                Refund & Return Policy
              </Link>
            </li>
          </ul>
        </div>
        </SlideIn>
        <SlideIn direction="up" delay={500}>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Information</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-400 hover:underline"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-gray-400 hover:underline"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/971559086152" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-x-2 hover:text-gray-400 hover:underline"
              >
                <FaWhatsapp size={20}/> +971 55 908 6152
              </Link>
            </li>
            <li>
              <Link
                href="mailto:info@homecene.com"
                className="flex items-center gap-x-2 hover:text-gray-400 hover:underline"
              >
                <FaMessage />
                info@homecene.com{" "}
              </Link>
            </li>
          </ul>
        </div>
        </SlideIn>
        <SlideIn direction="up" delay={600}>
      <p className="text-white border- border-white">
          Registered Under Government of UAE<br/>
          Licensed No. 4418290.01
          </p>
          </SlideIn>
      </div>
      <SlideIn direction="up" delay={700}>
      <div className="flex justify-center flex-col gap-y-4 items-center my-8">
        <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
        <SocialIcons />
      </div>
      </SlideIn>
      <SlideIn direction="down" delay={800}>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} HomeCene. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-gray-400">
            Terms of Service
          </Link>
        </div>
      </div>
      </SlideIn>
      </div>
    </footer>
  );
};

export default Footer;
