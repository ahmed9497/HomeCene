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

const VerticalSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[710px] overflow-hidden rounded-md relative">
      <div
        className="w-max h-full flex transition-all ease-in-out rounded-md duration-1000"
        style={{ transform: `translateX(-${current * 500}px)` }}
      >
        {slides.map((slide) => (
        
          
              <Image
                src={slide.img}
                key={slide.id}
                alt=""
                width={100}
                height={100}
                // layout="responsive"
                // fill
                sizes="100%"
                className="object-cover w-[500px] h-full rounded-md"
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
