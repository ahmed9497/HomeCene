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
import CartDrawer from "./CartDrawer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const headerMenu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop/all-products",
  },
  {
    title: "Mirrors",
    href: "/shop/mirrors",
    subCategories: [
      {
        title: "All Mirrors",
        href: "/shop/mirrors",
      },
      {
        title: "arched mirrors",
        href: "/shop/mirrors/arched",
      },
      {
        title: "irregular mirrors",
        href: "/shop/mirrors/irregular",
      },
      {
        title: "round mirrors",
        href: "/shop/mirrors/round",
      },
      {
        title: "rectangular mirrors",
        href: "/shop/mirrors/rectangular",
      },
      {
        title: "oval mirrors",
        href: "/shop/mirrors/oval",
      },
    ],
  },
  {
    title: "Lamps",
    href: "/shop/lamps",
    subCategories: [
      {
        title: "All Lamps",
        href: "/shop/lamps",
      },
      {
        title: "table lamps",
        href: "/shop/lamps/table",
      },
      {
        title: "floor lamps",
        href: "/shop/lamps/floor",
      },
      {
        title: "pendant and chandelier lamps",
        href: "/shop/lamps/pendant-and-chandelier",
      },
      {
        title: "wall lamps",
        href: "/shop/lamps/wall",
      },
    ],
  },
  {
    title: "Vase & Decor",
    href: "/shop/vase-&-decore",
  },
  // {
  //   title: "Artifical Plants",
  //   href: "/shop/artificial-plants",
  // },
  // {
  //   title: "Wooden Decor",
  //   href: "/shop/wooden-decore",
  // },
];
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<any>();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const activeCategory = headerMenu.find((category) =>
      pathname.startsWith(category.href)
    );
    setOpenCategory(activeCategory?.title || null);
  }, [pathname, headerMenu]);
  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };
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
      className={`bg-white text-primary font-Poppins z-50 sticky top-0 w-full shadow-md min-h-[56px] sm:min-h-[80px] flex items-center`}
    >
      <div className="max-w-7xl mx-auto w-full py-3 sm:py-0 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              <Image
                unoptimized
                src="/logo.png"
                width={80}
                height={90}
                alt="homecene-logo"
                className="w-[80px] h-[auto] sm:w-[120px] sm:h-[60px]"
              />
            </a>
          </div>

          {/* Menu - Desktop */}
          <nav className="hidden md:flex gap-x-6 text-sm sm:text-md ">
            {headerMenu.map((menu, index) => (
              <a
                href={menu.href}
                key={index}
                className="text-black hover:text-primary group hover:font-semibold transition-all hover:transform hover:scale-110 "
              >
                {menu.title}
                <div className="w-[0px] border-b border-primary h-[1px] absolute group-hover:w-[100%] transition-all"></div>
              </a>
            ))}
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
              {/* <button
                className="text-lg relative group size-10 rounded-full flex justify-center items-center hover:bg-[#0a5d5d1f]"
                onClick={() => router.push("/cart")}
              >
                <IoCartOutline size={25} className="z-10" />
              </button> */}

              <CartDrawer />
            </div>

            {/* Mobile Menu Button (Hamburger Icon) */}
            <div className="md:hidden flex">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary focus:outline-none "
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
        </div>

        {/* Mobile Menu - Conditional Rendering */}

        {isMenuOpen && (
          <div className="md:hidden mt-3 absolute w-full left-0 p-2 bg-white">
            <nav className="flex flex-col gap-y-1">
              {headerMenu.map((category: any, index) => (
                <div key={index}>
                  {/* Main Category */}
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer
                    ${
                      pathname === category.href
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleCategory(category.title)}
                  >
                    {category?.subCategories?.length > 0 ? (
                      category.title
                    ) : (
                      <Link href={category.href} className="w-full"          onClick={() => setIsMenuOpen(false)}>
                        {category.title}
                      </Link>
                    )}

                    {category?.subCategories?.length > 0 && (
                      <button className="ml-2">
                        {openCategory === category.title ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Subcategories */}
                  {openCategory === category.title &&
                    category?.subCategories?.length > 0 && (
                      <div className="ml-6 mt-1 space-y-1">
                        {category.subCategories.map(
                          (sub: any, subIndex: number) => (
                            <Link
                              key={subIndex}
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block capitalize px-3 py-1 rounded hover:bg-gray-200 ${
                                pathname === sub.href
                                  ? "bg-primary text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              {sub.title}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
