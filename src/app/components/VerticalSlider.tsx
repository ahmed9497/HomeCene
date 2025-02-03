"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const VerticalSlider = ({products}:{products:any}) => {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState(400);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setItemWidth(window.innerWidth >= 768 ? 500 : 400); // 500 for desktop, 400 for mobile
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="h-[710px] overflow-hidden rounded-md relative">
      <div
        className="w-max h-full flex transition-all ease-in-out rounded-md duration-1000"
        style={{ transform: `translateX(-${current * itemWidth}px)` }}
      >
        {products.map((slide:any) => (
        
          
              <Image
                src={slide.images[0]}
                key={slide.id}
                alt={slide?.title}
                width={100}
                height={100}
                quality={100}
                // layout="responsive"
                // fill
                unoptimized
                sizes="100%"
                className="object-cover w-[400px] sm:w-[500px] h-full rounded-md"
              />
  

        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
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
