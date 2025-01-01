// components/Header.tsx
"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Using React Icons for Cart icon
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser, FaUser } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const [user] = useAuthState(auth);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true); // Hide the header when scrolling down
      } else {
        setIsScrollingDown(false); // Show the header when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the listener
    };
  }, [lastScrollY]);
  const logOut = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
  };
  return (
    <header
      className={`bg-gray-100 text-primary font-Poppins z-10 fixed top-0 w-full shadow-lg h-[56px] flex items-center 
    transition-transform duration-300 ${
      isScrollingDown ? "-translate-y-full" : "translate-y-0"
    }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              <Image
                src="/logo.png"
                width={80}
                height={90}
                alt="homecene-logo"
              />
            </a>
          </div>

          {/* Menu - Desktop */}
          <nav className="hidden md:flex space-x-4">
            <a href="/" className="text-lg hover:text-gray-300">
              Home
            </a>
            <a
              href="/shop/all-products"
              className="text-lg hover:text-gray-300"
            >
              Shop
            </a>
            <a href="/mirrors" className="text-lg hover:text-gray-300">
              Mirrors
            </a>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4 relative">
            <button className="flex items-center gap-x-2 relative group">
              {user ? (
                <>
                  <span onClick={() => logOut()}>Logout</span>{" "}
                  <img src="/Avatar.png" className="size-10" />{" "}
                </>
              ) : (
                <>
                  <span onClick={() => router.push("/auth/login")}>Login</span>{" "}
                  <FaRegCircleUser size={25} className="z-10" />
                </>
              )}
            </button>
            <div className="flex items-center space-x-4 relative">
              <div className="absolute bg-primary text-white -top-2 left-8 rounded-full flex justify-center items-center size-4 text-[12px]">
                {" "}
                {items.length}
              </div>
              <button
                className="text-lg relative group"
                onClick={() => router.push("/cart")}
              >
                <IoCartOutline size={25} className="z-10" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden ">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none "
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Conditional Rendering */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="space-y-4">
              <a href="/" className="block text-lg hover:text-gray-300">
                Home
              </a>
              <a href="/shop" className="block text-lg hover:text-gray-300">
                Shop
              </a>
              <a href="/mirrors" className="block text-lg hover:text-gray-300">
                Mirrors
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
