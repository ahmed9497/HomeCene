"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const categories=[
  {
    title:'All Products',
    href:'/shop/all-products',
    subCategories:[]
  },
  {
    title:'Mirrors',
    href:'/shop/mirrors',
    subCategories:[
      {
        title:'All Mirrors',
        href:'/shop/mirrors'
      },
      {
        title:'arched mirrors',
        href:'/shop/mirrors/arched'
      },
      {
        title:'irregular mirrors',
        href:'/shop/mirrors/irregular'
      },
      {
        title:'round mirrors',
        href:'/shop/mirrors/round'
      },
      {
        title:'rectangular mirrors',
        href:'/shop/mirrors/rectangular'
      },
      {
        title:'oval mirrors',
        href:'/shop/mirrors/oval'
      }
    ]
  },
  {
    title:'Lamps',
    href:'/shop/lamps',
    subCategories:[
      {
        title:'All Lamps',
        href:'/shop/lamps'
      },
      {
        title:'table lamps',
        href:'/shop/lamps/table'
      },
      {
        title:'floor lamps',
        href:'/shop/lamps/floor'
      },
      {
        title:'pendant and chandelier lamps',
        href:'/shop/lamps/pendant-and-chandelier'
      },
      {
        title:'wall lamps',
        href:'/shop/lamps/wall'
      },
    ]
  },
  {
    title:'Vase & Decor',
    href:'/shop/vase-&-decore',
    subCategories:[]
  },
  {
    title:'Artificial Plants & Pots',
    href:'/shop/artificial-plants-and-pots',
    subCategories:[
      {
        title:'All Plants & Pots',
        href:'/shop/artificial-plants-and-pots',
      },
      {
        title:'Plants',
        href:'/shop/artificial-plants-and-pots/plants',
      },
      {
        title:'Pots',
        href:'/shop/artificial-plants-and-pots/pots',
      },
    ]
  },
  // {
  //   title:'Wooden Decor',
  //   href:'/shop/wooden-decore'
  // },
]
const ShopCategories = () => {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const activeCategory = categories.find(category =>
      pathname.startsWith(category.href)
    );
    setOpenCategory(activeCategory?.title || null);
  }, [pathname, categories]);
  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };
  return (
    <div className="flex flex-col mt-10 space-y-2">
      {categories.map((category, index) => (
        <div key={index}>
          {/* Main Category */}
          <div className={`flex items-center justify-between px-3 py-2 rounded   cursor-pointer
          ${pathname === category.href ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => toggleCategory(category.title)}
          >
           {category.subCategories.length > 0 ? 
            category.title
            :
           
            <Link
              href={category.href}
              className={`w-full `}
            >
              {category.title}
            </Link>
           }
            {category.subCategories.length > 0 && (
              <button onClick={() => toggleCategory(category.title)} className="ml-2">
                {openCategory === category.title ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            )}
          </div>

          {/* Subcategories */}
          {openCategory === category.title && category.subCategories.length > 0 && (
            <div className="ml-6 mt-1 space-y-1">
              {category.subCategories.map((sub, subIndex) => (
                <Link
                  key={subIndex}
                  href={sub.href}
                  className={`block capitalize px-3 py-1 rounded hover:bg-gray-200 ${
                    pathname === sub.href ? "bg-primary text-white" : "bg-gray-100"
                  }`}
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShopCategories;
