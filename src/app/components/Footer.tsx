'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

const Footer = () => {
  const pathname = usePathname();
  if(pathname.includes("auth")){
    return null;
  }
  return (
   <footer className="bg-primary text-gray-300 py-10 rounded-t-3xl mt-20">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Logo & About Section */}
    <div>
      <h3 className="text-xl font-bold text-white mb-4">HomeCene</h3>
      <p className="text-sm">
        HomeCene is your go-to destination for premium products. We are dedicated to providing the best service and top-quality items.
      </p>
    </div>
    {/* Navigation Links */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-gray-400">Home</a></li>
        <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
        <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
        <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
        <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
      </ul>
    </div>
    {/* Newsletter Subscription */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Subscribe to Our Newsletter</h4>
      <form className="flex flex-col space-y-4">
        <input type="email" placeholder="Enter your email" className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Subscribe
        </button>
      </form>
    </div>
  </div>
  {/* Footer Bottom */}
  <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
    <p>© {new Date().getFullYear()} HomeCene. All rights reserved.</p>
    <div className="flex justify-center space-x-4 mt-4">
      <a href="#" className="hover:text-gray-400">Privacy Policy</a>
      <a href="#" className="hover:text-gray-400">Terms of Service</a>
    </div>
  </div>
</footer>


  )
}

export default Footer