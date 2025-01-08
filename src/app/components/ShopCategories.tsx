"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ShopCategories = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-10 space-y-2">
      <Link
        href={"/shop/all-products"}
        className={`px-3 py-2 rounded  hover:bg-primary hover:text-white ${
          pathname === "/shop/all-products" ? "bg-primary text-white" : "bg-[#efefef]"
        }`}
      >
        All Products
      </Link>
      <Link
        href={"/shop/mirrors"}
        className={`px-3 py-2 rounded  hover:bg-primary hover:text-white ${
          pathname === "/shop/mirrors" ? "bg-primary text-white" : "bg-[#efefef]"
        }`}
      >
        Mirrors
      </Link>
      <Link
        href={"/shop/lamps"}
        className={`px-3 py-2 rounded hover:bg-primary hover:text-white ${
          pathname === "/shop/lamps" ? "bg-primary text-white" : "bg-[#efefef]"
        }`}
      >
        Lamps
      </Link>
      <Link
        href={"/shop/vase-and-decor"}
        className={`px-3 py-2 rounded hover:bg-primary hover:text-white ${
          pathname === "/shop/decoration-pieces" ? "bg-primary text-white" : "bg-[#efefef]"
        }`}
      >
        Vase & Decor
      </Link>
      <Link
        href={"/shop/artificial-plants"}
        className={`px-3 py-2 rounded hover:bg-primary hover:text-white ${
          pathname === "/shop/artificial-plants" ? "bg-primary text-white" : "bg-[#efefef]"
        }`}
      >
        Artificial Plants
      </Link>
    </div>
  );
};

export default ShopCategories;
