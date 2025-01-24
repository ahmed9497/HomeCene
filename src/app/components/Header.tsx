// components/Header.tsx
"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Using React Icons for Cart icon
import { useCart } from "../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { FaAngleDown, FaRegCircleUser, FaUser } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const [user] = useAuthState(auth);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    if (user?.uid) {
      const fetchProfile = async () => {
        const d = doc(db, "users", user.uid);

        const docSnap = await getDoc(d);
        if (docSnap.exists()) {
          let profile = docSnap.data();
          setProfile(profile);
        } else {
          console.log("No such document!");
        }
      
        // setLoading(false);
      };

      fetchProfile();
    }
  }, [user]);

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
    router.push("/");
  };
  if (pathname.includes("auth")) {
    return null;
  }
  const Dropdown = () => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex items-center gap-x-2 justify-center w-full px-4 py-2 text-sm font-medium text-primary hover:bg-[#0a5d5d1f] rounded-md focus:outline-none">
          <FaRegCircleUser size={25} /> {profile?.name} <FaAngleDown />
        </MenuButton>
        <MenuItems className="absolute left-1 mt-2 w-56 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <MenuItem>
            {({ active }) => (
              <Link
                href="/account/profile"
                className={`block px-4 py-2 text-center  text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                href="/account/orders"
                className={`block px-4 py-2 text-center text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                My Orders
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logOut}
                className={`block px-4 w-full py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Logout
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  };
  return (
    <header
      className={`bg-white text-primary font-Poppins z-50 fixed top-0 w-full shadow-md h-[56px] flex items-center`}
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
          <nav className="hidden md:flex gap-x-4 text-sm ">
            <a href="/" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110 ">
              Home
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a
              href="/shop/all-products"
              className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110"
            >
              Shop
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a href="/shop/mirrors" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110">
              Mirrors
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a href="/shop/lamps" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110">
              Lamps
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a href="/shop/vase-&-decore" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110">
              Vase & Decore
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a href="/shop/artificial-plants" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110">
              Artifical Plants
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
            <a href="/shop/wooden-decore" className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110">
              Wooden Decore
              <div className="w-[0px] border-b-2 border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
            </a>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center  relative">
            {user ? (
              <>
                {/* <span onClick={() => logOut()}>Logout</span>{" "}
                  <img src="/Avatar.png" className="size-10" />{" "} */}
                <Dropdown />
              </>
            ) : (
              <button className="flex items-center gap-x-2 rounded-full justify-center relative group size-10 hover:bg-[#0a5d5d1f]">
                <>
                  <span onClick={() => router.push("/auth/login")}>
                    <FaRegCircleUser size={25} className="z-10" />
                  </span>
                </>
              </button>
            )}
            <div className="flex items-center relative">
              <div className="absolute bg-primary text-white -top-1 left-6 rounded-full flex justify-center items-center size-4 text-[12px]">
                {items.length}
              </div>
              <button
                className="text-lg relative group size-10 rounded-full flex justify-center items-center hover:bg-[#0a5d5d1f]"
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
