"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://vinova-furstore.myshopify.com/cdn/shop/files/img-5-5_900x.png?v=1699003690",
    url: "/",
    // bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://vinova-furstore.myshopify.com/cdn/shop/files/img-5-6_900x.png?v=1699003690",
    url: "/",
    // bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  // {
  //   id: 3,
  //   title: "Spring Sale Collections",
  //   description: "Sale! Up to 50% off!",
  //   img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   url: "/",
  //   bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  // },
];

const VerticalSlider = ({ products }: { products: any }) => {
  const [current, setCurrent] = useState(1);
  const [itemWidth, setItemWidth] = useState<any>(0);

  useEffect(() => {
    setItemWidth(window.innerWidth >= 768 ? 500 : window.innerWidth);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      // setItemWidth(window.innerWidth >= 768 ? 500 : window.innerWidth);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth >= 768 ? 500 : window.innerWidth ,"----")
      setItemWidth(window.innerWidth >= 768 ? 500 : window.innerWidth - 90); // 500 for desktop, 400 for mobile
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[710px]  overflow-x-hidden rounded-m relative">
      <div
        className="gap-x-3 h-full flex transition-all ease-in-out rounded-md duration-1000"
        style={{ transform: `translateX(-${current * (itemWidth+18)}px)`}}
      >
        {products.map((product: any) => (
          <div key={product.id} style={{ width: `${itemWidth}px)`}}>
          <Link
            href={"/product/" + product?.title?.replaceAll(" ", "-")}
            className="h-full relative group"            
            style={{ width: `${itemWidth+12}px)` }}
          >
            <div className="">
              <AddToCartButton
                product={product}
                btnType="cartBtn"
                classes="right-8 scale-100"
              />
              <Image
                src={product.images[0]}
                alt={product?.title}
                width={100}
                height={100}
                quality={100}
                // layout="responsive"
                // fill
                unoptimized
                sizes="100%"
                style={{width:`${itemWidth+8}px`,maxWidth:`${itemWidth+12}px`}}
                className="object-cover  h-[630px] rounded-md"
              />

              <div className="text-center mt-2 group-hover:bg-[#0a5d5d3b] group-hover:p-[2px] group-hover:rounded">
                <h1 className="font-Poppins group-hover:text-[12px] text-[14px] hover:text-primary capitalize">
                  {product?.title}
                  <span className="text-[12px] text-slate-500">
                    &nbsp;{" "}
                    {product?.variant?.length > 1
                      ? `(${product?.variant?.length} Sizes)`
                      : ""}
                  </span>
                </h1>

                <div className="flex justify-center font-Poppins">
                  {product?.variant && product?.variant[0]?.discount ? (
                    <>
                      <h2 className="text-primary group-hover:text-[12px] font-semibold">
                        {" "}
                        Aed {product?.variant[0]?.discountedPrice}
                      </h2>

                      <h2 className="text-red-500 line-through ml-3 group-hover:text-[12px] group-hover:text-red-500 group-hover:font-semibold">
                        Aed {product?.variant[0]?.price[0]}
                      </h2>
                    </>
                  ) : (
                    <h2 className="text-primary group-hover:text-[12px] group-hover:font-semibold">
                      Aed {product?.variant && product?.variant[0]?.price[0]}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </Link>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-28 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-white cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalSlider;
