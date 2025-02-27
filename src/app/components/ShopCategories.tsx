"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const categories=[
  {
    title:'All Products',
    href:'/shop/all-products'
  },
  {
    title:'Mirrors',
    href:'/shop/mirrors'
  },
  {
    title:'Lamps',
    href:'/shop/lamps'
  },
  {
    title:'Vase & Decor',
    href:'/shop/vase-&-decore'
  },
  // {
  //   title:'Artificial Plants',
  //   href:'/shop/artificial-plants'
  // },
  // {
  //   title:'Wooden Decor',
  //   href:'/shop/wooden-decore'
  // },
]
const ShopCategories = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-10 space-y-2">

      {categories?.map((category,index)=>(

        <Link key={index}
        href={category.href}
        className={`px-3 py-2 rounded text-center hover:bg-primary hover:text-white ${
          pathname === category.href ? "bg-primary text-white" : "bg-[#efefef]"
          }`}
          >
       {category.title}
      </Link>
      ))}
    
    </div>
  );
};

export default ShopCategories;
